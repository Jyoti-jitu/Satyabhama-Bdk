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
import { ClinicGallerySection } from '@/components/common/ClinicGallerySection';

export const metadata = {
  title: 'About Us | Satyabhama Health Care, Bhadrak',
  description:
    'Learn about Satyabhama Health Care in Bhadrak, Odisha - our clinic mission, verified specialist doctors, accessible healthcare standards, and transparent consultation schedules.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/about',
  },
};

export default function AboutPage() {
  return (
    <div className="py-6 sm:py-12 space-y-8 sm:space-y-14">
      {/* Header Banner */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-14 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-4">
            <span className="text-[11px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
              About Our Clinic
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Committed to Reliable Outpatient Care in Bhadrak
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Satyabhama Health Care provides patient-focused outpatient consultations across internal medicine, surgery, gynaecology, orthopaedics, psychiatry, ENT, dermatology, gastroenterology, and dental care in Bhadrak, Odisha.
            </p>
          </div>
          {/* Subtle glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Main Philosophy & Mission */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[11px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
              Our Clinical Philosophy
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Patient Care Centered on Transparency & Experience
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Navigating healthcare schedules in coastal Odisha can be stressful when doctor availability is unpredictable. Satyabhama Health Care was established to bridge this gap by bringing reputable, verified consultants together in a single, well-maintained clinic near Nehru Stadium, Bhadrak.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We maintain published consultation schedules that are updated directly by clinic coordinators. Visitors can see regular weekly timings, planned leaves, and dates when visiting super-specialists will be attending the clinic.
            </p>

            <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  Verified medical registration with the Odisha Medical Council & Dental Council.
                </span>
              </div>
              <div className="flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  Informational consultation dates with phone verification before you travel.
                </span>
              </div>
              <div className="flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">
                  Central, easily accessible location at Stadium Road, near Bonth Chhak.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-rose-900 bg-white shadow-md flex-shrink-0 p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Satyabhama Health Care Logo"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">Satyabhama Health Care</h3>
                  <p className="text-[11px] sm:text-xs text-rose-800 font-semibold uppercase">
                    Multispecialty Clinic • Bhadrak, Odisha
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 mb-1.5 sm:mb-2" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">12 Specialties</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                    Internal medicine, surgery, child health & specialist clinics.
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 mb-1.5 sm:mb-2" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Verified Doctors</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                    Every profile is vetted for qualifications and registration.
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 mb-1.5 sm:mb-2" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">7 Days a Week</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                    Clinic open 8:00 AM – 9:00 PM for enquiries and consultations.
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 mb-1.5 sm:mb-2" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Walk-In Access</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                    Direct tokens issued at reception with no online booking fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Physical Clinic Verification */}
      <section className="bg-slate-100/70 py-8 sm:py-14 border-y border-slate-200">
        <div className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
              Clinic Infrastructure & Trust
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Comfortable, Modern Outpatient Environment
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Designed for patient convenience and smooth doctor-patient consultations in Bhadrak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm sm:text-base">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Ground Floor Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-free entrance and wide corridors facilitating easy access for senior citizens, pregnant women, and patients recovering from orthopaedic injuries.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm sm:text-base">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">In-House Pharmacy & Private Chambers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully registered on-site pharmacy (ଔଷଧ) and clean, quiet consultation rooms ensuring complete doctor-patient confidentiality during examinations.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm sm:text-base">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Dedicated Reception & Helplines</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Staffed telephone reception (+91 70086 10481, +91 76818 62111) answering queries regarding daily doctor arrivals, holiday exceptions, and visiting specialist timings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Photos Gallery Section */}
      <ClinicGallerySection
        title="Clinic Premises & Facilities"
        subtitle="Photographs of our outpatient entrance, doctor roster board, and Stadium Road landmark signboard in Bhadrak."
      />

      {/* CTA Box */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
          <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-2xl font-bold">Looking for a Doctor’s Consultation Timings?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Check our verified schedule or phone our Bhadrak reception desk directly before planning your visit.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <Link
              href="/schedule"
              className="w-full xs:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition-colors min-h-[42px] sm:min-h-[44px] inline-flex items-center justify-center text-center"
            >
              View Consultation Timings
            </Link>
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="w-full xs:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-colors inline-flex items-center justify-center gap-2 min-h-[42px] sm:min-h-[44px] text-center"
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
