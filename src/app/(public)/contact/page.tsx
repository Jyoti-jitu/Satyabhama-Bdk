'use client';

import React, { useState } from 'react';
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
    <div className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
            Contact & Directions
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Get in Touch with Satyabhama Health Care
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Reach our reception desk at Nehru Stadium, Bhadrak for consultation schedule verification, visiting specialist enquiries, and clinic directions.
          </p>
        </div>
      </div>

      {/* Main 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Verified Clinic Contact Details & Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Verified Clinic Information
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0 border border-rose-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Clinic Address</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {CLINIC_CONFIG.address}
                  </p>
                  <span className="text-[11px] text-teal-700 font-medium block mt-1">
                    Landmark: Near Bonth Chhak, adjacent to Nehru Stadium entrance
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 border border-teal-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Telephone Helpline</h3>
                  <a
                    href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-bold text-teal-700 hover:text-teal-900 block mt-1 transition-colors"
                  >
                    {CLINIC_CONFIG.phone}
                  </a>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Click to call directly from your mobile device.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Clinic Hours</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {CLINIC_CONFIG.opening_hours}
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Doctors consult in scheduled morning and evening sessions.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email Address</h3>
                  <a
                    href={`mailto:${CLINIC_CONFIG.email}`}
                    className="text-xs text-slate-600 hover:text-teal-700 block mt-1 transition-colors"
                  >
                    {CLINIC_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_CONFIG.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <span>Open in Google Maps for Navigation</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: General Enquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Clinic Communication
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              General Schedule & Service Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Have a question regarding specialist consultation days or clinic directions? Send a message to our front desk.
            </p>
          </div>

          {/* Form Booking Restriction Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> This form is for general clinic enquiries only. It does <em>not</em> book appointments or process medical emergencies. For urgent medical requirements, please visit the nearest hospital emergency department or call clinic reception at {CLINIC_CONFIG.phone}.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-teal-950">Enquiry Received</h3>
              <p className="text-xs text-teal-800 max-w-md mx-auto leading-relaxed">
                Thank you. Our clinic coordinator will review your query. If you require immediate confirmation regarding today’s doctor schedule, please call +91 70086 10481.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-teal-900 underline hover:text-teal-700"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
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
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
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
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-700"
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
                  rows={4}
                  placeholder="Please specify which specialist or timing you are enquiring about..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
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
