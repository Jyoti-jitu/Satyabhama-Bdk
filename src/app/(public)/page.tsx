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
import {
  calculateUpcomingConsultations,
  getNextConfirmedConsultation,
} from '@/lib/schedule-utils';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { ScheduleTable } from '@/components/schedule/ScheduleTable';
import { DoctorTimingsSection } from '@/components/schedule/DoctorTimingsSection';
import { DoctorConsultationTerms } from '@/components/schedule/DoctorConsultationTerms';

export default function HomePage() {
  const settings = dataStore.getClinicSettings();
  const verifiedDoctors = dataStore.getDoctors(false); // only verified & published
  const schedules = dataStore.getSchedules(undefined, false);
  const exceptions = dataStore.getExceptions(undefined, false);
  const specialties = dataStore.getSpecialties();
  const faqs = dataStore.getFAQs().slice(0, 5);

  // Calculate upcoming consultations for next 14 days
  const upcomingConsultations = calculateUpcomingConsultations(
    verifiedDoctors,
    schedules,
    exceptions,
    specialties,
    14
  );

  // Five primary verified doctors in exact serial order (1 through 5)
  const primaryDoctors = verifiedDoctors.slice(0, 5);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          SECTION C: HERO SECTION (Clean, Modern, Trustworthy Medical Hero)
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-sky-50/30 to-slate-50/80 pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-slate-200/70">
        {/* Decorative Grid Mesh & Ambient Animated Glow Orbs */}
        <div className="absolute inset-0 bg-grid-medical opacity-60 pointer-events-none" />
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-teal-300/25 via-emerald-200/20 to-transparent rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-24 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-sky-300/20 via-teal-200/15 to-transparent rounded-full blur-3xl pointer-events-none animate-float-reverse" />
        <div className="absolute top-1/2 right-8 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in-up">
              {/* Trust Badge with Live Beacon */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-teal-200/90 shadow-xs text-teal-900 text-xs font-semibold tracking-wide backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-bold">Verified Outpatient Clinic</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Bhadrak, Odisha</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-teal-50 text-[10px] text-teal-700 font-bold border border-teal-200/60">
                  Walk-ins Welcome
                </span>
              </div>

              {/* Grand Odia Title in Big Letters with Animated Gradient Flow */}
              <div className="space-y-3">
                <div className="relative inline-block group">
                  {/* Gentle pulsing ambient backdrop glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-rose-500/20 via-teal-500/25 to-emerald-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-subtle pointer-events-none" />
                  
                  <div className="relative">
                    <h1 className="font-odia text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-normal leading-[1.2] select-none text-transparent bg-clip-text bg-gradient-to-r from-teal-850 via-rose-700 to-emerald-700 animate-gradient-flow filter drop-shadow-xs">
                      ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର
                    </h1>
                  </div>
                </div>

                {/* Sub-headline: Trusted Healthcare. Experienced Doctors. Better Wellbeing. */}
                <div className="pt-0.5">
                  <p className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 leading-snug">
                    Trusted Healthcare.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600">
                      Experienced Doctors.
                    </span>{' '}
                    <br className="hidden sm:inline" />
                    Better Wellbeing.
                  </p>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore the verified doctors, multispecialty departments, and consultation schedules available at{' '}
                <strong className="text-slate-800 font-semibold">Satyabhama Health Care</strong>, Bhadrak.
              </p>

              {/* Three Mandatory Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  href="/doctors"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-teal-600 via-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
                >
                  <Stethoscope className="w-4 h-4 text-teal-100 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Explore Our Doctors</span>
                  <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/schedule"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>View Consultation Timings</span>
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white border border-slate-200/80 rounded-xl shadow-xs transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4 text-rose-600" />
                  <span>Contact the Clinic</span>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-left">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/75 border border-slate-200/70 shadow-xs backdrop-blur-xs hover:border-teal-200 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-semibold">10+ Verified Specialists</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/75 border border-slate-200/70 shadow-xs backdrop-blur-xs hover:border-teal-200 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-semibold">Visiting Super-Specialists</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/75 border border-slate-200/70 shadow-xs backdrop-blur-xs hover:border-teal-200 transition-colors col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-semibold">Verified Weekly Timings</span>
                </div>
              </div>
            </div>

            {/* Right Card / Clinic Emblem Showcase */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Soft ambient background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-sky-300/15 to-rose-300/10 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

              {/* Floating micro-badge: Top-Right */}
              <div className="absolute -top-3.5 -right-2 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-teal-200 shadow-md text-xs font-bold text-slate-800 animate-float-slow backdrop-blur-md">
                <span className="text-amber-500">⭐</span>
                <span>4.9 / 5 Patient Trust</span>
              </div>

              {/* Main Clinic Card */}
              <div className="relative w-full max-w-sm sm:max-w-md bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(13,148,136,0.15)] hover:border-teal-300/80">
                {/* Clinic Header */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-rose-800/80 bg-white flex-shrink-0 shadow-sm p-0.5">
                      <Image
                        src="/images/logo.png"
                        alt="Satyabhama Health Care Emblem"
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        Satyabhama Health Care
                      </h2>
                      <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                        Bhadrak, Odisha
                      </p>
                    </div>
                  </div>

                  {/* Live Status indicator */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open Today</span>
                  </div>
                </div>

                {/* Key Information Rows */}
                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-rose-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
                        Clinic Location
                      </span>
                      <p className="text-xs text-slate-700 font-medium mt-0.5 leading-snug">
                        Nehru Stadium, Stadium Road, near Bonth Chhak, Bhadrak 756100
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-teal-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
                        Opening Hours
                      </span>
                      <p className="text-xs text-slate-700 font-medium mt-0.5">
                        {settings.opening_hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-teal-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
                        Telephone Enquiries
                      </span>
                      <a
                        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                        className="text-slate-900 hover:text-teal-700 font-bold text-sm block mt-0.5 transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Reception Call Button */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-800 to-rose-900 hover:from-rose-900 hover:to-rose-950 transition-all duration-300 shadow-md shadow-rose-900/15 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group"
                  >
                    <Phone className="w-3.5 h-3.5 text-rose-200 group-hover:scale-110 transition-transform" />
                    <span>Call Reception to Confirm Today’s Timings</span>
                  </a>
                </div>

                {/* Floating micro-badge: Bottom-Left */}
                <div className="absolute -bottom-3 -left-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white shadow-lg text-[11px] font-semibold border border-slate-800 animate-float-reverse">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Multispecialty Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: CLINIC INTRODUCTION
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                About Satyabhama Health Care
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Dedicated Multispecialty Medical Practice in Bhadrak
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Satyabhama Health Care was established with the vision of providing accessible, reliable, and evidence-based outpatient consultations to patients and families across Bhadrak and surrounding districts of Odisha.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our clinic hosts experienced medical specialists in General Medicine, Diabetes Care, Psychiatry, Orthopaedics, General Surgery, Gynaecology, ENT, Dermatology, Gastroenterology, and Dental Care. Visiting consultants also conduct scheduled super-specialty clinics for complex neurosurgical and gastrointestinal needs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Verified Medical Credentials</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Every doctor’s qualifications and council registration details are verified by clinic administration before publication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Accurate Consultation Timings</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Regular weekly slots and temporary date-specific schedule modifications are maintained to respect patient time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-4">
              <h3 className="text-base font-bold text-teal-300">Visiting Advice for Patients</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Satyabhama Health Care operates on a direct walk-in consultation model with scheduled slots. There are no online booking forms.
              </p>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Check published consultation timings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Call reception to confirm doctor arrival</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Bring previous medical reports & prescriptions</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold"
                >
                  <span>Learn more about clinic facilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Outpatient Specialties
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Medical Specialties & Departments
            </h2>
            <p className="text-slate-600 text-sm">
              Explore the clinical disciplines available at Satyabhama Health Care, Bhadrak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {specialties.map((spec) => (
              <Link
                key={spec.id}
                href={`/specialties/${spec.slug}`}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {spec.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                  <span>Explore Specialty</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/specialties"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition-colors"
            >
              <span>View All Specialties & Doctor Availability</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: CONSULTATION SCHEDULE PREVIEW
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Timetable Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Upcoming Consultation Schedule
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Preview verified doctor timings for the upcoming days. Date-specific exceptions and special clinics are clearly highlighted.
            </p>
          </div>

          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 self-start md:self-auto group"
          >
            <span>Full Consultation Schedule</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ScheduleTable
          consultations={upcomingConsultations}
          showFilters={true}
          limit={6}
        />
      </section>

      {/* =========================================================================
          SECTION H: CLINIC INFORMATION & LOCATION
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl relative">
          {/* Subtle ambient light glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Info details */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/60 text-teal-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Visit Satyabhama Health Care</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Clinic Location, Hours & Direct Contact
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Located right near the landmark Nehru Stadium on Stadium Road, Bhadrak. Our clinic provides ground-floor accessibility for elderly and orthopaedic patients.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 flex items-center justify-center flex-shrink-0 text-rose-400 border border-slate-700/80 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Full Clinic Address</h3>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {settings.address}
                    </p>
                    <span className="text-[11px] text-teal-300 font-medium block mt-1">
                      Landmark: Near Bonth Chhak & Stadium Entrance Gate
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 flex items-center justify-center flex-shrink-0 text-teal-400 border border-slate-700/80 shadow-xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Operating Hours</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {settings.opening_hours}
                    </p>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Individual doctor consultation hours vary. Please check timings above.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 flex items-center justify-center flex-shrink-0 text-teal-400 border border-slate-700/80 shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Direct Telephone Enquiries</h3>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="text-base text-white hover:text-teal-400 font-bold block mt-0.5 transition-colors"
                    >
                      {settings.phone}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Available during clinic working hours for schedule verification.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {settings.phone}</span>
                </a>

                <a
                  href={settings.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Visual map preview / Landmark Box */}
            <div className="lg:col-span-5 bg-slate-950/50 p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/80 backdrop-blur-xs">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Patient First Care
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We are committed to providing ethical and reliable medical guidance in Bhadrak. For general questions, feel free to use our online contact enquiry form.
                </p>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 space-y-2">
                  <span className="font-semibold text-amber-400 block">
                    Important Consultation Note:
                  </span>
                  <p>
                    Please call ahead before travelling from rural blocks or neighbouring districts to ensure the specialist has not been rescheduled due to emergency hospital duty.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-colors"
                >
                  <span>View Contact & Directions Page</span>
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2"
            >
              <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

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
