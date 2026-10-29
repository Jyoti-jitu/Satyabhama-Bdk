import React from 'react';
import Link from 'next/link';
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
};

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
    <div className="py-12 sm:py-16 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>Live Consultation Timetable • Bhadrak, Odisha</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Doctor Consultation Schedules
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Check verified consultation days, morning and evening sessions, and upcoming visiting specialist clinic dates. Timings are displayed in Indian Standard Time (IST).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Timezone: Asia/Kolkata (IST)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Admin Verified Schedules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Booking Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 sm:p-6 text-amber-950 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
        <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5 flex-1 text-xs sm:text-sm">
          <h2 className="font-bold text-amber-900 text-sm">
            Informational Schedule Only — Direct Clinic Phone Confirmation Required
          </h2>
          <p className="leading-relaxed text-amber-900">
            {CLINIC_DISCLAIMER.bookingNotice}
          </p>
          <p className="font-semibold pt-1">
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

      {/* Doctor Availability & Consultation Timings Section (8 Doctors in Exact Order) */}
      <DoctorTimingsSection id="doctor-timings" showTermsLink={true} />

      {/* Terms & Conditions for Doctor Consultation (8 Numbered Clauses) */}
      <DoctorConsultationTerms id="consultation-terms" />

      {/* Schedule Table and Interactive Filters */}
      <div className="space-y-6 pt-6 border-t border-slate-200/80">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Consultation Sessions (Next 21 Days)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Use the filters below to search by doctor, medical discipline, or schedule status.
          </p>
        </div>

        <ScheduleTable
          consultations={upcomingConsultations}
          showFilters={true}
        />
      </div>

      {/* Bottom Guidance on How to Prepare */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <span>Regular Schedules vs. Special Clinics</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Resident doctors consult on recurring weekly days (Monday through Saturday). Visiting super-specialists in disciplines like Neurosurgery and Gastroenterology consult on specific Sundays or announced dates. These are tagged as <strong>Special Clinic</strong>.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
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
