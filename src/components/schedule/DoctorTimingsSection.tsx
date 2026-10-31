import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DOCTOR_TIMINGS, DoctorTimingProfile } from '@/lib/data/doctor-timings';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import {
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  AlertCircle,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';

interface DoctorTimingsSectionProps {
  id?: string;
  showTermsLink?: boolean;
}

export function DoctorTimingsSection({
  id = 'doctor-timings',
  showTermsLink = true,
}: DoctorTimingsSectionProps) {
  return (
    <section id={id} className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-10">
      {/* 1. Header with Title and Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 border-b border-slate-200/80 pb-4 sm:pb-6">
        <div className="space-y-1 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-850 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600" />
            <span>Doctor Availability &amp; Consultation Timings</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Doctors &amp; Consultation Timings
          </h2>
          <p className="text-slate-600 text-xs sm:text-base max-w-2xl leading-relaxed">
            View doctor availability and consultation schedules before visiting Satyabhama Health Care.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors min-h-[38px] sm:min-h-[42px] flex-1 sm:flex-initial"
            title="Call reception to confirm doctor arrival"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Contact Clinic: {CLINIC_CONFIG.phone}</span>
          </a>

          {showTermsLink && (
            <Link
              href="#consultation-terms"
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-850 border border-sky-200 text-xs font-semibold transition-colors min-h-[38px] sm:min-h-[42px]"
            >
              <span>Consultation Terms</span>
              <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
            </Link>
          )}
        </div>
      </div>

      {/* 2. Notice Banner for Clinic Contact Instructions */}
      <div className="bg-sky-50/90 border border-sky-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 text-slate-800 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 shadow-xs">
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 flex-shrink-0 mt-0.5">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-sky-700" />
        </div>
        <div className="space-y-1 flex-1 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-slate-900">
              Important Visiting Instructions for Patients:
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Direct Phone Confirmation
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px] sm:text-sm">
            Patients visiting <strong>Dr. Priya Ranjan Barik</strong> or visiting specialists on designated dates are advised to contact clinic reception at{' '}
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="text-sky-800 font-bold underline hover:text-sky-950"
            >
              {CLINIC_CONFIG.phone}
            </a>
            {CLINIC_CONFIG.secondary_phone && (
              <>
                {' / '}
                <a
                  href={`tel:${CLINIC_CONFIG.secondary_phone.replace(/\s+/g, '')}`}
                  className="text-sky-800 font-bold underline hover:text-sky-950"
                >
                  {CLINIC_CONFIG.secondary_phone}
                </a>
              </>
            )}{' '}
            before travelling to confirm exact duty arrival.
          </p>
        </div>
      </div>

      {/* 3. Responsive Doctor Schedule Cards in Symmetrical Order (Wide Multi-Column Grid - No Photo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5 sm:gap-6 xl:gap-7">
        {DOCTOR_TIMINGS.map((doctor: DoctorTimingProfile, index: number) => {
          return (
            <div
              key={doctor.id}
              className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-sky-300/80 transition-all duration-300 overflow-hidden flex flex-col h-full justify-between"
            >
              {/* Doctor Details (Clean No-Photo Presentation) */}
              <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between gap-2.5 sm:gap-4">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-900 text-white">
                      #{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-850 border border-sky-200">
                      <ShieldCheck className="w-3 h-3 text-sky-600" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {doctor.requiresPriorContact && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                      Prior Contact
                    </span>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-1.5">
                  {/* Doctor Name Prominently Displayed */}
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="block text-base sm:text-xl font-extrabold text-slate-900 hover:text-sky-700 transition-colors tracking-tight leading-snug"
                    title={doctor.name}
                  >
                    {doctor.name}
                  </Link>

                  {/* Medical Specialty */}
                  <p className="text-xs sm:text-sm font-semibold text-sky-800 leading-snug">
                    {doctor.specialty}
                  </p>

                  {/* Qualifications */}
                  <p className="text-[10px] sm:text-xs text-slate-600 font-medium pt-0.5">
                    {doctor.qualifications}
                  </p>

                  {/* Designation & Experience */}
                  <div className="flex items-center justify-between gap-1.5 pt-0.5 sm:pt-1 text-[10px] sm:text-xs text-slate-500">
                    {doctor.designation ? (
                      <span className="line-clamp-1 flex items-center gap-1 flex-1 min-w-0">
                        <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{doctor.designation}</span>
                      </span>
                    ) : (
                      <span />
                    )}
                    {doctor.experience_years && (
                      <span className="text-[9px] sm:text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex-shrink-0 whitespace-nowrap">
                        {doctor.experience_years}+ Yrs
                      </span>
                    )}
                  </div>
                </div>

                {/* Consultation Schedule Box */}
                <div className="bg-slate-50/90 rounded-xl p-2 sm:p-3.5 border border-slate-200/80 flex flex-col justify-between flex-1 gap-1.5 sm:gap-2.5">
                  <div className="space-y-1 sm:space-y-2">
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Consultation Schedule
                    </span>

                    {/* Display Label (Primary Requested Text) */}
                    <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-snug min-h-[1.5rem] sm:min-h-[2.25rem] flex items-center line-clamp-2">
                      {doctor.displayLabel}
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 pt-1 sm:pt-2 border-t border-slate-200/60 text-[10px] sm:text-xs">
                      {/* Availability Days */}
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600 flex-shrink-0" />
                        <span className="font-medium truncate">{doctor.availability}</span>
                      </div>

                      {/* Timings */}
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 flex-shrink-0" />
                        {doctor.timingUnspecified ? (
                          <span className="font-semibold text-sky-700">
                            Contact the Clinic for Timings
                          </span>
                        ) : (
                          <span className="font-medium truncate">{doctor.timing}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Symmetrical Bottom Advisory / Attendance Note */}
                  <div className="pt-1 sm:pt-2 mt-auto">
                    {doctor.importantInstruction ? (
                      <div className="p-1.5 sm:p-2 rounded-lg bg-amber-50/90 border border-amber-200 text-[10px] sm:text-[11px] text-amber-900 flex items-start gap-1.5 min-h-[2rem] sm:min-h-[2.5rem]">
                        <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold leading-tight line-clamp-2">
                          {doctor.importantInstruction}
                        </span>
                      </div>
                    ) : (
                      <div className="p-1.5 sm:p-2 rounded-lg bg-sky-50/70 border border-sky-200/80 text-[10px] sm:text-[11px] text-sky-900 flex items-center gap-1.5 min-h-[2rem] sm:min-h-[2.5rem]">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600 flex-shrink-0" />
                        <span className="font-semibold leading-tight line-clamp-2">
                          Regular OPD schedule — tokens issued at reception
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions: Profile + Call Clinic */}
              <div className="p-3 sm:p-5 pt-0 mt-auto">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-slate-100">
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="flex items-center justify-center gap-1 py-1.5 sm:py-2.5 px-2 text-[11px] sm:text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[34px] sm:min-h-[44px]"
                    aria-label={`View doctor profile and consultation schedule for ${doctor.name}`}
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </Link>

                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-1 py-1.5 sm:py-2.5 px-2 text-[11px] sm:text-xs font-semibold text-white bg-slate-900 hover:bg-sky-700 rounded-xl shadow-sm transition-colors min-h-[34px] sm:min-h-[44px]"
                    title={`Call clinic to verify schedule for ${doctor.name}`}
                  >
                    <Phone className="w-3 h-3 text-sky-400" />
                    <span>Call Clinic</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
