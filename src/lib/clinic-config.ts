import { ClinicSettings } from '@/types';

export const SITE_URL = 'https://satyabhamahealthcare.in';

export const CLINIC_CONFIG: ClinicSettings = {
  id: 'satyabhama-clinic-settings',
  clinic_name: 'Satyabhama Health Care',
  tagline: 'Trusted Healthcare. Experienced Doctors. Better Wellbeing.',
  logo_url: '/images/logo.png',
  website_url: SITE_URL,
  address: 'Satyabhama Health Care Nehru Stadium, Stadium Road, Bonth Chhak, Near, Bhadrak, Odisha 756100',
  phone: '+91 70086 10481',
  secondary_phone: '+91 76818 62111',
  whatsapp_number: '+91 70086 10481',
  whatsapp_url: 'https://wa.me/917008610481?text=Hello%20Satyabhama%20Health%20Care%2C%20I%20would%20like%20to%20inquire%20about%20doctor%20consultations.',
  email: 'info@satyabhamahealthcare.com',
  opening_hours: 'Monday – Sunday: 8:00 AM – 9:00 PM',
  map_url: 'https://maps.app.goo.gl/H6sfq3o3obadJtPB8',
  timezone: 'Asia/Kolkata',
  developer_name: 'JOVIX Technologies',
  developer_url: 'https://www.jovix.co.uk',
  developer_tagline: 'Technology for a Brighter Tomorrow',
  announcement: 'Visiting specialist consultations must be confirmed in advance via clinic phone: +91 70086 10481.',
  updated_at: new Date().toISOString(),
};

export const CLINIC_DISCLAIMER = {
  bookingNotice: 'Please note: Satyabhama Health Care does not operate an online appointment booking system. All consultation dates and timings displayed are informational. Visitors should call the clinic directly to confirm on-duty schedules before visiting.',
  medicalDisclaimer: 'Information provided on this website is for general health awareness and schedule discovery only and does not constitute a doctor-patient relationship or direct medical advice.',
};

export function getDoctorWhatsAppUrl(doctorName: string, specialty?: string): string {
  const text = encodeURIComponent(
    `Hello Satyabhama Health Care, I would like to inquire about the consultation schedule and token availability for ${doctorName}${specialty ? ` (${specialty})` : ''}.`
  );
  return `https://wa.me/917008610481?text=${text}`;
}
