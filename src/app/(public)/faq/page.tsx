import React from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { HelpCircle, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | Satyabhama Health Care, Bhadrak',
  description:
    'Answers to common questions regarding doctor consultation timings, visiting specialist clinics, walk-in token procedures, and telephone confirmation at Satyabhama Health Care, Bhadrak.',
};

export default function FAQPage() {
  const faqs = dataStore.getFAQs();

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl text-center">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Patient Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Find answers to common questions about doctor consultation timings, visiting specialists, and clinic visits in Bhadrak.
          </p>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-teal-200">
                {idx + 1}
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {faq.question}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 pl-9 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold">Still have a question?</h3>
          <p className="text-xs text-slate-300 max-w-md leading-relaxed">
            Our reception desk is available daily from 8:00 AM to 9:00 PM to help you verify schedules and doctor timings.
          </p>
        </div>

        <a
          href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
          className="px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-md flex-shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>Call: {CLINIC_CONFIG.phone}</span>
        </a>
      </div>
    </div>
  );
}
