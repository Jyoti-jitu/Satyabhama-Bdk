'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, PhoneCall, UserCheck, Stethoscope, ChevronRight } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Specialties', href: '/specialties' },
  { label: 'Services', href: '/services' },
  { label: 'Consultation Timings', href: '/schedule' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 glass-header shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-rose-900 group-hover:scale-105 transition-transform flex-shrink-0 bg-white">
              <Image
                src="/images/logo.png"
                alt="Satyabhama Health Care Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
                SATYABHAMA
              </span>
              <span className="text-xs font-semibold tracking-wider text-rose-800 uppercase">
                Health Care • Bhadrak
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-teal-800 bg-teal-50 border border-teal-200/60 shadow-2xs'
                    : 'text-slate-600 hover:text-teal-700 hover:bg-slate-100/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-teal-850 bg-teal-50/90 hover:bg-teal-100/90 rounded-xl border border-teal-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              title="Call for schedule enquiry"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-600 animate-pulse-subtle" />
              <span>Call Clinic</span>
            </a>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Staff Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="p-2 text-teal-700 bg-teal-50 rounded-lg border border-teal-200"
              title="Call Clinic"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="py-2 mb-2 border-b border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Bhadrak Multispecialty Outpatient Clinic</p>
            <p className="text-xs text-slate-700 font-semibold">{CLINIC_CONFIG.address}</p>
          </div>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(item.href)
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-sm shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Clinic: {CLINIC_CONFIG.phone}</span>
            </a>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-sm shadow-sm transition-colors"
            >
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Doctor & Staff Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
