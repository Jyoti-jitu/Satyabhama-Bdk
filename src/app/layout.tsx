import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CLINIC_CONFIG } from '@/lib/clinic-config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Satyabhama Health Care, Bhadrak',
    default: 'Satyabhama Health Care | Multispecialty Clinic & Doctor Schedules in Bhadrak',
  },
  description:
    'Explore verified doctors, medical specialties, and up-to-date consultation schedules at Satyabhama Health Care, Nehru Stadium Road, Bhadrak, Odisha.',
  keywords: [
    'Satyabhama Health Care',
    'Bhadrak Doctors',
    'Doctor Consultation Timings Bhadrak',
    'Multispecialty Clinic Bhadrak',
    'Dr Priyaranjan Barik',
    'Nehru Stadium Bhadrak Clinic',
    'Odisha Healthcare',
  ],
  authors: [{ name: 'JOVIX Technologies', url: 'https://www.jovix.co.uk' }],
  metadataBase: new URL('https://satyabhamahealthcare.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://satyabhamahealthcare.com',
    siteName: 'Satyabhama Health Care',
    title: 'Satyabhama Health Care | Bhadrak Multispecialty Clinic',
    description:
      'Verified specialist doctors and consultation schedules in Bhadrak, Odisha. Call +91 70086 10481 for enquiries.',
    images: [
      {
        url: '/images/logo.png',
        width: 600,
        height: 600,
        alt: 'Satyabhama Health Care Logo',
      },
    ],
  },
};

import { AuthProvider } from '@/lib/auth-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Oriya:wght@400;500;600;700;800;900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased text-slate-900 bg-slate-50 selection:bg-teal-500 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
