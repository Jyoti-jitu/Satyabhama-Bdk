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
    specialty: 'General Medicine, Pulmonology & Diabetes',
    designation: 'Senior Consultant Physician & Specialist',
    experience_years: 14,
    availability: 'Every day',
    timing: 'Daily OPD Consultations',
    displayLabel: 'Daily Availability — Please Contact the Clinic Before Visiting',
    importantInstruction: 'Associated with FM MCH Balasore and SJMCH Puri. Sees patients daily; please contact clinic reception before visiting.',
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
    timing: '10:00 AM – 1:00 PM',
    displayLabel: 'Every Sunday | 10:00 AM – 1:00 PM',
    importantInstruction: 'Orthopedic & Trauma Surgeon (SCB MCH, Cuttack). Weekly Sunday clinic for bone trauma, joint arthritis, and fracture care.',
    requiresPriorContact: false,
  },

  // 4. Dr. Swarupananda Mishra
  {
    id: 'doc-4',
    name: 'Dr. Swarupananda Mishra',
    slug: 'dr-swarupananda-mishra',
    image: null,
    qualifications: 'MBBS, MS (ENT)',
    specialty: 'ENT / Ear, Nose & Throat (କାନ, ନାକ ଓ ଗଳା ବିଶେଷଜ୍ଞ)',
    designation: 'Consultant ENT Surgeon, Cuttack ENT Care',
    experience_years: 24,
    availability: 'Designated Visiting Days',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Consultant ENT Surgeon (Cuttack ENT Care)',
    importantInstruction: 'Over 24 years surgical experience in ear, nose, and throat ailments. Contact clinic reception at +91 70086 10481 for upcoming dates.',
    requiresPriorContact: true,
    timingUnspecified: true,
  },

  // 5. Dr. Manjulata Dash
  {
    id: 'doc-5',
    name: 'Dr. Manjulata Dash',
    slug: 'dr-manjulata-dash',
    image: null,
    qualifications: 'MBBS, MD (Skin & VD)',
    specialty: 'Skin & V.D. Specialist (ଚର୍ମ ଓ ଯୌନ ରୋଗ ବିଶେଷଜ୍ଞ)',
    designation: 'Associate Professor, SCB Medical College, Cuttack',
    experience_years: 15,
    availability: 'Designated Visiting Schedule',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Skin & V.D. Specialist — Associate Professor, SCB MCH Cuttack',
    importantInstruction: 'Associate Professor at SCB Medical College, Cuttack. Specialist in skin, hair, chronic allergies, and venereal ailments.',
    requiresPriorContact: true,
    timingUnspecified: true,
  },

  // 6. Dr. Rama Chandra Deo
  {
    id: 'doc-6',
    name: 'Dr. Rama Chandra Deo',
    slug: 'dr-rama-chandra-deo',
    image: null,
    qualifications: 'M.Ch. (Neurosurgery), MS (Gen Surgery)',
    specialty: 'Neurosurgery & Spine (ମସ୍ତିଷ୍କ ଓ ମେରୁଦଣ୍ଡ ଶଲ୍ୟ ବିଶେଷଜ୍ଞ)',
    designation: 'Associate Professor, Neurosurgery',
    experience_years: 18,
    availability: 'Periodic Visiting Clinic Dates',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Associate Professor, Neurosurgery (M.Ch. Neuro)',
    importantInstruction: 'Associate Professor of Neurosurgery (SCB MCH & AIIMS Fellow). Specialist in brain, spine, endoscopic neurosurgery & sciatica.',
    requiresPriorContact: true,
    timingUnspecified: true,
  },

  // 7. Dr. Umesh Chandra Jena
  {
    id: 'doc-7',
    name: 'Dr. Umesh Chandra Jena',
    slug: 'dr-umesh-chandra-jena',
    image: null,
    qualifications: 'MBBS, MD (Pediatrics) / DCH',
    specialty: 'Paediatrics & Child Health (ବରିଷ୍ଠ ଶିଶୁ ରୋଗ ବିଶେଷଜ୍ଞ)',
    designation: 'Senior Pediatrician (ବରିଷ୍ଠ ଶିଶୁ ରୋଗ ବିଶେଷଜ୍ଞ)',
    experience_years: 22,
    availability: 'Regular Weekly Clinic',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Senior Pediatrician (ବରିଷ୍ଠ ଶିଶୁ ରୋଗ ବିଶେଷଜ୍ଞ)',
    importantInstruction: 'Decades of clinical experience in child care, newborn wellness, nutrition, and pediatric health in Bhadrak.',
    requiresPriorContact: true,
    timingUnspecified: true,
  },

  // 8. Dr. Shakti Prasad Choudhury
  {
    id: 'doc-8',
    name: 'Dr. Shakti Prasad Choudhury',
    slug: 'dr-shakti-prasad-choudhury',
    image: null,
    qualifications: 'M.D. (Medicine), D.M. (Hepatology, New Delhi)',
    specialty: 'Gastroenterology & Hepatology (ପାକସ୍ଥଳୀ ଓ ଯକୃତ ରୋଗ ବିଶେଷଜ୍ଞ)',
    designation: 'Consultant Gastroenterologist & Hepatologist',
    experience_years: 14,
    availability: 'Designated Super-Specialist Dates',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Gastroenterologist & Hepatologist (Fortis & Kalinga Hospital)',
    importantInstruction: 'Associated with Fortis Hospital Mumbai & Kalinga Hospital Bhubaneswar; DM (ILBS New Delhi). Liver & GI super-specialist.',
    requiresPriorContact: true,
    timingUnspecified: true,
  },

  // 9. Dr. Soudamini Dhal
  {
    id: 'doc-9',
    name: 'Dr. Soudamini Dhal',
    slug: 'dr-soudamini-dhal',
    image: null,
    qualifications: 'MBBS, MD (Obstetrics & Gynaecology)',
    specialty: 'Obstetrics & Gynaecology (ସ୍ତ୍ରୀ ଓ ପ୍ରସୂତି ରୋଗ ବିଶେଷଜ୍ଞ)',
    designation: 'Consultant Obstetrician & Gynaecologist',
    experience_years: 15,
    availability: 'Regular OPD Sessions',
    timing: 'Contact the Clinic for Timings',
    displayLabel: 'Consultant Obstetrician & Gynaecologist (ସ୍ତ୍ରୀ ଓ ପ୍ରସୂତି ବିଶେଷଜ୍ଞ)',
    importantInstruction: 'Women\'s reproductive health, antenatal pregnancy care, high-risk maternity, PCOS, and pelvic wellness in Bhadrak.',
    requiresPriorContact: true,
    timingUnspecified: true,
  },

  // 10. Dr. Subharansu Sekhar Lenka
  {
    id: 'doc-10',
    name: 'Dr. Subharansu Sekhar Lenka',
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
