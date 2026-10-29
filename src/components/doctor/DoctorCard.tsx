import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Doctor, CalculatedConsultation } from '@/types';
import { Phone, Calendar, Clock, Award, ShieldCheck, ChevronRight, AlertCircle, Stethoscope } from 'lucide-react';
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
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-300/80 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* 1. Photograph Area with consistent dimensions */}
        <Link
          href={`/doctors/${doctor.slug}`}
          className="relative w-full aspect-square bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden block"
          title={`View profile for ${doctor.full_name}`}
        >
          {doctor.profile_image_url ? (
            <Image
              src={doctor.profile_image_url}
              alt={`${doctor.full_name} — doctor at Satyabhama Health Care`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
              priority={doctor.id === 'doc-1'}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 text-sky-850 p-6 select-none border-b border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-white border border-sky-200/80 shadow-sm flex items-center justify-center text-sky-700 mb-2 group-hover:scale-105 transition-transform">
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

          {/* Soft Blue Badge overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-sky-850 border border-sky-200 shadow-sm backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Verified Specialist</span>
            </span>
          </div>

          {timingInfo?.requiresPriorContact ? (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-bold text-amber-950 bg-amber-100/95 border border-amber-300 px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
                Prior Contact
              </span>
            </div>
          ) : doctor.consultant_type ? (
            <div className="absolute top-3 right-3">
              <span className="capitalize text-[11px] font-medium text-slate-700 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-slate-200 backdrop-blur-sm">
                {doctor.consultant_type}
              </span>
            </div>
          ) : null}
        </Link>

        {/* 2. Doctor Information Area - Display name prominently below photograph */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            {/* Prominent Doctor Name */}
            <Link
              href={`/doctors/${doctor.slug}`}
              className="block text-xl font-bold text-slate-900 hover:text-sky-700 transition-colors tracking-tight"
            >
              {doctor.full_name}
            </Link>

            {/* Specialization with soft blue accent */}
            {doctor.specialty_summary && (
              <p className="text-sm font-semibold text-sky-800 pt-0.5">
                {doctor.specialty_summary}
              </p>
            )}

            {/* Verified Qualifications */}
            {doctor.qualifications && (
              <p className="text-xs text-slate-600">
                {doctor.qualifications}
              </p>
            )}

            {/* Designation & Clinical Experience */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
              {doctor.designation && (
                <span className="line-clamp-1 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{doctor.designation}</span>
                </span>
              )}
              {doctor.experience_years && (
                <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex-shrink-0">
                  {doctor.experience_years}+ Yrs Exp
                </span>
              )}
            </div>
          </div>

          {/* 3. Verified Consultation Timings Box */}
          <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Consultation Schedule
            </span>

            {/* Prominent exact display label */}
            {timingInfo?.displayLabel ? (
              <div className="text-xs font-bold text-slate-900 leading-snug">
                {timingInfo.displayLabel}
              </div>
            ) : nextConsultation ? (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <Calendar className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span>
                    {formatDateDisplay(nextConsultation.date)} ({nextConsultation.day_name})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
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
              <div className="space-y-1 pt-1 border-t border-slate-200/60 text-xs">
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
            )}

            {/* Highlighted note: Please Contact the Clinic Before Visiting */}
            {timingInfo?.importantInstruction && (
              <div className="mt-2 p-2 rounded-lg bg-amber-50/95 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold leading-tight">
                  {timingInfo.importantInstruction}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Action Buttons (Profile & Direct Telephone Call - NO BOOKING SYSTEM) */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <span>View Profile</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-sky-700 rounded-xl shadow-sm transition-colors"
            title="Call clinic reception to confirm doctor schedule"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Call Clinic</span>
          </a>
        </div>
      </div>
    </div>
  );
}

