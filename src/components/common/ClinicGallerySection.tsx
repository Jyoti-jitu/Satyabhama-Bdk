'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ZoomIn, X, MapPin } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

export interface ClinicPhotoItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  titleOdia: string;
  location: string;
  description: string;
}

export const CLINIC_PHOTOS: ClinicPhotoItem[] = [
  {
    id: 'storefront',
    src: '/images/clinic/satyabhama-storefront-facade.jpg',
    alt: 'Satyabhama Health Care clinic storefront and pharmacy in Bhadrak',
    title: 'Clinic Entrance & Pharmacy (ଔଷଧ)',
    titleOdia: 'ପ୍ରବେଶ ଦ୍ୱାର ଓ ଔଷଧ ଦୋକାନ',
    location: 'Ground Floor, Stadium Road',
    description:
      'Ground-floor accessible clinic entrance with full in-house medicine dispensary (ଔଷଧ), patient reception counter, and specialist consultation chambers.',
  },
  {
    id: 'doctor-board',
    src: '/images/clinic/satyabhama-official-doctor-board.jpg',
    alt: 'Official doctor consultation roster signboard at Satyabhama Health Care',
    title: 'Doctor Directory Board',
    titleOdia: 'ଡାକ୍ତର ସୂଚୀ ଫଳକ',
    location: 'OPD Consultation Entrance',
    description:
      'The authentic consultation board physically mounted over the clinic entrance listing verified specialists, qualifications, and direct helpline numbers.',
  },
  {
    id: 'roadside-sign',
    src: '/images/clinic/satyabhama-roadside-signboard.jpg',
    alt: 'Roadside directional landmark signboard of Satyabhama Health Care on Stadium Road',
    title: 'Stadium Road Landmark Sign',
    titleOdia: 'ରାସ୍ତା କଡ଼ ସୂଚନା ଫଳକ',
    location: 'Near Bonth Chhak & Stadium',
    description:
      'Prominent roadside landmark pillar on Stadium Road guiding patients from Bonth Chhak and Nehru Stadium to Satyabhama Health Care.',
  },
];

interface ClinicGalleryProps {
  title?: string;
  subtitle?: string;
  showSectionHeader?: boolean;
  className?: string;
}

export function ClinicGallerySection({
  title = 'Clinic Premises & Facilities',
  subtitle = 'On-site photographs of Satyabhama Health Care on Stadium Road, Bhadrak.',
  showSectionHeader = true,
  className = '',
}: ClinicGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<ClinicPhotoItem | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
    };
    if (activePhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto]);

  return (
    <section className={`max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 ${className}`}>
      {showSectionHeader && (
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {subtitle}
          </p>
        </div>
      )}

      {/* Perfectly Symmetric 3-Column Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        {CLINIC_PHOTOS.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActivePhoto(photo);
              }
            }}
            aria-label={`View full photo: ${photo.title}`}
          >
            {/* Equal Aspect Ratio Image Container */}
            <div className="relative w-full aspect-[16/11] bg-slate-950 overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

              {/* Tap to Zoom indicator */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-[11px] sm:text-xs font-medium border border-white/20 shadow-sm group-hover:bg-teal-700 transition-colors">
                <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Zoom</span>
              </div>
            </div>

            {/* Symmetrical Card Body */}
            <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-teal-700 transition-colors">
                  {photo.title}
                </h3>
                <p className="font-odia text-xs font-semibold text-rose-700 mt-0.5">
                  {photo.titleOdia}
                </p>
              </div>

              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-700 transition-colors group cursor-pointer"
                title="View location on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate group-hover:underline">{photo.location} ↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-2 sm:p-6"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-slate-800 bg-slate-950/80 text-white">
              <div>
                <h3 className="font-bold text-sm sm:text-base">{activePhoto.title}</h3>
                <p className="text-xs text-slate-400 font-odia">{activePhoto.titleOdia} • {activePhoto.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors min-h-[32px]"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Image Container */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 text-slate-300 text-xs sm:text-sm">
              <p>{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
