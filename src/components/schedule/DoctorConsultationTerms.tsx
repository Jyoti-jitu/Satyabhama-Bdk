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
    <section id={id} className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 space-y-5 sm:space-y-8">
      {/* 1. Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-800/90 border border-slate-700 text-sky-300 text-[10px] sm:text-xs font-semibold">
            <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
            <span>Official Patient Advisory • Bhadrak, Odisha</span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Terms &amp; Conditions for Doctor Consultation
          </h2>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Please read these terms and consultation policies carefully before planning your visit to Satyabhama Health Care.
          </p>
        </div>
      </div>

      {/* 2. Grid of 8 Terms - 2x2 on Mobile, Multi-Column on Larger Screens */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {CONSULTATION_TERMS.map((term: ConsultationTerm) => (
          <div
            key={term.number}
            className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col sm:flex-row items-start gap-1.5 sm:gap-3.5"
          >
            {/* Number Pill */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-xl bg-sky-50 border border-sky-200 text-sky-850 font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-2xs">
              {term.number}
            </div>

            {/* Term Content */}
            <div className="space-y-1 sm:space-y-1.5 flex-1">
              <h3 className="font-bold text-slate-900 text-xs sm:text-base leading-snug">
                {term.title}
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-sm leading-snug sm:leading-relaxed">
                {term.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Clinic Contact & Confirmation Banner */}
      <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl border border-slate-800">
        <div className="space-y-1 sm:space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-800 text-sky-300 text-[10px] sm:text-xs font-semibold">
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
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

          {CLINIC_CONFIG.whatsapp_url && (
            <a
              href={CLINIC_CONFIG.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              title="Chat on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>
          )}

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
