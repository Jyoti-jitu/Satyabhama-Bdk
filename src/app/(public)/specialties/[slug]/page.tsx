import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG, SITE_URL } from '@/lib/clinic-config';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { getNextConfirmedConsultation } from '@/lib/schedule-utils';
import { getDoctorSEO } from '@/lib/data/doctor-seo';
import {
  Activity,
  ArrowLeft,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

interface SpecialtyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SpecialtyPageProps) {
  const { slug } = await params;
  const specialty = dataStore.getSpecialtyBySlug(slug);
  if (!specialty) return { title: 'Specialty Not Found' };

  const canonicalUrl = `${SITE_URL}/specialties/${specialty.slug}`;

  return {
    title: `${specialty.name} Specialist in Bhadrak | Satyabhama Health Care`,
    description: `Consultation details and specialist doctors for ${specialty.name} at Satyabhama Health Care in Bhadrak, Odisha. Check verified consultation schedules. Call ${CLINIC_CONFIG.phone}.`,
    alternates: {
      canonical: canonicalUrl,
    },
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
  const allArticles = dataStore.getArticles(false);

  // Find doctors matching this specialty with SEO mapping
  const matchingDoctors = allDoctors.filter((doc) => {
    const seo = getDoctorSEO(doc.slug);
    if (seo?.specialtySlug === specialty.slug) return true;
    if (specialty.slug === 'diabetes-care' && doc.slug === 'dr-priya-ranjan-barik') return true;
    if (specialty.slug === 'general-medicine' && doc.slug === 'dr-priya-ranjan-barik') return true;
    const specKeywords = specialty.name.toLowerCase().split(/[\s,&()]+/);
    const summary = doc.specialty_summary.toLowerCase();
    return specKeywords.some((kw) => kw.length > 2 && summary.includes(kw));
  });

  // Find related health articles
  const relatedArticles = allArticles.filter(
    (a) => a.related_specialty_slug === specialty.slug
  );

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
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
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-2.5 sm:space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-[11px] sm:text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Specialty Department • Bhadrak</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {specialty.name}
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            {specialty.description}
          </p>

          <div className="pt-1 sm:pt-2 flex flex-wrap gap-3">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs min-h-[42px] sm:min-h-[44px] shadow-md transition-all text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic for Today’s Timings</span>
            </a>
          </div>
        </div>
      </div>

      {/* Consulting Doctors Section */}
      <div className="space-y-4 sm:space-y-6">
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
            Specialist Consultants
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Doctors in {specialty.name}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Verified doctors providing outpatient care and diagnostic guidance in this discipline.
          </p>
        </div>

        {matchingDoctors.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-200 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-800">
              Visiting specialist clinic held on announced dates.
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please check our consultation schedule or telephone the clinic reception at {CLINIC_CONFIG.phone} to inquire about upcoming visiting dates.
            </p>
            <div className="pt-2">
              <Link
                href="/schedule"
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold inline-block min-h-[38px]"
              >
                View Consultation Schedule
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
      <div className="bg-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 sm:gap-3">
        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900 text-xs sm:text-sm">
            Consultation Guidelines for {specialty.name}:
          </p>
          <p className="leading-relaxed">
            Patients are advised to bring relevant diagnostic reports, blood test results, ultrasound or imaging films, and continuous prescriptions to facilitate a thorough medical review during the consultation.
          </p>
        </div>
      </div>

      {/* Related Health Guides */}
      {relatedArticles.length > 0 && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-3 sm:space-y-4">
          <div className="border-b border-slate-100 pb-2.5 sm:pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Related Health & Medical Guides</span>
            </div>
            <Link
              href="/health-articles"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>All Articles</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((art) => (
              <Link
                key={art.id}
                href={`/health-articles/${art.slug}`}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
                <div className="pt-3 flex items-center justify-between text-[11px] font-bold text-teal-700">
                  <span>Read Guide</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
