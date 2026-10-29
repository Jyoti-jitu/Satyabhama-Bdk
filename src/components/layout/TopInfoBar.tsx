'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Clock, MapPin, AlertCircle } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export function TopInfoBar() {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Contact & Location */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-teal-300 transition-colors font-medium"
            title="Click to call clinic for enquiry"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>{CLINIC_CONFIG.phone}</span>
          </a>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{CLINIC_CONFIG.opening_hours}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span className="truncate max-w-[260px] sm:max-w-none">
              Nehru Stadium, Bonth Chhak, Bhadrak
            </span>
          </div>
        </div>

        {/* Right: Odia Trigger + Important Notice */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-odia-modal'));
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800/90 border border-amber-400/80 text-amber-300 hover:text-white hover:border-amber-300 text-[11px] font-odia font-bold transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="ଓଡ଼ିଆରେ ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର ସୂଚନା ଦେଖନ୍ତୁ"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର</span>
            <span className="text-[10px] text-amber-200 font-sans font-normal">(ଓଡ଼ିଆ)</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-amber-200 bg-amber-950/40 border border-amber-800/40 px-3 py-0.5 rounded-full text-[11px]">
            <AlertCircle className="w-3 h-3 flex-shrink-0 animate-pulse-subtle text-amber-400" />
            <span className="truncate max-w-[280px] lg:max-w-none">
              Informational Schedule • Call to confirm
            </span>
            <Link
              href="/schedule"
              className="underline hover:text-white transition-colors ml-1 font-semibold text-amber-300"
            >
              Timings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
