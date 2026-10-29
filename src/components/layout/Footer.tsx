'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER } from '@/lib/clinic-config';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Clinic Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-rose-800 bg-white flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Satyabhama Health Care Emblem"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">
                  SATYABHAMA
                </span>
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  Health Care • Bhadrak
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Dedicated multispecialty outpatient clinic offering access to verified specialists, general medicine, surgery, gynaecology, dental, and visiting super-specialist consultations in Bhadrak, Odisha.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-teal-400">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Verified Specialist Consultations</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About the Clinic
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-teal-400 transition-colors">
                  Our Doctors Directory
                </Link>
              </li>
              <li>
                <Link href="/specialties" className="hover:text-teal-400 transition-colors">
                  Medical Specialties
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition-colors">
                  Clinic Services
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-teal-400 transition-colors font-medium text-teal-300">
                  Doctor Consultation Timings
                </Link>
              </li>
              <li>
                <Link href="/health-articles" className="hover:text-teal-400 transition-colors">
                  Health Information & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Patient Information & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Patient Guidelines
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="hover:text-teal-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact & Route Directions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-teal-400 transition-colors text-slate-400">
                  Doctor & Staff Login
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-slate-400 leading-normal">
              <span className="font-semibold text-amber-400 block mb-1">Notice:</span>
              No online appointment booking is operated. Please call ahead to confirm daily doctor availability.
            </div>
          </div>

          {/* Col 4: Verified Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Clinic Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {CLINIC_CONFIG.address}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <a
                  href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-teal-400 font-semibold transition-colors"
                >
                  {CLINIC_CONFIG.phone}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {CLINIC_CONFIG.opening_hours}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <a
                  href={`mailto:${CLINIC_CONFIG.email}`}
                  className="hover:text-teal-400 transition-colors text-slate-300"
                >
                  {CLINIC_CONFIG.email}
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-medium"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="border-t border-slate-800 pt-6 pb-6 text-xs text-slate-500 leading-relaxed text-center sm:text-left">
          <p>{CLINIC_DISCLAIMER.bookingNotice}</p>
        </div>

        {/* Copyright & Developer Credit */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {CLINIC_CONFIG.clinic_name}. All rights reserved. Bhadrak, Odisha.
          </div>

          <div className="flex items-center gap-1.5">
            <span>Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span>by</span>
            <a
              href={CLINIC_CONFIG.developer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-teal-400 font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>{CLINIC_CONFIG.developer_name}</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <span className="hidden md:inline text-slate-500">• {CLINIC_CONFIG.developer_tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
