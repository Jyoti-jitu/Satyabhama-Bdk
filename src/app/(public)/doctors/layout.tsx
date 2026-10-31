import type { Metadata } from 'next';
import { SITE_URL, CLINIC_CONFIG } from '@/lib/clinic-config';

export const metadata: Metadata = {
  title: 'Our Doctors & Medical Specialists in Bhadrak | Satyabhama Health Care',
  description:
    'Verified medical doctors and specialist consultants at Satyabhama Health Care, Stadium Road, Bhadrak. General Medicine, Nephrology, Diabetology, Psychiatry, Neurology, Orthopedics, General Surgery, Dermatology & ENT.',
  keywords: [
    'Doctors in Bhadrak',
    'Satyabhama Health Care Doctors',
    'Specialist Doctors Bhadrak',
    'Dr. Priya Ranjan Barik',
    'Dr. Sanjay Pany',
    'Dr. Tanmaya Padhy',
    'Dr. Subhada Pattnaik',
    'Dr. Subhransu Sekhar Lenka',
    'Dr. Dillip Kumar Chand',
    'Dr. Srikanta Acharya',
    'Dr. Sabyasachi Pati',
    'Doctor Consultation Timings Bhadrak',
  ],
  alternates: {
    canonical: `${SITE_URL}/doctors`,
  },
  openGraph: {
    title: 'Our Doctors & Medical Specialists in Bhadrak | Satyabhama Health Care',
    description:
      'Verified medical doctors and specialist consultants at Satyabhama Health Care, Stadium Road, Bhadrak. Call +91 70086 10481 for consultation availability.',
    url: `${SITE_URL}/doctors`,
    siteName: 'Satyabhama Health Care',
    images: [
      {
        url: `${SITE_URL}/images/clinic/satyabhama-official-doctor-board.jpg`,
        width: 1024,
        height: 512,
        alt: 'Official Doctor Roster Board at Satyabhama Health Care, Bhadrak',
      },
    ],
  },
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

