'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { dataStore } from '@/lib/data/store';
import { CLINIC_CONFIG } from '@/lib/clinic-config';
import {
  Lock,
  Mail,
  KeyRound,
  ShieldAlert,
  ArrowLeft,
  UserCheck,
  CheckCircle2,
  Stethoscope,
  Shield,
  FileEdit,
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginAsDemo, user } = useAuth();
  const router = useRouter();

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      if (user.role === 'doctor') {
        router.push('/dashboard/doctor');
      } else {
        router.push('/dashboard/admin');
      }
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email);
      setLoading(false);
      if (success) {
        const loggedUser = dataStore.getUserByEmail(email);
        if (loggedUser?.role === 'doctor') {
          router.push('/dashboard/doctor');
        } else {
          router.push('/dashboard/admin');
        }
      } else {
        setError('Invalid staff credentials or account is inactive.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors mx-auto block w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinic Website</span>
        </Link>

        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-rose-800 bg-white shadow-lg">
            <Image
              src="/images/logo.png"
              alt="Satyabhama Health Care Logo"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Staff & Doctor Portal
            </h1>
            <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider mt-0.5">
              Satyabhama Health Care • Bhadrak
            </p>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@satyabhama.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Quick Role-Based Access
            </span>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => loginAsDemo('super_admin')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-800">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white group-hover:text-teal-400 transition-colors block">
                      Clinic Administrator
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Full doctor, schedule, and content management
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-teal-400 font-bold">Demo Login →</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('doctor', 'doc-5')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-800">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white group-hover:text-teal-400 transition-colors block">
                      Dr. Subhada Pattnaik
                    </span>
                    <span className="text-[10px] text-slate-400">
                      MS Orthopedics • Consultant Orthopaedic Surgeon
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-teal-400 font-bold">Demo Login →</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('doctor', 'doc-3')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-800">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white group-hover:text-teal-400 transition-colors block">
                      Dr. Dilip Kumar Chand
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Orthopaedics & Joint Trauma • Doctor Portal
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-teal-400 font-bold">Demo Login →</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('doctor', 'doc-1')}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-950 text-rose-400 flex items-center justify-center border border-rose-800">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white group-hover:text-rose-400 transition-colors block">
                      Dr. Priyaranjan Barik
                    </span>
                    <span className="text-[10px] text-slate-400">
                      General Medicine & Diabetes • Doctor Portal
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-rose-400 font-bold">Demo Login →</span>
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="text-[11px] text-slate-500 text-center leading-normal">
            Authorized personnel only. All access events are audited in conformity with clinic governance standards.
          </div>
        </div>
      </div>
    </div>
  );
}
