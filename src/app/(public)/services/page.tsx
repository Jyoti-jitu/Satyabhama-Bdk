import React from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  HeartPulse,
  Activity,
  UserCheck,
  ShieldAlert,
  Clock,
  Phone,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Scissors,
  Brain,
  Baby,
  Smile,
} from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export const metadata = {
  title: 'Clinic Services | Satyabhama Health Care, Bhadrak',
  description:
    'Comprehensive outpatient services at Satyabhama Health Care, Bhadrak: General consultations, super-specialist clinics, diabetic care, minor surgery, psychiatric counseling, and dental care.',
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
    <div className="py-12 sm:py-16 space-y-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Outpatient Healthcare Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Clinical Services & Specialty Care
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the full range of outpatient medical disciplines and specialized consultation services provided at Satyabhama Health Care in Bhadrak, Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between card-hover space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                      {srv.category}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {srv.title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/schedule"
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>View Timings</span>
                  </Link>

                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="text-xs font-semibold text-slate-700 hover:text-teal-700 inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-teal-600" />
                    <span>Call Clinic</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Patient Guidelines on Consultation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Patient Guidelines
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              How Outpatient Consultations Work at Satyabhama Health Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To ensure orderly care and accurate time management, please note our clinic procedures:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Verify Schedule</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Check our online Consultation Timings page to confirm the specialist’s day and session.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Telephone Confirmation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Call +91 70086 10481 before leaving home to confirm the doctor has arrived without delay.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Reception Token</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Visit the reception desk at Nehru Stadium, Bhadrak to receive your consultation entry token.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="text-sm font-bold text-slate-900">Doctor Consultation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Meet your doctor in a private consultation chamber with your prior reports and prescription slips.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
