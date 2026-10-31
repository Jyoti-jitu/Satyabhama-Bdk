'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/data/store';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import {
  getNextConfirmedConsultation,
} from '@/lib/schedule-utils';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import {
  Search,
  Filter,
  Stethoscope,
  Phone,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  Users,
} from 'lucide-react';

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [selectedConsultantType, setSelectedConsultantType] = useState('ALL');
  const [sortBy, setSortBy] = useState<'order' | 'name-asc' | 'name-desc' | 'experience'>('order');

  // Fetch verified & published doctors only
  const allVerifiedDoctors = dataStore.getDoctors(false);
  const schedules = dataStore.getSchedules(undefined, false);
  const exceptions = dataStore.getExceptions(undefined, false);
  const specialties = dataStore.getSpecialties();

  // Extract unique specialty names
  const specialtyOptions = useMemo(() => {
    return specialties.map((s) => s.name).sort();
  }, [specialties]);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let result = allVerifiedDoctors.filter((doc) => {
      // Search
      if (searchTerm) {
        const query = searchTerm.toLowerCase().trim();
        const normQuery = query.replace(/ll/g, 'l');
        const matchesName =
          doc.full_name.toLowerCase().includes(query) ||
          doc.full_name.toLowerCase().replace(/ll/g, 'l').includes(normQuery);
        const matchesSpec = doc.specialty_summary.toLowerCase().includes(query);
        const matchesQual = doc.qualifications.toLowerCase().includes(query);
        const matchesDesig = doc.designation?.toLowerCase().includes(query);
        if (!matchesName && !matchesSpec && !matchesQual && !matchesDesig) {
          return false;
        }
      }

      // Specialty filter
      if (selectedSpecialty !== 'ALL') {
        if (!doc.specialty_summary.toLowerCase().includes(selectedSpecialty.toLowerCase())) {
          return false;
        }
      }

      // Consultant type filter
      if (selectedConsultantType !== 'ALL') {
        if (doc.consultant_type !== selectedConsultantType) {
          return false;
        }
      }

      return true;
    });

    // Sorting: when 'order', retain the exact 1-5 clinic directory order
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.full_name.localeCompare(b.full_name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.full_name.localeCompare(a.full_name));
    } else if (sortBy === 'experience') {
      result.sort((a, b) => (b.experience_years || 0) - (a.experience_years || 0));
    }

    return result;
  }, [allVerifiedDoctors, searchTerm, selectedSpecialty, selectedConsultantType, sortBy]);

  const hasActiveFilters =
    Boolean(searchTerm) || selectedSpecialty !== 'ALL' || selectedConsultantType !== 'ALL';

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Doctors & Medical Specialists at Satyabhama Health Care, Bhadrak',
    description:
      'Verified specialist doctors consulting at Satyabhama Health Care, Stadium Road, Bhadrak, Odisha.',
    numberOfItems: allVerifiedDoctors.length,
    itemListElement: allVerifiedDoctors.map((doc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Physician',
        name: doc.full_name,
        url: `https://satyabhamahealthcare.in/doctors/${doc.slug}`,
        medicalSpecialty: doc.specialty_summary,
        qualifications: doc.qualifications,
      },
    })),
  };

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10">
      {/* Directory Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Page Header */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-[11px] sm:text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Verified Medical Directory • Bhadrak</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Our Medical Doctors & Specialists
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Explore the doctors consulting at Satyabhama Health Care. All published profiles have verified credentials and scheduled consultation timings.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs sm:text-sm">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" />
              <span>Search & Filter Doctors Directory</span>
              <span className="text-[11px] sm:text-xs font-normal text-slate-500">
                ({filteredDoctors.length} doctors found)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('ALL');
                  setSelectedConsultantType('ALL');
                  setSortBy('order');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium self-start sm:self-auto min-h-[32px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Doctor name, qualification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[40px] sm:min-h-[42px]"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-700 min-h-[40px] sm:min-h-[42px]"
              >
                <option value="ALL">All Medical Specialties</option>
                {specialtyOptions.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Consultant Type */}
            <div>
              <select
                value={selectedConsultantType}
                onChange={(e) => setSelectedConsultantType(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-700 min-h-[40px] sm:min-h-[42px]"
              >
                <option value="ALL">All Consultant Types</option>
                <option value="regular">Regular Specialists</option>
                <option value="visiting">Visiting Super-Specialists</option>
              </select>
            </div>

            {/* Sort by */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-700 min-h-[40px] sm:min-h-[42px]"
              >
                <option value="order">Directory Order</option>
                <option value="name-asc">Sort: Name (A – Z)</option>
                <option value="name-desc">Sort: Name (Z – A)</option>
                <option value="experience">Sort: Most Clinical Experience</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Users className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">No doctors match your criteria</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your specialty or search keywords. You can also contact Satyabhama Health Care reception at{' '}
              <a href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`} className="text-sky-700 font-semibold underline">
                {CLINIC_CONFIG.phone}
              </a>{' '}
              to enquire about specialist availability.
            </p>
            <div>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('ALL');
                  setSelectedConsultantType('ALL');
                  setSortBy('order');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors min-h-[38px]"
              >
                View All Doctors
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-7">
            {filteredDoctors.map((doc) => {
              const nextConsult = getNextConfirmedConsultation(
                doc,
                schedules,
                exceptions,
                specialties
              );
              return (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  nextConsultation={nextConsult}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Advisory Note */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-teal-50/80 border border-teal-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <AlertCircle className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-teal-900 leading-relaxed">
              <p className="font-bold mb-0.5">Doctor Consultation Attendance Note:</p>
              <p>
                All consultation schedules are informational and subject to emergency hospital duties. Patients are kindly requested to verify doctor arrival times with reception before travelling.
              </p>
            </div>
          </div>

          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors min-h-[40px] sm:min-h-[42px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {CLINIC_CONFIG.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
