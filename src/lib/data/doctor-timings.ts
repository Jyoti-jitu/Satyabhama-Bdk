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
    qualifications: 'MD (Medicine), Ex-SR Nephrology, Diabetologist PHFI (CCEBDM)',
    specialty: 'General Medicine, Diabetes & Nephrology',
    designation: 'Associate Professor, Department of Medicine',
    experience_years: 14,
    availability: 'Every day',
    timing: 'Daily OPD Consultations',
    displayLabel: 'Daily Availability — Please Contact the Clinic Before Visiting',
    importantInstruction: 'Associate Professor, Department of Medicine, J.K. Medical College & Hospital, Jajpur. Sees patients daily; please contact clinic reception before visiting.',
    requiresPriorContact: true,
  },

  // 2. Dr. Sanjay Pany
  {
    id: 'doc-2',
    name: 'Dr. Sanjay Pany',
    slug: 'dr-sanjay-pany',
    image: '/images/doctors/Sanjay-PANY.png',
    qualifications: 'MBBS, MD (Psychiatry)',
    specialty: 'Psychiatry & Behavioral Health (ମାନସିକ ରୋଗ ବିଶେଷଜ୍ଞ)',
    designation: 'Asst. Prof., SCB Medical College, Cuttack',
    experience_years: 12,
    availability: "Every month's first Saturday",
    timing: '9:00 AM – 10:30 AM',
    displayLabel: '1st Saturday of Every Month | 9:00 AM – 10:30 AM',
    importantInstruction: 'Assistant Professor at SCB Medical College, Cuttack. Token distribution begins at reception at 8:30 AM.',
    requiresPriorContact: false,
  },

  // 3. Dr. Dillip Kumar Chand
  {
    id: 'doc-3',
    name: 'Dr. Dillip Kumar Chand',
    slug: 'dr-dillip-kumar-chand',
    image: '/images/doctors/dr-dilip-kumar-chand.jpg',
    qualifications: 'M.B.B.S., M.S. Ortho (SCB Medical College, Cuttack)',
    specialty: 'Orthopedic & Trauma Surgery (ଅସ୍ଥିଶଲ୍ୟ ବିଶେଷଜ୍ଞ)',
    designation: 'Orthopedic & Trauma Surgeon',
    experience_years: 16,
    availability: 'Every Sunday',
    timing: '8:00 AM – 9:30 AM',
    displayLabel: 'Every Sunday | 8:00 AM – 9:30 AM',
    importantInstruction: 'Orthopedic & Trauma Surgeon (SCB MCH, Cuttack). Weekly Sunday clinic for bone trauma, joint arthritis, and fracture care.',
    requiresPriorContact: false,
  },

  // 4. Dr. Sabyasachi Pati
  {
    id: 'doc-4',
    name: 'Dr. Sabyasachi Pati',
    slug: 'dr-sabyasachi-pati',
    image: '/images/doctors/Sabyasachi.png',
    qualifications: 'MBBS, MS (ENT & HNS)',
    specialty: 'ENT & Head and Neck Surgery (କାନ, ନାକ ଓ ଗଳା ବିଶେଷଜ୍ଞ)',
    designation: 'Otorhinolaryngologist & Head & Neck Surgeon',
    experience_years: 12,
    availability: '2nd & 4th Saturday of every month',
    timing: '9:00 AM – 10:00 AM',
    displayLabel: '2nd & 4th Saturday | 9:00 AM – 10:00 AM',
    importantInstruction: 'Otorhinolaryngologist & Head and Neck Surgeon, SCB Medical College, Cuttack. Specialist in ENT, head & neck surgery.',
    requiresPriorContact: false,
  },

  // 5. Dr. Srikanta Acharya
  {
    id: 'doc-5',
    name: 'Dr. Srikanta Acharya',
    slug: 'dr-srikanta-acharya',
    image: '/images/doctors/Srikant.png',
    qualifications: 'MBBS, MD (Skin & VD)',
    specialty: 'Skin & V.D. Specialist (ଚର୍ମ ଓ ଯୌନ ରୋଗ ବିଶେଷଜ୍ଞ)',
    designation: 'Consultant Dermatologist & Venereologist, SCB Medical College, Cuttack',
    experience_years: 14,
    availability: '1st & 2nd Tuesday of every month',
    timing: '2:00 PM – 4:00 PM',
    displayLabel: '1st & 2nd Tuesday | 2:00 PM – 4:00 PM',
    importantInstruction: 'Skin & V.D. Specialist from SCB Medical College, Cuttack. Treats acne, pigmentation, warts, and hair loss.',
    requiresPriorContact: false,
  },

  // 6. Dr. Subhransu Sekhar Lenka
  {
    id: 'doc-6',
    name: 'Dr. Subhransu Sekhar Lenka',
    slug: 'dr-subharansu-sekhar-lenka',
    image: '/images/doctors/dr-subhranshu-sekhar-lenka.jpg',
    qualifications: 'M.S. (Surgery, SCB Medical College, Cuttack)',
    specialty: 'General & Laparoscopic Surgery (ଶଲ୍ୟ ଚିକିତ୍ସା ବିଶେଷଜ୍ଞ)',
    designation: 'Consultant General & Laparoscopic Surgeon',
    experience_years: 11,
    availability: 'Every Sunday',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Consultant General Surgeon (MS Surgery, SCB MCH Cuttack)',
    importantInstruction: 'M.S. Surgery, SCB Medical College. Surgical consultations for hernia, gallbladder, appendicitis, and anorectal conditions.',
    requiresPriorContact: true,
    timingUnspecified: true,
  },

  // 7. Dr. Tanmaya Padhy
  {
    id: 'doc-7',
    name: 'Dr. Tanmaya Padhy',
    slug: 'dr-tanmaya-padhy',
    image: '/images/doctors/Tanmay-padhy.png',
    qualifications: 'MD (Medicine), DM (Neurology)',
    specialty: 'Neurology (ସ୍ନାୟୁ ରୋଗ ବିଶେଷଜ୍ଞ)',
    designation: 'Consultant Neurologist, SCB Medical College, Cuttack',
    experience_years: 10,
    availability: '4th Tuesday of every month',
    timing: '10:00 AM – 12:00 PM',
    displayLabel: '4th Tuesday of Every Month | 10:00 AM – 12:00 PM',
    importantInstruction: 'DM (Neurology), SCB Medical College, Cuttack. Specialist in neurological disorders including brain, nerve, and spinal conditions.',
    requiresPriorContact: false,
  },

  // 8. Dr. Subhada Pattnaik
  {
    id: 'doc-8',
    name: 'Dr. Subhada Pattnaik',
    slug: 'dr-subhada-pattnaik',
    image: '/images/doctors/dr-subhada-pattnaik.png',
    qualifications: 'MS (Orthopedics)',
    specialty: 'Orthopedics (ଅସ୍ଥିଶଲ୍ୟ ବିଶେଷଜ୍ଞ)',
    designation: 'Consultant Orthopedic Surgeon',
    experience_years: 10,
    availability: 'Every Thursday & Friday',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Every Thursday & Friday — Please Contact the Clinic for Timings',
    importantInstruction: 'MS (Orthopedics). Orthopedic specialist available every Thursday and Friday at Satyabhama Health Care. Contact reception for exact session timings.',
    requiresPriorContact: true,
    timingUnspecified: true,
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
    description: 'Patients visiting Dr. Priya Ranjan Barik, visiting super-specialists, or doctors on designated monthly dates should contact the clinic reception before visiting.',
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
