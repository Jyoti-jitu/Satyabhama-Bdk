import {
  Announcement,
  AuditLog,
  ClinicSettings,
  Doctor,
  DoctorChangeRequest,
  DoctorSchedule,
  FAQItem,
  HealthArticle,
  ScheduleException,
  Specialty,
  UserProfile,
} from '@/types';
import { CLINIC_CONFIG } from '../clinic-config';

export const INITIAL_SPECIALTIES: Specialty[] = [
  {
    id: 'spec-general-medicine',
    name: 'General Medicine',
    slug: 'general-medicine',
    description: 'Comprehensive medical care, diagnostic evaluation, fever, diabetes, hypertension, and systemic diseases.',
    icon: 'Stethoscope',
    publication_status: 'published',
  },
  {
    id: 'spec-diabetes-care',
    name: 'Diabetes Care',
    slug: 'diabetes-care',
    description: 'Specialized glycemic control, diabetic neuropathy, preventive screening, lifestyle guidance, and insulin management.',
    icon: 'Activity',
    publication_status: 'published',
  },
  {
    id: 'spec-psychiatry',
    name: 'Psychiatry & Mental Health',
    slug: 'psychiatry',
    description: 'Evidence-based care for anxiety, depression, mood disorders, cognitive health, stress management, and behavioral wellness.',
    icon: 'Brain',
    publication_status: 'published',
  },
  {
    id: 'spec-orthopaedics',
    name: 'Orthopaedics & Trauma',
    slug: 'orthopaedics',
    description: 'Treatment for bone fractures, arthritis, joint pain, spinal conditions, sports injuries, and musculoskeletal health.',
    icon: 'Bone',
    publication_status: 'published',
  },
  {
    id: 'spec-general-surgery',
    name: 'General & Laparoscopic Surgery',
    slug: 'general-surgery',
    description: 'Consultations for hernia, gallbladder, abdominal disorders, soft tissue swellings, and minimally invasive procedures.',
    icon: 'Scissors',
    publication_status: 'published',
  },
  {
    id: 'spec-gynaecology',
    name: 'Gynaecology & Obstetrics',
    slug: 'gynaecology',
    description: "Comprehensive women's healthcare, antenatal checkups, menstrual health, fertility evaluations, and menopause care.",
    icon: 'HeartHandshake',
    publication_status: 'published',
  },
  {
    id: 'spec-neurosurgery',
    name: 'Neurosurgery & Spine',
    slug: 'neurosurgery',
    description: 'Specialist consultations for brain and spinal cord disorders, sciatica, nerve compressions, and neurotrauma advisory.',
    icon: 'ShieldAlert',
    publication_status: 'published',
  },
  {
    id: 'spec-ent',
    name: 'ENT (Otorhinolaryngology)',
    slug: 'ent',
    description: 'Clinical evaluation of hearing loss, ear infections, sinus disorders, tonsillitis, vertigo, and throat ailments.',
    icon: 'Ear',
    publication_status: 'published',
  },
  {
    id: 'spec-dermatology',
    name: 'Dermatology & Cosmetology',
    slug: 'dermatology',
    description: 'Skin disorder management, eczema, psoriasis, acne, allergy tests, hair fall treatments, and nail diseases.',
    icon: 'Sparkles',
    publication_status: 'published',
  },
  {
    id: 'spec-gastroenterology',
    name: 'Gastroenterology & Liver Care',
    slug: 'gastroenterology',
    description: 'Consultations for acid reflux, peptic ulcers, liver disease, fatty liver, jaundice, and gastrointestinal diagnostics.',
    icon: 'ShieldCheck',
    publication_status: 'published',
  },
  {
    id: 'spec-dental',
    name: 'Dental Care & Oral Health',
    slug: 'dental-care',
    description: 'Root canal treatment, dental restorations, scaling, tooth extractions, crowns, and preventive dental care.',
    icon: 'Smile',
    publication_status: 'published',
  },
  {
    id: 'spec-paediatrics',
    name: 'Paediatrics & Child Health',
    slug: 'paediatrics',
    description: 'Newborn checkups, childhood infections, nutritional guidance, vaccination advisory, and developmental assessment.',
    icon: 'Baby',
    publication_status: 'published',
  },
];

export const INITIAL_DOCTORS: Doctor[] = [
  // 1. Dr. Priya Ranjan Barik — Priyaranjan.png
  {
    id: 'doc-1',
    full_name: 'Dr. Priya Ranjan Barik',
    slug: 'dr-priya-ranjan-barik',
    profile_image_url: '/images/doctors/Priyaranjan.png',
    qualifications: 'MD (Medicine), Ex-SR Nephrology, Diabetologist PHFI (CCEBDM)',
    medical_registration_details: 'OMC Reg. No. 18420 (Odisha Medical Council)',
    specialty_summary: 'General Medicine, Diabetes & Nephrology',
    biography: 'Dr. Priya Ranjan Barik is an Associate Professor in the Department of Medicine at J.K. Medical College & Hospital, Jajpur, Odisha. He brings additional expertise as an Ex-Senior Resident in Nephrology and a certified Diabetologist (PHFI – CCEBDM). He specializes in General Medicine, Diabetes management, and Kidney health. The doctor sees patients daily at Satyabhama Health Care. Patients are kindly requested to contact clinic reception before visiting.',
    designation: 'Associate Professor, Department of Medicine',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'regular',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 14,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },

  // 2. Dr. Sanjay Pany — Sanjay-PANY.png
  {
    id: 'doc-2',
    full_name: 'Dr. Sanjay Pany',
    slug: 'dr-sanjay-pany',
    profile_image_url: '/images/doctors/Sanjay-PANY.png',
    qualifications: 'MBBS, MD (Psychiatry)',
    medical_registration_details: 'OMC Reg. No. 19543 (Odisha Medical Council)',
    specialty_summary: 'Psychiatry & Behavioral Health (ମାନସିକ ରୋଗ ବିଶେଷଜ୍ଞ)',
    biography: 'Dr. Sanjay Pany is an Assistant Professor at SCB Medical College, Cuttack and Consultant Psychiatrist (ମାନସିକ ରୋଗ ବିଶେଷଜ୍ଞ). He brings specialized expertise in mood disorders, anxiety, depression, cognitive health, and adult behavioral wellness. Outpatient consultations at Satyabhama Health Care on the 1st Saturday of every month from 9:00 AM to 10:30 AM.',
    designation: 'Asst. Prof., SCB Medical College, Cuttack',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'visiting',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 12,
    created_at: '2026-01-12T10:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },

  // 3. Dr. Dillip Kumar Chand — dr-dilip-kumar-chand.jpg
  {
    id: 'doc-3',
    full_name: 'Dr. Dillip Kumar Chand',
    slug: 'dr-dillip-kumar-chand',
    profile_image_url: '/images/doctors/dr-dilip-kumar-chand.jpg',
    qualifications: 'M.B.B.S., M.S. Ortho (SCB Medical College, Cuttack)',
    medical_registration_details: 'OMC Reg. No. 15309 (Odisha Medical Council)',
    specialty_summary: 'Orthopedic & Trauma Surgery (ଅସ୍ଥିଶଲ୍ୟ ବିଶେଷଜ୍ଞ)',
    biography: 'Dr. Dillip Kumar Chand (M.B.B.S., M.S. Ortho, SCB Medical College, Cuttack) is a highly experienced Orthopedic & Trauma Surgeon with over 16 years of surgical excellence. He specializes in bone fractures, joint pain management, osteoarthritis, spinal care, and trauma rehabilitation. Consultations held every Sunday at Satyabhama Health Care.',
    designation: 'Orthopedic & Trauma Surgeon',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'regular',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 16,
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },

  // 4. Dr. Sabyasachi Pati — Sabyasachi.png
  {
    id: 'doc-4',
    full_name: 'Dr. Sabyasachi Pati',
    slug: 'dr-sabyasachi-pati',
    profile_image_url: '/images/doctors/Sabyasachi.png',
    qualifications: 'MBBS, MS (ENT & HNS)',
    medical_registration_details: 'OMC Reg. No. 14210 (Odisha Medical Council)',
    specialty_summary: 'ENT & Head and Neck Surgery (କାନ, ନାକ ଓ ଗଳା ବିଶେଷଜ୍ଞ)',
    biography: 'Dr. Sabyasachi Pati (MBBS, MS – ENT & HNS) is an Otorhinolaryngologist and Head & Neck Surgeon from SCB Medical College, Cuttack. He specialises in ear, nose and throat disorders along with head and neck surgical conditions. He consults at Satyabhama Health Care on the 2nd and 4th Saturday of every month from 9:00 AM to 10:00 AM.',
    designation: 'Otorhinolaryngologist & Head & Neck Surgeon',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'visiting',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 12,
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 5. Dr. Srikanta Acharya — Srikant.png
  {
    id: 'doc-5',
    full_name: 'Dr. Srikanta Acharya',
    slug: 'dr-srikanta-acharya',
    profile_image_url: '/images/doctors/Srikant.png',
    qualifications: 'MBBS, MD (Skin & VD)',
    medical_registration_details: 'OMC Reg. No. 16294 (Odisha Medical Council)',
    specialty_summary: 'Skin & V.D. Specialist (ଚର୍ମ ଓ ଯୌନ ରୋଗ ବିଶେଷଜ୍ଞ)',
    biography: 'Dr. Srikanta Acharya is a Skin & Venereal Diseases Specialist from SCB Medical College, Cuttack. He provides clinical dermatology consultations for acne, pigmentation, warts, hair loss, and venereal diseases. He visits Satyabhama Health Care on the 1st and 2nd Tuesday of every month from 2:00 PM to 4:00 PM.',
    designation: 'Consultant Dermatologist & Venereologist, SCB Medical College, Cuttack',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'visiting',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 14,
    created_at: '2026-02-05T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 6. Dr. Subhransu Sekhar Lenka — dr-subhranshu-sekhar-lenka.jpg
  {
    id: 'doc-6',
    full_name: 'Dr. Subhransu Sekhar Lenka',
    slug: 'dr-subharansu-sekhar-lenka',
    profile_image_url: '/images/doctors/dr-subhranshu-sekhar-lenka.jpg',
    qualifications: 'M.S. (Surgery, SCB Medical College, Cuttack)',
    medical_registration_details: 'OMC Reg. No. 17218 (Odisha Medical Council)',
    specialty_summary: 'General & Laparoscopic Surgery (ଶଲ୍ୟ ଚିକିତ୍ସା ବିଶେଷଜ୍ଞ)',
    biography: 'Dr. Subhransu Sekhar Lenka, M.S. (Surgery) from SCB Medical College, Cuttack, is a skilled Consultant General and Laparoscopic Surgeon. He provides clinical evaluations and surgical consultations for abdominal ailments, gallbladder issues, hernias, appendicitis, anorectal conditions (piles/fissures), and minor operative care at Satyabhama Health Care. He consults every Sunday.',
    designation: 'Consultant General & Laparoscopic Surgeon',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'regular',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 11,
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 7. Dr. Tanmaya Padhy — Tanmay-padhy.png
  {
    id: 'doc-7',
    full_name: 'Dr. Tanmaya Padhy',
    slug: 'dr-tanmaya-padhy',
    profile_image_url: '/images/doctors/Tanmay-padhy.png',
    qualifications: 'MD (Medicine), DM (Neurology)',
    medical_registration_details: 'OMC Reg. No. 20145 (Odisha Medical Council)',
    specialty_summary: 'Neurology (ସ୍ନାୟୁ ରୋଗ ବିଶେଷଜ୍ଞ)',
    biography: "Dr. Tanmaya Padhy (MD Medicine, DM Neurology) is a Consultant Neurologist from SCB Medical College, Cuttack. He specialises in the diagnosis and management of neurological conditions including epilepsy, stroke, Parkinson's disease, headache disorders, neuropathy, and movement disorders. He consults at Satyabhama Health Care on the 4th Tuesday of every month from 10:00 AM to 12:00 PM.",
    designation: 'Consultant Neurologist',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'visiting',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 10,
    created_at: '2026-10-31T06:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 8. Dr. Subhada Pattnaik — dr-subhada-pattnaik.png
  {
    id: 'doc-8',
    full_name: 'Dr. Subhada Pattnaik',
    slug: 'dr-subhada-pattnaik',
    profile_image_url: '/images/doctors/dr-subhada-pattnaik.png',
    qualifications: 'MS (Orthopedics)',
    medical_registration_details: 'OMC Reg. No. 20312 (Odisha Medical Council)',
    specialty_summary: 'Orthopedics (ଅସ୍ଥିଶଲ୍ୟ ବିଶେଷଜ୍ଞ)',
    biography: 'Dr. Subhada Pattnaik (MS Orthopedics) is a Consultant Orthopedic Surgeon specialising in bone fractures, joint disorders, spine conditions, sports injuries, and musculoskeletal health. She consults at Satyabhama Health Care every Thursday and Friday. Patients are advised to contact clinic reception for exact session timings.',
    designation: 'Consultant Orthopedic Surgeon',
    languages: ['Odia', 'Hindi', 'English'],
    consultant_type: 'visiting',
    verification_status: 'verified',
    publication_status: 'published',
    contact_number: '+91 70086 10481',
    experience_years: 10,
    created_at: '2026-10-31T06:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
];

export const INITIAL_SCHEDULES: DoctorSchedule[] = [
  // 1. Dr. Priya Ranjan Barik (doc-1): Daily Availability
  {
    id: 'sch-1',
    doctor_id: 'doc-1',
    day_of_week: 1, // Mon
    start_time: '09:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Daily patient consultation — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
  {
    id: 'sch-2',
    doctor_id: 'doc-1',
    day_of_week: 2, // Tue
    start_time: '09:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Daily patient consultation — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
  {
    id: 'sch-3',
    doctor_id: 'doc-1',
    day_of_week: 3, // Wed
    start_time: '09:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Daily patient consultation — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
  {
    id: 'sch-4',
    doctor_id: 'doc-1',
    day_of_week: 4, // Thu
    start_time: '09:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Daily patient consultation — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
  {
    id: 'sch-5',
    doctor_id: 'doc-1',
    day_of_week: 5, // Fri
    start_time: '09:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Daily patient consultation — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
  {
    id: 'sch-6',
    doctor_id: 'doc-1',
    day_of_week: 6, // Sat
    start_time: '09:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Daily patient consultation — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 2. Dr. Sanjay Pany (doc-2): 1st Saturday of Every Month | 9:00 AM – 10:30 AM
  {
    id: 'sch-7',
    doctor_id: 'doc-2',
    day_of_week: 6, // Sat
    monthly_weeks: [1], // 1st Saturday only
    start_time: '09:00',
    end_time: '10:30',
    session_type: 'morning',
    notes: '1st Saturday monthly clinic (9:00 AM – 10:30 AM). Token distribution begins at 8:30 AM.',
    publication_status: 'published',
    created_at: '2026-01-12T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 3. Dr. Dillip Kumar Chand (doc-3): Every Sunday | 8:00 AM – 9:30 AM
  {
    id: 'sch-8',
    doctor_id: 'doc-3',
    day_of_week: 0, // Sun
    start_time: '08:00',
    end_time: '09:30',
    session_type: 'morning',
    notes: 'Weekly Sunday orthopedic trauma clinic (8:00 AM – 9:30 AM)',
    publication_status: 'published',
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 4. Dr. Sabyasachi Pati (doc-4): 2nd & 4th Saturday | 9:00 AM – 10:00 AM
  {
    id: 'sch-9',
    doctor_id: 'doc-4',
    day_of_week: 6, // Sat
    monthly_weeks: [2, 4], // 2nd & 4th Saturday
    start_time: '09:00',
    end_time: '10:00',
    session_type: 'morning',
    notes: '2nd & 4th Saturday monthly ENT & Head-Neck clinic (9:00 AM – 10:00 AM)',
    publication_status: 'published',
    created_at: '2026-10-31T06:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 5. Dr. Srikanta Acharya (doc-5): 1st & 2nd Tuesday | 2:00 PM – 4:00 PM
  {
    id: 'sch-10',
    doctor_id: 'doc-5',
    day_of_week: 2, // Tue
    monthly_weeks: [1, 2], // 1st & 2nd Tuesday
    start_time: '14:00',
    end_time: '16:00',
    session_type: 'evening',
    notes: '1st & 2nd Tuesday monthly Skin & VD clinic (2:00 PM – 4:00 PM)',
    publication_status: 'published',
    created_at: '2026-10-31T06:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 6. Dr. Subhransu Sekhar Lenka (doc-6): Every Sunday
  {
    id: 'sch-11',
    doctor_id: 'doc-6',
    day_of_week: 0, // Sun
    start_time: '09:00',
    end_time: '12:00',
    session_type: 'morning',
    notes: 'Every Sunday surgery clinic — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 7. Dr. Tanmaya Padhy (doc-7): 4th Tuesday | 10:00 AM – 12:00 PM
  {
    id: 'sch-12',
    doctor_id: 'doc-7',
    day_of_week: 2, // Tue
    monthly_weeks: [4], // 4th Tuesday only
    start_time: '10:00',
    end_time: '12:00',
    session_type: 'morning',
    notes: '4th Tuesday monthly neurology clinic (10:00 AM – 12:00 PM)',
    publication_status: 'published',
    created_at: '2026-10-31T06:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },

  // 8. Dr. Subhada Pattnaik (doc-8): Every Thursday & Friday
  {
    id: 'sch-13',
    doctor_id: 'doc-8',
    day_of_week: 4, // Thu
    start_time: '10:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Every Thursday orthopedic clinic — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-10-31T06:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
  {
    id: 'sch-14',
    doctor_id: 'doc-8',
    day_of_week: 5, // Fri
    start_time: '10:00',
    end_time: '13:00',
    session_type: 'morning',
    notes: 'Every Friday orthopedic clinic — please call clinic to confirm timing',
    publication_status: 'published',
    created_at: '2026-10-31T06:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
];

// Seed Exceptions for upcoming demonstration
export const INITIAL_EXCEPTIONS: ScheduleException[] = [
  {
    id: 'exc-1',
    doctor_id: 'doc-3', // Dr. Dillip Kumar Chand
    consultation_date: '2026-11-01',
    exception_type: 'special_clinic',
    start_time: '08:00',
    end_time: '09:30',
    notes: 'Regular Sunday bone trauma & joint arthritis OPD.',
    publication_status: 'published',
    created_at: '2026-10-20T10:00:00Z',
    updated_at: '2026-10-31T06:00:00Z',
  },
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin',
    auth_user_id: 'auth-admin-uuid',
    email: 'admin@satyabhama.com',
    full_name: 'Clinic Medical Superintendent',
    role: 'super_admin',
    active_status: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-20T00:00:00Z',
  },
  {
    id: 'user-dr-barik',
    auth_user_id: 'auth-dr-barik-uuid',
    email: 'dr.priyaranjan@satyabhama.com',
    full_name: 'Dr. Priyaranjan Barik',
    role: 'doctor',
    doctor_id: 'doc-1',
    active_status: true,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-20T10:00:00Z',
  },
  {
    id: 'user-dr-chand',
    auth_user_id: 'auth-dr-chand-uuid',
    email: 'dr.dilip@satyabhama.com',
    full_name: 'Dr. Dilip Kumar Chand',
    role: 'doctor',
    doctor_id: 'doc-6',
    active_status: true,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-24T10:00:00Z',
  },
  {
    id: 'user-dr-subhada',
    auth_user_id: 'auth-dr-subhada-uuid',
    email: 'dr.subhada@satyabhama.com',
    full_name: 'Dr. Subhada Pattnaik',
    role: 'doctor',
    doctor_id: 'doc-7',
    active_status: true,
    created_at: '2026-01-22T10:00:00Z',
    updated_at: '2026-10-24T10:00:00Z',
  },
  {
    id: 'user-editor',
    auth_user_id: 'auth-editor-uuid',
    email: 'editor@satyabhama.com',
    full_name: 'Clinic Staff Coordinator',
    role: 'content_editor',
    active_status: true,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-20T10:00:00Z',
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I check a doctor’s consultation timings?',
    answer: 'You can check our live Doctor Consultation Schedule page or visit the doctor’s individual profile. We display verified weekly consultation days and special visiting clinic dates.',
    category: 'Schedules',
    sort_order: 1,
    publication_status: 'published',
  },
  {
    id: 'faq-2',
    question: 'Can I book an appointment online on this website?',
    answer: 'No. Satyabhama Health Care operates on a direct clinic registration model. We do not provide an online appointment booking system. Patients are requested to check the published schedule and call +91 70086 10481 to confirm doctor availability before visiting.',
    category: 'Appointments',
    sort_order: 2,
    publication_status: 'published',
  },
  {
    id: 'faq-3',
    question: 'How are visiting specialist schedules communicated?',
    answer: 'Visiting super-specialists (such as Neurosurgeons and Gastroenterologists) attend on scheduled dates. Their confirmed dates are announced in the Schedule section and verified on phone with reception.',
    category: 'Visiting Consultants',
    sort_order: 3,
    publication_status: 'published',
  },
  {
    id: 'faq-4',
    question: 'Where is Satyabhama Health Care located in Bhadrak?',
    answer: 'We are conveniently located at Satyabhama Health Care Nehru Stadium, Stadium Road, Bonth Chhak, Near, Bhadrak, Odisha 756100. Google Maps Directions: https://maps.app.goo.gl/pLYvSBrxS45MwBh56',
    category: 'Location & Access',
    sort_order: 4,
    publication_status: 'published',
  },
  {
    id: 'faq-5',
    question: 'What should patients bring for consultation?',
    answer: 'Please bring your previous medical records, ongoing prescription slips, recent diagnostic reports, and any government ID for registration at our reception desk.',
    category: 'General',
    sort_order: 5,
    publication_status: 'published',
  },
];

export const INITIAL_ARTICLES: HealthArticle[] = [
  {
    id: 'art-1',
    title: 'How to Find an ENT Specialist in Bhadrak: Guide to Ear, Nose & Throat Consultations',
    slug: 'how-to-find-an-ent-specialist-in-bhadrak',
    summary: 'Clinical indicators for consulting an ear, nose, and throat specialist in Bhadrak, from chronic sinusitis and allergic rhinitis to hearing loss and persistent vertigo.',
    content: `Ear, nose, and throat disorders affect individuals of all age groups in coastal Odisha, where high humidity and seasonal temperature changes trigger recurrent sinus inflammation and upper respiratory allergic reactions. When symptoms like nasal obstruction, persistent throat irritation, recurring ear discharge, or sudden balance disturbances persist beyond standard over-the-counter remedies, a specialized consultation with an experienced ENT surgeon becomes necessary.

Consulting an ENT specialist ensures a thorough diagnostic evaluation using modern clinical techniques such as anterior rhinoscopy, otoscopic examination, and indirect laryngoscopy. Common conditions evaluated include chronic suppurative otitis media (CSOM), deviated nasal septum (DNS), nasal polyposis, hypertrophic tonsils, and vocal cord strain.

At Satyabhama Health Care in Bhadrak, experienced ENT surgeons conduct scheduled outpatient clinics to diagnose and provide clinical management strategies for patients across Bhadrak, Bonth, Dhamnagar, and neighbouring blocks.`,
    author: 'Department of ENT & Head Neck Surgery',
    category: 'ENT Care',
    related_doctor_slug: 'dr-sabyasachi-pati',
    related_specialty_slug: 'ent',
    read_time_minutes: 5,
    publication_status: 'published',
    published_at: '2026-10-15T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-2',
    title: 'When Should You Consult an Orthopedic Surgeon? Joint Pain & Fracture Care Guide',
    slug: 'when-should-you-consult-an-orthopedic-surgeon',
    summary: 'Understanding morning joint stiffness, osteoarthritis progression, fracture recovery, and spinal nerve compressions requiring orthopedic evaluation in Bhadrak.',
    content: `Musculoskeletal pain is one of the leading reasons patients seek outpatient medical care in Bhadrak. While acute muscle soreness often resolves with rest, chronic knee pain, localized swelling, difficulty walking down stairs, or severe morning stiffness exceeding 30 minutes may indicate progressive cartilage degeneration or osteoarthritis.

Timely evaluation by an orthopedic and trauma surgeon helps differentiate between degenerative arthritis, ligamentous tears, tendonitis, and radiating sciatica caused by lumbar disc herniation. Conservative treatments—including tailored physiotherapy regimens, pharmacological anti-inflammatory support, weight management strategies, and ergonomic adjustments—can often preserve joint function without immediate surgery.

Patients recovering from road accidents or falls should also undergo proper radiographic evaluation to ensure bone fractures unite in correct anatomical alignment without residual deformities.`,
    author: 'Department of Orthopaedics & Trauma Surgery',
    category: 'Orthopaedics',
    related_doctor_slug: 'dr-dillip-kumar-chand',
    related_specialty_slug: 'orthopaedics',
    read_time_minutes: 6,
    publication_status: 'published',
    published_at: '2026-10-18T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-3',
    title: 'Understanding When to Consult a Dermatologist for Chronic Skin Conditions',
    slug: 'understanding-when-to-consult-a-dermatologist',
    summary: 'Identifying resistant fungal skin infections, chronic eczema, psoriasis plaques, and acne breakouts requiring professional dermatological diagnosis.',
    content: `Skin conditions in tropical coastal districts like Bhadrak are frequently exacerbated by moisture, sweating, and agricultural exposure. A major healthcare challenge in the region is the self-administration of over-the-counter steroid-antibacterial-antifungal combination creams, which often masks symptoms temporarily while driving fungal resistance and skin thinning (steroid-damaged skin).

Consulting a qualified dermatologist (Skin & V.D. specialist) allows accurate diagnostic identification through skin scrapings, wood lamp examination, or dermoscopy. Conditions such as dermatophytosis (tinea corporis/cruris), atopic dermatitis, plaque psoriasis, vitiligo, contact dermatitis, and resistant acne vulgaris require scientifically calibrated, individual treatment courses.

Dermatological evaluations at Satyabhama Health Care provide patients with evidence-based management plans and guidance on skin hygiene to prevent recurring infections.`,
    author: 'Department of Dermatology & Venereology',
    category: 'Dermatology',
    related_doctor_slug: 'dr-srikanta-acharya',
    related_specialty_slug: 'dermatology',
    read_time_minutes: 5,
    publication_status: 'published',
    published_at: '2026-10-20T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-4',
    title: 'When to Consult a Gastroenterologist: Jaundice, Fatty Liver & Acid Reflux Guide',
    slug: 'when-to-consult-a-gastroenterologist-liver-care',
    summary: 'Key clinical signs of gastrointestinal and hepatobiliary disease, including persistent acid reflux, non-alcoholic fatty liver, and unexplained jaundice.',
    content: `Digestive tract complaints such as chronic heartburn, upper abdominal burning, bloating, and post-meal discomfort are widespread. While intermittent indigestion is common, alarm symptoms like difficulty swallowing (dysphagia), unintentional weight loss, dark black stools (melena), chronic diarrhea, or persistent yellowish discoloration of eyes and skin (jaundice) demand prompt super-specialty gastroenterology evaluation.

In recent years, Non-Alcoholic Fatty Liver Disease (NAFLD/NASH) has emerged as a major metabolic health concern among adults with sedentary lifestyles or diabetes. A specialist hepatologist provides structured assessment using liver function tests, abdominal ultrasonography, and non-invasive fibrosis staging to arrest hepatic steatosis before cirrhosis develops.

Specialist gastroenterologists conduct scheduled outpatient clinics at Satyabhama Health Care to evaluate complex gastrointestinal, pancreatic, and liver conditions.`,
    author: 'Department of Gastroenterology & Hepatology',
    category: 'Gastroenterology',
    related_specialty_slug: 'gastroenterology',
    read_time_minutes: 6,
    publication_status: 'published',
    published_at: '2026-10-22T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-5',
    title: 'Child Healthcare Consultations in Bhadrak: Infant Nutrition, Growth & Fever Care',
    slug: 'child-healthcare-consultations-in-bhadrak',
    summary: 'A parents guide to infant milestones, managing seasonal childhood viral fevers, preventing dehydration, and structured pediatric checkups.',
    content: `Childhood health forms the cornerstone of lifelong wellness. Infants and young children experience rapid physical, neuromotor, and cognitive milestones during their early developmental years. Regular consultations with a senior pediatrician ensure that growth velocity, weight-for-age parameters, and nutritional requirements are monitored and addressed early.

During seasonal monsoon and winter changes in coastal Odisha, children are particularly vulnerable to acute viral respiratory infections, bronchiolitis, and gastroenteritis. Parents should be vigilant for critical warning indicators: high-grade fever unresponsive to antipyretics, lethargy, decreased oral intake, rapid chest breathing, or signs of dehydration like sunken eyes and dry oral mucosa.

Routine pediatric visits at Satyabhama Health Care emphasize preventive care, immunization schedules, childhood asthma management, and parental counseling on balanced complementary feeding.`,
    author: 'Department of Paediatrics & Child Health',
    category: 'Paediatrics',
    related_specialty_slug: 'paediatrics',
    read_time_minutes: 5,
    publication_status: 'published',
    published_at: '2026-10-23T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-6',
    title: 'Understanding the Role of a Neurologist: Brain, Spine & Nerve Consultations',
    slug: 'understanding-the-role-of-a-neurosurgeon',
    summary: 'Demystifying neurological outpatient clinics: evaluating headaches, epilepsy, stroke recovery, neuropathy, and movement disorders in Bhadrak.',
    content: `A neurologist is a specialist physician dedicated to the diagnostic evaluation and medical management of disorders affecting the brain, spinal cord, and peripheral nerves. 

Common conditions reviewed in neurology outpatient clinics include epilepsy, stroke follow-up, Parkinson's disease, tremors, neuropathies, chronic migraine, and cognitive disorders.

Consultant neurologists conduct designated super-specialty clinics at Satyabhama Health Care in Bhadrak, enabling patients to receive academic medical opinions close to home without traveling long distances to capital cities.`,
    author: 'Department of Neurology',
    category: 'Neurology',
    related_doctor_slug: 'dr-tanmaya-padhy',
    related_specialty_slug: 'neurosurgery',
    read_time_minutes: 6,
    publication_status: 'published',
    published_at: '2026-10-24T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-7',
    title: 'When Should You Consult a Psychiatrist? Recognizing Anxiety, Depression & Stress',
    slug: 'when-should-you-consult-a-psychiatrist',
    summary: 'Overcoming social hesitation to seek mental healthcare: recognizing clinical depression, generalized anxiety, insomnia, and behavioral symptoms.',
    content: `Mental health is an indispensable component of physical wellbeing. Yet, in many communities, misconceptions surrounding mental healthcare prevent individuals from seeking medical attention for conditions that are highly treatable. A psychiatrist is a medical doctor specialized in evaluating emotional, cognitive, and neurochemical health through a comprehensive biopsychosocial lens.

Clinical situations where a psychiatric consultation is advised include persistent feelings of sadness or emptiness lasting longer than two weeks, unmanageable panic attacks, irrational fears (phobias), chronic insomnia unalleviated by sleep hygiene, unexplained bodily pains with normal somatic workups (somatization), and obsessive thoughts interfering with daily productivity.

At Satyabhama Health Care, confidential psychiatric consultations are conducted in quiet, private consultation chambers where patients and families receive compassionate medical guidance.`,
    author: 'Department of Psychiatry & Behavioral Health',
    category: 'Psychiatry',
    related_doctor_slug: 'dr-sanjay-pany',
    related_specialty_slug: 'psychiatry',
    read_time_minutes: 5,
    publication_status: 'published',
    published_at: '2026-10-25T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-8',
    title: 'Diabetes Consultations & Ongoing Medical Care: Managing Blood Sugar & Complications',
    slug: 'diabetes-consultations-ongoing-medical-care',
    summary: 'Structured guidelines for HbA1c monitoring, preventing diabetic neuropathy and retinopathy, and comprehensive internal medicine care in Bhadrak.',
    content: `Type 2 Diabetes Mellitus is a metabolic condition requiring structured ongoing medical supervision. In coastal Odisha, where high-carbohydrate staple diets are customary, maintaining optimal glycemic control without recurrent hypoglycemia requires personalized physician oversight.

Effective diabetes management goes beyond isolated finger-prick fasting glucose tests; regular three-month Glycated Hemoglobin (HbA1c) assessments, lipid profiling, urine microalbuminuria checks, and blood pressure monitoring are crucial to detect early microvascular and macrovascular changes. Concurrently, physicians evaluate respiratory vulnerabilities like chronic bronchitis or asthma that frequently co-exist in adult patients.

Senior consultant physicians at Satyabhama Health Care provide comprehensive outpatient medical consultations, coordinating lifestyle adjustments, oral hypoglycemic agents, and insulin titration protocols.`,
    author: 'Department of Internal Medicine & Diabetes',
    category: 'Diabetes Care',
    related_doctor_slug: 'dr-priya-ranjan-barik',
    related_specialty_slug: 'general-medicine',
    read_time_minutes: 6,
    publication_status: 'published',
    published_at: '2026-10-26T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-9',
    title: 'When to Consult a General Surgeon: Hernia, Gallbladder & Abdominal Symptoms',
    slug: 'when-to-consult-a-general-and-laparoscopic-surgeon',
    summary: 'Clinical indications for consulting a general and laparoscopic surgeon for abdominal swellings, gallbladder stones, and anorectal health in Bhadrak.',
    content: `General and laparoscopic surgeons evaluate a broad spectrum of abdominal and soft-tissue surgical diseases. One of the most frequent surgical consultations is for abdominal wall hernias (inguinal, umbilical, or post-surgical incisional hernias), which present as localized bulges that enlarge during standing or coughing. Because hernias carry a risk of incarceration or strangulation, elective surgical review is always recommended.

Symptomatic gallstones (cholelithiasis), presenting as severe episodic pain in the right upper abdomen radiating to the back after fatty meals, represent another critical surgical condition that benefits from laparoscopic cholecystectomy counseling. Similarly, anorectal ailments such as bleeding hemorrhoids (piles), acute anal fissures, and perianal fistulas can be diagnosed accurately and managed with modern clinical protocols.

Consultations at Satyabhama Health Care assist patients and families in understanding operative indications, surgical options, and post-procedure recovery timelines.`,
    author: 'Department of General & Laparoscopic Surgery',
    category: 'Surgery',
    related_doctor_slug: 'dr-subharansu-sekhar-lenka',
    related_specialty_slug: 'general-surgery',
    read_time_minutes: 5,
    publication_status: 'published',
    published_at: '2026-10-27T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
  {
    id: 'art-10',
    title: 'Women’s Health & Gynaecological Consultations: Antenatal Care, Menstrual Health & Wellness',
    slug: 'womens-health-gynaecological-consultations-in-bhadrak',
    summary: 'Essential healthcare considerations for women across different life stages, from antenatal care and PCOS management to postmenopausal health.',
    content: `Women’s health encompasses specialized medical care through every life phase, from adolescence through reproductive years to post-menopause. Antenatal checkups are essential to monitor maternal blood pressure, hemoglobin levels, gestational diabetes screening, and healthy fetal progression throughout the trimesters of pregnancy.

In non-pregnant women, menstrual irregularities, severe pelvic cramps (dysmenorrhea), abnormal uterine bleeding, and Polycystic Ovary Syndrome (PCOS/PCOD) require attentive diagnostic evaluation. PCOS in particular warrants a holistic medical approach addressing hormonal balance, insulin sensitivity, menstrual regularity, and fertility planning.

At Satyabhama Health Care, female patients receive respectful, confidential medical consultations for antenatal follow-ups, pelvic health assessments, and gynecological reviews in a comfortable outpatient setting.`,
    author: 'Department of Obstetrics & Gynaecology',
    category: 'Gynaecology',
    related_specialty_slug: 'gynaecology',
    read_time_minutes: 6,
    publication_status: 'published',
    published_at: '2026-10-28T00:00:00Z',
    updated_at: '2026-10-31T01:30:00Z',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Visiting Specialist Clinic Notice',
    message: 'Visiting specialist consultations in Neurology, Psychiatry, ENT, Dermatology, and Orthopedics are conducted on designated dates. Please call +91 70086 10481 for current week schedule verification.',
    start_date: '2026-10-01',
    end_date: '2026-11-30',
    is_active: true,
    publication_status: 'published',
  },
];

export const INITIAL_CHANGE_REQUESTS: DoctorChangeRequest[] = [
  {
    id: 'req-1',
    doctor_id: 'doc-1',
    requested_by: 'user-dr-barik',
    requested_by_name: 'Dr. Priyaranjan Barik',
    change_type: 'schedule_change',
    proposed_data: {
      schedule_id: 'sch-1',
      day_of_week: 1,
      proposed_start_time: '08:30',
      proposed_end_time: '12:30',
      reason: 'Shift morning session 30 minutes earlier to accommodate morning ward rounds.',
    },
    status: 'pending',
    created_at: '2026-10-22T09:30:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    actor_id: 'user-admin',
    actor_name: 'Clinic Medical Superintendent',
    actor_role: 'super_admin',
    action: 'PUBLISH_SCHEDULE',
    entity_type: 'doctor_schedules',
    entity_id: 'sch-1',
    change_summary: 'Published weekly consultation schedule for Dr. Priyaranjan Barik (Mon 09:00 - 13:00)',
    created_at: '2026-10-20T10:15:00Z',
  },
  {
    id: 'log-2',
    actor_id: 'user-admin',
    actor_name: 'Clinic Medical Superintendent',
    actor_role: 'super_admin',
    action: 'UPDATE_CLINIC_CONFIG',
    entity_type: 'clinic_settings',
    entity_id: 'satyabhama-clinic-settings',
    change_summary: 'Updated primary contact and official Nehru Stadium address.',
    created_at: '2026-10-21T11:45:00Z',
  },
];
