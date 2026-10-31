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
  'dr-swarupananda-mishra': {
    id: 'doc-4',
    slug: 'dr-swarupananda-mishra',
    fullName: 'Dr. Swarupananda Mishra',
    specialtyName: 'ENT / Ear, Nose and Throat',
    specialtySlug: 'ent',
    medicalSpecialtySchema: 'Otolaryngologic',
    qualifications: 'MBBS, MS (ENT)',
    professionalRole: 'Consultant ENT Surgeon, Cuttack ENT Care',
    affiliations: ['Cuttack ENT Care', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Swarupananda Mishra – ENT Specialist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Swarupananda Mishra, Consultant ENT Surgeon at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481 to confirm availability.',
    targetKeywords: [
      'Dr. Swarupananda Mishra',
      'Dr. Swarupananda Mishra ENT',
      'Dr. Swarupananda Mishra Bhadrak',
      'ENT specialist in Bhadrak',
      'Satyabhama Health Care ENT doctor',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-swarupananda-mishra`,
    relatedArticleSlug: 'how-to-find-an-ent-specialist-in-bhadrak',
    relatedArticleTitle: 'How to Find an ENT Specialist in Bhadrak: Guide to Ear, Nose & Throat Consultations',
    clinicalFocus: [
      'Chronic sinus disease & nasal polyps evaluation',
      'Hearing impairment, tinnitus & vertigo assessment',
      'Tonsillitis, adenoid disorders & throat infections',
      'Endoscopic ear and laryngeal diagnostic review',
    ],
    faqs: [
      {
        question: 'When is Dr. Swarupananda Mishra available for consultation at Satyabhama Health Care?',
        answer:
          'Dr. Swarupananda Mishra consults as a visiting ENT specialist on designated monthly and weekly dates. Patients are strongly advised to call clinic reception at +91 70086 10481 or +91 76818 62111 to verify current week dates before visiting.',
      },
      {
        question: 'What conditions does Dr. Swarupananda Mishra treat at the Bhadrak clinic?',
        answer:
          'He provides clinical evaluation and surgical counseling for ear discharge, hearing loss, vertigo, chronic sinusitis, nasal obstruction, tonsillitis, voice changes, and throat ailments.',
      },
      {
        question: 'How do I book or confirm an appointment with Dr. Swarupananda Mishra in Bhadrak?',
        answer:
          'Satyabhama Health Care operates on a direct walk-in consultation model with scheduled slots. There are no online booking forms. Please call the reception desk at +91 70086 10481 to confirm doctor arrival and collect a registration token.',
      },
    ],
  },

  'dr-manjulata-dash': {
    id: 'doc-5',
    slug: 'dr-manjulata-dash',
    fullName: 'Dr. Manjulata Dash',
    specialtyName: 'Dermatology / Skin & VD',
    specialtySlug: 'dermatology',
    medicalSpecialtySchema: 'Dermatology',
    qualifications: 'MBBS, MD (Skin & VD)',
    professionalRole: 'Associate Professor, SCB Medical College, Cuttack',
    affiliations: ['SCB Medical College & Hospital, Cuttack', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Manjulata Dash – Dermatologist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Manjulata Dash, Associate Professor, SCB Medical College & Skin Specialist at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Manjulata Dash',
      'Dr. Manjulata Dash dermatologist',
      'Dr. Manjulata Dash Bhadrak',
      'Skin specialist in Bhadrak',
      'Dermatologist at Satyabhama Health Care',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-manjulata-dash`,
    relatedArticleSlug: 'understanding-when-to-consult-a-dermatologist',
    relatedArticleTitle: 'Understanding When to Consult a Dermatologist for Chronic Skin Conditions',
    clinicalFocus: [
      'Chronic eczema, psoriasis & dermatitis management',
      'Fungal, bacterial and viral dermatological infections',
      'Acne vulgaris, pigmentary disorders & allergy tests',
      'Venereology, sexual health & scalp disorder evaluations',
    ],
    faqs: [
      {
        question: 'How can I consult Dr. Manjulata Dash for skin problems in Bhadrak?',
        answer:
          'Dr. Manjulata Dash attends scheduled outpatient clinics at Satyabhama Health Care, Stadium Road, Bhadrak. Contact the clinic helpline at +91 70086 10481 to check her upcoming visit date.',
      },
      {
        question: 'What skin ailments does Dr. Manjulata Dash evaluate?',
        answer:
          'As an Associate Professor at SCB Medical College, she handles complex dermatology cases including severe eczema, psoriasis, recurrent ringworm/fungal infections, resistant acne, hair loss, and sexually transmitted skin disorders.',
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

  'dr-rama-chandra-deo': {
    id: 'doc-6',
    slug: 'dr-rama-chandra-deo',
    fullName: 'Dr. Rama Chandra Deo',
    specialtyName: 'Neurosurgery and Spine',
    specialtySlug: 'neurosurgery',
    medicalSpecialtySchema: 'Neurosurgical',
    qualifications: 'M.Ch. Neurosurgery, MS General Surgery',
    professionalRole: 'Associate Professor, Neurosurgery',
    affiliations: ['Associate Professor, Neurosurgery (SUM Hospital / SCB MCH)', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Rama Chandra Deo – Neurosurgeon in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Rama Chandra Deo, Associate Professor of Neurosurgery (M.Ch. Neuro) at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Rama Chandra Deo',
      'Dr. Rama Chandra Deo neurosurgeon',
      'Dr. Rama Chandra Deo Bhadrak',
      'Neurosurgeon in Bhadrak',
      'Spine specialist in Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-rama-chandra-deo`,
    relatedArticleSlug: 'understanding-the-role-of-a-neurosurgeon',
    relatedArticleTitle: 'Understanding the Role of a Neurosurgeon: Brain, Spine & Nerve Consultations',
    clinicalFocus: [
      'Spinal disc herniation, cervical myelopathy & sciatica surgery review',
      'Brain tumor, pituitary adenoma & skull base lesion counseling',
      'Hydrocephalus, cranial neuropathies & nerve entrapment syndromes',
      'Head injury follow-up & traumatic spinal cord injury advisory',
    ],
    faqs: [
      {
        question: 'How do I consult Dr. Rama Chandra Deo for spine and brain conditions in Bhadrak?',
        answer:
          'Dr. Rama Chandra Deo attends visiting neurosurgical super-specialty clinics at Satyabhama Health Care on announced dates. Please bring your MRI/CT scan reports and call +91 70086 10481 to verify the next clinic date.',
      },
      {
        question: 'Is Dr. Rama Chandra Deo an Associate Professor of Neurosurgery?',
        answer:
          'Yes, Dr. Rama Chandra Deo holds an M.Ch. in Neurosurgery with extensive surgical and academic experience as an Associate Professor, including specialized fellowship training from AIIMS, New Delhi.',
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

  'dr-umesh-chandra-jena': {
    id: 'doc-7',
    slug: 'dr-umesh-chandra-jena',
    fullName: 'Dr. Umesh Chandra Jena',
    specialtyName: 'Paediatrics and Child Health',
    specialtySlug: 'paediatrics',
    medicalSpecialtySchema: 'Pediatric',
    qualifications: 'MBBS, MD Pediatrics / DCH',
    professionalRole: 'Senior Pediatrician',
    affiliations: ['Senior Pediatrician, Bhadrak', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'regular',
    titleTag: 'Dr. Umesh Chandra Jena – Pediatrician in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Umesh Chandra Jena, Senior Pediatrician & Child Specialist at Satyabhama Health Care, Stadium Road, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Umesh Chandra Jena',
      'Dr. Umesh Chandra Jena Bhadrak',
      'Dr. Umesh Chandra Jena pediatrician',
      'Child specialist in Bhadrak',
      'Pediatrician at Satyabhama Health Care',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-umesh-chandra-jena`,
    relatedArticleSlug: 'child-healthcare-consultations-in-bhadrak',
    relatedArticleTitle: 'Child Healthcare Consultations in Bhadrak: Infant Nutrition, Growth & Fever Care',
    clinicalFocus: [
      'Infant and newborn health monitoring & developmental milestones',
      'Childhood seasonal viral fevers, pneumonia & respiratory care',
      'Pediatric gastrointestinal infections & nutritional guidance',
      'Vaccination advisory & preventative child health checkups',
    ],
    faqs: [
      {
        question: 'Where does Dr. Umesh Chandra Jena see pediatric patients in Bhadrak?',
        answer:
          'Dr. Umesh Chandra Jena consults regularly at Satyabhama Health Care, situated on Stadium Road near Nehru Stadium and Bonth Chhak, Bhadrak. Call +91 70086 10481 for current week sessions.',
      },
      {
        question: 'What age group of children can consult with Dr. Jena?',
        answer:
          'He provides medical care for newborns, infants, young children, and adolescents up to age 16.',
      },
    ],
  },

  'dr-shakti-prasad-choudhury': {
    id: 'doc-8',
    slug: 'dr-shakti-prasad-choudhury',
    fullName: 'Dr. Shakti Prasad Choudhury',
    specialtyName: 'Gastroenterology and Hepatology',
    specialtySlug: 'gastroenterology',
    medicalSpecialtySchema: 'Gastroenterology',
    qualifications: 'MD Medicine, DM Hepatology, New Delhi',
    professionalRole: 'Gastroenterologist and Hepatologist, associated with Fortis Hospital Mumbai and Kalinga Hospital Bhubaneswar',
    affiliations: ['Fortis Hospital, Mumbai', 'Kalinga Hospital, Bhubaneswar', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'visiting',
    titleTag: 'Dr. Shakti Prasad Choudhury – Gastroenterologist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Shakti Prasad Choudhury, DM Hepatology (New Delhi), Gastroenterologist at Satyabhama Health Care, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Shakti Prasad Choudhury',
      'Dr. Shakti Prasad Choudhury gastroenterologist',
      'Dr. Shakti Prasad Choudhury hepatologist',
      'Gastroenterologist in Bhadrak',
      'Liver specialist in Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-shakti-prasad-choudhury`,
    relatedArticleSlug: 'when-to-consult-a-gastroenterologist-liver-care',
    relatedArticleTitle: 'When to Consult a Gastroenterologist: Jaundice, Fatty Liver & Acid Reflux Guide',
    clinicalFocus: [
      'Fatty liver disease (NAFLD/NASH), hepatitis & cirrhosis management',
      'Acid peptic disease, chronic GERD & gastritis management',
      'Gallbladder stones, jaundice & chronic pancreatitis advisory',
      'Ulcerative colitis, Crohn’s disease & irritable bowel syndrome (IBS)',
    ],
    faqs: [
      {
        question: 'How can I consult Dr. Shakti Prasad Choudhury for liver and stomach problems in Bhadrak?',
        answer:
          'Dr. Shakti Prasad Choudhury conducts scheduled visiting gastroenterology clinics at Satyabhama Health Care, Bhadrak. Contact the reception desk at +91 70086 10481 to confirm the date of the next visit.',
      },
      {
        question: 'What are the qualifications of Dr. Shakti Prasad Choudhury?',
        answer:
          'Dr. Choudhury holds an MD in General Medicine and a super-specialty DM in Hepatology from New Delhi, with leadership experience at Fortis Hospital, Mumbai and Kalinga Hospital, Bhubaneswar.',
      },
    ],
  },

  'dr-priya-ranjan-barik': {
    id: 'doc-1',
    slug: 'dr-priya-ranjan-barik',
    fullName: 'Dr. Priya Ranjan Barik',
    specialtyName: 'General Medicine, Pulmonology & Diabetes',
    specialtySlug: 'general-medicine',
    medicalSpecialtySchema: ['Pulmonary', 'GeneralMedicine'],
    qualifications: 'MBBS, MD (Medicine), subject to verification',
    professionalRole: 'Senior Consultant Physician & Specialist',
    affiliations: [
      'Associated with Fakir Mohan Medical College & Hospital, Balasore',
      'Sri Jagannath Medical College & Hospital, Puri',
      'Satyabhama Health Care, Bhadrak',
    ],
    consultantType: 'regular',
    titleTag: 'Dr. Priya Ranjan Barik – Physician & Pulmonologist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Priya Ranjan Barik, Consultant Physician & Pulmonologist at Satyabhama Health Care, Stadium Road, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Priya Ranjan Barik',
      'Dr. Priya Ranjan Barik Bhadrak',
      'Dr. Priya Ranjan Barik physician',
      'Pulmonologist in Bhadrak',
      'Diabetes specialist in Bhadrak',
      'General physician in Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-priya-ranjan-barik`,
    relatedArticleSlug: 'diabetes-consultations-ongoing-medical-care',
    relatedArticleTitle: 'Diabetes Consultations & Ongoing Medical Care: Managing Blood Sugar & Complications',
    clinicalFocus: [
      'Pulmonary conditions, bronchial asthma, COPD & chronic cough',
      'Type 2 diabetes mellitus glycemic control & complication screening',
      'Hypertension, cardiovascular risk factors & dyslipidemia',
      'Prolonged seasonal fevers, tropical infections & general adult medicine',
    ],
    faqs: [
      {
        question: 'How do I consult Dr. Priya Ranjan Barik at Satyabhama Health Care, Bhadrak?',
        answer:
          'Dr. Priya Ranjan Barik consults daily on scheduled morning and evening sessions. Because emergency clinical duties at partner government medical institutions may occur, patients are strongly advised to call clinic reception at +91 70086 10481 before travelling.',
      },
      {
        question: 'What clinical disciplines does Dr. Priya Ranjan Barik focus on?',
        answer:
          'His primary clinical practice focuses on General Medicine, Pulmonology (chest and lung conditions such as asthma, COPD, and persistent cough), and long-term Diabetes Care management.',
      },
    ],
  },

  'dr-soudamini-dhal': {
    id: 'doc-9',
    slug: 'dr-soudamini-dhal',
    fullName: 'Dr. Soudamini Dhal',
    specialtyName: 'Obstetrics and Gynaecology',
    specialtySlug: 'gynaecology',
    medicalSpecialtySchema: 'Obstetric',
    qualifications: 'MBBS, MD Obstetrics & Gynaecology (subject to verification)',
    professionalRole: 'Consultant Obstetrician and Gynaecologist',
    affiliations: ['Consultant Obstetrician & Gynaecologist, Bhadrak', 'Satyabhama Health Care, Bhadrak'],
    consultantType: 'regular',
    titleTag: 'Dr. Soudamini Dhal – Gynecologist in Bhadrak | Satyabhama Health Care',
    metaDescription:
      'Find consultation information for Dr. Soudamini Dhal, Consultant Obstetrician & Gynecologist at Satyabhama Health Care, Stadium Road, Bhadrak, Odisha. Call 7008610481.',
    targetKeywords: [
      'Dr. Soudamini Dhal',
      'Dr. Soudamini Dhal Bhadrak',
      'Dr. Soudamini Dhal gynecologist',
      'Gynecologist in Bhadrak',
      'Women\'s health specialist in Bhadrak',
    ],
    canonicalUrl: `${SITE_URL}/doctors/dr-soudamini-dhal`,
    relatedArticleSlug: 'womens-health-gynaecological-consultations-in-bhadrak',
    relatedArticleTitle: 'Women’s Health & Gynaecological Consultations: Antenatal Care, Menstrual Health & Wellness',
    clinicalFocus: [
      'Comprehensive antenatal care & pregnancy wellness checkups',
      'Menstrual irregularities, heavy bleeding & dysmenorrhea',
      'Polycystic ovary syndrome (PCOS/PCOD) lifestyle and medical care',
      'Pelvic pain, reproductive tract infections & menopausal transitions',
    ],
    faqs: [
      {
        question: 'Where can I consult Dr. Soudamini Dhal for women’s health concerns in Bhadrak?',
        answer:
          'Dr. Soudamini Dhal provides confidential consultations at Satyabhama Health Care, Nehru Stadium Road, near Bonth Chhak, Bhadrak. Telephone verification is available via +91 70086 10481.',
      },
      {
        question: 'Does Dr. Soudamini Dhal provide antenatal pregnancy reviews?',
        answer:
          'Yes, her clinical services include routine antenatal care checkups, maternal nutrition advice, fetal growth monitoring, and postnatal reviews.',
      },
    ],
  },

  'dr-subharansu-sekhar-lenka': {
    id: 'doc-10',
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
};

export function getDoctorSEO(slug: string): DoctorSEOEntity | undefined {
  return DOCTOR_SEO_MAP[slug];
}

