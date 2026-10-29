'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { dataStore } from '@/lib/data/store';
import { Doctor, DoctorChangeRequest, DoctorSchedule, ScheduleException } from '@/types';
import {
  getDayName,
  formatTimeRange,
  formatDateDisplay,
  calculateUpcomingConsultations,
} from '@/lib/schedule-utils';
import { StatusBadge } from '@/components/schedule/StatusBadge';
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Send,
  AlertCircle,
  CheckCircle2,
  LogOut,
  Edit3,
  CalendarPlus,
  CalendarX,
  FileText,
  Home,
  Check,
} from 'lucide-react';

export default function DoctorDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  // Active doctor
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'schedule' | 'requests'>('overview');

  // Forms state
  const [bioEdit, setBioEdit] = useState('');
  const [languagesEdit, setLanguagesEdit] = useState('');
  const [profileSavedMsg, setProfileSavedMsg] = useState('');

  // Change request modal/form states
  const [qualificationReq, setQualificationReq] = useState('');
  const [regReq, setRegReq] = useState('');
  const [requestSentMsg, setRequestSentMsg] = useState('');

  // Schedule change form
  const [selectedDay, setSelectedDay] = useState(1);
  const [proposedStart, setProposedStart] = useState('09:00');
  const [proposedEnd, setProposedEnd] = useState('13:00');
  const [scheduleReason, setScheduleReason] = useState('');

  // Absence/Holiday request form
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  // Load doctor record
  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'doctor') {
        router.push('/login');
        return;
      }

      const docId = user.doctor_id || 'doc-1';
      const doc = dataStore.getDoctorById(docId);
      if (doc) {
        setDoctor(doc);
        setBioEdit(doc.biography);
        setLanguagesEdit(doc.languages.join(', '));
      }
    }
  }, [user, loading, router]);

  if (loading || !doctor) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        Loading Doctor Dashboard...
      </div>
    );
  }

  // Doctor schedules & exceptions
  const schedules = dataStore.getSchedules(doctor.id, true);
  const exceptions = dataStore.getExceptions(doctor.id, true);
  const specialties = dataStore.getSpecialties();
  const changeRequests = dataStore.getChangeRequests(doctor.id);

  // Upcoming consultations
  const upcomingConsultations = calculateUpcomingConsultations(
    [doctor],
    schedules,
    exceptions,
    specialties,
    14
  );

  // Calculate profile completion
  let completionPoints = 0;
  if (doctor.full_name) completionPoints += 20;
  if (doctor.qualifications) completionPoints += 20;
  if (doctor.medical_registration_details) completionPoints += 20;
  if (doctor.biography) completionPoints += 20;
  if (doctor.profile_image_url) completionPoints += 20;

  // Handlers
  const handleSavePermittedProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = dataStore.updateDoctor(doctor.id, {
      biography: bioEdit,
      languages: languagesEdit.split(',').map((l) => l.trim()).filter(Boolean),
    });
    setDoctor(updated);
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'UPDATE_BIO',
      'doctors',
      doctor.id,
      'Doctor updated biography and language proficiencies.'
    );
    setProfileSavedMsg('Profile details saved successfully!');
    setTimeout(() => setProfileSavedMsg(''), 3000);
  };

  const handleRequestCredentialChange = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.createChangeRequest({
      doctor_id: doctor.id,
      requested_by: user!.id,
      requested_by_name: user!.full_name,
      change_type: 'profile_update',
      proposed_data: {
        qualifications: qualificationReq || doctor.qualifications,
        medical_registration_details: regReq || doctor.medical_registration_details,
      },
      status: 'pending',
    });
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'SUBMIT_CREDENTIAL_CHANGE_REQUEST',
      'doctor_change_requests',
      doctor.id,
      'Doctor submitted credential verification request.'
    );
    setRequestSentMsg('Change request submitted for clinic administrator approval!');
    setQualificationReq('');
    setRegReq('');
    setTimeout(() => setRequestSentMsg(''), 4000);
  };

  const handleRequestScheduleTiming = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.createChangeRequest({
      doctor_id: doctor.id,
      requested_by: user!.id,
      requested_by_name: user!.full_name,
      change_type: 'schedule_change',
      proposed_data: {
        day_of_week: Number(selectedDay),
        proposed_start_time: proposedStart,
        proposed_end_time: proposedEnd,
        reason: scheduleReason,
      },
      status: 'pending',
    });
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'SUBMIT_SCHEDULE_CHANGE_REQUEST',
      'doctor_change_requests',
      doctor.id,
      `Proposed schedule timing for ${getDayName(Number(selectedDay))}: ${proposedStart} - ${proposedEnd}`
    );
    setRequestSentMsg('Schedule timing request submitted to administration!');
    setScheduleReason('');
    setTimeout(() => setRequestSentMsg(''), 4000);
  };

  const handleReportAbsence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveDate) return;
    dataStore.createChangeRequest({
      doctor_id: doctor.id,
      requested_by: user!.id,
      requested_by_name: user!.full_name,
      change_type: 'holiday_request',
      proposed_data: {
        date: leaveDate,
        reason: leaveReason || 'Doctor unavailable',
      },
      status: 'pending',
    });
    dataStore.addAuditLog(
      user!.id,
      user!.full_name,
      user!.role,
      'SUBMIT_LEAVE_REQUEST',
      'doctor_change_requests',
      doctor.id,
      `Doctor reported absence/leave for ${leaveDate}`
    );
    setRequestSentMsg('Absence report submitted for administrator verification!');
    setLeaveDate('');
    setLeaveReason('');
    setTimeout(() => setRequestSentMsg(''), 4000);
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
                Doctor Portal
              </span>
              <span className="text-[11px] text-teal-400 block -mt-0.5 font-medium">
                Satyabhama Health Care
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/doctors/${doctor.slug}`}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <span>View Public Profile</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Website</span>
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

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Welcome Doctor Strip */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-teal-500/30 flex-shrink-0">
              {doctor.profile_image_url ? (
                <Image
                  src={doctor.profile_image_url}
                  alt={doctor.full_name}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-teal-400">
                  {doctor.full_name.replace('Dr. ', '').charAt(0)}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-400 border border-teal-800 uppercase tracking-wider">
                  Verified Doctor Account
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 capitalize">
                  {doctor.consultant_type} Consultant
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {doctor.full_name}
              </h1>
              <p className="text-xs text-rose-400 font-medium">
                {doctor.specialty_summary} • {doctor.qualifications}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800 text-xs">
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center min-w-[100px]">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Profile Status</span>
              <span className="font-bold text-teal-400 capitalize">{doctor.publication_status}</span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center min-w-[100px]">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Completion</span>
              <span className="font-bold text-white">{completionPoints}%</span>
            </div>
          </div>
        </div>

        {/* Global Notifications / Alert Banner */}
        {requestSentMsg && (
          <div className="p-4 rounded-2xl bg-teal-950/80 border border-teal-800 text-teal-300 text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span>{requestSentMsg}</span>
          </div>
        )}

        {/* Tabs Bar */}
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
            Overview & Schedule
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Manage Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'schedule'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Propose Schedule / Absence
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'requests'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Track Change Requests ({changeRequests.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Upcoming Consultations */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">
                    Upcoming Published Consultation Dates
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your confirmed consultation sessions for the next 14 days (IST).
                  </p>
                </div>
              </div>

              {upcomingConsultations.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
                  <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">
                    No confirmed sessions in the next 14 days. Use the &apos;Propose Schedule&apos; tab to add slots.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingConsultations.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {formatDateDisplay(item.date)}
                          </span>
                          <span className="text-slate-400">({item.day_name})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-teal-400" />
                          <span>
                            {item.status_label === 'Cancelled'
                              ? 'Marked as Unavailable'
                              : formatTimeRange(item.start_time, item.end_time)}
                          </span>
                        </div>
                        {item.notes && (
                          <p className="text-[11px] text-amber-400 italic">{item.notes}</p>
                        )}
                      </div>

                      <StatusBadge status={item.status_label} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Weekly Schedules */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white">Regular Weekly Timetable</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Recurring consultation slots approved by the clinic.
                </p>
              </div>

              {schedules.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No recurring schedules found.</p>
              ) : (
                <div className="space-y-2.5">
                  {schedules.map((sch) => (
                    <div
                      key={sch.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">
                          {getDayName(sch.day_of_week)}
                        </span>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {sch.session_type} Session
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-teal-400 block">
                          {formatTimeRange(sch.start_time, sch.end_time)}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase">
                          {sch.publication_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('schedule')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Propose Change to Weekly Timings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PROFILE */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Permitted Profile Edit */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">
                  Permitted Profile Information
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  You may update your professional biography and languages directly. Changes to qualifications or medical council registration require verification by administration.
                </p>
              </div>

              {profileSavedMsg && (
                <div className="p-3.5 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>{profileSavedMsg}</span>
                </div>
              )}

              <form onSubmit={handleSavePermittedProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Professional Biography
                  </label>
                  <textarea
                    rows={5}
                    value={bioEdit}
                    onChange={(e) => setBioEdit(e.target.value)}
                    className="w-full p-3 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Consultation Languages (comma separated)
                  </label>
                  <input
                    type="text"
                    value={languagesEdit}
                    onChange={(e) => setLanguagesEdit(e.target.value)}
                    placeholder="e.g. Odia, Hindi, English"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>

            {/* Request Regulated Credential Changes */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">
                  Regulated Credential Updates
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Submit degrees, fellowships, or council registration changes for admin review.
                </p>
              </div>

              <form onSubmit={handleRequestCredentialChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Proposed Qualifications
                  </label>
                  <input
                    type="text"
                    placeholder={doctor.qualifications}
                    value={qualificationReq}
                    onChange={(e) => setQualificationReq(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Current: {doctor.qualifications}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Council Registration Details
                  </label>
                  <input
                    type="text"
                    placeholder={doctor.medical_registration_details || 'e.g. OMC Reg. No.'}
                    value={regReq}
                    onChange={(e) => setRegReq(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Current: {doctor.medical_registration_details || 'Pending Verification'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-teal-400" />
                  <span>Submit for Administrator Approval</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: SCHEDULE CHANGE & ABSENCE */}
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Propose Timing Change */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                <CalendarPlus className="w-5 h-5 text-teal-400" />
                <div>
                  <h2 className="text-base font-bold text-white">
                    Propose Weekly Timing Adjustment
                  </h2>
                  <p className="text-xs text-slate-400">
                    Submit a revision for your recurring consultation hours.
                  </p>
                </div>
              </div>

              <form onSubmit={handleRequestScheduleTiming} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Day of the Week
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Proposed Start Time
                    </label>
                    <input
                      type="time"
                      value={proposedStart}
                      onChange={(e) => setProposedStart(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Proposed End Time
                    </label>
                    <input
                      type="time"
                      value={proposedEnd}
                      onChange={(e) => setProposedEnd(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Reason / Clinical Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Adjusted to accommodate surgical rounds"
                    value={scheduleReason}
                    onChange={(e) => setScheduleReason(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  Submit Schedule Change
                </button>
              </form>
            </div>

            {/* Report Absence or Planned Leave */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                <CalendarX className="w-5 h-5 text-rose-400" />
                <div>
                  <h2 className="text-base font-bold text-white">
                    Report Absence / Planned Holiday
                  </h2>
                  <p className="text-xs text-slate-400">
                    Cancel a specific published consultation date to alert patients.
                  </p>
                </div>
              </div>

              <form onSubmit={handleReportAbsence} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date of Absence *
                  </label>
                  <input
                    type="date"
                    required
                    value={leaveDate}
                    onChange={(e) => setLeaveDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Reason (Optional notice for reception)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Attending annual state medical conference in Cuttack"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Submit Absence Notice
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: TRACK REQUESTS */}
        {activeTab === 'requests' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">
                  Submitted Change Requests
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Audit trail of profile and schedule requests submitted to clinic administrators.
                </p>
              </div>
            </div>

            {changeRequests.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">No change requests found.</p>
            ) : (
              <div className="space-y-3">
                {changeRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white uppercase text-[11px] px-2 py-0.5 rounded bg-slate-800">
                          {req.change_type.replace('_', ' ')}
                        </span>
                        <span className="text-slate-400">
                          Submitted on {new Date(req.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
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

                    <pre className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-slate-300 overflow-x-auto">
                      {JSON.stringify(req.proposed_data, null, 2)}
                    </pre>

                    {req.reviewed_by && (
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-900 flex items-center justify-between">
                        <span>Reviewed by: {req.reviewed_by_name || 'Admin'}</span>
                        {req.review_notes && <span>Notes: {req.review_notes}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
