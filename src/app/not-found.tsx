import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Stethoscope, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-rose-900 bg-white shadow-md p-0.5">
          <Image
            src="/images/logo.png"
            alt="Satyabhama Health Care Logo"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/schedule"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>View Doctor Schedules</span>
          </Link>

          <Link
            href="/doctors"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
          >
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Search Our Doctors</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Need immediate schedule assistance?{' '}
          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="text-teal-700 font-bold hover:underline"
          >
            Call {CLINIC_CONFIG.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
