import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope,
  HeartPulse,
  Activity,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Phone,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Scissors,
  Brain,
  Baby,
  Smile,
  MapPin,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export const metadata = {
  title: 'Clinic Services | Satyabhama Health Care, Bhadrak',
  description:
    'Comprehensive outpatient services at Satyabhama Health Care, Bhadrak: General consultations, super-specialist clinics, diabetic care, minor surgery, psychiatric counseling, and dental care.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/services',
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Multispecialty Outpatient Consultations',
      desc: 'Expert clinical evaluations by senior physicians across general medicine, surgery, paediatrics, gynaecology, and ENT with comprehensive treatment planning.',
      icon: Stethoscope,
      category: 'General Clinical Care',
    },
    {
      title: 'Chronic Metabolic & Diabetes Management',
      desc: 'Structured glycemic tracking, diabetic neuropathy screening, diet guidance, lifestyle counseling, and ongoing medication management.',
      icon: Activity,
      category: 'Internal Medicine',
    },
    {
      title: 'Visiting Super-Specialist Clinics',
      desc: 'Periodic consulting sessions by super-specialists in Neurosurgery, Gastroenterology, and Spine Care on designated dates.',
      icon: ShieldAlert,
      category: 'Specialist Advisory',
    },
    {
      title: 'Women’s Health & Antenatal Checkups',
      desc: 'Specialized obstetrics and gynaecological care covering maternal wellbeing, menstrual cycle disorders, pelvic evaluations, and menopause care.',
      icon: HeartPulse,
      category: 'Obstetrics & Gynaecology',
    },
    {
      title: 'Orthopaedic & Joint Pain Advisory',
      desc: 'Conservative evaluation for bone trauma, arthritis, knee degeneration, sciatica, sports injuries, and physical rehabilitation guidance.',
      icon: Clock,
      category: 'Orthopaedics',
    },
    {
      title: 'Confidential Mental Health & Psychiatric Counseling',
      desc: 'Evidence-based support for stress, anxiety, depressive episodes, cognitive decline, and emotional wellness in private consulting suites.',
      icon: Brain,
      category: 'Mental Wellness',
    },
    {
      title: 'General & Minor Surgical Consultations',
      desc: 'Clinical evaluations for hernia, gallbladder symptoms, anorectal disorders, skin lesions, and structured post-operative wound reviews.',
      icon: Scissors,
      category: 'Surgical Services',
    },
    {
      title: 'Dental Health & Conservative Endodontics',
      desc: 'Root canal therapy, cavity restorations, tooth preservation, dental extractions, and regular oral hygiene assessment.',
      icon: Smile,
      category: 'Dental Medicine',
    },
    {
      title: 'Paediatric Health & Newborn Guidance',
      desc: 'Consultations for common childhood infections, seasonal fevers, nutritional growth monitoring, and preventive paediatric advisory.',
      icon: Baby,
      category: 'Child Health',
    },
  ];

  return (
    <div className="py-6 sm:py-16 space-y-6 sm:space-y-12">
      {/* Header Banner */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
              Outpatient Healthcare Services
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Clinical Services &amp; Specialty Care
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Explore the full range of outpatient medical disciplines and specialized consultation services provided at Satyabhama Health Care in Bhadrak, Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Roadside Signboard Landmark & Services Overview Section */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 xl:gap-12 items-center">
            {/* Left Column: Text & Key Highlights */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-3 sm:space-y-5">
              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors border border-teal-200 text-teal-800 text-[10px] sm:text-xs font-bold"
                title="View location on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Physical Clinic Landmark &amp; Services • ରାସ୍ତା କଡ଼ ସୂଚନା ଫଳକ ↗</span>
              </a>

              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Specialist Outpatient Care &amp; Directional Landmark in Bhadrak
              </h2>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                Satyabhama Health Care offers structured outpatient medical consultations, chronic disease management, and essential diagnostics guidance for patients across Bhadrak and surrounding coastal regions.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our clinic hosts consulting physicians in General Medicine, Surgery, Gynaecology, Paediatrics, Orthopaedics, Psychiatry, and Dental Care, alongside visiting super-specialists in Neurology and Gastroenterology. An on-site medicine counter (ଔଷଧ) ensures prompt dispensing of prescribed medications directly after your doctor consultation.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3.5 pt-1">
                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-tight">In-House Pharmacy (ଔଷଧ)</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-snug line-clamp-2 sm:line-clamp-none">
                      Convenient on-site dispensary for doctor-prescribed medications and essential wellness supplies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-tight">Morning &amp; Evening Sessions</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-snug line-clamp-2 sm:line-clamp-none">
                      Flexible consultation hours planned to accommodate local patients and commuters from rural areas.
                    </p>
                  </div>
                </div>

                <a
                  href={CLINIC_CONFIG.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition-colors group"
                  title="View Roadside Landmark on Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-rose-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-tight">Roadside Landmark Sign ↗</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-snug line-clamp-2 sm:line-clamp-none">
                      Spot our prominent roadside pillar when approaching Stadium Road from Bonth Chhak or Nehru Stadium.
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 leading-tight">Walk-In Registration</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-snug line-clamp-2 sm:line-clamp-none">
                      Direct reception token issuance with transparent consultation fees and zero online booking markups.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors min-h-[40px] sm:min-h-[44px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Reception ({CLINIC_CONFIG.phone})</span>
                </a>

                <Link
                  href="/schedule"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors min-h-[40px] sm:min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>View 21-Day Schedule</span>
                </Link>

                <a
                  href={CLINIC_CONFIG.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs sm:text-sm shadow-xs transition-colors min-h-[40px] sm:min-h-[44px]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Right Column: Roadside Image with Caption directly below (No overlay) */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-2.5 sm:space-y-3">
              <div className="relative w-full aspect-[3/4] max-w-xs sm:max-w-md mx-auto rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-100">
                <Image
                  src="/images/clinic/satyabhama-roadside-signboard.png"
                  alt="Satyabhama Health Care Roadside Landmark Signboard on Stadium Road, Bhadrak"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="pt-0.5 text-center sm:text-left text-xs text-slate-600 space-y-0.5 sm:space-y-1 max-w-xs sm:max-w-md mx-auto">
                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                  Roadside Landmark Signboard (ରାସ୍ତା କଡ଼ ସୂଚନା ଫଳକ)
                </p>
                <p className="text-slate-500 text-[11px] sm:text-xs">
                  Stadium Road, Near Nehru Stadium &amp; Madhuban Gate, Bhadrak • Call: <strong className="text-slate-800">{CLINIC_CONFIG.phone}</strong>
                  {CLINIC_CONFIG.secondary_phone && (
                    <span> / <strong className="text-slate-800">{CLINIC_CONFIG.secondary_phone}</strong></span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
              Departments &amp; Specializations
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Medical Specialties &amp; Clinical Offerings
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            All consultations are conducted in private clinical chambers with verified specialists and on-site pharmacy support.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm p-2.5 sm:p-6 flex flex-col justify-between card-hover space-y-2 sm:space-y-4"
              >
                <div className="space-y-1.5 sm:space-y-3">
                  <div className="flex items-center justify-between gap-1">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[8px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full truncate max-w-[85px] sm:max-w-none">
                      {srv.category}
                    </span>
                  </div>

                  <h2 className="text-xs sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                    {srv.title}
                  </h2>

                  <p className="text-[10px] sm:text-xs text-slate-600 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px] sm:text-xs">
                  <Link
                    href="/schedule"
                    className="font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 min-h-[30px] sm:min-h-[38px]"
                  >
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="truncate">Timings</span>
                  </Link>

                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="font-semibold text-slate-700 hover:text-teal-700 inline-flex items-center gap-1 min-h-[30px] sm:min-h-[38px]"
                  >
                    <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-600" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Patient Guidelines on Consultation */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-10 space-y-4 sm:space-y-6">
          <div className="max-w-3xl space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
              Patient Guidelines
            </span>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
              How Outpatient Consultations Work at Satyabhama Health Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To ensure orderly care and accurate time management, please note our clinic procedures:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 space-y-1 sm:space-y-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-[11px] sm:text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Verify Schedule</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">
                Check our online Consultation Timings page to confirm the specialist’s day and session.
              </p>
            </div>

            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 space-y-1 sm:space-y-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-[11px] sm:text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Telephone Confirmation</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">
                Call +91 70086 10481 before leaving home to confirm the doctor has arrived without delay.
              </p>
            </div>

            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 space-y-1 sm:space-y-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-[11px] sm:text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Reception Token</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">
                Visit the reception desk at Nehru Stadium, Bhadrak to receive your consultation entry token.
              </p>
            </div>

            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 space-y-1 sm:space-y-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-[11px] sm:text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Doctor Consultation</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">
                Meet your doctor in a private consultation chamber with your prior reports and prescription slips.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
