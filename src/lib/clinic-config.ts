import { ClinicSettings } from '@/types';

export const CLINIC_CONFIG: ClinicSettings = {
  id: 'satyabhama-clinic-settings',
  clinic_name: 'Satyabhama Health Care',
  tagline: 'Trusted Healthcare. Experienced Doctors. Better Wellbeing.',
  logo_url: '/images/logo.png',
  address: 'Nehru Stadium, Stadium Road, near Bonth Chhak, Bhadrak, Odisha 756100, India',
  phone: '+91 70086 10481',
  secondary_phone: '+91 70086 10481',
  email: 'info@satyabhamahealthcare.com',
  opening_hours: 'Monday – Sunday: 8:00 AM – 9:00 PM',
  map_url: 'https://maps.google.com/?q=Nehru+Stadium+Bhadrak+Odisha+756100',
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
