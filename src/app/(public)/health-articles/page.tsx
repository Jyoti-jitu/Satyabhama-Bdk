import React from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/data/store';
import { SITE_URL } from '@/lib/clinic-config';
import { BookOpen, Calendar, Clock, ChevronRight, User, ArrowRight } from 'lucide-react';
import { formatDateDisplay } from '@/lib/schedule-utils';

export const metadata = {
  title: 'Health Articles & Medical Guides | Satyabhama Health Care, Bhadrak',
  description:
    'Reliable health awareness articles, disease prevention tips, and specialist clinical insights curated by doctors at Satyabhama Health Care, Bhadrak.',
  alternates: {
    canonical: `${SITE_URL}/health-articles`,
  },
};

export default function HealthArticlesPage() {
  const articles = dataStore.getArticles(false);

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-[11px] sm:text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Health Awareness & Patient Education</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Medical Insights & Health Articles
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Evidence-based medical advice, chronic disease guidance, and preventive health tips curated by the doctors of Satyabhama Health Care, Bhadrak.
          </p>
        </div>
      </div>

      {/* Articles Grid - Multi-column responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-7">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-6 flex flex-col justify-between card-hover space-y-3 sm:space-y-4 group"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
                <span className="font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {art.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.read_time_minutes} min read</span>
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                <Link href={`/health-articles/${art.slug}`}>
                  {art.title}
                </Link>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium truncate max-w-[160px] sm:max-w-[180px]">
                By {art.author}
              </span>

              <Link
                href={`/health-articles/${art.slug}`}
                className="font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 min-h-[36px]"
              >
                <span>Read Full Article</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
