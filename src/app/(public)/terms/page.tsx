import React from 'react';
import Link from 'next/link';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER } from '@/lib/clinic-config';
import { FileText, ArrowLeft, AlertCircle } from 'lucide-react';
import { DoctorConsultationTerms } from '@/components/schedule/DoctorConsultationTerms';

export const metadata = {
  title: 'Terms & Conditions for Doctor Consultation | Satyabhama Health Care, Bhadrak',
  description:
    'Terms and conditions for doctor consultation and website usage policies at Satyabhama Health Care in Bhadrak, Odisha.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="py-6 sm:py-12 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-sky-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Primary Section: Terms & Conditions for Doctor Consultation */}
      <DoctorConsultationTerms id="consultation-terms" />

      {/* Secondary General Website Legal Terms */}
      <div className="bg-white p-4 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-6 sm:space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto">
        <div className="border-b border-slate-100 pb-4 sm:pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] sm:text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Website Terms of Use</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Effective Date: October 2026 • Satyabhama Health Care, Bhadrak
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Crucial Schedule Notice:</p>
            <p>{CLINIC_DISCLAIMER.bookingNotice}</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Informational Purpose Only</h2>
          <p>
            The content published on this website—including doctor biographies, specialty summaries, consultation timings, and health articles—is provided strictly for public informational convenience and schedule discovery.
          </p>
          <p>
            Accessing this website, viewing doctor consultation hours, or sending a general contact enquiry does <em>not</em> establish a doctor-patient relationship, nor does it guarantee appointment slot availability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Doctor Schedules & Emergency Duty Revisions</h2>
          <p>
            While clinic administrators strive to keep schedules updated in real time, consulting medical specialists are frequently summoned to hospital emergency theatres, trauma cases, or academic conferences.
          </p>
          <p>
            Patients must phone the clinic reception at <strong>{CLINIC_CONFIG.phone}</strong> to confirm the specialist&apos;s current duty arrival before travelling. Satyabhama Health Care is not liable for travel inconvenience resulting from unscheduled medical emergencies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Absence of Medical Advice</h2>
          <p>
            {CLINIC_DISCLAIMER.medicalDisclaimer} For medical emergencies, patients must immediately proceed to the nearest emergency casualty unit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Intellectual Property</h2>
          <p>
            All clinic brand marks, emblem logos, photographs, and written content are the property of Satyabhama Health Care and may not be reproduced without prior written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Governing Law & Jurisdiction</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the competent courts in Bhadrak, Odisha.
          </p>
        </section>
      </div>
    </div>
  );
}
