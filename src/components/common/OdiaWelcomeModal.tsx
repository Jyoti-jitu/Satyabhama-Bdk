'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Phone,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  AlertCircle,
} from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export function OdiaWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-odia-modal', handleCustomOpen);

    // Auto-open on first visit in current session after a gentle 900ms delay
    let timer: NodeJS.Timeout | null = null;
    const hasSeenModal = sessionStorage.getItem('satyabhama_odia_modal_seen');
    if (!hasSeenModal) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 900);
    }

    return () => {
      window.removeEventListener('open-odia-modal', handleCustomOpen);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('satyabhama_odia_modal_seen', 'true');
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!mounted) return null;

  return (
    <>
      {/* =========================================================================
          1. PERSISTENT FLOATING TRIGGER (CLEAN GLASS PILL: BOTTOM-RIGHT)
      ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          type="button"
          onClick={handleOpen}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl text-white border border-teal-400/50 shadow-xl hover:shadow-teal-500/25 hover:border-teal-300 hover:scale-105 active:scale-95 transition-all duration-300 animate-odia-float focus:outline-none focus:ring-2 focus:ring-teal-400"
          title="ଓଡ଼ିଆରେ ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର ସୂଚନା ଦେଖନ୍ତୁ"
          aria-label="Open Odia Welcome Modal"
        >
          {/* Pulsing indicator ring */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
          </span>

          {/* Odia text */}
          <div className="flex flex-col text-left">
            <span className="font-odia text-xs font-bold text-amber-300 leading-tight">
              ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର
            </span>
            <span className="text-[10px] text-slate-300 font-sans tracking-wide">
              ଓଡ଼ିଆରେ ସୂଚନା • ଭଦ୍ରକ
            </span>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform ml-0.5" />
        </button>
      </div>

      {/* =========================================================================
          2. POP UP ANIMATION MODAL (IN ODIA)
      ========================================================================= */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="odia-modal-title"
          onClick={handleClose}
        >
          {/* Stop propagation so clicking inside the card does not close it */}
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-odia-pop animate-odia-glow my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header Banner: Red-Burgundy & Healthcare Blue Gradient */}
            <div className="relative bg-gradient-to-br from-rose-950 via-slate-900 to-sky-950 text-white p-6 sm:p-7 text-center overflow-hidden">
              {/* Decorative background glows */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button (Top Right) */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Close Odia Greeting Popup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Clinic Emblem Logo with Golden Ring */}
              <div className="relative mx-auto mb-3 w-20 h-20 rounded-full border-4 border-amber-400/90 bg-white p-1 shadow-2xl flex-shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Satyabhama Health Care Logo"
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Cultural Odia Greeting Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-2 font-odia">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ସ୍ୱାଗତମ୍ • ଭଦ୍ରକ, ଓଡ଼ିଶା</span>
              </div>

              {/* Main Heading in Odia */}
              <h2
                id="odia-modal-title"
                className="font-odia text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug"
              >
                ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 uppercase tracking-wider">
                Satyabhama Health Care • Bhadrak
              </p>

              {/* Tagline in Odia */}
              <p className="font-odia text-xs sm:text-sm text-amber-200 mt-2 font-medium">
                ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ, ଆମର ସଂକଳ୍ପ • ଉତ୍ତମ ଚିକିତ୍ସା ଓ ବିଶ୍ୱସନୀୟ ସେବା
              </p>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-7 space-y-5 text-slate-700">
              {/* Highlight Badges Strip */}
              <div className="grid grid-cols-2 gap-3 text-xs font-odia">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-900">
                  <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span className="font-bold">୮+ ବିଶେଷଜ୍ଞ ଡାକ୍ତର</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold">ସମୟ ସାରଣୀ ଉପଲବ୍ଧ</span>
                </div>
              </div>

              {/* Clinic Key Information in Odia */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 font-odia block">
                      କ୍ଲିନିକ୍ ଠିକଣା (Address):
                    </span>
                    <span className="font-odia text-slate-600 text-xs leading-relaxed block mt-0.5">
                      ନେହେରୁ ଷ୍ଟାଡିୟମ୍ ନିକଟ, ଷ୍ଟାଡିୟମ୍ ରୋଡ୍, ବନ୍ତ ଛକ, ଭଦ୍ରକ - ୭୫୬୧୦୦
                    </span>
                    <span className="text-[11px] text-slate-500 font-sans block">
                      Near Nehru Stadium, Stadium Road, Bonth Chhak, Bhadrak
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                  <Phone className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 font-odia block">
                      ଫୋନ୍ ଯୋଗାଯୋଗ (Helpline):
                    </span>
                    <a
                      href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                      className="text-sky-800 font-bold hover:underline text-sm font-sans"
                    >
                      {CLINIC_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Informational Guidance Notice in Odia */}
              <div className="p-3.5 rounded-2xl bg-amber-50/95 border border-amber-200 text-amber-950 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 font-odia">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>ଜରୁରୀ ସୂଚନା (Patient Advisory):</span>
                </div>
                <p className="font-odia text-xs leading-relaxed pl-5 text-amber-900">
                  ଡାକ୍ତରଙ୍କ ପରାମର୍ଶ ପାଇଁ ଆସିବା ପୂର୍ବରୁ, ସେହି ଦିନର ଉପସ୍ଥିତି ନିଶ୍ଚିତ କରିବା ପାଇଁ ଦୟାକରି କ୍ଲିନିକ୍ ରେସେପ୍ସନକୁ ଫୋନ୍ କରନ୍ତୁ ।
                </p>
              </div>

              {/* Interactive Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* 1. Doctor Schedule CTA */}
                <Link
                  href="/schedule"
                  onClick={handleClose}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-sky-850 text-white font-bold text-xs sm:text-sm shadow-md transition-all font-odia group"
                >
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>ଡାକ୍ତରଙ୍କ ସମୟ ସାରଣୀ ଦେଖନ୍ତୁ (View Schedules)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* 2. Direct Call CTA */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-colors font-odia"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>କଲ୍ କରନ୍ତୁ</span>
                  </a>

                  {/* 3. Continue to Website */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors font-odia"
                  >
                    <span>ୱେବସାଇଟ୍ ଦେଖନ୍ତୁ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
