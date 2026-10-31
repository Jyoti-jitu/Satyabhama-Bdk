'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER } from '@/lib/clinic-config';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-3 sm:pt-16 pb-3 sm:pb-12 border-t border-slate-800">
      <div className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-10 mb-2.5 sm:mb-12">
          {/* Col 1: Clinic Brand & Logo */}
          <div className="space-y-1.5 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-7 h-7 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-rose-900 bg-white flex-shrink-0 p-0.5 shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="Satyabhama Health Care Emblem"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-lg text-white tracking-tight block">
                  SATYABHAMA
                </span>
                <p className="text-[9px] sm:text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Health Care • Bhadrak
                </p>
              </div>
            </div>

            {/* Verbose description hidden on mobile to drastically reduce vertical height */}
            <p className="hidden sm:block text-sm text-slate-400 leading-relaxed">
              Dedicated multispecialty outpatient clinic offering access to verified specialists, general medicine, surgery, gynaecology, dental, and visiting super-specialist consultations in Bhadrak, Odisha.
            </p>

            <div className="pt-0 sm:pt-2">
              <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[9px] sm:text-xs text-teal-400">
                <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400 flex-shrink-0" />
                <span>Verified Specialist Consultations</span>
              </div>
            </div>
          </div>

          {/* Wrapper for Navigation & Patient Guidelines: 2-Columns on Mobile, Native Grid on Desktop */}
          <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:contents">
            {/* Col 2: Quick Links */}
            <div>
              <h3 className="text-[11px] sm:text-sm font-semibold text-white uppercase tracking-wider mb-1 sm:mb-4 border-b border-slate-800 pb-0.5 sm:pb-2">
                Navigation
              </h3>
              <ul className="space-y-0.5 sm:space-y-2.5 text-[10px] sm:text-sm">
                <li>
                  <Link href="/" className="hover:text-teal-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-teal-400 transition-colors">
                    About Clinic
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="hover:text-teal-400 transition-colors">
                    Our Doctors
                  </Link>
                </li>
                <li>
                  <Link href="/specialties" className="hover:text-teal-400 transition-colors">
                    Specialties
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-teal-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/schedule" className="hover:text-teal-400 transition-colors font-medium text-teal-300">
                    Timings
                  </Link>
                </li>
                <li>
                  <Link href="/health-articles" className="hover:text-teal-400 transition-colors">
                    Health Articles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Patient Information & Legal */}
            <div>
              <h3 className="text-[11px] sm:text-sm font-semibold text-white uppercase tracking-wider mb-1 sm:mb-4 border-b border-slate-800 pb-0.5 sm:pb-2">
                Patient Info
              </h3>
              <ul className="space-y-0.5 sm:space-y-2.5 text-[10px] sm:text-sm">
                <li>
                  <Link href="/patient-guidelines" className="hover:text-teal-400 transition-colors font-medium text-teal-300">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-teal-400 transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-teal-400 transition-colors">
                    Directions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-teal-400 transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>

              {/* Redundant notice box hidden on mobile since it's already shown in bottom disclaimer */}
              <div className="hidden sm:block mt-6 p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-slate-400 leading-normal">
                <span className="font-semibold text-amber-400 block mb-0.5">Notice:</span>
                Walk-in tokens only. Call ahead to confirm.
              </div>
            </div>
          </div>

          {/* Col 4: Verified Contact Info */}
          <div>
            <h3 className="text-[11px] sm:text-sm font-semibold text-white uppercase tracking-wider mb-1 sm:mb-4 border-b border-slate-800 pb-0.5 sm:pb-2">
              Clinic Contact
            </h3>
            <ul className="space-y-1 sm:space-y-3.5 text-[10px] sm:text-sm">
              <li className="flex items-start gap-1.5 sm:gap-3">
                <MapPin className="w-3 h-3 sm:w-5 sm:h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {CLINIC_CONFIG.address}
                </span>
              </li>

              <li className="flex items-start gap-1.5 sm:gap-3">
                <Phone className="w-3 h-3 sm:w-5 sm:h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-1">
                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="text-white hover:text-teal-400 font-semibold transition-colors text-[11px] sm:text-sm"
                  >
                    {CLINIC_CONFIG.phone}
                  </a>
                  {CLINIC_CONFIG.secondary_phone && (
                    <>
                      <span className="text-slate-500">•</span>
                      <a
                        href={`tel:${CLINIC_CONFIG.secondary_phone.replace(/\s+/g, '')}`}
                        className="text-white hover:text-teal-400 font-semibold transition-colors text-[11px] sm:text-sm"
                      >
                        {CLINIC_CONFIG.secondary_phone}
                      </a>
                    </>
                  )}
                </div>
              </li>

              <li className="flex items-start gap-1.5 sm:gap-3">
                <Clock className="w-3 h-3 sm:w-5 sm:h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {CLINIC_CONFIG.opening_hours}
                </span>
              </li>

              <li className="flex items-center gap-1.5 sm:gap-3">
                <Mail className="w-3 h-3 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                <a
                  href={`mailto:${CLINIC_CONFIG.email}`}
                  className="hover:text-teal-400 transition-colors text-slate-300 truncate"
                >
                  {CLINIC_CONFIG.email}
                </a>
              </li>
            </ul>

            <div className="mt-1 sm:mt-4">
              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-teal-400 hover:text-teal-300 font-medium"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="border-t border-slate-800/80 pt-1.5 sm:pt-6 pb-1.5 sm:pb-6 text-[9px] sm:text-xs text-slate-500 leading-normal sm:leading-relaxed text-center sm:text-left">
          <p>{CLINIC_DISCLAIMER.bookingNotice}</p>
        </div>

        {/* Copyright & Developer Credit */}
        <div className="border-t border-slate-800/60 pt-1.5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-[9px] sm:text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {CLINIC_CONFIG.clinic_name}. All rights reserved. Bhadrak, Odisha.
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            <span>Developed with</span>
            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 inline fill-rose-500" />
            <span>by</span>
            <a
              href={CLINIC_CONFIG.developer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-teal-400 font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-0.5 sm:gap-1"
            >
              <span>{CLINIC_CONFIG.developer_name}</span>
              <ExternalLink className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-slate-500" />
            </a>
            <span className="hidden md:inline text-slate-500">• {CLINIC_CONFIG.developer_tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
