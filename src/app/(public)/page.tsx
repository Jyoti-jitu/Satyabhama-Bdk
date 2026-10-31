import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope,
  Calendar,
  Phone,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  Activity,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { DoctorTimingsSection } from '@/components/schedule/DoctorTimingsSection';
import { DoctorConsultationTerms } from '@/components/schedule/DoctorConsultationTerms';
import { ClinicGallerySection } from '@/components/common/ClinicGallerySection';
import { FaqAccordion } from '@/components/common/FaqAccordion';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  const settings = dataStore.getClinicSettings();
  const specialties = dataStore.getSpecialties();
  const faqs = dataStore.getFAQs().slice(0, 5);

  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20 pb-10 sm:pb-16">
      {/* =========================================================================
          SECTION C: HERO SECTION (Clean, Modern, Trustworthy Medical Hero)
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-sky-50/30 to-slate-50/80 pt-6 sm:pt-14 pb-8 sm:pb-20 border-b border-slate-200/70">
        {/* Decorative Grid Mesh & Ambient Background Glow */}
        <div className="absolute inset-0 bg-grid-medical opacity-60 pointer-events-none" />
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-teal-300/20 via-emerald-200/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-sky-300/15 via-teal-200/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-8 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 2xl:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              {/* Trust Badge with Live Beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-teal-200/90 shadow-xs text-teal-900 text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-md">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
                </span>
                <span className="font-bold">Verified Outpatient Clinic</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Bhadrak, Odisha</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-teal-50 text-[10px] text-teal-700 font-bold border border-teal-200/60">
                  Walk-ins Welcome
                </span>
              </div>

              {/* Grand Odia Title with Official Emblem Logo */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2.5 sm:gap-4 justify-center lg:justify-start">
                  <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-rose-900 bg-white shadow-lg flex-shrink-0 p-0.5 group">
                    <Image
                      src="/images/logo.png"
                      alt="Satyabhama Health Care Official Logo"
                      fill
                      sizes="(max-width: 640px) 48px, 80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>

                  <div className="relative inline-block">
                    <h1 className="font-odia text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-normal leading-[1.2] select-none text-teal-900 drop-shadow-xs">
                      ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର
                    </h1>
                  </div>
                </div>

                {/* Sub-headline: Trusted Healthcare. Experienced Doctors. Better Wellbeing. */}
                <div className="pt-0.5">
                  <p className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 leading-snug">
                    Trusted Healthcare.{' '}
                    <span className="text-teal-700">
                      Experienced Doctors.
                    </span>{' '}
                    <br className="hidden sm:inline" />
                    Better Wellbeing.
                  </p>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore verified doctors, multispecialty departments, and consultation schedules available at{' '}
                <strong className="text-slate-800 font-semibold">Satyabhama Health Care</strong>, Bhadrak.
              </p>

              {/* Three Mandatory Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1 sm:pt-2">
                <Link
                  href="/doctors"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-teal-600 via-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-xl shadow-md shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group min-h-[40px] sm:min-h-[44px]"
                >
                  <Stethoscope className="w-4 h-4 text-teal-100 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Explore Our Doctors</span>
                  <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/schedule"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[40px] sm:min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>View Consultation Timings</span>
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white border border-slate-200/80 rounded-xl shadow-xs transition-all duration-300 hover:-translate-y-0.5 min-h-[40px] sm:min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-rose-600" />
                  <span>Contact the Clinic</span>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 sm:pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-left">
                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/75 border border-slate-200/70 shadow-xs backdrop-blur-xs hover:border-teal-200 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-slate-700 font-semibold">10+ Verified Specialists</span>
                </div>
                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/75 border border-slate-200/70 shadow-xs backdrop-blur-xs hover:border-teal-200 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-slate-700 font-semibold">Visiting Super-Specialists</span>
                </div>
                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/75 border border-slate-200/70 shadow-xs backdrop-blur-xs hover:border-teal-200 transition-colors col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-slate-700 font-semibold">Verified Weekly Timings</span>
                </div>
              </div>
            </div>

            {/* Right Card / Clinic Emblem Showcase */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center relative">
              {/* Soft ambient background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-sky-300/15 to-rose-300/10 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

              {/* Trust micro-badge: Top-Right */}
              <div className="absolute -top-3.5 -right-2 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-teal-200 shadow-md text-xs font-bold text-slate-800 backdrop-blur-md">
                <span className="text-amber-500">⭐</span>
                <span>4.9 / 5 Patient Trust</span>
              </div>

              {/* Main Clinic Card */}
              <div className="relative w-full max-w-md xl:max-w-lg bg-white/95 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(13,148,136,0.15)] hover:border-teal-300/80">
                {/* Clinic Header */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 sm:mb-6 sm:pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <div className="relative w-11 h-11 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-rose-900 bg-white flex-shrink-0 shadow-md p-0.5">
                      <Image
                        src="/images/logo.png"
                        alt="Satyabhama Health Care Official Emblem"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        Satyabhama Health Care
                      </h2>
                      <p className="text-[10px] sm:text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                        Bhadrak, Odisha
                      </p>
                    </div>
                  </div>

                  {/* Live Status indicator */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] sm:text-[11px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open Today</span>
                  </div>
                </div>

                {/* Key Information Rows */}
                <div className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-rose-600">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 block">
                        Clinic Location
                      </span>
                      <p className="text-[11px] sm:text-xs text-slate-700 font-medium mt-0.5 leading-snug">
                        {settings.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-teal-600">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 block">
                        Opening Hours
                      </span>
                      <p className="text-[11px] sm:text-xs text-slate-700 font-medium mt-0.5">
                        {settings.opening_hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-teal-600">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 block">
                        Telephone Enquiries
                      </span>
                      <a
                        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                        className="text-slate-900 hover:text-teal-700 font-bold text-xs sm:text-sm block mt-0.5 transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Reception Call Button */}
                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-800 to-rose-900 hover:from-rose-900 hover:to-rose-950 transition-all duration-300 shadow-md shadow-rose-900/15 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group min-h-[40px] sm:min-h-[44px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-rose-200 group-hover:scale-110 transition-transform" />
                    <span>Call Reception to Confirm Today’s Timings</span>
                  </a>
                </div>

                {/* Trust micro-badge: Bottom-Left */}
                <div className="absolute -bottom-3 -left-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white shadow-lg text-[11px] font-semibold border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Multispecialty Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OFFICIAL CLINIC SIGNBOARD SECTION (DIRECTLY BELOW HERO)
      ========================================================================= */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 border border-slate-200/90 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] sm:text-xs font-bold">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 flex-shrink-0" />
                <span>Verified Physical Clinic Signboard</span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                Satyabhama Health Care — Main OPD Doctor Roster &amp; Facility Signboard
              </h2>
              <p className="text-[11px] sm:text-sm text-slate-600">
                Official clinic display at Nehru Stadium Road, near Bonth Chhak, Bhadrak listing verified consulting specialists and direct reception phone numbers.
              </p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-200 self-start sm:self-auto flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              <span>Bhadrak, Odisha</span>
            </div>
          </div>

          {/* Full-width responsive container for Satya Bhamā Healthcare Clinic Signboard (Exact 2:1 native ratio) */}
          <div className="relative w-full aspect-[2/1] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100 group">
            <Image
              src="/images/clinic/satyabhama-clinic-signboard.png"
              alt="Satya Bhamā Healthcare Clinic Signboard in Bhadrak showing OPD doctors and contact numbers"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 95vw, 1680px"
              className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
              priority
            />
          </div>

          {/* Quick info row beneath image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2 text-slate-600 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <Phone className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span>Reception: <strong>7008610481 / 7681862111</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span>Timings: <strong>Morning &amp; Evening OPD Slots</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Authentic Walk-in Clinic in Bhadrak</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: CLINIC INTRODUCTION (ABOUT LEFT, FRONTAGE RIGHT)
      ========================================================================= */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 xl:gap-12 items-center">
            {/* Left: About Satyabhama Health Care */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] sm:text-xs font-bold">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 flex-shrink-0" />
                <span>About Satyabhama Health Care</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Dedicated Multispecialty Medical Practice in Bhadrak
              </h2>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                Satyabhama Health Care was established with the vision of providing accessible, reliable, and evidence-based outpatient consultations to patients and families across Bhadrak and surrounding districts of Odisha.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our clinic hosts experienced medical specialists in General Medicine, Diabetes Care, Psychiatry, Orthopaedics, General Surgery, Gynaecology, ENT, Dermatology, Gastroenterology, and Dental Care. Visiting consultants also conduct scheduled super-specialty clinics for complex neurosurgical and gastrointestinal needs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Verified Medical Credentials</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                      Every doctor’s qualifications and council registration details are verified by clinic administration before publication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Accurate Consultation Timings</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                      Regular weekly slots and temporary date-specific schedule modifications are maintained to respect patient time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2.5 sm:gap-4">
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors min-h-[40px] sm:min-h-[44px]"
                >
                  <span>Learn More About Our Clinic</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Madhuban Gate / Randia, Bhadrak</span>
                </div>
              </div>
            </div>

            {/* Right: Satyabhama Healthcare Clinic Frontage Image (Direct Image without overlay, caption below) */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-2.5 sm:space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-50">
                <Image
                  src="/images/clinic/satyabhama-clinic-frontage.png"
                  alt="Satyabhama Healthcare Clinic Frontage & In-House Pharmacy (ଔଷଧ) - Madhuban Gate, Bhadrak"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Caption Directly Below the Image */}
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-0.5 sm:space-y-1">
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Clinic Frontage &amp; In-House Pharmacy (ଔଷଧ)
                </p>
                <p className="text-[11px] sm:text-xs font-medium text-slate-600">
                  Madhuban Gate, Bhadrak • Call: <strong className="text-slate-900">7008610481 / 7681862111</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: OUR DOCTORS & CONSULTATION TIMINGS
      ========================================================================= */}
      <DoctorTimingsSection id="our-doctors" showTermsLink={true} />

      {/* =========================================================================
          SECTION E2: TERMS & CONDITIONS FOR DOCTOR CONSULTATION
      ========================================================================= */}
      <DoctorConsultationTerms id="consultation-terms" />

      {/* =========================================================================
          SECTION F: MEDICAL SPECIALTIES
      ========================================================================= */}
      <section className="bg-slate-100/70 py-8 sm:py-16 border-y border-slate-200/80">
        <div className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 space-y-6 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
              Outpatient Specialties
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Medical Specialties &amp; Departments
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Explore the clinical disciplines available at Satyabhama Health Care, Bhadrak.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-2.5 sm:gap-5">
            {specialties.map((spec) => (
              <Link
                key={spec.id}
                href={`/specialties/${spec.slug}`}
                className="bg-white p-2.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-1.5 sm:mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Activity className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-base group-hover:text-teal-700 transition-colors line-clamp-1 sm:line-clamp-none">
                    {spec.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-2 leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {spec.description}
                  </p>
                </div>

                <div className="mt-2.5 sm:mt-5 pt-1.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs font-semibold text-teal-700">
                  <span className="hidden xs:inline">Explore Specialty</span>
                  <span className="xs:hidden">Explore</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-1 sm:pt-2">
            <Link
              href="/specialties"
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors min-h-[40px] sm:min-h-[44px]"
            >
              <span>View All Specialties &amp; Doctor Availability</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: CLINIC PREMISES & FACILITIES (SYMMETRIC PHOTOS)
      ========================================================================= */}
      <ClinicGallerySection
        title="Clinic Premises & Facilities"
        subtitle="On-site photographs of our outpatient entrance, doctor roster board, and Stadium Road landmark in Bhadrak."
      />

      {/* =========================================================================
          SECTION H: CLINIC INFORMATION & LOCATION
      ========================================================================= */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl relative">
          {/* Subtle ambient light glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Info details */}
            <div className="lg:col-span-7 p-4 sm:p-10 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-950/80 border border-teal-800/60 text-teal-300 text-[10px] sm:text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Visit Satyabhama Health Care</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Clinic Location, Hours &amp; Direct Contact
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Located right near the landmark Nehru Stadium on Stadium Road, Bhadrak. Our clinic provides ground-floor accessibility for elderly and orthopaedic patients.
              </p>

              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-800/90 flex items-center justify-center flex-shrink-0 text-rose-400 border border-slate-700/80 shadow-xs">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">Full Clinic Address</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {settings.address}
                    </p>
                    <span className="text-[10px] sm:text-[11px] text-teal-300 font-medium block mt-0.5 sm:mt-1">
                      Landmark: Near Bonth Chhak &amp; Stadium Entrance Gate
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-800/90 flex items-center justify-center flex-shrink-0 text-teal-400 border border-slate-700/80 shadow-xs">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">Operating Hours</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                      {settings.opening_hours}
                    </p>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 sm:mt-1">
                      Individual doctor consultation hours vary. Please check timings above.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-800/90 flex items-center justify-center flex-shrink-0 text-teal-400 border border-slate-700/80 shadow-xs">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">Telephone Helplines</h3>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base text-white hover:text-teal-400 font-bold block mt-0.5 transition-colors"
                    >
                      {settings.phone}
                    </a>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-0.5 sm:mt-1">
                      Available during clinic working hours for schedule verification.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[40px] sm:min-h-[44px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {settings.phone}</span>
                </a>

                <a
                  href={settings.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[40px] sm:min-h-[44px]"
                >
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Visual map preview / Landmark Box */}
            <div className="lg:col-span-5 bg-slate-950/70 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/80 backdrop-blur-xs space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  How to Identify Our Clinic in Bhadrak
                </h3>

                {/* Embedded Landmark Photo - Full 4:3 view with no cropping or dark overlay */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/80 shadow-md bg-slate-900 group">
                  <Image
                    src="/images/clinic/satyabhama-storefront-facade.jpg"
                    alt="Satyabhama Health Care Front Storefront in Bhadrak"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>

                {/* Down the image: Storefront details */}
                <div className="space-y-1 pt-0.5">
                  <span className="text-xs sm:text-sm uppercase font-bold tracking-wider text-teal-300 block">
                    Physical Storefront &amp; Pharmacy (ଔଷଧ)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    Nehru Stadium Road, near Bonth Chhak, Bhadrak
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 space-y-1.5">
                  <span className="font-semibold text-amber-400 block">
                    Important Consultation Note:
                  </span>
                  <p className="leading-relaxed">
                    Please call ahead before travelling from rural blocks to confirm daily doctor timings: 
                    <strong className="text-white ml-1">{settings.phone}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-colors shadow-sm"
                >
                  <span>View Landmark Signs & Directions</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION I: FREQUENTLY ASKED QUESTIONS
      ========================================================================= */}
      <section className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Patient Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about consulting doctors at Satyabhama Health Care.
          </p>
        </div>

        <FaqAccordion items={faqs} columns={2} defaultOpenIndex={null} />

        <div className="text-center pt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <span>View All Frequently Asked Questions</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
