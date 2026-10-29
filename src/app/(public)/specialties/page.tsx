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
};

export default function SpecialtiesPage() {
  const specialties = dataStore.getSpecialties();
  const doctors = dataStore.getDoctors(false);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Clinical Departments
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Medical Specialties & Services
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Satyabhama Health Care offers specialized outpatient consultations across 12 disciplines, led by experienced resident and visiting doctors in Bhadrak, Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((spec) => {
            // Find doctors matching this specialty
            const matchingDocs = doctors.filter((doc) =>
              doc.specialty_summary.toLowerCase().includes(spec.name.toLowerCase().split('&')[0].trim().toLowerCase())
            );

            return (
              <div
                key={spec.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between card-hover group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Activity className="w-6 h-6" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {spec.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>

                  {/* Matching Doctors in this specialty */}
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Consulting Doctors:
                    </span>
                    {matchingDocs.length > 0 ? (
                      <div className="space-y-1">
                        {matchingDocs.map((doc) => (
                          <Link
                            key={doc.id}
                            href={`/doctors/${doc.slug}`}
                            className="text-xs text-teal-800 hover:text-teal-950 font-medium flex items-center gap-1.5 group/doc"
                          >
                            <Stethoscope className="w-3 h-3 text-teal-600" />
                            <span className="group-hover/doc:underline">{doc.full_name}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        Visiting specialist by designated schedule.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/specialties/${spec.slug}`}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                  >
                    <span>View Specialty Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="p-1.5 text-slate-500 hover:text-teal-700 bg-slate-50 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Call for timings"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Advisory Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Unsure Which Specialist to Consult?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Contact our Bhadrak clinic desk. Our reception team will guide you to the appropriate medical specialist based on your symptoms.
            </p>
          </div>

          <a
            href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
            className="px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Call Clinic: {CLINIC_CONFIG.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
