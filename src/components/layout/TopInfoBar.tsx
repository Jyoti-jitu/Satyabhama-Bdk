'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Clock, MapPin, AlertCircle } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export function TopInfoBar() {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800/80 shadow-xs">
      <div className="max-w-[1680px] mx-auto px-1 sm:px-4 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Contact & Location */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-6">
          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-teal-300 transition-colors font-medium py-0.5"
            title="Click to call clinic for enquiry"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>{CLINIC_CONFIG.phone}</span>
          </a>

          {CLINIC_CONFIG.secondary_phone && (
            <a
              href={`tel:${CLINIC_CONFIG.secondary_phone.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-teal-300 transition-colors font-medium py-0.5 text-slate-300"
              title="Click to call clinic secondary helpline"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{CLINIC_CONFIG.secondary_phone}</span>
            </a>
          )}

          {CLINIC_CONFIG.whatsapp_url && (
            <a
              href={CLINIC_CONFIG.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium py-0.5"
              title="Chat directly on WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>
          )}

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{CLINIC_CONFIG.opening_hours}</span>
          </div>

          <a
            href={CLINIC_CONFIG.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-teal-400 transition-colors"
            title="Open Google Maps Location"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
            <span className="truncate max-w-[190px] xs:max-w-[260px] sm:max-w-none">
              Nehru Stadium, Stadium Road, Bonth Chhak, Bhadrak
            </span>
          </a>
        </div>

        {/* Right: Odia Trigger + Important Notice */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-odia-modal'));
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-amber-400/80 text-amber-300 hover:text-white hover:border-amber-300 text-[11px] font-odia font-bold transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer min-h-[28px]"
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
