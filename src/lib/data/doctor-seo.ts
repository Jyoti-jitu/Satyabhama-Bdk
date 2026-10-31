import { SITE_URL, CLINIC_CONFIG } from '@/lib/clinic-config';

export interface DoctorSEOEntity {
  id: string;
  slug: string;
  fullName: string;
  specialtyName: string;
  specialtySlug: string;
  medicalSpecialtySchema: string | string[];
  qualifications: string;
  professionalRole: string;
  affiliations: string[];
  consultantType: 'regular' | 'visiting';
  titleTag: string;
  metaDescription: string;
  targetKeywords: string[];
  canonicalUrl: string;
  relatedArticleSlug?: string;
  relatedArticleTitle?: string;
  clinicalFocus: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const DOCTOR_SEO_MAP: Record<string, DoctorSEOEntity> = {
  'dr-sabyasachi-pati': {
    id: 'doc-4',
    slug: 'dr-sabyasachi-pati',
    fullName: 'Dr. Sabyasachi Pati',
    specialtyName: 'ENT & Head and Neck Surgery',
    specialtySlug: 'ent',
    medicalSpecialtySchema: 'Otolaryngologic',
    qualifications: 'MBBS, MS (ENT & HNS)',
    professionalRole: 'Otorhinolaryngologist & Head and Neck Surgeon',
    affiliations: ['SCB Medical College & Hospital, Cuttack', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Sabyasachi Pati – ENT & Head Neck Surgeon in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Sabyasachi Pati, Otorhinolaryngologist & Head and Neck Surgeon (MS ENT & HNS, SCB MCH Cuttack) at Satyabhama Health Care, Bhadrak. Call 7008610481.',
    targetKeywords: [
      'Dr. Sabyasachi Pati',
      'Dr. Sabyasachi Pati ENT Bhadrak',
      'ENT specialist in Bhadrak',
      'Head neck surgeon Bhadrak',
      'Satyabhama Health Care ENT doctor',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-sabyasachi-pati`,
    relatedArticleSlug: 'how-to-find-an-ent-specialist-in-bhadrak',
    relatedArticleTitle: 'How to Find an ENT Specialist in Bhadrak: Guide to Ear, Nose & Throat Consultations',
    clinicalFocus: [
      'Ear disorders: hearing loss, ear infections & tinnitus',
      'Nasal & sinus conditions: sinusitis, nasal polyps & obstruction',
      'Throat ailments: tonsillitis, voice disorders & laryngeal conditions',
      'Head & neck surgical evaluation and counseling',
    ],
    faqs: [
      {
        question: 'When is Dr. Sabyasachi Pati available at Satyabhama Health Care?',
        answer:
          'Dr. Sabyasachi Pati consults on the 2nd and 4th Saturday of every month from 9:00 AM to 10:00 AM at Satyabhama Health Care, Stadium Road, Bhadrak.',
      },
      {
        question: 'What conditions does Dr. Sabyasachi Pati treat?',
        answer:
          'He provides clinical evaluation and surgical counseling for ear discharge, hearing loss, sinusitis, nasal obstruction, tonsillitis, voice changes, throat ailments, and head & neck surgical conditions.',
      },
      {
        question: 'How do I confirm a consultation with Dr. Sabyasachi Pati in Bhadrak?',
        answer:
          'Satyabhama Health Care operates on a walk-in consultation model. Please call reception at +91 70086 10481 to confirm the doctor\'s availability and collect a registration token.',
      },
    ],
  },

  'dr-srikanta-acharya': {
    id: 'doc-5',
    slug: 'dr-srikanta-acharya',
    fullName: 'Dr. Srikanta Acharya',
    specialtyName: 'Dermatology / Skin & VD',
    specialtySlug: 'dermatology',
    medicalSpecialtySchema: 'Dermatology',
    qualifications: 'MBBS, MD (Skin & VD)',
    professionalRole: 'Consultant Dermatologist & Venereologist, SCB Medical College, Cuttack',
    affiliations: ['SCB Medical College & Hospital, Cuttack', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Srikanta Acharya – Skin & VD Specialist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Srikanta Acharya, Skin & VD Specialist from SCB Medical College, Cuttack at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Srikanta Acharya',
      'Dr. Srikanta Acharya dermatologist',
      'Dr. Srikanta Acharya Bhadrak',
      'Skin specialist in Bhadrak',
      'Dermatologist at Satyabhama Health Care',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-srikanta-acharya`,
    relatedArticleSlug: 'understanding-when-to-consult-a-dermatologist',
    relatedArticleTitle: 'Understanding When to Consult a Dermatologist for Chronic Skin Conditions',
    clinicalFocus: [
      'Acne vulgaris, pigmentation & skin brightening evaluation',
      'Warts, molluscum & viral skin infections',
      'Hair loss, alopecia & scalp disorder assessment',
      'Venereology, sexual health & skin allergy evaluation',
    ],
    faqs: [
      {
        question: 'When is Dr. Srikanta Acharya available at Satyabhama Health Care?',
        answer:
          'Dr. Srikanta Acharya visits on the 1st and 2nd Tuesday of every month from 2:00 PM to 4:00 PM at Satyabhama Health Care, Stadium Road, Bhadrak.',
      },
      {
        question: 'What skin conditions does Dr. Srikanta Acharya treat?',
        answer:
          'He provides consultations for acne, pigmentation, warts, hair loss, fungal skin infections, eczema, psoriasis, and venereal diseases (VD).',
      },
      {
        question: 'How do I confirm a consultation with Dr. Srikanta Acharya in Bhadrak?',
        answer:
          'Satyabhama Health Care operates on a walk-in consultation model. Call reception at +91 70086 10481 to confirm the doctor\'s availability and collect a token.',
      },
    ],
  },

  'dr-dillip-kumar-chand': {
    id: 'doc-3',
    slug: 'dr-dillip-kumar-chand',
    fullName: 'Dr. Dillip Kumar Chand',
    specialtyName: 'Orthopaedics and Trauma Surgery',
    specialtySlug: 'orthopaedics',
    medicalSpecialtySchema: 'Orthopedic',
    qualifications: 'MBBS, MS Ortho, SCB Medical College, Cuttack',
    professionalRole: 'Orthopedic and Trauma Surgeon',
    affiliations: ['SCB Medical College, Cuttack', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'regular',
    titleTag: 'Dr. Dillip Kumar Chand – Orthopedic Surgeon in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Dillip Kumar Chand, Orthopedic & Trauma Surgeon (MS Ortho, SCB MCH) at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Dillip Kumar Chand',
      'Dr. Dillip Kumar Chand Bhadrak',
      'Dr. Dillip Kumar Chand orthopedic',
      'Orthopedic surgeon in Bhadrak',
      'Orthopedic doctor at Satyabhama Health Care',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-dillip-kumar-chand`,
    relatedArticleSlug: 'when-should-you-consult-an-orthopedic-surgeon',
    relatedArticleTitle: 'When Should You Consult an Orthopedic Surgeon? Joint Pain & Fracture Care Guide',
    clinicalFocus: [
      'Bone fracture management & orthopedic trauma care',
      'Osteoarthritis, knee and hip degenerative joint disease',
      'Sciatica, chronic lower back pain & cervical spondylosis',
      'Sports ligament injuries, sprains & tendon rehabilitation',
    ],
    faqs: [
      {
        question: 'On which days is Dr. Dillip Kumar Chand available at Satyabhama Health Care?',
        answer:
          'Dr. Dillip Kumar Chand consults every Sunday from 9:00 AM onwards at Satyabhama Health Care, Bhadrak. Call +91 70086 10481 to confirm queue tokens on Sunday mornings.',
      },
      {
        question: 'Does Dr. Dillip Kumar Chand evaluate elderly joint arthritis and back pain?',
        answer:
          'Yes, Dr. Chand has over 16 years of orthopedic experience evaluating osteoarthritis, slip disc/sciatica, knee pain, post-fracture stiffness, and osteoporosis.',
      },
    ],
  },

  'dr-sanjay-pany': {
    id: 'doc-2',
    slug: 'dr-sanjay-pany',
    fullName: 'Dr. Sanjay Pany',
    specialtyName: 'Psychiatry and Behavioral Health',
    specialtySlug: 'psychiatry',
    medicalSpecialtySchema: 'Psychiatric',
    qualifications: 'MBBS, MD Psychiatry',
    professionalRole: 'Assistant Professor, SCB Medical College, Cuttack',
    affiliations: ['SCB Medical College and Hospital, Cuttack', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Sanjay Pany – Psychiatrist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Sanjay Pany, Assistant Professor, SCB Medical College & Consultant Psychiatrist at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Sanjay Pany',
      'Dr. Sanjay Pany psychiatrist',
      'Dr. Sanjay Pany Bhadrak',
      'Psychiatrist in Bhadrak',
      'Mental health specialist in Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-sanjay-pany`,
    relatedArticleSlug: 'when-should-you-consult-a-psychiatrist',
    relatedArticleTitle: 'When Should You Consult a Psychiatrist? Recognizing Anxiety, Depression & Stress',
    clinicalFocus: [
      'Depressive disorders, persistent low mood & emotional burnout',
      'Generalized anxiety disorder, panic attacks & phobias',
      'Insomnia, chronic sleep cycle disruption & somatoform issues',
      'Obsessive-compulsive disorder (OCD) & behavioral health support',
    ],
    faqs: [
      {
        question: 'When is Dr. Sanjay Pany available for psychiatric consultation in Bhadrak?',
        answer:
          'Dr. Sanjay Pany consults on the 1st Saturday of every month from 9:00 AM to 10:30 AM at Satyabhama Health Care, Bhadrak. Prior telephone confirmation via +91 70086 10481 is strongly advised.',
      },
      {
        question: 'What mental health services are provided during Dr. Sanjay Pany’s clinic?',
        answer:
          'He provides clinical evaluation, confidential diagnostic review, pharmacological treatment planning, and counseling guidance for adults and adolescents experiencing anxiety, mood disorders, depression, or sleep disturbances.',
      },
    ],
  },

  'dr-priya-ranjan-barik': {
    id: 'doc-1',
    slug: 'dr-priya-ranjan-barik',
    fullName: 'Dr. Priya Ranjan Barik',
    specialtyName: 'General Medicine, Diabetes & Nephrology',
    specialtySlug: 'general-medicine',
    medicalSpecialtySchema: ['GeneralMedicine', 'Nephrology'],
    qualifications: 'MD (Medicine), Ex-SR Nephrology, Diabetologist PHFI (CCEBDM)',
    professionalRole: 'Associate Professor, Department of Medicine',
    affiliations: [
      'J.K. Medical College & Hospital, Jajpur',
      'Satyabhama Health Care, Bhadrak',
    ],
    consultantType: 'regular',
    titleTag: 'Dr. Priya Ranjan Barik – Physician, Diabetologist & Nephrologist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Priya Ranjan Barik, Associate Professor of Medicine (J.K. Medical College, Jajpur), Diabetologist & Nephrologist at Satyabhama Health Care, Bhadrak. Call 7008610481.',
    targetKeywords: [
      'Dr. Priya Ranjan Barik',
      'Dr. Priya Ranjan Barik Bhadrak',
      'Dr. Priya Ranjan Barik physician',
      'Diabetologist in Bhadrak',
      'Nephrologist in Bhadrak',
      'General physician in Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-priya-ranjan-barik`,
    relatedArticleSlug: 'diabetes-consultations-ongoing-medical-care',
    relatedArticleTitle: 'Diabetes Consultations & Ongoing Medical Care: Managing Blood Sugar & Complications',
    clinicalFocus: [
      'Type 2 diabetes mellitus glycemic control & complication screening',
      'Kidney health, nephrology evaluation & chronic kidney disease management',
      'Hypertension, cardiovascular risk factors & dyslipidemia',
      'General adult medicine: fevers, infections & systemic conditions',
    ],
    faqs: [
      {
        question: 'How do I consult Dr. Priya Ranjan Barik at Satyabhama Health Care, Bhadrak?',
        answer:
          'Dr. Priya Ranjan Barik consults daily on scheduled morning and evening sessions. Patients are advised to call clinic reception at +91 70086 10481 before visiting to confirm availability.',
      },
      {
        question: 'What clinical disciplines does Dr. Priya Ranjan Barik focus on?',
        answer:
          'His practice covers General Medicine, Diabetes (certified Diabetologist, PHFI CCEBDM), and Nephrology (Ex-Senior Resident in Nephrology). He is an Associate Professor at J.K. Medical College & Hospital, Jajpur.',
      },
    ],
  },

  'dr-subharansu-sekhar-lenka': {
    id: 'doc-6',
    slug: 'dr-subharansu-sekhar-lenka',
    fullName: 'Dr. Subharansu Sekhar Lenka',
    specialtyName: 'General and Laparoscopic Surgery',
    specialtySlug: 'general-surgery',
    medicalSpecialtySchema: 'Surgical',
    qualifications: 'MS Surgery, SCB Medical College, Cuttack',
    professionalRole: 'Consultant General Surgeon',
    affiliations: ['SCB Medical College, Cuttack', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'regular',
    titleTag: 'Dr. Subharansu Sekhar Lenka – General Surgeon in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Subharansu Sekhar Lenka, Consultant General & Laparoscopic Surgeon (MS Surgery) at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Subharansu Sekhar Lenka',
      'Dr. Subharansu Sekhar Lenka Bhadrak',
      'Dr. Subharansu Sekhar Lenka surgeon',
      'General surgeon in Bhadrak',
      'Laparoscopic surgeon in Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-subharansu-sekhar-lenka`,
    relatedArticleSlug: 'when-to-consult-a-general-and-laparoscopic-surgeon',
    relatedArticleTitle: 'When to Consult a General Surgeon: Hernia, Gallbladder & Abdominal Symptoms',
    clinicalFocus: [
      'Inguinal, umbilical & incisional hernia evaluations',
      'Gallbladder stones & cholecystitis surgical consultation',
      'Anorectal conditions: hemorrhoids (piles), fissures & fistula-in-ano',
      'Appendicitis, abdominal wall swellings & minor surgical procedures',
    ],
    faqs: [
      {
        question: 'What types of surgical evaluations does Dr. Subharansu Sekhar Lenka perform?',
        answer:
          'Dr. Lenka specializes in General and Laparoscopic Surgery, offering expert diagnosis and pre/post-operative advisory for hernias, gallbladder stones, piles/fissures, hydroceles, cysts, and abdominal conditions.',
      },
      {
        question: 'How can I schedule a surgical consultation with Dr. Subharansu Sekhar Lenka in Bhadrak?',
        answer:
          'Visit Satyabhama Health Care on Stadium Road, Bhadrak, or call clinic reception at +91 70086 10481 to verify consultation slots and token availability.',
      },
    ],
  },

  'dr-tanmaya-padhy': {
    id: 'doc-11',
    slug: 'dr-tanmaya-padhy',
    fullName: 'Dr. Tanmaya Padhy',
    specialtyName: 'Neurology',
    specialtySlug: 'neurosurgery',
    medicalSpecialtySchema: 'Neurologic',
    qualifications: 'MD (Medicine), DM (Neurology)',
    professionalRole: 'Consultant Neurologist',
    affiliations: ['SCB Medical College & Hospital, Cuttack', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Tanmaya Padhy – Neurologist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Tanmaya Padhy, DM (Neurology), Consultant Neurologist from SCB Medical College, Cuttack at Satyabhama Health Care, Bhadrak. Call 7008610481.',
    targetKeywords: [
      'Dr. Tanmaya Padhy',
      'Dr. Tanmaya Padhy neurologist',
      'Dr. Tanmaya Padhy Bhadrak',
      'Neurologist in Bhadrak',
      'Neurology specialist Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-tanmaya-padhy`,
    clinicalFocus: [
      'Epilepsy, seizure disorders & anti-epileptic therapy management',
      'Stroke evaluation, cerebrovascular risk & rehabilitation advisory',
      'Headache, migraine & tension-type headache management',
      "Neuropathy, Parkinson's disease & movement disorder evaluation",
    ],
    faqs: [
      {
        question: 'When is Dr. Tanmaya Padhy available at Satyabhama Health Care?',
        answer:
          'Dr. Tanmaya Padhy consults on the 4th Tuesday of every month from 10:00 AM to 12:00 PM at Satyabhama Health Care, Stadium Road, Bhadrak.',
      },
      {
        question: 'What neurological conditions does Dr. Tanmaya Padhy treat?',
        answer:
          "He provides consultations for epilepsy, stroke, Parkinson's disease, headache disorders, neuropathy, dizziness, memory disorders, and movement conditions.",
      },
      {
        question: 'How do I confirm a consultation with Dr. Tanmaya Padhy in Bhadrak?',
        answer:
          "Call clinic reception at +91 70086 10481 to confirm the doctor's availability and register for a token before visiting.",
      },
    ],
  },

  'dr-subhada-pattnaik': {
    id: 'doc-12',
    slug: 'dr-subhada-pattnaik',
    fullName: 'Dr. Subhada Pattnaik',
    specialtyName: 'Orthopedics',
    specialtySlug: 'orthopaedics',
    medicalSpecialtySchema: 'Orthopedic',
    qualifications: 'MS (Orthopedics)',
    professionalRole: 'Consultant Orthopedic Surgeon',
    affiliations: ['Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Subhada Pattnaik – Orthopedic Surgeon in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Subhada Pattnaik, Consultant Orthopedic Surgeon (MS Orthopedics) at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Subhada Pattnaik',
      'Dr. Subhada Pattnaik orthopedic',
      'Dr. Subhada Pattnaik Bhadrak',
      'Orthopedic surgeon in Bhadrak',
      'Bone specialist Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-subhada-pattnaik`,
    clinicalFocus: [
      'Bone fractures, trauma & orthopedic injury management',
      'Joint pain, osteoarthritis & knee/hip evaluation',
      'Spinal disorders, back pain & disc conditions',
      'Sports injuries & musculoskeletal health',
    ],
    faqs: [
      {
        question: 'When is Dr. Subhada Pattnaik available at Satyabhama Health Care?',
        answer:
          'Dr. Subhada Pattnaik consults every Thursday and Friday at Satyabhama Health Care, Stadium Road, Bhadrak. Please call +91 70086 10481 for exact session timings.',
      },
      {
        question: 'What orthopedic conditions does Dr. Subhada Pattnaik treat?',
        answer:
          'She provides consultations for bone fractures, joint pain, arthritis, spinal disorders, disc problems, sports injuries, and musculoskeletal conditions.',
      },
      {
        question: 'How do I confirm a consultation with Dr. Subhada Pattnaik in Bhadrak?',
        answer:
          "Call clinic reception at +91 70086 10481 to confirm the doctor's availability and session timings before visiting.",
      },
    ],
  },
};

export function getDoctorSEO(slug: string): DoctorSEOEntity | undefined {
  return DOCTOR_SEO_MAP[slug];
}

