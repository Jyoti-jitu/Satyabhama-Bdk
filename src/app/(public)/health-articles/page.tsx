import React from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/data/store';
import { BookOpen, Calendar, Clock, ChevronRight, User, ArrowRight } from 'lucide-react';
import { formatDateDisplay } from '@/lib/schedule-utils';

export const metadata = {
  title: 'Health Articles & Medical Advice | Satyabhama Health Care, Bhadrak',
  description:
    'Reliable health awareness articles, disease prevention tips, and medical insights written by the clinical advisory board of Satyabhama Health Care, Bhadrak.',
};

export default function HealthArticlesPage() {
  const articles = dataStore.getArticles(false);

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Health Awareness & Patient Education</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Medical Insights & Health Articles
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Evidence-based medical advice, chronic disease guidance, and preventive health tips curated by the doctors of Satyabhama Health Care, Bhadrak.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between card-hover space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {art.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.read_time_minutes} min read</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                <Link href={`/health-articles/${art.slug}`}>
                  {art.title}
                </Link>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium truncate max-w-[180px]">
                By {art.author}
              </span>

              <Link
                href={`/health-articles/${art.slug}`}
                className="font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
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
