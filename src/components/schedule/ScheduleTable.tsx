'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CalculatedConsultation } from '@/types';
import { StatusBadge } from './StatusBadge';
import { formatDateDisplay, formatTimeRange, calculateUpcomingConsultations, getTodayISTString } from '@/lib/schedule-utils';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { Search, Filter, Phone, Calendar, Clock, AlertTriangle, User } from 'lucide-react';

interface ScheduleTableProps {
  consultations: CalculatedConsultation[];
  showFilters?: boolean;
  limit?: number;
}

export function ScheduleTable({
  consultations,
  showFilters = true,
  limit,
}: ScheduleTableProps) {
  const [liveConsultations, setLiveConsultations] = useState<CalculatedConsultation[]>(consultations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [selectedDoctor, setSelectedDoctor] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Auto-update to current date upon client mount & periodically to guarantee live freshness once deployed
  useEffect(() => {
    function refreshSchedule() {
      try {
        const fresh = calculateUpcomingConsultations(
          dataStore.getDoctors(false),
          dataStore.getSchedules(undefined, false),
          dataStore.getExceptions(undefined, false),
          dataStore.getSpecialties(),
          21
        );
        if (fresh && fresh.length > 0) {
          setLiveConsultations(fresh);
        }
      } catch (e) {
        console.error('Failed to auto-refresh schedule:', e);
      }
    }

    // Refresh on mount to ensure today's real IST date is always active
    refreshSchedule();

    // Check every 10 minutes to auto-advance at midnight without needing redeployment
    const interval = setInterval(refreshSchedule, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Update liveConsultations if parent prop changes
  useEffect(() => {
    if (consultations && consultations.length > 0) {
      setLiveConsultations(consultations);
    }
  }, [consultations]);

  // Extract unique options for filters
  const doctorOptions = useMemo(() => {
    const map = new Map<string, string>();
    liveConsultations.forEach((c) => map.set(c.doctor_id, c.doctor_name));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [liveConsultations]);

  const specialtyOptions = useMemo(() => {
    const set = new Set<string>();
    liveConsultations.forEach((c) => set.add(c.specialty_name));
    return Array.from(set).sort();
  }, [liveConsultations]);

  // Filtered consultations
  const filtered = useMemo(() => {
    return liveConsultations.filter((item) => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase().trim();
        const normQuery = query.replace(/ll/g, 'l');
        const matchesDoc =
          item.doctor_name.toLowerCase().includes(query) ||
          item.doctor_name.toLowerCase().replace(/ll/g, 'l').includes(normQuery);
        const matchesSpec = item.specialty_name.toLowerCase().includes(query);
        const matchesNotes = item.notes?.toLowerCase().includes(query);
        if (!matchesDoc && !matchesSpec && !matchesNotes) return false;
      }

      // Doctor filter
      if (selectedDoctor !== 'ALL' && item.doctor_id !== selectedDoctor) {
        return false;
      }

      // Specialty filter
      if (selectedSpecialty !== 'ALL' && item.specialty_name !== selectedSpecialty) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && item.status_label !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [liveConsultations, searchTerm, selectedDoctor, selectedSpecialty, statusFilter]);

  const displayedList = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      {showFilters && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>Filter Consultation Timings</span>
            </h3>
            {(searchTerm || selectedDoctor !== 'ALL' || selectedSpecialty !== 'ALL' || statusFilter !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDoctor('ALL');
                  setSelectedSpecialty('ALL');
                  setStatusFilter('ALL');
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctor or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all min-h-[42px]"
              />
            </div>

            {/* Doctor Select */}
            <div>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-700 min-h-[42px]"
              >
                <option value="ALL">All Doctors</option>
                {doctorOptions.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty Select */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-700 min-h-[42px]"
              >
                <option value="ALL">All Specialties</option>
                {specialtyOptions.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-700 min-h-[42px]"
              >
                <option value="ALL">All Schedule Types</option>
                <option value="Regular Schedule">Regular Schedule</option>
                <option value="Special Clinic">Special Clinic</option>
                <option value="Schedule Changed">Schedule Changed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {displayedList.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-800">No schedules match your selection</h4>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Please broaden your filters or contact the clinic reception directly at{' '}
            <a href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`} className="text-teal-700 font-semibold underline">
              {CLINIC_CONFIG.phone}
            </a>{' '}
            for verified timings.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-5 font-semibold">Doctor & Specialty</th>
                  <th className="py-3.5 px-5 font-semibold">Date & Day</th>
                  <th className="py-3.5 px-5 font-semibold">Consultation Hours</th>
                  <th className="py-3.5 px-5 font-semibold">Consultant Type</th>
                  <th className="py-3.5 px-5 font-semibold">Schedule Status</th>
                  <th className="py-3.5 px-5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {displayedList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Doctor Info */}
                    <td className="py-4 px-5">
                      <div>
                        <Link
                          href={`/doctors/${item.doctor_slug}`}
                          className="font-bold text-slate-900 hover:text-teal-700 transition-colors block"
                        >
                          {item.doctor_name}
                        </Link>
                        <span className="text-xs text-slate-500 block">
                          {item.specialty_name}
                        </span>
                      </div>
                    </td>

                    {/* Date & Day */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <div>
                          <span>{formatDateDisplay(item.date)}</span>
                          <span className="text-xs text-slate-500 block">{item.day_name}</span>
                        </div>
                      </div>
                    </td>

                    {/* Consultation Hours */}
                    <td className="py-4 px-5">
                      {item.status_label === 'Cancelled' ? (
                        <span className="text-xs text-rose-600 font-medium">Unavailable</span>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                          <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span>{formatTimeRange(item.start_time, item.end_time)}</span>
                        </div>
                      )}
                      {item.notes && (
                        <p className="text-xs text-slate-500 mt-1 max-w-xs italic line-clamp-1">
                          {item.notes}
                        </p>
                      )}
                    </td>

                    {/* Consultant Type */}
                    <td className="py-4 px-5">
                      <span className="capitalize text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.consultant_type} Consultant
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-5">
                      <StatusBadge status={item.status_label} />
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/doctors/${item.doctor_slug}`}
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          Profile
                        </Link>
                        <a
                          href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                          className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors inline-flex items-center gap-1"
                          title="Call clinic to confirm schedule"
                        >
                          <Phone className="w-3 h-3 text-teal-600" />
                          <span>Confirm</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (No Horizontal Overflow) */}
          <div className="md:hidden space-y-3">
            {displayedList.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/doctors/${item.doctor_slug}`}
                      className="font-bold text-slate-900 hover:text-teal-700 text-base block truncate"
                    >
                      {item.doctor_name}
                    </Link>
                    <p className="text-xs text-slate-600 font-medium truncate">
                      {item.specialty_name}
                    </p>
                  </div>
                  <StatusBadge status={item.status_label} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 py-2 border-y border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDateDisplay(item.date)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>
                      {item.status_label === 'Cancelled'
                        ? 'Cancelled'
                        : formatTimeRange(item.start_time, item.end_time)}
                    </span>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    {item.notes}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    {item.consultant_type} Specialist
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/doctors/${item.doctor_slug}`}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg min-h-[38px] inline-flex items-center"
                    >
                      Profile
                    </Link>
                    <a
                      href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                      className="px-3 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg inline-flex items-center gap-1.5 shadow-sm min-h-[38px]"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call to Confirm</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Advisory Banner */}
      <div className="bg-slate-100/90 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> Doctor consultation schedules are updated regularly by authorized clinic staff. Because doctors may be called for surgical emergencies or hospital conferences, patients are kindly requested to phone Satyabhama Health Care at{' '}
          <a href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`} className="font-semibold text-slate-900 underline">
            {CLINIC_CONFIG.phone}
          </a>{' '}
          to verify today’s duty hours before arriving at the clinic.
        </p>
      </div>
    </div>
  );
}
