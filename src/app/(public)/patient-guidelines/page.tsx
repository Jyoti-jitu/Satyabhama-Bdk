import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import {
  FileText,
  Phone,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  CreditCard,
  Building2,
  HeartPulse,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patient Guidelines & Consultation Advisory | Satyabhama Health Care, Bhadrak',
  description:
    'Essential patient guidelines, token allocation procedures, arrival timings, and consultation protocols for patients visiting Satyabhama Health Care in Bhadrak, Odisha.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/patient-guidelines',
  },
};

export default function PatientGuidelinesPage() {
  return (
    <div className="py-6 sm:py-12 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-10">
      {/* 1. Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-sky-300 text-[11px] sm:text-xs font-semibold">
            <ClipboardList className="w-3.5 h-3.5 text-sky-400" />
            <span>Official Patient Information • Bhadrak, Odisha</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Patient Guidelines & Visit Advisory
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            To ensure an organized, efficient, and compassionate consultation experience for all patients,
            please review our outpatient guidelines before planning your visit to Satyabhama Health Care.
          </p>
        </div>
      </div>

      {/* 2. Guidelines Grid - Responsive 4-Column on Wide Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Step 1: Pre-Visit Verification */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-sm space-y-3 sm:space-y-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sky-50 border border-sky-200 text-sky-850 flex items-center justify-center">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            1. Confirm Doctor Schedule Before Traveling
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Several of our consulting specialists—including visiting professors from SCB Medical College
            (Cuttack) and SUM Hospital (Bhubaneswar)—attend on designated weekdays or monthly dates.
            Always call our clinic reception at{' '}
            <strong className="text-slate-900">+91 70086 10481</strong> or{' '}
            <strong className="text-slate-900">+91 76818 62111</strong> in the morning before starting your journey
            to confirm the doctor’s session.
          </p>
        </div>

        {/* Step 2: Essential Documents & Records */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-sm space-y-3 sm:space-y-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            2. Medical Records to Bring
          </h2>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 sm:space-y-2 list-disc list-inside">
            <li>Previous medical prescriptions, discharge summaries, and referral notes.</li>
            <li>Recent diagnostic reports (blood tests, HbA1c, liver profiles, pathology reports).</li>
            <li>Radiological films or scans (X-rays, MRI, CT scans, ultrasounds) in their original covers.</li>
            <li>Current list of daily medications, including insulin doses or cardiac tablets.</li>
          </ul>
        </div>

        {/* Step 3: Token Allocation & Queue */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-800 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            3. In-Person Token Distribution & Arrival
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Consultations are conducted on a sequential token basis. Tokens are issued directly at the
            reception desk upon patient arrival. Patients are requested to report 15 to 20 minutes prior
            to the doctor’s clinic start time. Priority is accorded to elderly patients, pregnant women,
            and acutely distressed individuals.
          </p>
        </div>

        {/* Step 4: Payments & Anti-Fraud Notice */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            4. Fee Collection & Payment Notice
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            All consultation and pharmacy fees must be paid <strong>in person at the physical clinic reception counter</strong>.
            Satyabhama Health Care does <strong>NOT</strong> accept online advance bookings, UPI payment links over WhatsApp,
            or third-party booking deposits. Beware of unauthorized intermediaries claiming to sell advance tokens.
          </p>
        </div>
      </div>

      {/* 3. Emergency & Special Facilities Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Facility Details */}
        <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-sky-850 font-bold text-xs sm:text-sm">
            <Building2 className="w-4 h-4" />
            <span>Clinic Infrastructure</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Accessibility & Amenities</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our facility features ground-level access, clean drinking water, waiting lounges, and an attached
            pharmacy stocked with authentic medications. For patients requiring mobility assistance,
            wheelchair support is available at the entrance counter upon request.
          </p>
        </div>

        {/* Emergency Advisory */}
        <div className="bg-rose-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-rose-200 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-rose-800 font-bold text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Advisory</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-rose-950">Not an Emergency Trauma Center</h3>
          <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
            Satyabhama Health Care is an outpatient specialty consultation center. For life-threatening emergencies,
            acute myocardial infarction (heart attack), severe road trauma, or active bleeding, please report immediately
            to the District Headquarters Hospital (DHH Bhadrak) or dial 108 for ambulance dispatch.
          </p>
        </div>
      </div>

      {/* 4. Quick Action Strip */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Need specific doctor consultation times?</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            View our comprehensive doctor directory or full weekly timetable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <Link
            href="/schedule"
            className="w-full xs:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-[44px]"
          >
            <span>View Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/doctors"
            className="w-full xs:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm transition-colors text-center min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
          >
            <span>All Doctors</span>
          </Link>
          <Link
            href="/contact"
            className="w-full xs:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm transition-colors text-center min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
          >
            <span>Contact & Location</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

