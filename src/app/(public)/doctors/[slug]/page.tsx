import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER } from '@/lib/clinic-config';
import {
  getDayName,
  formatTimeRange,
  formatDateDisplay,
  calculateUpcomingConsultations,
} from '@/lib/schedule-utils';
import { StatusBadge } from '@/components/schedule/StatusBadge';
import { DOCTOR_TIMINGS } from '@/lib/data/doctor-timings';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Phone,
  Award,
  Globe,
  ArrowLeft,
  AlertCircle,
  FileText,
  MapPin,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';

interface DoctorProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DoctorProfilePageProps) {
  const { slug } = await params;
  const doctor = dataStore.getDoctorBySlug(slug, false);
  if (!doctor) return { title: 'Doctor Not Found' };

  return {
    title: `${doctor.full_name} - ${doctor.specialty_summary} | Satyabhama Health Care`,
    description: `Consultation schedule and profile for ${doctor.full_name} (${doctor.qualifications}), specialist in ${doctor.specialty_summary} at Satyabhama Health Care, Bhadrak.`,
  };
}

export default async function DoctorProfilePage({ params }: DoctorProfilePageProps) {
  const { slug } = await params;
  const doctor = dataStore.getDoctorBySlug(slug, false);

  if (!doctor) {
    notFound();
  }

  // Doctor schedules & exceptions
  const weeklySchedules = dataStore.getSchedules(doctor.id, false);
  const exceptions = dataStore.getExceptions(doctor.id, false);
  const specialties = dataStore.getSpecialties();
  const timingInfo = DOCTOR_TIMINGS.find(
    (t) => t.id === doctor.id || t.slug === doctor.slug
  );

  // Sort weekly schedules Monday through Sunday (1 to 6 then 0)
  const sortedWeekly = [...weeklySchedules].sort((a, b) => {
    const dayA = a.day_of_week === 0 ? 7 : a.day_of_week;
    const dayB = b.day_of_week === 0 ? 7 : b.day_of_week;
    if (dayA !== dayB) return dayA - dayB;
    return a.start_time.localeCompare(b.start_time);
  });

  // Calculate upcoming 14 days dates for this doctor
  const upcomingConsultations = calculateUpcomingConsultations(
    [doctor],
    weeklySchedules,
    exceptions,
    specialties,
    14
  );

  return (
    <div className="py-10 sm:py-14 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Doctors</span>
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Doctor Portrait */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center sm:items-start space-y-4">
            <div className="group relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 border-4 border-white shadow-xl ring-1 ring-slate-200/80">
              {doctor.profile_image_url ? (
                <Image
                  src={doctor.profile_image_url}
                  alt={`${doctor.full_name} — doctor at Satyabhama Health Care`}
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 text-sky-850 p-4 select-none">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-sky-200/80 shadow-sm flex items-center justify-center text-sky-700 mb-2">
                    <Stethoscope className="w-8 h-8 text-sky-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 tracking-tight text-center line-clamp-1">
                    {doctor.full_name}
                  </span>
                  <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wider mt-0.5 text-center line-clamp-1">
                    {doctor.specialty_summary}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Status Pill */}
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2 p-2.5 bg-teal-50 rounded-xl border border-teal-200 text-teal-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Verified Specialist Profile</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Doctor ID:</span>
                <span className="font-mono text-slate-700 font-medium">{doctor.id}</span>
              </div>
            </div>
          </div>

          {/* Doctor Meta & Bio */}
          <div className="md:col-span-8 lg:col-span-9 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="capitalize text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white">
                  {doctor.consultant_type} Consultant
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  {doctor.specialty_summary}
                </span>
                {doctor.experience_years && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{doctor.experience_years}+ Years Experience</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {doctor.full_name}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
                {doctor.qualifications}
              </p>

              {doctor.designation && (
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {doctor.designation}
                </p>
              )}
            </div>

            {/* Medical Registration & Languages Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-700 block">Medical Registration</span>
                  <span className="text-slate-500">{doctor.medical_registration_details || 'Verified with State Council'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-700 block">Languages Spoken</span>
                  <span className="text-slate-500">{doctor.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Professional Biography
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {doctor.biography}
              </p>
            </div>

            {/* Direct Call for Schedule Confirmation */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
                title="Call clinic reception to confirm today's consultation slot"
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic to Confirm Timings: {CLINIC_CONFIG.phone}</span>
              </a>

              <span className="text-xs text-slate-400">
                Direct walk-in consultation tokens issued at reception
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Schedule Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Weekly Recurring Schedule */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold text-sky-850 uppercase tracking-wider block">
              Consultation Timetable
            </span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Regular Consultation Schedule
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified clinic timings at Satyabhama Health Care.
            </p>
          </div>

          {/* Official Doctor Timings Banner */}
          {timingInfo && (
            <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-200/90 space-y-2.5">
              <span className="text-[10px] font-bold text-sky-850 uppercase tracking-wider block">
                Official Consultation Schedule
              </span>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {timingInfo.displayLabel}
              </div>

              <div className="space-y-1 pt-1.5 border-t border-sky-200/60 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span className="font-medium">{timingInfo.availability}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  {timingInfo.timingUnspecified ? (
                    <span className="font-semibold text-sky-700">
                      Contact the Clinic for Timings
                    </span>
                  ) : (
                    <span>{timingInfo.timing}</span>
                  )}
                </div>
              </div>

              {timingInfo.importantInstruction && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold leading-tight">
                    {timingInfo.importantInstruction}
                  </span>
                </div>
              )}
            </div>
          )}

          {sortedWeekly.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4">
              Regular weekly timings undergoing periodic revision. Please call the clinic reception.
            </p>
          ) : (
            <div className="space-y-3">
              {sortedWeekly.map((sch) => (
                <div
                  key={sch.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {getDayName(sch.day_of_week)}
                      </span>
                      <span className="text-[11px] text-slate-500 capitalize">
                        {sch.session_type} Session
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold text-slate-800 block">
                      {formatTimeRange(sch.start_time, sch.end_time)}
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium">
                      Regular Slot
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800 block">Clinic Note:</span>
            <p className="leading-relaxed">
              Visiting super-specialists attend primarily on designated weekly or monthly dates. Always call the front desk before travelling.
            </p>
          </div>
        </div>

        {/* Right Column: Upcoming Confirmed Consultation Dates */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                Next 14 Days
              </span>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Upcoming Confirmed Dates
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Timezone: IST (Asia/Kolkata)
            </span>
          </div>

          {upcomingConsultations.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-600 font-medium">
                No active consultation slots scheduled in the next 14 days.
              </p>
              <p className="text-xs text-slate-400">
                Call +91 70086 10481 for upcoming specialist date confirmations.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingConsultations.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {formatDateDisplay(item.date)}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        ({item.day_name})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>
                        {item.status_label === 'Cancelled'
                          ? 'Consultation Cancelled'
                          : formatTimeRange(item.start_time, item.end_time)}
                      </span>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-1">
                        {item.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <StatusBadge status={item.status_label} />
                    <span className="text-[11px] text-slate-400">
                      {item.is_exception ? 'Date-specific notice' : 'Recurring slot'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Last Updated & Policy Notice */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              Last verified by clinic administration: {new Date(doctor.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span className="text-teal-700 font-medium">Status: Published & Verified</span>
          </div>
        </div>
      </div>

      {/* Mandatory Informational Disclaimer */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800 text-xs space-y-2">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Informational Consultation Schedule Notice</span>
        </h3>
        <p className="leading-relaxed">
          {CLINIC_DISCLAIMER.bookingNotice}
        </p>
        <p className="text-slate-400">
          To confirm doctor attendance or inquire about patient token distribution, contact Satyabhama Health Care directly by telephone at{' '}
          <a href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`} className="text-teal-400 font-semibold underline">
            {CLINIC_CONFIG.phone}
          </a>.
        </p>
      </div>
    </div>
  );
}
