'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { DOCTOR_TIMINGS, DoctorTimingProfile } from '@/lib/data/doctor-timings';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { CalculatedConsultation } from '@/types';
import { StatusBadge } from './StatusBadge';
import { formatDateDisplay, formatTimeRange, calculateUpcomingConsultations } from '@/lib/schedule-utils';
import { dataStore } from '@/lib/data/store';
import {
  Search,
  Filter,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
  Stethoscope,
  X,
  LayoutGrid,
  Table as TableIcon,
  AlertTriangle,
} from 'lucide-react';

interface DoctorTimetableSearchProps {
  upcomingConsultations?: CalculatedConsultation[];
}

export function DoctorTimetableSearch({
  upcomingConsultations = [],
}: DoctorTimetableSearchProps) {
  const [liveConsultations, setLiveConsultations] = useState<CalculatedConsultation[]>(upcomingConsultations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Auto-update schedule dynamically on mount and every 10 minutes to guarantee live freshness once deployed
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
        console.error('Failed to auto-refresh live schedule:', e);
      }
    }

    refreshSchedule();
    const interval = setInterval(refreshSchedule, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (upcomingConsultations && upcomingConsultations.length > 0) {
      setLiveConsultations(upcomingConsultations);
    }
  }, [upcomingConsultations]);

  // Distinct specialties from DOCTOR_TIMINGS
  const specialties = useMemo(() => {
    const set = new Set<string>();
    DOCTOR_TIMINGS.forEach((doc) => {
      // Clean up specialty for filter pill
      const mainPart = doc.specialty.split('(')[0].trim();
      set.add(mainPart);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered doctors based on search term & specialty
  const filteredDoctors = useMemo(() => {
    return DOCTOR_TIMINGS.filter((doc) => {
      // 1. Specialty Filter
      if (selectedSpecialty !== 'ALL') {
        const matchesSpec = doc.specialty
          .toLowerCase()
          .includes(selectedSpecialty.toLowerCase());
        if (!matchesSpec) return false;
      }

      // 2. Search Term Filter (checks doctor name, qualifications, specialty, designation, availability)
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const normQ = q.replace(/ll/g, 'l'); // handle double-l variations like Dilip/Dillip

        const docNameLower = doc.name.toLowerCase();
        const docNameNorm = docNameLower.replace(/ll/g, 'l');

        const matchesName =
          docNameLower.includes(q) || docNameNorm.includes(normQ);
        const matchesSpec = doc.specialty.toLowerCase().includes(q);
        const matchesQual = doc.qualifications.toLowerCase().includes(q);
        const matchesDesig = doc.designation.toLowerCase().includes(q);
        const matchesAvail = doc.availability.toLowerCase().includes(q);
        const matchesTiming = doc.timing.toLowerCase().includes(q);
        const matchesInstruction = doc.importantInstruction
          ?.toLowerCase()
          .includes(q);

        if (
          !matchesName &&
          !matchesSpec &&
          !matchesQual &&
          !matchesDesig &&
          !matchesAvail &&
          !matchesTiming &&
          !matchesInstruction
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedSpecialty]);

  // Filtered upcoming consultations (for table view)
  const filteredConsultations = useMemo(() => {
    if (!liveConsultations.length) return [];
    return liveConsultations.filter((item) => {
      if (selectedSpecialty !== 'ALL') {
        if (
          !item.specialty_name
            .toLowerCase()
            .includes(selectedSpecialty.toLowerCase())
        ) {
          return false;
        }
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const normQ = q.replace(/ll/g, 'l');
        const matchesDoc =
          item.doctor_name.toLowerCase().includes(q) ||
          item.doctor_name.toLowerCase().replace(/ll/g, 'l').includes(normQ);
        const matchesSpec = item.specialty_name.toLowerCase().includes(q);
        const matchesNotes = item.notes?.toLowerCase().includes(q);
        if (!matchesDoc && !matchesSpec && !matchesNotes) return false;
      }
      return true;
    });
  }, [liveConsultations, searchTerm, selectedSpecialty]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedSpecialty('ALL');
  };

  return (
    <div className="space-y-6">
      {/* 1. Interactive Search & Filter Controls */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
              Doctor Schedule Search
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Find Doctor Timings &amp; OPD Consultation Details
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Search any doctor by name or specialty to see their verified clinical days, timings, and credentials.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-teal-600" />
              <span>Doctor Profiles ({filteredDoctors.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>Calendar Roster</span>
            </button>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctor by name (e.g. Barik, Pany, Chand, Padhy, Pati, Acharya) or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 text-base sm:text-sm bg-slate-50 border border-slate-200/90 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-900 placeholder:text-slate-400 shadow-xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Specialty Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>Specialties:</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedSpecialty('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedSpecialty === 'ALL'
                ? 'bg-teal-600 text-white shadow-xs font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
            }`}
          >
            All {DOCTOR_TIMINGS.length} Doctors
          </button>
          {specialties.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedSpecialty === spec
                  ? 'bg-teal-600 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              {spec}
            </button>
          ))}

          {(searchTerm || selectedSpecialty !== 'ALL') && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 ml-auto transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* 2. RESULTS VIEW: CARDS MODE (Default) */}
      {viewMode === 'cards' && (
        <>
          {filteredDoctors.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                No doctor found matching &quot;{searchTerm}&quot;
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Please check the spelling or call clinic reception at{' '}
                <a
                  href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="text-teal-700 font-bold underline"
                >
                  {CLINIC_CONFIG.phone}
                </a>{' '}
                for verified doctor availability and visiting dates.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm hover:bg-teal-700 transition-colors"
              >
                Show All {DOCTOR_TIMINGS.length} Doctors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-7">
              {filteredDoctors.map((doctor, index) => {
                const originalIndex =
                  DOCTOR_TIMINGS.findIndex((d) => d.id === doctor.id) + 1;

                return (
                  <div
                    key={doctor.id}
                    className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-300/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Doctor Info Section */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                            #{originalIndex}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                            <ShieldCheck className="w-3 h-3 text-teal-600" />
                            <span>Verified</span>
                          </span>
                        </div>

                        {doctor.requiresPriorContact && (
                          <span className="text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                            Prior Contact
                          </span>
                        )}
                      </div>

                      {/* Doctor Name & Credentials */}
                      <div className="space-y-1.5">
                        <Link
                          href={`/doctors/${doctor.slug}`}
                          className="block text-xl font-extrabold text-slate-900 hover:text-teal-700 transition-colors tracking-tight leading-snug"
                        >
                          {doctor.name}
                        </Link>

                        <p className="text-sm font-semibold text-teal-800 leading-snug">
                          {doctor.specialty}
                        </p>

                        <p className="text-xs text-slate-600 font-medium">
                          {doctor.qualifications}
                        </p>

                        {doctor.designation && (
                          <div className="flex items-center gap-1.5 pt-0.5 text-xs text-slate-500">
                            <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="line-clamp-1">
                              {doctor.designation}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Timetable / Consultation Timing Box */}
                      <div className="bg-sky-50/80 rounded-xl p-3.5 border border-sky-200/90 space-y-2">
                        <span className="text-[11px] font-bold text-sky-850 uppercase tracking-wider block">
                          Consultation Schedule
                        </span>

                        <div className="text-xs font-bold text-slate-900 leading-snug">
                          {doctor.displayLabel}
                        </div>

                        <div className="space-y-1 pt-1.5 border-t border-sky-200/60 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                            <span className="font-medium">
                              {doctor.availability}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span>{doctor.timing}</span>
                          </div>
                        </div>

                        {doctor.importantInstruction && (
                          <p className="text-[11px] text-slate-600 pt-1 border-t border-sky-100 leading-relaxed">
                            {doctor.importantInstruction}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                      <Link
                        href={`/doctors/${doctor.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs"
                      >
                        <span>View Profile</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </Link>

                      <a
                        href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors"
                        title={`Call clinic reception regarding ${doctor.name}`}
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Clinic</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* 3. RESULTS VIEW: CALENDAR TABLE MODE */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          {filteredConsultations.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                No calendar slots match your selection
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Switch back to <strong>Doctor Profiles</strong> view or call clinic reception at{' '}
                <a
                  href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="text-teal-700 font-bold underline"
                >
                  {CLINIC_CONFIG.phone}
                </a>.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3.5 px-5 font-semibold">Doctor &amp; Specialty</th>
                      <th className="py-3.5 px-5 font-semibold">Date &amp; Day</th>
                      <th className="py-3.5 px-5 font-semibold">Consultation Hours</th>
                      <th className="py-3.5 px-5 font-semibold">Schedule Status</th>
                      <th className="py-3.5 px-5 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredConsultations.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-5">
                          <Link
                            href={`/doctors/${item.doctor_slug}`}
                            className="font-bold text-slate-900 hover:text-teal-700 transition-colors block"
                          >
                            {item.doctor_name}
                          </Link>
                          <span className="text-xs text-slate-500 block">
                            {item.specialty_name}
                          </span>
                        </td>
                        <td className="py-4 px-5 font-medium text-slate-800">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                            <span>{formatDateDisplay(item.date)}</span>
                          </div>
                          <span className="text-xs text-slate-500 block">
                            {item.day_name}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span>{formatTimeRange(item.start_time, item.end_time)}</span>
                          </div>
                          <span className="text-xs text-slate-500 capitalize">
                            {item.consultant_type === 'visiting' ? 'Visiting Slot' : 'OPD Consultation'}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <StatusBadge status={item.status_label} />
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/doctors/${item.doctor_slug}`}
                              className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                              Profile
                            </Link>
                            <a
                              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                              className="text-xs font-bold text-teal-700 hover:text-teal-900 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Confirm</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List */}
              <div className="md:hidden divide-y divide-slate-100 p-4 space-y-3">
                {filteredConsultations.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3"
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
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>{formatDateDisplay(item.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatTimeRange(item.start_time, item.end_time)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        href={`/doctors/${item.doctor_slug}`}
                        className="flex-1 py-2 text-center text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg"
                      >
                        Profile
                      </Link>
                      <a
                        href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                        className="flex-1 py-2 text-center text-xs font-bold text-white bg-teal-600 rounded-lg flex items-center justify-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Reception</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
