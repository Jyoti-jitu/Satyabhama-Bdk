import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Location Directions | Satyabhama Health Care, Bhadrak',
  description:
    'Contact Satyabhama Health Care, located at Satyabhama Health Care Nehru Stadium, Stadium Road, Bonth Chhak, Near, Bhadrak, Odisha 756100. Call +91 70086 10481 or +91 76818 62111 for consultation information.',
  alternates: {
    canonical: 'https://satyabhamahealthcare.in/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

