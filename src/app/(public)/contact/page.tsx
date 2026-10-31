'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CLINIC_CONFIG, CLINIC_DISCLAIMER } from '@/lib/clinic-config';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Schedule Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission to enquiry store
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Schedule Enquiry',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="py-6 sm:py-12 space-y-6 sm:space-y-10 max-w-[1680px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-bold text-teal-400 uppercase tracking-wider">
            Contact & Directions
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Get in Touch with Satyabhama Health Care
          </h1>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Reach our reception desk at Nehru Stadium, Bhadrak for consultation schedule verification, visiting specialist enquiries, and clinic directions.
          </p>
        </div>
      </div>

      {/* Main 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
        {/* Left Column: Verified Clinic Contact Details & Map */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2.5 sm:pb-3">
              Verified Clinic Information
            </h2>

            <div className="space-y-3.5 sm:space-y-5 text-xs sm:text-sm">
              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-3.5 hover:bg-slate-50/80 p-1.5 -m-1.5 rounded-xl transition-colors group"
                title="View on Google Maps"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0 border border-rose-100 group-hover:bg-rose-100 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Clinic Address</h3>
                  <p className="text-xs text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                    {CLINIC_CONFIG.address}
                  </p>
                  <span className="text-[11px] text-teal-700 font-medium block mt-0.5 sm:mt-1 underline">
                    Landmark: Near Bonth Chhak, adjacent to Nehru Stadium entrance • Open in Maps ↗
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 border border-teal-100">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Telephone Helplines</h3>
                  <div className="space-y-0.5 sm:space-y-1 mt-0.5 sm:mt-1">
                    <a
                      href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 block transition-colors"
                    >
                      {CLINIC_CONFIG.phone}
                    </a>
                    {CLINIC_CONFIG.secondary_phone && (
                      <a
                        href={`tel:${CLINIC_CONFIG.secondary_phone.replace(/\s+/g, '')}`}
                        className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 block transition-colors"
                      >
                        {CLINIC_CONFIG.secondary_phone}
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block mt-0.5 sm:mt-1">
                    Official numbers printed on clinic signboards. Tap to call directly.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Clinic Hours</h3>
                  <p className="text-xs text-slate-600 mt-0.5 sm:mt-1">
                    {CLINIC_CONFIG.opening_hours}
                  </p>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block mt-0.5">
                    Doctors consult in scheduled morning and evening sessions.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email Address</h3>
                  <a
                    href={`mailto:${CLINIC_CONFIG.email}`}
                    className="text-xs text-slate-600 hover:text-teal-700 block mt-0.5 sm:mt-1 transition-colors"
                  >
                    {CLINIC_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm min-h-[42px] sm:min-h-[44px]"
              >
                <span>Open in Google Maps for Navigation</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Physical Clinic Frontage & Landmark Card */}
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] sm:text-xs font-bold text-teal-700 hover:text-teal-900 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                title="View location on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Physical Clinic Frontage • View Location ↗</span>
              </a>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm sm:shadow-md bg-slate-50">
              <Image
                src="/images/clinic/satyabhama-clinic-frontage.png"
                alt="Satyabhama Healthcare Clinic Frontage & In-House Pharmacy (ଔଷଧ) - Nehru Stadium Road, near Bonth Chhak, Bhadrak"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
                priority
              />
            </div>

            <div className="pt-0.5 text-xs text-slate-600 space-y-0.5 sm:space-y-1">
              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                Physical Storefront &amp; Pharmacy (ଔଷଧ)
              </p>
              <p className="text-slate-500 text-[11px] sm:text-xs">
                Nehru Stadium Road, near Bonth Chhak, Bhadrak • Call: <strong className="text-slate-800">{CLINIC_CONFIG.phone}</strong>
                {CLINIC_CONFIG.secondary_phone && (
                  <span> / <strong className="text-slate-800">{CLINIC_CONFIG.secondary_phone}</strong></span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: General Enquiry Form */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4 sm:space-y-6">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-teal-700 uppercase tracking-wider">
              Clinic Communication
            </span>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              General Schedule & Service Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Have a question regarding specialist consultation days or clinic directions? Send a message to our front desk.
            </p>
          </div>

          {/* Form Booking Restriction Alert */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200 text-[11px] sm:text-xs text-amber-900 flex items-start gap-2 sm:gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> This form is for general clinic enquiries only. It does <em>not</em> book appointments or process medical emergencies. For urgent medical requirements, please visit the nearest hospital emergency department or call clinic reception at {CLINIC_CONFIG.phone}.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-teal-950">Enquiry Received</h3>
              <p className="text-xs text-teal-800 max-w-md mx-auto leading-relaxed">
                Thank you. Our clinic coordinator will review your query. If you require immediate confirmation regarding today’s doctor schedule, please call +91 70086 10481.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-teal-900 underline hover:text-teal-700 min-h-[38px] inline-flex items-center"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-base sm:text-sm min-h-[40px] sm:min-h-[42px] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-base sm:text-sm min-h-[40px] sm:min-h-[42px] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-base sm:text-sm min-h-[40px] sm:min-h-[42px] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-base sm:text-sm min-h-[40px] sm:min-h-[42px] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-700"
                >
                  <option value="General Schedule Enquiry">Doctor Schedule Enquiry</option>
                  <option value="Visiting Specialist Timings">Visiting Specialist Timings</option>
                  <option value="Clinic Directions & Landmark">Clinic Directions & Landmark</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Please specify which specialist or timing you are enquiring about..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm min-h-[42px] sm:min-h-[44px] shadow-md transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting Enquiry...' : 'Submit Enquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
