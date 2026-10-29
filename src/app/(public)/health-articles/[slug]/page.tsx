import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER } from '@/lib/clinic-config';
import {
  BookOpen,
  ArrowLeft,
  Clock,
  User,
  Calendar,
  AlertCircle,
  Share2,
} from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = dataStore.getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | Satyabhama Health Care`,
    description: article.summary,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = dataStore.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-10 sm:py-14 space-y-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-12 space-y-8">
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>{article.read_time_minutes} min read</span>
            </span>
            <span className="text-slate-400">•</span>
            <span>Educational Awareness</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <User className="w-4 h-4 text-slate-400" />
            <span className="font-medium">Written by {article.author}</span>
          </div>
        </div>

        {/* Lead Summary */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-teal-950 font-medium text-sm sm:text-base leading-relaxed">
          {article.summary}
        </div>

        {/* Full Content */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Medical Disclaimer Alert */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 mt-8">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <AlertCircle className="w-4 h-4 text-teal-600" />
            <span>Medical Awareness Notice</span>
          </div>
          <p>{CLINIC_DISCLAIMER.medicalDisclaimer}</p>
        </div>
      </article>
    </div>
  );
}
