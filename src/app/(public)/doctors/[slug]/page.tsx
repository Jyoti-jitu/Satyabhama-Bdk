import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER, SITE_URL } from '@/lib/clinic-config';
import {
  getDayName,
  formatTimeRange,
  formatDateDisplay,
  calculateUpcomingConsultations,
} from '@/lib/schedule-utils';
import { StatusBadge } from '@/components/schedule/StatusBadge';
import { DOCTOR_TIMINGS } from '@/lib/data/doctor-timings';
import { DOCTOR_SEO_MAP, getDoctorSEO } from '@/lib/data/doctor-seo';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Phone,
  Award,
  Globe,
  ArrowLeft,
  AlertCircle,
  FileText,
  MapPin,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Building2,
  UserCheck,
} from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';

interface DoctorProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DoctorProfilePageProps) {
  const { slug } = await params;
  const doctor = dataStore.getDoctorBySlug(slug, false);
  const seo = getDoctorSEO(slug);

  if (!doctor) return { title: 'Doctor Not Found | Satyabhama Health Care' };

  const title =
    seo?.titleTag ||
    `${doctor.full_name} – ${doctor.specialty_summary} in Bhadrak | Satyabhama Health Care`;

  const description =
    seo?.metaDescription ||
    `Find consultation information for ${doctor.full_name} (${doctor.qualifications}), specialist in ${doctor.specialty_summary} at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481 to confirm availability.`;

  const canonicalUrl = `${SITE_URL}/doctors/${doctor.slug}`;
  const imageUrl = doctor.profile_image_url
    ? `${SITE_URL}${doctor.profile_image_url}`
    : `${SITE_URL}/images/clinic/satyabhama-official-doctor-board.jpg`;

  return {
    title,
    description,
    keywords: seo?.targetKeywords || [
      doctor.full_name,
      `${doctor.full_name} Bhadrak`,
      `${doctor.specialty_summary} in Bhadrak`,
      `Satyabhama Health Care ${doctor.full_name}`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'profile',
      siteName: 'Satyabhama Health Care',
      images: [
        {
          url: imageUrl,
          width: 1024,
          height: 1024,
          alt: `${doctor.full_name} - ${doctor.specialty_summary}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DoctorProfilePage({ params }: DoctorProfilePageProps) {
  const { slug } = await params;
  const doctor = dataStore.getDoctorBySlug(slug, false);

  if (!doctor) {
    notFound();
  }

  const seo = getDoctorSEO(slug);
  const weeklySchedules = dataStore.getSchedules(doctor.id, false);
  const exceptions = dataStore.getExceptions(doctor.id, false);
  const specialties = dataStore.getSpecialties();
  const timingInfo = DOCTOR_TIMINGS.find(
    (t) => t.id === doctor.id || t.slug === doctor.slug
  );

  // Find related specialty
  const relatedSpecialty = specialties.find(
    (s) =>
      s.slug === seo?.specialtySlug ||
      doctor.specialty_summary.toLowerCase().includes(s.name.toLowerCase())
  );

  // Find related health article
  const allArticles = dataStore.getArticles(false);
  const relatedArticle = seo?.relatedArticleSlug
    ? allArticles.find((a) => a.slug === seo.relatedArticleSlug)
    : allArticles.find((a) => a.related_doctor_slug === doctor.slug);

  // Sort weekly schedules
  const sortedWeekly = [...weeklySchedules].sort((a, b) => {
    const dayA = a.day_of_week === 0 ? 7 : a.day_of_week;
    const dayB = b.day_of_week === 0 ? 7 : b.day_of_week;
    if (dayA !== dayB) return dayA - dayB;
    return a.start_time.localeCompare(b.start_time);
  });

  // Calculate upcoming 21 days dates for this doctor
  const upcomingConsultations = calculateUpcomingConsultations(
    [doctor],
    weeklySchedules,
    exceptions,
    specialties,
    21
  );

  // Construct Schema.org JSON-LD graph
  const clinicId = `${SITE_URL}/#clinic`;
  const doctorId = `${SITE_URL}/doctors/${doctor.slug}/#physician`;
  const pageId = `${SITE_URL}/doctors/${doctor.slug}`;

  const affiliationData =
    doctor.consultant_type === 'visiting'
      ? {
          memberOf: [
            { '@id': clinicId },
            ...(seo?.affiliations || []).map((aff) => ({
              '@type': 'MedicalOrganization',
              name: aff,
            })),
          ],
        }
      : {
          worksFor: { '@id': clinicId },
        };

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Medical Clinic
      {
        '@type': 'MedicalClinic',
        '@id': clinicId,
        name: 'Satyabhama Health Care',
        alternateName: 'ସତ୍ୟଭାମା ହେଲ୍‌ଥ କେୟାର',
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        image: `${SITE_URL}/images/clinic/satyabhama-storefront-facade.jpg`,
        telephone: CLINIC_CONFIG.phone,
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Nehru Stadium, Stadium Road, near Bonth Chhak',
          addressLocality: 'Bhadrak',
          addressRegion: 'Odisha',
          postalCode: '756100',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 21.0574,
          longitude: 86.5025,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '08:00',
            closes: '21:00',
          },
        ],
      },

      // 2. Physician Entity
      {
        '@type': ['Person', 'Physician'],
        '@id': doctorId,
        name: doctor.full_name,
        jobTitle: seo?.professionalRole || doctor.designation || doctor.specialty_summary,
        medicalSpecialty: seo?.medicalSpecialtySchema || 'GeneralPractice',
        qualifications: doctor.qualifications,
        description: doctor.biography,
        image: doctor.profile_image_url
          ? `${SITE_URL}${doctor.profile_image_url}`
          : `${SITE_URL}/images/clinic/satyabhama-official-doctor-board.jpg`,
        telephone: CLINIC_CONFIG.phone,
        url: pageId,
        workLocation: {
          '@id': clinicId,
        },
        ...affiliationData,
        knowsLanguage: doctor.languages,
      },

      // 3. BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageId}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Our Doctors',
            item: `${SITE_URL}/doctors`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: doctor.full_name,
            item: pageId,
          },
        ],
      },

      // 4. WebPage
      {
        '@type': 'MedicalWebPage',
        '@id': pageId,
        url: pageId,
        name: seo?.titleTag || `${doctor.full_name} – Satyabhama Health Care`,
        description: seo?.metaDescription || doctor.biography,
        about: { '@id': doctorId },
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'Satyabhama Health Care',
          url: SITE_URL,
        },
        breadcrumb: { '@id': `${pageId}#breadcrumb` },
      },

      // 5. FAQPage (if FAQs present)
      ...(seo?.faqs && seo.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${pageId}#faq`,
              mainEntity: seo.faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumb Navigation (SEO Entity Association) */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <li>
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li>
            <Link href="/doctors" className="hover:text-teal-700 transition-colors">
              Our Doctors
            </Link>
          </li>
          {relatedSpecialty && (
            <>
              <li className="text-slate-300">/</li>
              <li>
                <Link
                  href={`/specialties/${relatedSpecialty.slug}`}
                  className="hover:text-teal-700 transition-colors"
                >
                  {relatedSpecialty.name}
                </Link>
              </li>
            </>
          )}
          <li className="text-slate-300">/</li>
          <li className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none">
            {doctor.full_name}
          </li>
        </ol>
      </nav>

      {/* Main Profile Header Card - Text-First Medical Credentials */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
          <div>
            {/* Category & Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
              <span
                className={`capitalize text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full ${
                  doctor.consultant_type === 'visiting'
                    ? 'bg-rose-900 text-rose-100'
                    : 'bg-slate-900 text-white'
                }`}
              >
                {doctor.consultant_type === 'visiting'
                  ? 'Visiting Super-Specialist'
                  : 'Resident Consultant'}
              </span>

              {relatedSpecialty ? (
                <Link
                  href={`/specialties/${relatedSpecialty.slug}`}
                  className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
                >
                  {doctor.specialty_summary}
                </Link>
              ) : (
                <span className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {doctor.specialty_summary}
                </span>
              )}

              {doctor.experience_years && (
                <span className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>{doctor.experience_years}+ Years Experience</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] sm:text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Verified Specialist</span>
              </span>

              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Satyabhama Health Care, Bhadrak</span>
              </span>
            </div>

            {/* H1 Full Doctor Name (SEO Primary Target) */}
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {doctor.full_name}
            </h1>

            {/* Qualifications */}
            <p className="text-sm sm:text-lg font-bold text-teal-800 mt-1 sm:mt-1.5">
              {doctor.qualifications}
            </p>

            {/* Designation / Institutional Affiliation */}
            {(seo?.professionalRole || doctor.designation) && (
              <p className="text-xs sm:text-base text-slate-600 font-medium mt-0.5 sm:mt-1">
                {seo?.professionalRole || doctor.designation}
              </p>
            )}
          </div>

          {/* Verified Institutional Affiliations */}
          {seo?.affiliations && seo.affiliations.length > 0 && (
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Verified Professional Affiliations & Medical Centers:</span>
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                {seo.affiliations.map((aff, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs text-[11px] sm:text-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{aff}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medical Registration & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-3 sm:py-4 border-y border-slate-100 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 block">Medical Registration</span>
                <span className="text-slate-500">
                  {doctor.medical_registration_details || 'Verified with Odisha Medical Council'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 block">Consultation Languages</span>
                <span className="text-slate-500">{doctor.languages.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 block">OPD Location</span>
                <span className="text-slate-500">Satyabhama Health Care, Bhadrak</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <UserCheck className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 block">Consultation Mode</span>
                <span className="text-slate-500">In-Person OPD & Clinic Visit</span>
              </div>
            </div>
          </div>

          {/* Professional Biography */}
          <div className="space-y-1.5 sm:space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Professional Background & Clinical Scope
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {doctor.biography}
            </p>
          </div>

          {/* Direct Call & Token Issuance Action Strip */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm min-h-[42px] sm:min-h-[44px] shadow-md transition-all text-center"
              title={`Call clinic reception to confirm ${doctor.full_name}'s consultation slot`}
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>Call Clinic to Confirm Timings: {CLINIC_CONFIG.phone}</span>
            </a>

            {CLINIC_CONFIG.secondary_phone && (
              <a
                href={`tel:${CLINIC_CONFIG.secondary_phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs min-h-[42px] sm:min-h-[44px] border border-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Alt: {CLINIC_CONFIG.secondary_phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Two-Column Consultation Schedule Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left Column: Weekly Schedule & Availability Guidance */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4 sm:space-y-5">
          <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
              Consultation Timetable
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Regular Consultation Schedule
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified clinic timings at Satyabhama Health Care, Bhadrak.
            </p>
          </div>

          {/* Official Timing Banner */}
          {timingInfo && (
            <div className="bg-sky-50/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-sky-200/90 space-y-2 sm:space-y-2.5">
              <span className="text-[10px] font-bold text-sky-850 uppercase tracking-wider block">
                Official Roster Summary
              </span>
              <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {timingInfo.displayLabel}
              </div>

              <div className="space-y-1 pt-1.5 border-t border-sky-200/60 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span className="font-medium">{timingInfo.availability}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  {timingInfo.timingUnspecified ? (
                    <span className="font-semibold text-sky-700">
                      Contact Clinic Reception for Hours
                    </span>
                  ) : (
                    <span>{timingInfo.timing}</span>
                  )}
                </div>
              </div>

              {timingInfo.importantInstruction && (
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold leading-tight">
                    {timingInfo.importantInstruction}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Sorted Weekly Days */}
          {sortedWeekly.length === 0 ? (
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Visiting Specialist Schedule:</p>
              <p>
                Consultations take place on designated weekly or monthly announced dates. Please contact reception at +91 70086 10481 to confirm upcoming sessions.
              </p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {sortedWeekly.map((sch) => (
                <div
                  key={sch.id}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {getDayName(sch.day_of_week)}
                      </span>
                      <span className="text-[11px] text-slate-500 capitalize">
                        {sch.session_type} Session
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold text-slate-800 block">
                      {formatTimeRange(sch.start_time, sch.end_time)}
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium">
                      Regular OPD Slot
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clinical Focus Points */}
          {seo?.clinicalFocus && (
            <div className="pt-2 border-t border-slate-100 space-y-1.5 sm:space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Clinical Focus & Evaluated Conditions:
              </h3>
              <ul className="space-y-1 sm:space-y-1.5 text-xs text-slate-600">
                {seo.clinicalFocus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Confirmed Consultation Dates & Clinic Map Context */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4 sm:space-y-5">
            <div className="border-b border-slate-100 pb-2.5 sm:pb-3 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
              <div>
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                  Next 14 Days
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Upcoming Confirmed Dates
                </h2>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500">
                Timezone: IST (Asia/Kolkata)
              </span>
            </div>

            {upcomingConsultations.length === 0 ? (
              <div className="p-6 sm:p-8 text-center bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 space-y-2">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600 font-medium">
                  No active consultation slots scheduled in the next 14 days.
                </p>
                <p className="text-xs text-slate-400">
                  Call +91 70086 10481 for upcoming specialist date confirmations.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 sm:space-y-3">
                {upcomingConsultations.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 sm:p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3"
                  >
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                          {formatDateDisplay(item.date)}
                        </span>
                        <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                          ({item.day_name})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>
                          {item.status_label === 'Cancelled'
                            ? 'Consultation Cancelled'
                            : formatTimeRange(item.start_time, item.end_time)}
                        </span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-1">
                          {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <StatusBadge status={item.status_label} />
                      <span className="text-[10px] sm:text-[11px] text-slate-400">
                        {item.is_exception ? 'Date-specific notice' : 'Recurring slot'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Last Updated */}
            <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-400">
              <span>
                Verified on clinic directory: {new Date(doctor.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="text-teal-700 font-medium">Status: Published & Verified</span>
            </div>
          </div>

          {/* Related Health Article Spotlight */}
          {relatedArticle && (
            <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-teal-200/80 shadow-xs space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-teal-900 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>Related Clinical Health Guide</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 hover:text-teal-800 transition-colors">
                <Link href={`/health-articles/${relatedArticle.slug}`}>
                  {relatedArticle.title}
                </Link>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {relatedArticle.summary}
              </p>
              <div className="pt-0.5">
                <Link
                  href={`/health-articles/${relatedArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950"
                >
                  <span>Read full clinical guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Doctor-to-Clinic SEO Architecture Hub Links */}
      <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-3 sm:space-y-4">
        <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
          <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
            Clinic Navigation & Connections
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Explore Satyabhama Health Care Services in Bhadrak
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
          <Link
            href="/"
            className="p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center justify-between group min-h-[44px]"
          >
            <div>
              <span className="font-bold text-slate-900 block group-hover:text-teal-800">
                Clinic Homepage
              </span>
              <span className="text-[11px] text-slate-500">Satyabhama Health Care</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/doctors"
            className="p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center justify-between group min-h-[44px]"
          >
            <div>
              <span className="font-bold text-slate-900 block group-hover:text-teal-800">
                Our Doctors Directory
              </span>
              <span className="text-[11px] text-slate-500">10 Verified Specialists</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/schedule"
            className="p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center justify-between group min-h-[44px]"
          >
            <div>
              <span className="font-bold text-slate-900 block group-hover:text-teal-800">
                Consultation Timings
              </span>
              <span className="text-[11px] text-slate-500">Daily & Special Clinics</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center justify-between group min-h-[44px]"
          >
            <div>
              <span className="font-bold text-slate-900 block group-hover:text-teal-800">
                Contact & Directions
              </span>
              <span className="text-[11px] text-slate-500">Stadium Road, Bhadrak</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions (SEO Keyword Rich) */}
      {seo?.faqs && seo.faqs.length > 0 && (
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-4 sm:space-y-6">
          <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
              Patient Inquiries
            </span>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions About {doctor.full_name} Consultations
            </h2>
          </div>

          <FaqAccordion items={seo.faqs} columns={1} variant="subtle" defaultOpenIndex={null} />
        </section>
      )}

      {/* Informational Consultation Notice */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-800 text-xs space-y-1.5 sm:space-y-2">
        <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Informational Schedule Notice • Satyabhama Health Care</span>
        </h3>
        <p className="leading-relaxed text-[11px] sm:text-xs">
          {CLINIC_DISCLAIMER.bookingNotice}
        </p>
        <p className="text-slate-400 text-[11px] sm:text-xs">
          Clinic Telephone Helplines:{' '}
          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="text-teal-400 font-bold underline"
          >
            {CLINIC_CONFIG.phone}
          </a>
          {CLINIC_CONFIG.secondary_phone && (
            <>
              {' / '}
              <a
                href={`tel:${CLINIC_CONFIG.secondary_phone.replace(/\s+/g, '')}`}
                className="text-teal-400 font-bold underline"
              >
                {CLINIC_CONFIG.secondary_phone}
              </a>
            </>
          )}
          {' • '}Nehru Stadium, Stadium Road, near Bonth Chhak, Bhadrak, Odisha 756100.
        </p>
      </div>
    </div>
  );
}
