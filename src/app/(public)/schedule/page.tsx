import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER } from '@/lib/clinic-config';
import { calculateUpcomingConsultations } from '@/lib/schedule-utils';
import { ScheduleTable } from '@/components/schedule/ScheduleTable';
import { DoctorTimingsSection } from '@/components/schedule/DoctorTimingsSection';
import { DoctorConsultationTerms } from '@/components/schedule/DoctorConsultationTerms';
import {
  Calendar,
  Clock,
  Phone,
  AlertTriangle,
  ShieldCheck,
  Info,
  MapPin,
} from 'lucide-react';

export const metadata = {
  title: 'Doctor Consultation Schedule & Timings | Satyabhama Health Care, Bhadrak',
  description:
    'View up-to-date doctor consultation timings, weekly schedules, special clinics, and visiting super-specialist dates at Satyabhama Health Care in Bhadrak, Odisha.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/schedule',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SchedulePage() {
  const doctors = dataStore.getDoctors(false);
  const schedules = dataStore.getSchedules(undefined, false);
  const exceptions = dataStore.getExceptions(undefined, false);
  const specialties = dataStore.getSpecialties();

  // Calculate upcoming consultations for next 21 days
  const upcomingConsultations = calculateUpcomingConsultations(
    doctors,
    schedules,
    exceptions,
    specialties,
    21
  );

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-[11px] sm:text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>Live Consultation Timetable • Bhadrak, Odisha</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Doctor Consultation Schedules
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Check verified consultation days, morning and evening sessions, and upcoming visiting specialist clinic dates. Timings are displayed in Indian Standard Time (IST).
          </p>

          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
              <span>Timezone: Asia/Kolkata (IST)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
              <span>Admin Verified Schedules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Booking Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 text-amber-950 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-sm">
        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 sm:space-y-1.5 flex-1 text-xs sm:text-sm">
          <h2 className="font-bold text-amber-900 text-xs sm:text-sm">
            Informational Schedule Only — Direct Clinic Phone Confirmation Required
          </h2>
          <p className="leading-relaxed text-amber-900">
            {CLINIC_DISCLAIMER.bookingNotice}
          </p>
          <p className="font-semibold pt-0.5 sm:pt-1">
            Clinic Telephone Helpline:{' '}
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="text-amber-900 underline font-bold"
            >
              {CLINIC_CONFIG.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Official Doctor Directory Signboard Visual Verification */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-3.5 sm:p-6 lg:p-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          <div className="lg:col-span-5 space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] sm:text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span>Official On-Site Signboard</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Verified Clinic OPD Directory
            </h2>
            <p className="font-odia text-xs font-bold text-rose-800">
              ସତ୍ୟଭାମା ହେଲ୍‌ଥ କେୟାର - ସ୍ୱୀକୃତ ଡାକ୍ତର ସୂଚୀ ଫଳକ
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Below is the official consultation directory board physically mounted at the OPD entrance of Satyabhama Health Care in Bhadrak. The doctor profiles and timetables on this website are synchronized directly with this registered clinic board.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600" />
                <span>7008610481 / 7681862111</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600" />
                <span>Stadium Road, Bhadrak</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm sm:shadow-md group">
              <Image
                src="/images/clinic/satyabhama-official-doctor-board.jpg"
                alt="Official Doctor Roster Board mounted at Satyabhama Health Care Bhadrak"
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex flex-wrap items-center justify-between gap-1 text-white text-xs">
                <span className="font-bold tracking-wide drop-shadow-sm text-[10px] sm:text-xs">
                  Physical Board at Clinic Consultation Entrance
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-semibold border border-white/20">
                  Verified In-Person
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Availability & Consultation Timings Section (10 Doctors in Symmetrical Order) */}
      <DoctorTimingsSection id="doctor-timings" showTermsLink={true} />

      {/* Terms & Conditions for Doctor Consultation (8 Numbered Clauses) */}
      <DoctorConsultationTerms id="consultation-terms" />

      {/* Schedule Table and Interactive Filters */}
      <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-slate-200/80">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Consultation Sessions (Next 21 Days)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
            Use the filters below to search by doctor, medical discipline, or schedule status.
          </p>
        </div>

        <ScheduleTable
          consultations={upcomingConsultations}
          showFilters={true}
        />
      </div>

      {/* Bottom Guidance on How to Prepare */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <span>Regular Schedules vs. Special Clinics</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Resident and regular doctors consult on recurring weekly days. Visiting specialists in disciplines such as Psychiatry, Neurology, Dermatology, and ENT consult on designated monthly dates (e.g. 1st Saturday, 4th Tuesday, 1st & 2nd Tuesday, 2nd & 4th Saturday). These sessions are marked as <strong>Special Clinic</strong>.
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Visiting Satyabhama Health Care</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Located at Nehru Stadium Road, near Bonth Chhak, Bhadrak. Patient consultation registration tokens are distributed at the reception desk in order of arrival.
          </p>
        </div>
      </div>
    </div>
  );
}
