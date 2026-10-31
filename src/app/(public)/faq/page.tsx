import React from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { HelpCircle, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | Satyabhama Health Care, Bhadrak',
  description:
    'Answers to common questions regarding doctor consultation timings, visiting specialist clinics, walk-in token procedures, and telephone confirmation at Satyabhama Health Care, Bhadrak.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/faq',
  },
};

export default function FAQPage() {
  const faqs = dataStore.getFAQs();

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl text-center">
        <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-[11px] sm:text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Patient Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Find answers to common questions about doctor consultation timings, visiting specialists, and clinic visits in Bhadrak.
          </p>
        </div>
      </div>

      {/* FAQs Accordion Grid - Collapsed by Default with Dropdown Arrows */}
      <FaqAccordion items={faqs} columns={2} showNumber={true} defaultOpenIndex={null} />

      {/* Still Have Questions Box */}
      <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
        <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold">Still have a question?</h3>
          <p className="text-xs text-slate-300 max-w-md leading-relaxed">
            Our reception desk is available daily from 8:00 AM to 9:00 PM to help you verify schedules and doctor timings.
          </p>
        </div>

        <a
          href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs min-h-[42px] sm:min-h-[44px] transition-colors shadow-md flex-shrink-0 text-center"
        >
          <Phone className="w-4 h-4" />
          <span>Call: {CLINIC_CONFIG.phone}</span>
        </a>
      </div>
    </div>
  );
}
