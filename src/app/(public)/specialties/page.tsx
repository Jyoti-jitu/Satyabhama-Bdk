import React from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import {
  Activity,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Medical Specialties | Satyabhama Health Care, Bhadrak',
  description:
    'Explore outpatient medical specialties at Satyabhama Health Care in Bhadrak: General Medicine, Diabetes Care, Psychiatry, Orthopaedics, Surgery, Gynaecology, Neurosurgery, ENT, Dermatology, Dental & more.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/specialties',
  },
};

export default function SpecialtiesPage() {
  const specialties = dataStore.getSpecialties();
  const doctors = dataStore.getDoctors(false);

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10">
      {/* Header Banner */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-3">
            <span className="text-[11px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
              Clinical Departments
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Medical Specialties & Services
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Satyabhama Health Care offers specialized outpatient consultations across 12 disciplines, led by experienced resident and visiting doctors in Bhadrak, Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2.5 sm:gap-6">
          {specialties.map((spec) => {
            // Find doctors matching this specialty
            const matchingDocs = doctors.filter((doc) =>
              doc.specialty_summary.toLowerCase().includes(spec.name.toLowerCase().split('&')[0].trim().toLowerCase())
            );

            return (
              <div
                key={spec.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm p-2.5 sm:p-6 flex flex-col justify-between card-hover group"
              >
                <div className="space-y-2 sm:space-y-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Activity className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>

                  <div>
                    <h2 className="text-xs sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 sm:line-clamp-none">
                      {spec.name}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-2 leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {spec.description}
                    </p>
                  </div>

                  {/* Matching Doctors in this specialty */}
                  <div className="pt-2 sm:pt-3 border-t border-slate-100">
                    <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                      Consulting Doctors:
                    </span>
                    {matchingDocs.length > 0 ? (
                      <div className="space-y-0.5 sm:space-y-1">
                        {matchingDocs.slice(0, 2).map((doc) => (
                          <Link
                            key={doc.id}
                            href={`/doctors/${doc.slug}`}
                            className="text-[10px] sm:text-xs text-teal-800 hover:text-teal-950 font-medium flex items-center gap-1 sm:gap-1.5 group/doc truncate"
                          >
                            <Stethoscope className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-600 flex-shrink-0" />
                            <span className="group-hover/doc:underline truncate">{doc.full_name}</span>
                          </Link>
                        ))}
                        {matchingDocs.length > 2 && (
                          <span className="text-[9px] sm:text-[11px] text-slate-400 block">
                            +{matchingDocs.length - 2} more doctors
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-[10px] sm:text-xs text-slate-400 italic">
                        Visiting specialist by designated schedule.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2.5 sm:pt-6 mt-2 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
                  <Link
                    href={`/specialties/${spec.slug}`}
                    className="font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 min-h-[34px] sm:min-h-[38px]"
                  >
                    <span className="hidden xs:inline">Details</span>
                    <span className="xs:hidden">View</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Link>

                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="min-w-[34px] min-h-[34px] sm:min-w-[38px] sm:min-h-[38px] flex items-center justify-center text-slate-500 hover:text-teal-700 bg-slate-50 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Call for timings"
                  >
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Advisory Banner */}
      <section className="max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
          <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-2xl font-bold">Unsure Which Specialist to Consult?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Contact our Bhadrak clinic desk. Our reception team will guide you to the appropriate medical specialist based on your symptoms.
            </p>
          </div>

          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs min-h-[42px] sm:min-h-[44px] transition-colors shadow-md text-center"
          >
            <Phone className="w-4 h-4" />
            <span>Call Clinic: {CLINIC_CONFIG.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
