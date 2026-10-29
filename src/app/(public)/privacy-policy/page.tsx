import React from 'react';
import Link from 'next/link';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Satyabhama Health Care, Bhadrak',
  description:
    'Privacy Policy and data protection standards for the informational website of Satyabhama Health Care, Bhadrak, Odisha.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: October 2026 • Satyabhama Health Care, Bhadrak, Odisha
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Overview</h2>
          <p>
            Satyabhama Health Care (&quot;the Clinic&quot;) values your personal privacy. This website is an informational platform provided for patients and residents of Bhadrak, Odisha to discover verified medical doctors, clinical specialties, and consultation schedules.
          </p>
          <p>
            Because we do not operate an online appointment booking or electronic medical record system on this website, we do not solicit, process, or store sensitive electronic health records (EHR) through this portal.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
          <p>
            When you interact with our website, we may collect the following limited categories of information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>
              <strong>General Enquiries:</strong> If you submit a query via our Contact Us form, we receive your name, telephone number, optional email, and message for the sole purpose of responding to your schedule enquiry.
            </li>
            <li>
              <strong>Log & Technical Data:</strong> Standard server logs, IP addresses, browser types, and visit timestamps to monitor website performance and security.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Non-Collection of Medical Records</h2>
          <p>
            Patients must <em>not</em> submit diagnostic reports, sensitive medical histories, or prescription details through our public contact form. Consultation documentation is reviewed only in person within the clinic consultation chamber.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Compliance with Indian Data Regulations</h2>
          <p>
            We process user information in conformity with applicable Indian data protection principles, including the Digital Personal Data Protection Act (DPDPA). Information submitted to our reception desk is never sold, leased, or distributed to third-party commercial marketing entities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          <p>
            For any queries concerning this Privacy Policy, please contact:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <p className="font-bold text-slate-900">{CLINIC_CONFIG.clinic_name}</p>
            <p>{CLINIC_CONFIG.address}</p>
            <p>Telephone: {CLINIC_CONFIG.phone}</p>
            <p>Email: {CLINIC_CONFIG.email}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
