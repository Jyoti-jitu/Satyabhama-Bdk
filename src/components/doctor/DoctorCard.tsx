import React from 'react';
import Link from 'next/link';
import { Doctor, CalculatedConsultation } from '@/types';
import { Phone, Calendar, Clock, Award, ShieldCheck, ChevronRight, AlertCircle } from 'lucide-react';
import { formatDateDisplay, formatTimeRange } from '@/lib/schedule-utils';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { DOCTOR_TIMINGS } from '@/lib/data/doctor-timings';

interface DoctorCardProps {
  doctor: Doctor;
  nextConsultation?: CalculatedConsultation | null;
}

export function DoctorCard({ doctor, nextConsultation }: DoctorCardProps) {
  // Centralized doctor timing details from prompt specifications
  const timingInfo = DOCTOR_TIMINGS.find(
    (t) => t.id === doctor.id || t.slug === doctor.slug
  );

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-teal-300/80 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* 1. Doctor Information Area - Clean No-Photo Presentation */}
      <div className="p-3.5 sm:p-6 space-y-2.5 sm:space-y-4">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600" />
            <span>Verified Doctor</span>
          </span>

          {timingInfo?.requiresPriorContact ? (
            <span className="text-[9px] sm:text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
              Prior Contact
            </span>
          ) : doctor.consultant_type ? (
            <span className="capitalize text-[10px] sm:text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-slate-200">
              {doctor.consultant_type === 'visiting' ? 'Visiting Specialist' : 'Resident Doctor'}
            </span>
          ) : null}
        </div>

        {/* Doctor Name & Specialty */}
        <div className="space-y-1 sm:space-y-1.5">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="block text-lg sm:text-xl font-extrabold text-slate-900 hover:text-teal-700 transition-colors tracking-tight leading-snug"
          >
            {doctor.full_name}
          </Link>

          {doctor.specialty_summary && (
            <p className="text-xs sm:text-sm font-semibold text-teal-800 leading-snug">
              {doctor.specialty_summary}
            </p>
          )}

          {doctor.qualifications && (
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
              {doctor.qualifications}
            </p>
          )}

          {doctor.designation && (
            <div className="flex items-center gap-1.5 pt-0.5 sm:pt-1 text-[11px] sm:text-xs text-slate-500">
              <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="line-clamp-1">{doctor.designation}</span>
            </div>
          )}
        </div>

        {/* 2. Verified Consultation Timings Box */}
        <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3.5 border border-slate-200/80 space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Consultation Schedule
          </span>

          {/* Prominent display label */}
          {timingInfo?.displayLabel ? (
            <div className="text-xs font-bold text-slate-900 leading-snug">
              {timingInfo.displayLabel}
            </div>
          ) : nextConsultation ? (
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Calendar className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>
                  {formatDateDisplay(nextConsultation.date)} ({nextConsultation.day_name})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{formatTimeRange(nextConsultation.start_time, nextConsultation.end_time)}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>Contact the Clinic for Timings</span>
            </div>
          )}

          {/* Structured Timing Detail */}
          {timingInfo && (
            <div className="space-y-1 pt-1 sm:pt-1.5 border-t border-slate-200/60 text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span className="font-medium">{timingInfo.availability}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                {timingInfo.timingUnspecified ? (
                  <span className="font-semibold text-teal-700">
                    Contact Clinic for Timings
                  </span>
                ) : (
                  <span>{timingInfo.timing}</span>
                )}
              </div>
            </div>
          )}

          {/* Important Instruction Notice */}
          {timingInfo?.importantInstruction && (
            <div className="mt-1.5 sm:mt-2 p-2 rounded-lg bg-amber-50/95 border border-amber-200 text-[10px] sm:text-[11px] text-amber-900 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="font-medium leading-tight">
                {timingInfo.importantInstruction}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="p-3.5 sm:p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 pt-2.5 sm:pt-3 border-t border-slate-100">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[38px] sm:min-h-[42px]"
          >
            <span>View Profile</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500" />
          </Link>

          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl shadow-xs transition-colors min-h-[38px] sm:min-h-[42px]"
            title="Call clinic reception to confirm doctor schedule"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-300" />
            <span>Call Clinic</span>
          </a>
        </div>
      </div>
    </div>
  );
}
