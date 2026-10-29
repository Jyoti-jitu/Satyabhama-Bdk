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
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header with Title and Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-850 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Doctor Availability & Consultation Timings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Doctors & Consultation Timings
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            View doctor availability and consultation schedules before visiting Satyabhama Health Care.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors"
            title="Call reception to confirm doctor arrival"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Contact Clinic: {CLINIC_CONFIG.phone}</span>
          </a>

          {showTermsLink && (
            <Link
              href="#consultation-terms"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-850 border border-sky-200 text-xs font-semibold transition-colors"
            >
              <span>Consultation Terms</span>
              <ChevronRight className="w-3.5 h-3.5 text-sky-600" />
            </Link>
          )}
        </div>
      </div>

      {/* 2. Notice Banner for Clinic Contact Instructions */}
      <div className="bg-sky-50/90 border border-sky-200 rounded-2xl p-4 sm:p-5 text-slate-800 flex flex-col sm:flex-row items-start gap-3.5 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5 text-sky-700" />
        </div>
        <div className="space-y-1 flex-1 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-900">
              Important Visiting Instructions for Patients:
            </span>
            <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Direct Phone Confirmation
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Patients visiting <strong>Dr. Priya Ranjan Barik</strong> or <strong>Dr. Sabyasachi Pati</strong>, as well as doctors consulting on specific monthly dates, are advised to contact clinic reception at{' '}
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="text-sky-800 font-bold underline hover:text-sky-950"
            >
              {CLINIC_CONFIG.phone}
            </a>{' '}
            before travelling to confirm exact duty arrival.
          </p>
        </div>
      </div>

      {/* 3. Responsive Doctor Schedule Cards in Exact Serial Order (1 through 8) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DOCTOR_TIMINGS.map((doctor: DoctorTimingProfile, index: number) => {
          return (
            <div
              key={doctor.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-300/80 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Section: Photo and Badges */}
              <div>
                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="relative w-full aspect-square bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden block"
                  title={`View profile for ${doctor.name}`}
                >
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name} — doctor at Satyabhama Health Care`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 text-sky-850 p-6 select-none border-b border-slate-200">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-sky-200/80 shadow-sm flex items-center justify-center text-sky-700 mb-2 group-hover:scale-105 transition-transform">
                        <Stethoscope className="w-8 h-8 text-sky-600" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 tracking-tight text-center line-clamp-1">
                        {doctor.name}
                      </span>
                      <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wider mt-0.5 text-center line-clamp-1">
                        {doctor.specialty}
                      </span>
                    </div>
                  )}

                  {/* Badge: Doctor Serial Number + Verified */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-white shadow-sm backdrop-blur-sm">
                      #{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/95 text-sky-850 border border-sky-200 shadow-sm backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3 text-sky-600" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Prior Contact Required Tag */}
                  {doctor.requiresPriorContact && (
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="block text-center text-[10px] font-bold text-amber-950 bg-amber-100/95 border border-amber-300/90 px-2 py-1 rounded-lg shadow-sm backdrop-blur-sm">
                        Please Contact Clinic Before Visiting
                      </span>
                    </div>
                  )}
                </Link>

                {/* Doctor Details Below Photo */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    {/* Doctor Name Prominently Displayed */}
                    <Link
                      href={`/doctors/${doctor.slug}`}
                      className="block text-lg font-bold text-slate-900 hover:text-sky-700 transition-colors tracking-tight leading-snug"
                    >
                      {doctor.name}
                    </Link>

                    {/* Medical Specialty */}
                    <p className="text-xs font-semibold text-sky-800">
                      {doctor.specialty}
                    </p>

                    {/* Qualifications */}
                    <p className="text-[11px] text-slate-600">
                      {doctor.qualifications}
                    </p>

                    {/* Designation & Experience */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                      {doctor.designation && (
                        <span className="line-clamp-1 flex items-center gap-1">
                          <Award className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span>{doctor.designation}</span>
                        </span>
                      )}
                      {doctor.experience_years && (
                        <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex-shrink-0">
                          {doctor.experience_years}+ Yrs
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Consultation Schedule Box */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Consultation Schedule
                    </span>

                    {/* Display Label (Primary Requested Text) */}
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      {doctor.displayLabel}
                    </div>

                    <div className="space-y-1 pt-1 border-t border-slate-200/60 text-xs">
                      {/* Availability Days */}
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                        <span className="font-medium">{doctor.availability}</span>
                      </div>

                      {/* Timings */}
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        {doctor.timingUnspecified ? (
                          <span className="font-semibold text-sky-700">
                            Contact the Clinic for Timings
                          </span>
                        ) : (
                          <span>{doctor.timing}</span>
                        )}
                      </div>
                    </div>

                    {/* Highlighted Note for Specific Doctors */}
                    {doctor.importantInstruction && (
                      <div className="mt-2 p-2 rounded-lg bg-amber-50/90 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold leading-tight">
                          {doctor.importantInstruction}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions: Profile + Call Clinic */}
              <div className="p-5 pt-0">
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="flex items-center justify-center gap-1 py-2 px-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <span>Profile</span>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </Link>

                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-sky-700 rounded-xl shadow-sm transition-colors"
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
