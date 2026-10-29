import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { getNextConfirmedConsultation } from '@/lib/schedule-utils';
import {
  Activity,
  ArrowLeft,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface SpecialtyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SpecialtyPageProps) {
  const { slug } = await params;
  const specialty = dataStore.getSpecialtyBySlug(slug);
  if (!specialty) return { title: 'Specialty Not Found' };

  return {
    title: `${specialty.name} | Satyabhama Health Care, Bhadrak`,
    description: `Consultation details and doctors for ${specialty.name} at Satyabhama Health Care in Bhadrak, Odisha. Check verified consultation schedules.`,
  };
}

export default async function SpecialtyDetailPage({ params }: SpecialtyPageProps) {
  const { slug } = await params;
  const specialty = dataStore.getSpecialtyBySlug(slug);

  if (!specialty) {
    notFound();
  }

  const allDoctors = dataStore.getDoctors(false);
  const schedules = dataStore.getSchedules(undefined, false);
  const exceptions = dataStore.getExceptions(undefined, false);
  const specialties = dataStore.getSpecialties();

  // Find doctors matching this specialty
  const matchingDoctors = allDoctors.filter((doc) =>
    doc.specialty_summary.toLowerCase().includes(specialty.name.toLowerCase().split('&')[0].trim().toLowerCase())
  );

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div>
        <Link
          href="/specialties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Specialties</span>
        </Link>
      </div>

      {/* Hero Specialty Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Specialty Department • Bhadrak</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {specialty.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {specialty.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic for Today’s Timings</span>
            </a>
          </div>
        </div>
      </div>

      {/* Consulting Doctors Section */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Specialist Consultants
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Doctors in {specialty.name}
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">
            Verified doctors providing outpatient care and diagnostic guidance in this discipline.
          </p>
        </div>

        {matchingDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-800">
              Visiting specialist clinic held on announced dates.
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please check our consultation schedule or telephone the clinic reception at {CLINIC_CONFIG.phone} to inquire about upcoming visiting dates.
            </p>
            <div className="pt-2">
              <Link
                href="/schedule"
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold inline-block"
              >
                View Consultation Schedule
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingDoctors.map((doc) => {
              const nextConsult = getNextConfirmedConsultation(
                doc,
                schedules,
                exceptions,
                specialties
              );
              return (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  nextConsultation={nextConsult}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Patient Advisory Box */}
      <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">
            Consultation Guidelines for {specialty.name}:
          </p>
          <p className="leading-relaxed">
            Patients are advised to bring relevant diagnostic reports, blood test results, ultrasound or imaging films, and continuous prescriptions to facilitate a thorough medical review during the consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
