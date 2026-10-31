import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER, SITE_URL } from '@/lib/clinic-config';
import {
  BookOpen,
  ArrowLeft,
  Clock,
  User,
  Calendar,
  AlertCircle,
  Share2,
  Stethoscope,
  Phone,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = dataStore.getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  const canonicalUrl = `${SITE_URL}/health-articles/${article.slug}`;

  return {
    title: `${article.title} | Satyabhama Health Care, Bhadrak`,
    description: article.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | Satyabhama Health Care`,
      description: article.summary,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author],
      siteName: 'Satyabhama Health Care',
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = dataStore.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch associated doctor if assigned
  const relatedDoctor = article.related_doctor_slug
    ? dataStore.getDoctorBySlug(article.related_doctor_slug, false)
    : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: article.title,
    description: article.summary,
    url: `${SITE_URL}/health-articles/${article.slug}`,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'MedicalClinic',
      name: 'Satyabhama Health Care',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      telephone: CLINIC_CONFIG.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nehru Stadium, Stadium Road, near Bonth Chhak',
        addressLocality: 'Bhadrak',
        addressRegion: 'Odisha',
        postalCode: '756100',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10 max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <div>
        <Link
          href="/health-articles"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Health Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-10 md:p-12 space-y-5 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4 border-b border-slate-100 pb-4 sm:pb-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500">
            <span className="font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[11px] sm:text-xs">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{article.read_time_minutes} min read</span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-[11px] sm:text-xs">Medically Reviewed Clinical Awareness</span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <User className="w-4 h-4 text-slate-400" />
            <span className="font-medium">Written by {article.author}</span>
          </div>
        </div>

        {/* Lead Summary */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-teal-50/70 border border-teal-100 text-teal-950 font-medium text-xs sm:text-base leading-relaxed">
          {article.summary}
        </div>

        {/* Full Content */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-3 sm:space-y-4 text-xs sm:text-base">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Related Doctor Spotlight Card (SEO Topic Cluster Link) */}
        {relatedDoctor && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white shadow-lg space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-teal-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>Consulting Specialist at Satyabhama Health Care</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-xl font-bold text-white">
                  {relatedDoctor.full_name}
                </h3>
                <p className="text-xs text-slate-300">
                  {relatedDoctor.qualifications} • {relatedDoctor.specialty_summary}
                </p>
                {relatedDoctor.designation && (
                  <p className="text-xs text-teal-200">
                    {relatedDoctor.designation}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href={`/doctors/${relatedDoctor.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-sm min-h-[42px] text-center"
                >
                  <span>View Doctor Profile & Timings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors min-h-[42px] text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>Call: {CLINIC_CONFIG.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Clinic Location & Telephone Association */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>
              Satyabhama Health Care, Nehru Stadium Road, near Bonth Chhak, Bhadrak, Odisha 756100
            </span>
          </div>
          <div className="flex items-center gap-2 font-bold text-teal-800">
            <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <a href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:underline">
              {CLINIC_CONFIG.phone}
            </a>
          </div>
        </div>

        {/* Medical Disclaimer Alert */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5 mt-6">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Medical Awareness Notice</span>
          </div>
          <p>{CLINIC_DISCLAIMER.medicalDisclaimer}</p>
        </div>
      </article>
    </div>
  );
}
