'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { dataStore } from '@/lib/data/store';
import {
  Doctor,
  DoctorSchedule,
  ScheduleException,
  DoctorChangeRequest,
  Specialty,
  FAQItem,
  ClinicSettings,
  AuditLog,
} from '@/types';
import {
  getDayName,
  formatTimeRange,
  formatDateDisplay,
  calculateUpcomingConsultations,
} from '@/lib/schedule-utils';
import { StatusBadge } from '@/components/schedule/StatusBadge';
import {
  Shield,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  FileText,
  Settings,
  LogOut,
  Home,
  Award,
  Search,
  Filter,
  Eye,
  EyeOff,
  Bell,
  Activity,
  HelpCircle,
  History,
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'doctors' | 'schedules' | 'exceptions' | 'approvals' | 'content' | 'audit'
  >('overview');

  // State data from dataStore
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [exceptions, setExceptions] = useState<ScheduleException[]>([]);
  const [changeRequests, setChangeRequests] = useState<DoctorChangeRequest[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Feedback banner
  const [alertMsg, setAlertMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Doctor Form Modal State
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [doctorFormData, setDoctorFormData] = useState({
    full_name: '',
    slug: '',
    qualifications: '',
    medical_registration_details: '',
    specialty_summary: '',
    biography: '',
    designation: '',
    consultant_type: 'regular' as 'regular' | 'visiting',
    verification_status: 'draft' as any,
    publication_status: 'draft' as any,
    languages: 'Odia, Hindi, English',
    profile_image_url: '',
  });

  // Schedule Modal State
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleFormData, setScheduleFormData] = useState({
    doctor_id: '',
    day_of_week: 1,
    start_time: '09:00',
    end_time: '13:00',
    session_type: 'morning' as any,
    publication_status: 'published' as any,
  });

  // Exception Modal State
  const [exceptionModalOpen, setExceptionModalOpen] = useState(false);
  const [exceptionFormData, setExceptionFormData] = useState({
    doctor_id: '',
    consultation_date: '',
    exception_type: 'special_clinic' as any,
    start_time: '10:00',
    end_time: '14:00',
    notes: '',
    publication_status: 'published' as any,
  });

  // Settings edit state
  const [clinicNameEdit, setClinicNameEdit] = useState('');
  const [clinicPhoneEdit, setClinicPhoneEdit] = useState('');
  const [clinicHoursEdit, setClinicHoursEdit] = useState('');
  const [clinicAddressEdit, setClinicAddressEdit] = useState('');
  const [clinicAnnouncementEdit, setClinicAnnouncementEdit] = useState('');

  // Reload all store data
  const refreshData = () => {
    setDoctors(dataStore.getDoctors(true));
    setSchedules(dataStore.getSchedules(undefined, true));
    setExceptions(dataStore.getExceptions(undefined, true));
    setChangeRequests(dataStore.getChangeRequests());
    setSpecialties(dataStore.getSpecialties(true));
    setFaqs(dataStore.getFAQs());
    const currentSettings = dataStore.getClinicSettings();
    setSettings(currentSettings);
    setClinicNameEdit(currentSettings.clinic_name);
    setClinicPhoneEdit(currentSettings.phone);
    setClinicHoursEdit(currentSettings.opening_hours);
    setClinicAddressEdit(currentSettings.address);
    setClinicAnnouncementEdit(currentSettings.announcement || '');
    setAuditLogs(dataStore.getAuditLogs());
  };

  useEffect(() => {
    if (!loading) {
      if (!user || (user.role !== 'super_admin' && user.role !== 'clinic_admin' && user.role !== 'content_editor')) {
        router.push('/login');
        return;
      }
      refreshData();
    }
  }, [user, loading, router]);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setAlertMsg({ text, type });
    setTimeout(() => setAlertMsg(null), 3500);
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">
        Loading Administrator Dashboard...
      </div>
    );
  }

  // Derived real metrics
  const totalDoctors = doctors.length;
  const publishedDoctors = doctors.filter(
    (d) => d.publication_status === 'published' && d.verification_status === 'verified'
  ).length;
  const unverifiedDoctors = doctors.filter((d) => d.verification_status !== 'verified').length;
  const publishedSchedules = schedules.filter((s) => s.publication_status === 'published').length;
  const pendingRequests = changeRequests.filter((r) => r.status === 'pending').length;
  const specialClinics = exceptions.filter((e) => e.exception_type === 'special_clinic' && e.publication_status === 'published').length;

  // Handlers for Doctor
  const handleOpenDoctorModal = (doc?: Doctor) => {
    if (doc) {
      setEditingDoctorId(doc.id);
      setDoctorFormData({
        full_name: doc.full_name,
        slug: doc.slug,
        qualifications: doc.qualifications,
        medical_registration_details: doc.medical_registration_details || '',
        specialty_summary: doc.specialty_summary,
        biography: doc.biography,
        designation: doc.designation || '',
        consultant_type: doc.consultant_type,
        verification_status: doc.verification_status,
        publication_status: doc.publication_status,
        languages: doc.languages.join(', '),
        profile_image_url: doc.profile_image_url || '',
      });
    } else {
      setEditingDoctorId(null);
      setDoctorFormData({
        full_name: '',
        slug: '',
        qualifications: '',
        medical_registration_details: '',
        specialty_summary: 'General Medicine',
        biography: '',
        designation: 'Consultant Physician',
        consultant_type: 'regular',
        verification_status: 'verified',
        publication_status: 'published',
        languages: 'Odia, Hindi, English',
        profile_image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      });
    }
    setDoctorModalOpen(true);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      doctorFormData.slug ||
      doctorFormData.full_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const langs = doctorFormData.languages
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    if (editingDoctorId) {
      dataStore.updateDoctor(editingDoctorId, {
        ...doctorFormData,
        slug,
        languages: langs,
      });
      dataStore.addAuditLog(
        user!.id,
        user!.full_name,
        user!.role,
        'UPDATE_DOCTOR',
        'doctors',
        editingDoctorId,
        `Updated doctor record ${doctorFormData.full_name}`
      );
      showNotification(`Updated doctor: ${doctorFormData.full_name}`);
    } else {
      const newDoc = dataStore.createDoctor({
        ...doctorFormData,
        slug,
        languages: langs,
      });
      dataStore.addAuditLog(
        user!.id,
        user!.full_name,
        user!.role,
        'CREATE_DOCTOR',
        'doctors',
        newDoc.id,
        `Created new doctor record ${newDoc.full_name}`
      );
      showNotification(`Created doctor: ${newDoc.full_name}`);
    }

    setDoctorModalOpen(false);
    refreshData();
  };

  const handleTogglePublication = (doc: Doctor) => {
    const nextStatus = doc.publication_status === 'published' ? 'draft' : 'published';
    dataStore.updateDoctor(doc.id, { publication_status: nextStatus });
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'TOGGLE_DOCTOR_STATUS',
      'doctors',
      doc.id,
      `Changed publication status of ${doc.full_name} to ${nextStatus}`
    );
    showNotification(`${doc.full_name} status updated to: ${nextStatus}`);
    refreshData();
  };

  const handleVerifyDoctor = (doc: Doctor) => {
    dataStore.updateDoctor(doc.id, {
      verification_status: 'verified',
      publication_status: 'published',
    });
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'VERIFY_DOCTOR',
      'doctors',
      doc.id,
      `Verified credentials and published doctor ${doc.full_name}`
    );
    showNotification(`Verified & Published doctor: ${doc.full_name}`);
    refreshData();
  };

  // Schedule Handlers
  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleFormData.doctor_id) {
      showNotification('Please select a doctor', 'error');
      return;
    }

    dataStore.createSchedule({
      doctor_id: scheduleFormData.doctor_id,
      day_of_week: Number(scheduleFormData.day_of_week) as any,
      start_time: scheduleFormData.start_time,
      end_time: scheduleFormData.end_time,
      session_type: scheduleFormData.session_type,
      publication_status: scheduleFormData.publication_status,
      updated_by: user!.id,
    });

    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'CREATE_SCHEDULE',
      'doctor_schedules',
      scheduleFormData.doctor_id,
      `Added weekly schedule for ${getDayName(Number(scheduleFormData.day_of_week))} (${scheduleFormData.start_time} - ${scheduleFormData.end_time})`
    );

    showNotification('Weekly schedule published successfully!');
    setScheduleModalOpen(false);
    refreshData();
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm('Are you sure you want to delete this recurring schedule?')) {
      dataStore.deleteSchedule(id);
      dataStore.addAuditLog(
        user!.id,
        user!.full_name,
        user!.role,
        'DELETE_SCHEDULE',
        'doctor_schedules',
        id,
        `Deleted schedule ID ${id}`
      );
      showNotification('Schedule deleted successfully.');
      refreshData();
    }
  };

  // Exception Handlers
  const handleSaveException = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exceptionFormData.doctor_id || !exceptionFormData.consultation_date) {
      showNotification('Doctor and consultation date are required', 'error');
      return;
    }

    dataStore.createException({
      doctor_id: exceptionFormData.doctor_id,
      consultation_date: exceptionFormData.consultation_date,
      exception_type: exceptionFormData.exception_type,
      start_time: exceptionFormData.start_time,
      end_time: exceptionFormData.end_time,
      notes: exceptionFormData.notes,
      publication_status: exceptionFormData.publication_status,
      created_by: user!.id,
      updated_by: user!.id,
    });

    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'CREATE_EXCEPTION',
      'schedule_exceptions',
      exceptionFormData.doctor_id,
      `Added ${exceptionFormData.exception_type} for date ${exceptionFormData.consultation_date}`
    );

    showNotification('Date-specific exception published successfully!');
    setExceptionModalOpen(false);
    refreshData();
  };

  const handleDeleteException = (id: string) => {
    if (confirm('Delete this date exception?')) {
      dataStore.deleteException(id);
      showNotification('Exception removed.');
      refreshData();
    }
  };

  // Change Request Handlers
  const handleResolveRequest = (id: string, status: 'approved' | 'rejected') => {
    const notes = prompt(`Enter review notes for ${status}:`, status === 'approved' ? 'Approved by clinic management' : 'Declined per clinic policy');
    if (notes === null) return;

    dataStore.resolveChangeRequest(id, status, notes, user!.id, user!.full_name);
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      `${status.toUpperCase()}_CHANGE_REQUEST`,
      'doctor_change_requests',
      id,
      `Change request ${id} ${status}. Notes: ${notes}`
    );
    showNotification(`Change request ${status} successfully!`);
    refreshData();
  };

  // Clinic Settings Handler
  const handleSaveClinicSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateClinicSettings({
      clinic_name: clinicNameEdit,
      phone: clinicPhoneEdit,
      opening_hours: clinicHoursEdit,
      address: clinicAddressEdit,
      announcement: clinicAnnouncementEdit,
    });
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'UPDATE_CLINIC_SETTINGS',
      'clinic_settings',
      'satyabhama-clinic-settings',
      'Updated clinic name, telephone, hours, and announcement banner.'
    );
    showNotification('Clinic settings and contact information updated!');
    refreshData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-rose-800 bg-white flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Satyabhama Health Care Logo"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-tight">
                Administration Dashboard
              </span>
              <span className="text-[11px] text-teal-400 block -mt-0.5 font-medium">
                Satyabhama Health Care • Bhadrak
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Live Site</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900/50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Notification Toast */}
        {alertMsg && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-2 shadow-lg animate-in fade-in ${
              alertMsg.type === 'success'
                ? 'bg-teal-950/90 border border-teal-800 text-teal-300'
                : 'bg-rose-950/90 border border-rose-800 text-rose-300'
            }`}
          >
            {alertMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{alertMsg.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'doctors'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Doctors Directory ({doctors.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedules')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'schedules'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Weekly Schedules ({schedules.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('exceptions')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'exceptions'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Date Exceptions & Special Clinics ({exceptions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'approvals'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <span>Doctor Change Requests</span>
            {pendingRequests > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {pendingRequests}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'content'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Website Content & Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Real Database Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Doctors
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  {totalDoctors}
                </span>
                <span className="text-[11px] text-teal-400 block">Registered Profiles</span>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Published
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-400 block">
                  {publishedDoctors}
                </span>
                <span className="text-[11px] text-slate-400 block">Verified & Public</span>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Draft / Leads
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">
                  {unverifiedDoctors}
                </span>
                <span className="text-[11px] text-slate-400 block">Awaiting Verification</span>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Active Schedules
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  {publishedSchedules}
                </span>
                <span className="text-[11px] text-teal-400 block">Weekly Slots</span>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Pending Approvals
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 block">
                  {pendingRequests}
                </span>
                <span className="text-[11px] text-slate-400 block">Doctor Requests</span>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Special Clinics
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-300 block">
                  {specialClinics}
                </span>
                <span className="text-[11px] text-slate-400 block">Visiting Dates</span>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-white">Direct Management Actions</h2>
                <p className="text-xs text-slate-400">
                  Quick shortcuts for clinic coordinators and administrators.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenDoctorModal()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Doctor</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setScheduleFormData({
                      doctor_id: doctors[0]?.id || '',
                      day_of_week: 1,
                      start_time: '09:00',
                      end_time: '13:00',
                      session_type: 'morning',
                      publication_status: 'published',
                    });
                    setScheduleModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Add Weekly Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setExceptionFormData({
                      doctor_id: doctors[0]?.id || '',
                      consultation_date: '',
                      exception_type: 'special_clinic',
                      start_time: '10:00',
                      end_time: '14:00',
                      notes: 'Special consulting session',
                      publication_status: 'published',
                    });
                    setExceptionModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add Date Exception / Special Clinic</span>
                </button>
              </div>
            </div>

            {/* Recent Audit Timeline Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-teal-400" />
                  <span>Recent Administrative Activity Log</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('audit')}
                  className="text-xs text-teal-400 hover:underline"
                >
                  View Full Audit Log →
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                {auditLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="font-bold text-teal-400 uppercase tracking-wider text-[10px] block">
                        {log.action}
                      </span>
                      <p className="text-slate-300 mt-0.5">{log.change_summary}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOCTORS DIRECTORY MANAGEMENT */}
        {activeTab === 'doctors' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">Doctors Directory</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage doctor profiles, verify credentials, and control publication.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenDoctorModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Doctor Record</span>
              </button>
            </div>

            <div className="space-y-3">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                      {doc.profile_image_url ? (
                        <Image
                          src={doc.profile_image_url}
                          alt={doc.full_name}
                          fill
                          sizes="48px"
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                          {doc.full_name.replace('Dr. ', '').charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-white">{doc.full_name}</span>
                        <span className="capitalize text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {doc.consultant_type}
                        </span>
                        {doc.verification_status === 'verified' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800">
                            Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                            Pending Verification (Draft)
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            doc.publication_status === 'published'
                              ? 'bg-teal-900/60 text-teal-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {doc.publication_status}
                        </span>
                      </div>

                      <p className="text-rose-400 font-medium">
                        {doc.specialty_summary} • {doc.qualifications}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Registration: {doc.medical_registration_details || 'Unverified'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                    {doc.verification_status !== 'verified' && (
                      <button
                        type="button"
                        onClick={() => handleVerifyDoctor(doc)}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] transition-colors"
                      >
                        Verify & Publish
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleTogglePublication(doc)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors inline-flex items-center gap-1"
                      title="Toggle public visibility"
                    >
                      {doc.publication_status === 'published' ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          <span>Unpublish</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-teal-400" />
                          <span>Publish</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDoctorModal(doc)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 text-[11px] transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WEEKLY SCHEDULES */}
        {activeTab === 'schedules' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">Recurring Weekly Schedules</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure Monday through Sunday recurring sessions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setScheduleFormData({
                    doctor_id: doctors[0]?.id || '',
                    day_of_week: 1,
                    start_time: '09:00',
                    end_time: '13:00',
                    session_type: 'morning',
                    publication_status: 'published',
                  });
                  setScheduleModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Weekly Slot</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {schedules.map((sch) => {
                const doc = doctors.find((d) => d.id === sch.doctor_id);
                return (
                  <div
                    key={sch.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-white text-sm">
                        {doc?.full_name || 'Unknown Doctor'}
                      </span>
                      <p className="text-slate-400 text-xs">
                        {getDayName(sch.day_of_week)} • {formatTimeRange(sch.start_time, sch.end_time)} ({sch.session_type})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800 uppercase">
                        {sch.publication_status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSchedule(sch.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: DATE EXCEPTIONS & SPECIAL CLINICS */}
        {activeTab === 'exceptions' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white">Date-Specific Exceptions & Special Clinics</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visiting specialist dates, cancellations, and timing adjustments.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setExceptionFormData({
                    doctor_id: doctors[0]?.id || '',
                    consultation_date: '',
                    exception_type: 'special_clinic',
                    start_time: '10:00',
                    end_time: '14:00',
                    notes: '',
                    publication_status: 'published',
                  });
                  setExceptionModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Date Exception</span>
              </button>
            </div>

            <div className="space-y-3">
              {exceptions.map((ex) => {
                const doc = doctors.find((d) => d.id === ex.doctor_id);
                return (
                  <div
                    key={ex.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {doc?.full_name || 'Unknown Doctor'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-800">
                          {ex.exception_type.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-slate-300">
                        Date: {formatDateDisplay(ex.consultation_date)}{' '}
                        {ex.start_time && `• ${formatTimeRange(ex.start_time, ex.end_time || '')}`}
                      </p>
                      {ex.notes && (
                        <p className="text-[11px] text-slate-400 italic">{ex.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded">
                        {ex.publication_status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteException(ex.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: DOCTOR CHANGE REQUESTS APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">Doctor Change Requests</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review credential updates, timing modifications, and holiday requests submitted by doctors.
              </p>
            </div>

            {changeRequests.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-6">No change requests found.</p>
            ) : (
              <div className="space-y-4">
                {changeRequests.map((req) => {
                  const doc = doctors.find((d) => d.id === req.doctor_id);
                  return (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {doc?.full_name || req.requested_by_name}
                            </span>
                            <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-400">
                              {req.change_type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Requested by: {req.requested_by_name} • {new Date(req.created_at).toLocaleString()}
                          </p>
                        </div>

                        <span
                          className={`self-start sm:self-auto px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                            req.status === 'approved'
                              ? 'bg-teal-950 text-teal-400 border border-teal-800'
                              : req.status === 'rejected'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="font-semibold text-slate-400 block mb-1">
                          Proposed Changes:
                        </span>
                        <pre className="text-[11px] text-teal-300 font-mono overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(req.proposed_data, null, 2)}
                        </pre>
                      </div>

                      {req.status === 'pending' ? (
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
                          <button
                            type="button"
                            onClick={() => handleResolveRequest(req.id, 'approved')}
                            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve & Apply to Database</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleResolveRequest(req.id, 'rejected')}
                            className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900 flex items-center justify-between">
                          <span>Reviewed by: {req.reviewed_by_name}</span>
                          {req.review_notes && <span>Notes: {req.review_notes}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: WEBSITE CONTENT & CLINIC SETTINGS */}
        {activeTab === 'content' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">Clinic Configuration & Website Content</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Update verified clinic address, telephone, operating hours, and top announcement banner.
              </p>
            </div>

            <form onSubmit={handleSaveClinicSettings} className="space-y-4 max-w-2xl text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Clinic Legal / Operating Name
                </label>
                <input
                  type="text"
                  value={clinicNameEdit}
                  onChange={(e) => setClinicNameEdit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Publicly Listed Telephone Number *
                </label>
                <input
                  type="text"
                  value={clinicPhoneEdit}
                  onChange={(e) => setClinicPhoneEdit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={clinicHoursEdit}
                  onChange={(e) => setClinicHoursEdit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Verified Clinic Address
                </label>
                <textarea
                  rows={2}
                  value={clinicAddressEdit}
                  onChange={(e) => setClinicAddressEdit(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Homepage Announcement Banner Message
                </label>
                <textarea
                  rows={2}
                  value={clinicAnnouncementEdit}
                  onChange={(e) => setClinicAnnouncementEdit(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Save Clinic Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 7: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white">Administrative Audit Trail</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Chronological log of all publishing, doctor verification, and schedule actions.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-teal-400 uppercase text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {log.action}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        Actor: <strong>{log.actor_name}</strong> ({log.actor_role})
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs">{log.change_summary}</p>
                  </div>

                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DOCTOR CREATE/EDIT MODAL */}
      {doctorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingDoctorId ? 'Edit Doctor Record' : 'Create New Doctor'}
              </h3>
              <button
                type="button"
                onClick={() => setDoctorModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoctor} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Priyaranjan Barik"
                  value={doctorFormData.full_name}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, full_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Qualifications *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MBBS, MD (General Medicine)"
                    value={doctorFormData.qualifications}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, qualifications: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Specialty Summary *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. General Medicine & Diabetes"
                    value={doctorFormData.specialty_summary}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, specialty_summary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Medical Registration Details</label>
                <input
                  type="text"
                  placeholder="e.g. OMC Reg. No. 18420"
                  value={doctorFormData.medical_registration_details}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, medical_registration_details: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Professional Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Consultant Physician"
                  value={doctorFormData.designation}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, designation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Approved Biography *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Doctor's clinical experience and areas of practice..."
                  value={doctorFormData.biography}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, biography: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Consultant Type</label>
                  <select
                    value={doctorFormData.consultant_type}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, consultant_type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="regular">Regular Specialist</option>
                    <option value="visiting">Visiting Super-Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Verification Status</label>
                  <select
                    value={doctorFormData.verification_status}
                    onChange={(e) => setDoctorFormData({ ...doctorFormData, verification_status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending_verification">Pending Verification</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={doctorFormData.profile_image_url}
                  onChange={(e) => setDoctorFormData({ ...doctorFormData, profile_image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setDoctorModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE MODAL */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add Weekly Recurring Schedule</h3>
              <button
                type="button"
                onClick={() => setScheduleModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Doctor *</label>
                <select
                  value={scheduleFormData.doctor_id}
                  onChange={(e) => setScheduleFormData({ ...scheduleFormData, doctor_id: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.full_name} ({d.specialty_summary})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Day of Week *</label>
                <select
                  value={scheduleFormData.day_of_week}
                  onChange={(e) => setScheduleFormData({ ...scheduleFormData, day_of_week: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={4}>Thursday</option>
                  <option value={5}>Friday</option>
                  <option value={6}>Saturday</option>
                  <option value={0}>Sunday</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Time</label>
                  <input
                    type="time"
                    value={scheduleFormData.start_time}
                    onChange={(e) => setScheduleFormData({ ...scheduleFormData, start_time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">End Time</label>
                  <input
                    type="time"
                    value={scheduleFormData.end_time}
                    onChange={(e) => setScheduleFormData({ ...scheduleFormData, end_time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Session Type</label>
                <select
                  value={scheduleFormData.session_type}
                  onChange={(e) => setScheduleFormData({ ...scheduleFormData, session_type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  <option value="morning">Morning Session</option>
                  <option value="evening">Evening Session</option>
                  <option value="full_day">Full Day</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  Publish Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXCEPTION / SPECIAL CLINIC MODAL */}
      {exceptionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add Date Exception / Special Clinic</h3>
              <button
                type="button"
                onClick={() => setExceptionModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveException} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Doctor *</label>
                <select
                  value={exceptionFormData.doctor_id}
                  onChange={(e) => setExceptionFormData({ ...exceptionFormData, doctor_id: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.full_name} ({d.specialty_summary})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Consultation Date *</label>
                <input
                  type="date"
                  required
                  value={exceptionFormData.consultation_date}
                  onChange={(e) => setExceptionFormData({ ...exceptionFormData, consultation_date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Exception Type *</label>
                <select
                  value={exceptionFormData.exception_type}
                  onChange={(e) => setExceptionFormData({ ...exceptionFormData, exception_type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  <option value="special_clinic">Special Clinic</option>
                  <option value="visiting_specialist">Visiting Specialist</option>
                  <option value="temporary_change">Temporary Change in Timing</option>
                  <option value="cancelled">Cancelled Consultation</option>
                  <option value="weekly_holiday">Clinic Holiday</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Time</label>
                  <input
                    type="time"
                    value={exceptionFormData.start_time}
                    onChange={(e) => setExceptionFormData({ ...exceptionFormData, start_time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">End Time</label>
                  <input
                    type="time"
                    value={exceptionFormData.end_time}
                    onChange={(e) => setExceptionFormData({ ...exceptionFormData, end_time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notice / Public Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Visiting specialist attending. Tokens issued from 9 AM."
                  value={exceptionFormData.notes}
                  onChange={(e) => setExceptionFormData({ ...exceptionFormData, notes: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setExceptionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  Publish Exception
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
