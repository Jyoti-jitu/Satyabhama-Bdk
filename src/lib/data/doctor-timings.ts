export interface DoctorTimingProfile {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  qualifications: string;
  specialty: string;
  designation: string;
  experience_years: number;
  availability: string;
  timing: string;
  displayLabel: string;
  importantInstruction?: string;
  requiresPriorContact?: boolean;
  timingUnspecified?: boolean;
}

export const DOCTOR_TIMINGS: DoctorTimingProfile[] = [
  // 1. Dr. Priya Ranjan Barik
  {
    id: 'doc-1',
    name: 'Dr. Priya Ranjan Barik',
    slug: 'dr-priya-ranjan-barik',
    image: '/images/doctors/Priyaranjan.png',
    qualifications: 'MBBS, MD (Medicine)',
    specialty: 'General Medicine, Diabetes & Nephrology',
    designation: 'Associate Professor & Senior Consultant Physician',
    experience_years: 14,
    availability: 'Every day',
    timing: 'Daily OPD Consultations',
    displayLabel: 'Daily Availability — Please Contact the Clinic Before Visiting',
    importantInstruction: 'The doctor sees patients daily. Patients must contact the clinic first before visiting.',
    requiresPriorContact: true,
  },

  // 2. Dr. Sanjay Pany
  {
    id: 'doc-2',
    name: 'Dr. Sanjay Pany',
    slug: 'dr-sanjay-pany',
    image: '/images/doctors/Sanjay-PANY.png',
    qualifications: 'MBBS, MD (Psychiatry)',
    specialty: 'Psychiatry & Behavioral Health',
    designation: 'Assistant Professor & Consultant Psychiatrist',
    experience_years: 12,
    availability: "Every month's first Saturday",
    timing: '9:00 AM – 10:30 AM',
    displayLabel: '1st Saturday of Every Month | 9:00 AM – 10:30 AM',
  },

  // 3. Dr. Tanmay Padhy
  {
    id: 'doc-3',
    name: 'Dr. Tanmay Padhy',
    slug: 'dr-tanmay-padhy',
    image: '/images/doctors/Tanmay-padhy.png',
    qualifications: 'MBBS, MD (Medicine), DM (Neurology)',
    specialty: 'Neurology & Brain/Nerve Disorders',
    designation: 'Consultant Neurologist',
    experience_years: 11,
    availability: "Every month's fourth Tuesday",
    timing: '10:00 AM – 12:00 PM',
    displayLabel: '4th Tuesday of Every Month | 10:00 AM – 12:00 PM',
  },

  // 4. Dr. Subhada Pattnaik
  {
    id: 'doc-4',
    name: 'Dr. Subhada Pattnaik',
    slug: 'dr-subhada-pattnaik',
    image: '/images/doctors/dr-subhada-pattnaik.png',
    qualifications: 'MBBS, MS (Orthopedics)',
    specialty: 'Orthopaedics & Joint Trauma',
    designation: 'Consultant Orthopaedic Surgeon',
    experience_years: 13,
    availability: 'Every Thursday and Friday',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Every Thursday and Friday | Contact the Clinic for Timings',
    timingUnspecified: true,
  },

  // 5. Dr. Subhranshu Sekhar Lenka
  {
    id: 'doc-5',
    name: 'Dr. Subhranshu Sekhar Lenka',
    slug: 'dr-subhranshu-sekhar-lenka',
    image: '/images/doctors/dr-subhranshu-sekhar-lenka.jpg',
    qualifications: 'MBBS, MS (General Surgery)',
    specialty: 'General & Laparoscopic Surgery',
    designation: 'Consultant General Surgeon',
    experience_years: 11,
    availability: 'Every Sunday',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Every Sunday | Contact the Clinic for Timings',
    timingUnspecified: true,
  },

  // 6. Dr. Dillip Kumar Chand
  {
    id: 'doc-6',
    name: 'Dr. Dillip Kumar Chand',
    slug: 'dr-dillip-kumar-chand',
    image: '/images/doctors/dr-dilip-kumar-chand.jpg',
    qualifications: 'MBBS, MS (Orthopaedics)',
    specialty: 'Orthopaedics & Joint Trauma',
    designation: 'Senior Consultant Orthopaedic Surgeon',
    experience_years: 16,
    availability: 'Every Sunday',
    timing: '8:00 AM – 9:30 AM',
    displayLabel: 'Every Sunday | 8:00 AM – 9:30 AM',
  },

  // 7. Dr. Srikant Acharya
  {
    id: 'doc-7',
    name: 'Dr. Srikant Acharya',
    slug: 'dr-srikant-acharya',
    image: '/images/doctors/Srikant.png',
    qualifications: 'MBBS, MD (DVL)',
    specialty: 'Dermatology, Skin & Venereal Diseases',
    designation: 'Consultant Dermatologist & Venereologist',
    experience_years: 10,
    availability: "Every month's first and second Tuesday",
    timing: '2:00 PM – 4:00 PM',
    displayLabel: '1st & 2nd Tuesday of Every Month | 2:00 PM – 4:00 PM',
  },

  // 8. Dr. Sabyasachi Pati
  {
    id: 'doc-8',
    name: 'Dr. Sabyasachi Pati',
    slug: 'dr-sabyasachi-pati',
    image: '/images/doctors/Sabyasachi.png',
    qualifications: 'MBBS, MS (ENT & HNS)',
    specialty: 'Ear, Nose & Throat (ENT & HNS)',
    designation: 'Consultant ENT & Head-Neck Surgeon',
    experience_years: 9,
    availability: "Every month's second and fourth Saturday",
    timing: '9:00 AM – 10:00 AM',
    displayLabel: '2nd & 4th Saturday of Every Month | 9:00 AM – 10:00 AM',
    importantInstruction: 'Patients must contact the clinic first before visiting.',
    requiresPriorContact: true,
  },
];

export interface ConsultationTerm {
  number: number;
  title: string;
  description: string;
}

export const CONSULTATION_TERMS: ConsultationTerm[] = [
  {
    number: 1,
    title: 'Consultation Schedule',
    description: 'Doctor availability is based on the schedule published on this website.',
  },
  {
    number: 2,
    title: 'Prior Contact Required',
    description: 'Patients visiting Dr. Priya Ranjan Barik or Dr. Sabyasachi Pati should contact the clinic before visiting.',
  },
  {
    number: 3,
    title: 'Schedule Confirmation',
    description: "Patients are advised to contact the clinic before travelling to confirm the doctor's availability, especially for doctors who visit on specific days of the month.",
  },
  {
    number: 4,
    title: 'Monthly Visiting Schedule',
    description: 'First, second, and fourth weekday or weekend references mean the corresponding occurrence of that day within the calendar month.',
  },
  {
    number: 5,
    title: 'Unspecified Timings',
    description: 'Where consultation hours are not listed, please contact the clinic to confirm the timings before visiting.',
  },
  {
    number: 6,
    title: 'Schedule Changes',
    description: 'Consultation schedules may change due to unforeseen circumstances. Please confirm the latest schedule with the clinic before visiting.',
  },
  {
    number: 7,
    title: 'No Online Booking',
    description: 'This website is for displaying doctor profiles, availability, and consultation information only. Do not add appointment booking, patient booking forms, or online scheduling functionality.',
  },
  {
    number: 8,
    title: 'Accuracy of Information',
    description: 'Patients should verify the relevant consultation details directly with the clinic before their visit.',
  },
];
