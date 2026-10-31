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
  ExternalLink,
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

  // Lock body scroll and listen for ESC key when modal is open to prevent screen overflow/bouncing
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

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
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 print:hidden max-w-[calc(100vw-24px)]">
        <button
          type="button"
          onClick={handleOpen}
          className="group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl text-white border border-teal-400/50 shadow-xl hover:shadow-teal-500/25 hover:border-teal-300 hover:scale-105 active:scale-95 transition-all duration-300 animate-odia-float focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[40px] sm:min-h-[44px] max-w-full"
          title="ଓଡ଼ିଆରେ ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର ସୂଚନା ଦେଖନ୍ତୁ"
          aria-label="Open Odia Welcome Modal"
        >
          {/* Pulsing indicator ring */}
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-amber-400" />
          </span>

          {/* Odia text */}
          <div className="flex flex-col text-left min-w-0">
            <span className="font-odia text-[11px] sm:text-xs font-bold text-amber-300 leading-tight truncate">
              ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-300 font-sans tracking-wide truncate">
              ଓଡ଼ିଆରେ ସୂଚନା • ଭଦ୍ରକ
            </span>
          </div>

          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 group-hover:rotate-12 transition-transform ml-0.5 flex-shrink-0" />
        </button>
      </div>

      {/* =========================================================================
          2. POP UP ANIMATION MODAL (IN ODIA)
      ========================================================================= */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 overflow-x-hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="odia-modal-title"
          onClick={handleClose}
        >
          {/* Stop propagation so clicking inside the card does not close it */}
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-odia-pop animate-odia-glow my-auto max-h-[88vh] sm:max-h-[92vh] flex flex-col mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header Banner: Red-Burgundy & Healthcare Blue Gradient (Compact on mobile) */}
            <div className="relative bg-gradient-to-br from-rose-950 via-slate-900 to-sky-950 text-white p-2.5 sm:p-6 text-center overflow-hidden flex-shrink-0">
              {/* Decorative background glows */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button (Top Right) */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[28px]"
                aria-label="Close Odia Greeting Popup"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Clinic Emblem Logo */}
              <div className="relative mx-auto mb-1 sm:mb-2 w-9 h-9 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400/90 bg-white p-0.5 shadow-md flex-shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Satyabhama Health Care Logo"
                    fill
                    sizes="(max-width: 640px) 36px, 64px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Cultural Odia Greeting Badge (Hidden on mobile to keep modal screen-fitting) */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-1.5 font-odia">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>ସ୍ୱାଗତମ୍ • ଭଦ୍ରକ, ଓଡ଼ିଶା</span>
              </div>

              {/* Main Heading in Odia */}
              <h2
                id="odia-modal-title"
                className="font-odia text-base sm:text-2xl font-extrabold text-white tracking-tight leading-snug"
              >
                ସତ୍ୟଭାମା ହେଲଥ୍ କେୟାର
              </h2>

              <p className="text-[9px] sm:text-xs text-slate-300 font-medium mt-0.5 uppercase tracking-wider">
                Satyabhama Health Care • Bhadrak
              </p>

              {/* Tagline in Odia (Hidden on mobile for compact fit) */}
              <p className="hidden sm:block font-odia text-xs text-amber-200 mt-1 font-medium">
                ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ, ଆମର ସଂକଳ୍ପ • ଉତ୍ତମ ଚିକିତ୍ସା ଓ ବିଶ୍ୱସନୀୟ ସେବା
              </p>
            </div>

            {/* Modal Body Content (Ultra compact on mobile to eliminate scrolling) */}
            <div className="p-2.5 sm:p-5 space-y-2 sm:space-y-3.5 text-slate-700 overflow-y-auto flex-1 min-h-0 overscroll-contain">
              {/* Highlight Badges Strip (Desktop only) */}
              <div className="hidden sm:grid grid-cols-2 gap-2.5 text-xs font-odia">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-900">
                  <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span className="font-bold">୧୦+ ବିଶେଷଜ୍ଞ ଡାକ୍ତର</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold">ସମୟ ସାରଣୀ ଉପଲବ୍ଧ</span>
                </div>
              </div>

              {/* Real Clinic Photo Preview (Desktop only to prevent mobile scroll) */}
              <div className="hidden sm:block relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  src="/images/clinic/satyabhama-storefront-facade.jpg"
                  alt="ସତ୍ୟଭାମା ହେଲ୍‌ଥ କେୟାର - ଭଦ୍ରକ"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-odia font-bold flex items-center justify-between">
                  <span>ପ୍ରବେଶ ଦ୍ୱାର ଓ ଔଷଧ କେନ୍ଦ୍ର • ଭଦ୍ରକ</span>
                  <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded-full text-[10px]">ବାସ୍ତବ ଚିତ୍ର</span>
                </div>
              </div>

              {/* Clinic Key Information in Odia */}
              <div className="space-y-1.5 sm:space-y-2.5 bg-slate-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200/80 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 font-odia block text-[11px] sm:text-xs">
                      କ୍ଲିନିକ୍ ଠିକଣା (Address):
                    </span>
                    <span className="font-odia text-slate-600 text-[10px] sm:text-xs leading-snug block mt-0.5">
                      ନେହେରୁ ଷ୍ଟାଡିୟମ୍ ନିକଟ, ଷ୍ଟାଡିୟମ୍ ରୋଡ୍, ବନ୍ତ ଛକ, ଭଦ୍ରକ - ୭୫୬୧୦୦
                    </span>
                    <a
                      href={CLINIC_CONFIG.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] sm:text-[10px] text-sky-700 font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <span>ଗୁଗଲ୍ ମ୍ୟାପ୍‌ରେ ଦେଖନ୍ତୁ (Google Maps)</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1.5 border-t border-slate-200/60">
                  <Phone className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 font-odia block text-[11px] sm:text-xs">
                      ଫୋନ୍ ଯୋଗାଯୋଗ (Helpline):
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                      <a
                        href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                        className="text-sky-800 font-bold hover:underline text-xs sm:text-sm font-sans"
                      >
                        {CLINIC_CONFIG.phone}
                      </a>
                      {CLINIC_CONFIG.secondary_phone && (
                        <>
                          <span className="text-slate-400">•</span>
                          <a
                            href={`tel:${CLINIC_CONFIG.secondary_phone.replace(/\s+/g, '')}`}
                            className="text-sky-800 font-bold hover:underline text-xs sm:text-sm font-sans"
                          >
                            {CLINIC_CONFIG.secondary_phone}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Informational Guidance Notice in Odia */}
              <div className="p-2 sm:p-3 rounded-xl bg-amber-50/95 border border-amber-200 text-amber-950 text-[10px] sm:text-xs space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 font-odia">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                  <span>ଜରୁରୀ ସୂଚନା (Patient Advisory):</span>
                </div>
                <p className="font-odia text-[10px] sm:text-xs leading-relaxed pl-5 text-amber-900">
                  ଡାକ୍ତରଙ୍କ ପରାମର୍ଶ ପାଇଁ ଆସିବା ପୂର୍ବରୁ, ଉପସ୍ଥିତି ନିଶ୍ଚିତ କରିବା ପାଇଁ ରେସେପ୍ସନକୁ ଫୋନ୍ କରନ୍ତୁ ।
                </p>
              </div>

              {/* Interactive Buttons */}
              <div className="space-y-1.5 sm:space-y-2 pt-0.5">
                {/* 1. Doctor Schedule CTA */}
                <Link
                  href="/schedule"
                  onClick={handleClose}
                  className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-sky-850 text-white font-bold text-xs sm:text-sm shadow-sm transition-all font-odia group min-h-[36px] sm:min-h-[40px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>ଡାକ୍ତରଙ୍କ ସମୟ ସାରଣୀ (View Schedules)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* 2. Direct Call CTA */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-[11px] sm:text-xs shadow-xs transition-colors font-odia min-h-[34px]"
                  >
                    <Phone className="w-3 h-3" />
                    <span>କଲ୍ କରନ୍ତୁ</span>
                  </a>

                  {/* 3. Continue to Website */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] sm:text-xs transition-colors font-odia min-h-[34px]"
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
