import React from 'react';
import Link from 'next/link';
import { CONSULTATION_TERMS, ConsultationTerm } from '@/lib/data/doctor-timings';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import {
  FileText,
  Phone,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface DoctorConsultationTermsProps {
  id?: string;
  showBackToHome?: boolean;
}

export function DoctorConsultationTerms({
  id = 'consultation-terms',
  showBackToHome = false,
}: DoctorConsultationTermsProps) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* 1. Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-sky-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Official Patient Advisory • Bhadrak, Odisha</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Terms & Conditions for Doctor Consultation
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Please read these terms and consultation policies carefully before planning your visit to Satyabhama Health Care.
          </p>
        </div>
      </div>

      {/* 2. Grid of 8 Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CONSULTATION_TERMS.map((term: ConsultationTerm) => (
          <div
            key={term.number}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex items-start gap-4"
          >
            {/* Number Pill */}
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 text-sky-850 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
              {term.number}
            </div>

            {/* Term Content */}
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-slate-900 text-base">
                {term.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {term.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Clinic Contact & Confirmation Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-sky-300 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Clinic Telephone Assistance</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Need to Confirm a Doctor’s Schedule Before Travelling?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Our reception team is available daily at <strong>{CLINIC_CONFIG.phone}</strong> to confirm real-time doctor arrival and consultation token distribution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            title="Call clinic reception now"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Call Clinic Now</span>
          </a>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
          >
            <span>Visit Contact Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
