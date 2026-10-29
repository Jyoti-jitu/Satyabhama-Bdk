-- ==============================================================================
-- SATYABHAMA HEALTH CARE - SEED DATA
-- Platform: Supabase PostgreSQL
-- ==============================================================================

-- 1. Insert Clinic Settings
INSERT INTO clinic_settings (
    id, clinic_name, tagline, logo_url, address, phone, secondary_phone, email,
    opening_hours, map_url, timezone, developer_name, developer_url, developer_tagline, announcement
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Satyabhama Health Care',
    'Trusted Healthcare. Experienced Doctors. Better Wellbeing.',
    '/images/logo.png',
    'Nehru Stadium, Stadium Road, near Bonth Chhak, Bhadrak, Odisha 756100, India',
    '+91 70086 10481',
    '+91 70086 10481',
    'info@satyabhamahealthcare.com',
    'Monday – Sunday: 8:00 AM – 9:00 PM',
    'https://maps.google.com/?q=Nehru+Stadium+Bhadrak+Odisha+756100',
    'Asia/Kolkata',
    'JOVIX Technologies',
    'https://www.jovix.co.uk',
    'Technology for a Brighter Tomorrow',
    'Visiting specialist consultations must be confirmed in advance via clinic phone: +91 70086 10481.'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Specialties
INSERT INTO specialties (id, name, slug, description, icon, publication_status) VALUES
('b0000000-0000-0000-0000-000000000001', 'General Medicine', 'general-medicine', 'Comprehensive medical care, fever, diabetes, hypertension, and systemic diseases.', 'Stethoscope', 'published'),
('b0000000-0000-0000-0000-000000000002', 'Diabetes Care', 'diabetes-care', 'Specialized glycemic control, diabetic neuropathy, preventive screening, and insulin management.', 'Activity', 'published'),
('b0000000-0000-0000-0000-000000000003', 'Psychiatry & Mental Health', 'psychiatry', 'Evidence-based care for anxiety, depression, mood disorders, and behavioral wellness.', 'Brain', 'published'),
('b0000000-0000-0000-0000-000000000004', 'Orthopaedics & Trauma', 'orthopaedics', 'Treatment for fractures, arthritis, joint pain, spinal conditions, and musculoskeletal health.', 'Bone', 'published'),
('b0000000-0000-0000-0000-000000000005', 'General & Laparoscopic Surgery', 'general-surgery', 'Consultations for hernia, gallbladder, abdominal disorders, and minor surgical procedures.', 'Scissors', 'published'),
('b0000000-0000-0000-0000-000000000006', 'Gynaecology & Obstetrics', 'gynaecology', 'Comprehensive womens healthcare, antenatal checkups, menstrual health, and menopause care.', 'HeartHandshake', 'published'),
('b0000000-0000-0000-0000-000000000007', 'Neurosurgery & Spine', 'neurosurgery', 'Specialist consultations for brain and spinal cord disorders, sciatica, and nerve compressions.', 'ShieldAlert', 'published'),
('b0000000-0000-0000-0000-000000000008', 'ENT (Otorhinolaryngology)', 'ent', 'Clinical evaluation of hearing loss, ear infections, sinus disorders, tonsillitis, and vertigo.', 'Ear', 'published'),
('b0000000-0000-0000-0000-000000000009', 'Dermatology & Cosmetology', 'dermatology', 'Skin disorder management, eczema, psoriasis, acne, allergy tests, and hair fall treatments.', 'Sparkles', 'published'),
('b0000000-0000-0000-0000-000000000010', 'Gastroenterology & Liver Care', 'gastroenterology', 'Consultations for acid reflux, liver disease, fatty liver, jaundice, and digestive care.', 'ShieldCheck', 'published'),
('b0000000-0000-0000-0000-000000000011', 'Dental Care & Oral Health', 'dental-care', 'Root canal treatment, dental restorations, scaling, extractions, crowns, and oral health.', 'Smile', 'published'),
('b0000000-0000-0000-0000-000000000012', 'Paediatrics & Child Health', 'paediatrics', 'Newborn checkups, childhood infections, nutritional guidance, and vaccination advisory.', 'Baby', 'published')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Doctors
INSERT INTO doctors (
    id, full_name, slug, profile_image_url, qualifications, medical_registration_details,
    specialty_summary, biography, designation, languages, consultant_type, verification_status, publication_status, contact_number, experience_years
) VALUES
('c0000000-0000-0000-0000-000000000001', 'Dr. Priya Ranjan Barik', 'dr-priya-ranjan-barik', '/images/doctors/Priyaranjan.png', 'MBBS, MD (Medicine)', 'OMC Reg. No. 18420 (Odisha Medical Council)', 'General Medicine, Diabetes & Nephrology', 'Dr. Priya Ranjan Barik is an Associate Professor in the Dept. of Medicine at J.K. MCH, Jajpur, former SR in Nephrology, and certified Diabetologist (PHFI - CCEBDM). Outpatient consultations daily.', 'Associate Professor & Senior Consultant Physician', ARRAY['Odia', 'Hindi', 'English'], 'regular', 'verified', 'published', '+91 70086 10481', 14),
('c0000000-0000-0000-0000-000000000002', 'Dr. Srikant Acharya', 'dr-srikant-acharya', '/images/doctors/Srikant.png', 'MBBS, MD (DVL)', 'OMC Reg. No. 20112 (Odisha Medical Council)', 'Dermatology, Skin & Venereal Diseases', 'Dr. Srikant Acharya (SCB Medical College, Cuttack) is a Consultant Dermatologist & Venereologist. Consultation on 1st & 3rd Tuesday from 2:00 PM to 4:00 PM.', 'Consultant Dermatologist & Venereologist', ARRAY['Odia', 'Hindi', 'English'], 'visiting', 'verified', 'published', '+91 70086 10481', 10),
('c0000000-0000-0000-0000-000000000003', 'Dr. Tanmay Padhy', 'dr-tanmay-padhy', '/images/doctors/Tanmay%20padhy.png', 'MBBS, MD (Medicine), DM (Neurology)', 'OMC Reg. No. 21450 (Odisha Medical Council)', 'Neurology & Brain/Nerve Disorders', 'Dr. Tanmay Padhy (SCB Medical College, Cuttack) is a Consultant Neurologist specializing in stroke, epilepsy, migraines, neuropathy, and movement disorders. Consultation on 4th Tuesday 10:00 AM - 12:00 PM.', 'Consultant Neurologist', ARRAY['Odia', 'Hindi', 'English'], 'visiting', 'verified', 'published', '+91 70086 10481', 11),
('c0000000-0000-0000-0000-000000000004', 'Dr. Sanjay Pany', 'dr-sanjay-pany', '/images/doctors/Sanjay%20PANY.png', 'MBBS, MD (Psychiatry)', 'OMC Reg. No. 19543 (Odisha Medical Council)', 'Psychiatry & Behavioral Health', 'Dr. Sanjay Pany is an Assistant Professor at SCB Medical College, Cuttack and Consultant Psychiatrist. Consultation on 1st Saturday from 9:00 AM to 10:30 AM.', 'Assistant Professor & Consultant Psychiatrist', ARRAY['Odia', 'Hindi', 'English'], 'visiting', 'verified', 'published', '+91 70086 10481', 12),
('c0000000-0000-0000-0000-000000000005', 'Dr. Sabyasachi Pati', 'dr-sabyasachi-pati', '/images/doctors/Sabyasachi.png', 'MBBS, MS (ENT & HNS)', 'OMC Reg. No. 19024 (Odisha Medical Council)', 'Ear, Nose & Throat (ENT & HNS)', 'Dr. Sabyasachi Pati (SCB Medical College, Cuttack) is an Otorhinolaryngologist and Head & Neck Surgeon. Consultation on 2nd & 4th Saturday 9:00 AM - 10:00 AM.', 'Consultant ENT & Head-Neck Surgeon', ARRAY['Odia', 'Hindi', 'English'], 'visiting', 'verified', 'published', '+91 70086 10481', 9),
('c0000000-0000-0000-0000-000000000006', 'Dr. Dilip Kumar Chand', 'dr-dilip-kumar-chand', '/images/doctors/dr-dilip-kumar-chand.jpg', 'MBBS, MS (Orthopaedics)', 'OMC Reg. No. 15309 (Odisha Medical Council)', 'Orthopaedics & Joint Trauma', 'Comprehensive orthopaedic clinical evaluations for joint pain, spinal disorders, sports injuries, and fracture care.', 'Consultant Orthopaedic Surgeon', ARRAY['Odia', 'Hindi', 'English'], 'regular', 'verified', 'published', '+91 70086 10481', 16),
('c0000000-0000-0000-0000-000000000007', 'Dr. Subhada Pattnaik', 'dr-subhada-pattnaik', '/images/doctors/dr-subhada-pattnaik.png', 'MBBS, MS (Orthopedics)', 'OMC Reg. No. 16582 (Odisha Medical Council)', 'Orthopaedics & Joint Trauma', 'Experienced Consultant Orthopaedic Surgeon specializing in fracture trauma, joint preservation, arthritis care, and spine rehabilitation. Outpatient consultations available every Thursday and Friday.', 'Consultant Orthopaedic Surgeon', ARRAY['Odia', 'Hindi', 'English'], 'regular', 'verified', 'published', '+91 70086 10481', 13),
('c0000000-0000-0000-0000-000000000008', 'Dr. Subranshu Sekhar Lenka', 'dr-subranshu-sekhar-lenka', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600', 'MBBS, MS (General Surgery)', 'OMC Reg. No. 17218 (Odisha Medical Council)', 'General & Laparoscopic Surgery', 'Specialized surgical evaluations for abdominal conditions, hernia, anorectal disorders, and minor surgery.', 'Consultant General Surgeon', ARRAY['Odia', 'Hindi', 'English'], 'regular', 'verified', 'published', '+91 70086 10481', 11),
('c0000000-0000-0000-0000-000000000009', 'Dr. Sunil Kumar Pati', 'dr-sunil-kumar-pati', 'https://images.unsplash.com/photo-1594824813576-904d6e9f50cb?auto=format&fit=crop&q=80&w=600', 'MBBS, MS, MCh (Neurosurgery)', 'OMC Reg. No. 16723 (Odisha Medical Council)', 'Neurosurgery & Spine Advisory', 'Visiting specialist providing advanced clinical assessment for spine conditions, nerve compressions, and neurological disorders.', 'Visiting Consultant Neurosurgeon', ARRAY['Odia', 'Hindi', 'English'], 'visiting', 'verified', 'published', '+91 70086 10481', 15),
-- Unverified Research Leads kept strictly draft and unpublished
('c0000000-0000-0000-0000-000000000011', 'Dr. Rajendra Kumar Nayak', 'dr-rajendra-kumar-nayak', NULL, 'MBBS, MD (Paediatrics) [Pending Verification]', 'Pending Clinic Verification', 'Paediatrics & Child Health', 'Lead identified from local directories. Awaiting official clinic confirmation.', 'Proposed Paediatrician', ARRAY['Odia', 'Hindi'], 'visiting', 'pending_verification', 'draft', '+91 70086 10481', 7),
('c0000000-0000-0000-0000-000000000012', 'Dr. Manjulata Das', 'dr-manjulata-das', NULL, 'MBBS, DVD [Pending Verification]', 'Pending Clinic Verification', 'Dermatology & Skin Care', 'Lead identified from local registry. Awaiting credential verification.', 'Proposed Dermatologist', ARRAY['Odia', 'English'], 'visiting', 'pending_verification', 'draft', '+91 70086 10481', 9)
ON CONFLICT (id) DO NOTHING;
