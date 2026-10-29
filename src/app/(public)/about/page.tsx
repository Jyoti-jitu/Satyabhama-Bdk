import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Building2,
  Clock,
  Phone,
  Heart,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export const metadata = {
  title: 'About Us | Satyabhama Health Care, Bhadrak',
  description:
    'Learn about Satyabhama Health Care in Bhadrak, Odisha - our clinic mission, verified specialist doctors, accessible healthcare standards, and transparent consultation schedules.',
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              About Our Clinic
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Committed to Reliable Outpatient Care in Bhadrak
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Satyabhama Health Care provides patient-focused outpatient consultations across internal medicine, surgery, gynaecology, orthopaedics, psychiatry, ENT, dermatology, gastroenterology, and dental care in Bhadrak, Odisha.
            </p>
          </div>
          {/* Subtle glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Main Philosophy & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Our Clinical Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Patient Care Centered on Transparency & Experience
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Navigating healthcare schedules in coastal Odisha can be stressful when doctor availability is unpredictable. Satyabhama Health Care was established to bridge this gap by bringing reputable, verified consultants together in a single, well-maintained clinic near Nehru Stadium, Bhadrak.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We maintain published consultation schedules that are updated directly by clinic coordinators. Visitors can see regular weekly timings, planned leaves, and dates when visiting super-specialists will be attending the clinic.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">
                  Verified medical registration with the Odisha Medical Council & Dental Council.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">
                  Informational consultation dates with phone verification before you travel.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">
                  Central, easily accessible location at Stadium Road, near Bonth Chhak.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-rose-800 bg-white shadow flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Satyabhama Health Care Logo"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Satyabhama Health Care</h3>
                  <p className="text-xs text-rose-800 font-semibold uppercase">
                    Multispecialty Clinic • Bhadrak, Odisha
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Building2 className="w-6 h-6 text-teal-700 mb-2" />
                  <h4 className="text-sm font-bold text-slate-900">12 Specialties</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Internal medicine, surgery, child health & specialist clinics.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Users className="w-6 h-6 text-teal-700 mb-2" />
                  <h4 className="text-sm font-bold text-slate-900">Verified Doctors</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Every profile is vetted for qualifications and registration.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-6 h-6 text-teal-700 mb-2" />
                  <h4 className="text-sm font-bold text-slate-900">7 Days a Week</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Clinic open 8:00 AM – 9:00 PM for enquiries and consultations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Heart className="w-6 h-6 text-teal-700 mb-2" />
                  <h4 className="text-sm font-bold text-slate-900">Walk-In Access</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct tokens issued at reception with no online booking fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Location */}
      <section className="bg-slate-100/70 py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Clinic Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Comfortable, Modern Outpatient Environment
            </h2>
            <p className="text-slate-600 text-sm">
              Designed for patient convenience and smooth doctor-patient consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ground Floor Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-free entrance and wide corridors facilitating easy access for senior citizens, pregnant women, and patients recovering from orthopaedic injuries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Private Consultation Chambers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean, quiet consultation rooms ensuring complete doctor-patient confidentiality during clinical examinations, psychiatric counseling, and medical reviews.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Dedicated Reception & Helpline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Staffed telephone reception (+91 70086 10481) answering queries regarding daily doctor arrivals, holiday exceptions, and visiting specialist timings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Looking for a Doctor’s Consultation Timings?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Check our verified schedule or phone our Bhadrak reception desk directly before planning your visit.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/schedule"
              className="px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition-colors"
            >
              View Consultation Timings
            </Link>
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Call: {CLINIC_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
