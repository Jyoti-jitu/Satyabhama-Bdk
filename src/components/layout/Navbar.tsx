'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PhoneCall, Stethoscope, ChevronRight } from 'lucide-react';
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

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 glass-header shadow-sm relative">
      <div className="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-0.5 sm:p-1 min-w-0">
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md border-2 border-rose-900 group-hover:scale-105 transition-transform flex-shrink-0 bg-white p-0.5">
              <Image
                src="/images/logo.png"
                alt="Satyabhama Health Care Logo"
                fill
                sizes="(max-width: 640px) 36px, 48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:text-teal-700 transition-colors truncate">
                SATYABHAMA
              </span>
              <span className="text-[9px] sm:text-xs font-semibold tracking-wider text-rose-800 uppercase truncate">
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

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-teal-850 bg-teal-50/90 hover:bg-teal-100/90 rounded-xl border border-teal-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 min-h-[40px]"
              title="Call for schedule enquiry"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-600 animate-pulse-subtle" />
              <span>Call Clinic</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="p-2 sm:p-2.5 min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-colors"
              title="Call Clinic"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 sm:p-2.5 min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                mobileMenuOpen
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-4 relative flex items-center justify-center pointer-events-none" aria-hidden="true">
                <span
                  className={`absolute left-0 w-5 h-0.5 rounded-full bg-slate-800 transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'top-[7px] rotate-45 !bg-teal-700' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] w-5 h-0.5 rounded-full bg-slate-800 transition-all duration-200 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-5 h-0.5 rounded-full bg-slate-800 transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'top-[7px] -rotate-45 !bg-teal-700' : 'top-[14px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Popover (compact, does NOT cover entire screen) */}
      {mobileMenuOpen && (
        <>
          {/* Subtle click-outside backdrop */}
          <div
            className="fixed inset-0 z-30 lg:hidden bg-slate-900/15 backdrop-blur-[1px] animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Compact Dropdown Menu Card */}
          <div
            className="absolute right-3 sm:right-6 top-full mt-2 w-[calc(100vw-1.5rem)] max-w-[280px] sm:max-w-xs z-40 lg:hidden bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.18)] p-2 space-y-1 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Quick Menu</span>
              <span className="text-[10px] text-slate-400 font-medium">Bhadrak</span>
            </div>

            <div className="py-1 space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'text-teal-800 bg-teal-50 border border-teal-100/80 shadow-2xs'
                      : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                  role="menuitem"
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive(item.href) ? 'text-teal-600' : 'text-slate-300'}`} />
                </Link>
              ))}
            </div>

            <div className="pt-1.5 border-t border-slate-100">
              <a
                href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors min-h-[36px]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call: {CLINIC_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
