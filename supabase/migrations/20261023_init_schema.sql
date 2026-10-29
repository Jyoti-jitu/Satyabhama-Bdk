-- ==============================================================================
-- SATYABHAMA HEALTH CARE - COMPLETE DATABASE SCHEMA & ROW LEVEL SECURITY
-- Platform: Supabase PostgreSQL
-- Developed by: JOVIX Technologies | Technology for a Brighter Tomorrow
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CLINIC SETTINGS TABLE
CREATE TABLE IF NOT EXISTS clinic_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_name VARCHAR(255) NOT NULL DEFAULT 'Satyabhama Health Care',
    tagline VARCHAR(255) DEFAULT 'Trusted Healthcare. Experienced Doctors. Better Wellbeing.',
    logo_url TEXT DEFAULT '/images/logo.png',
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    secondary_phone VARCHAR(50),
    email VARCHAR(255),
    opening_hours VARCHAR(255) NOT NULL,
    map_url TEXT,
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Kolkata',
    developer_name VARCHAR(100) DEFAULT 'JOVIX Technologies',
    developer_url VARCHAR(255) DEFAULT 'https://www.jovix.co.uk',
    developer_tagline VARCHAR(255) DEFAULT 'Technology for a Brighter Tomorrow',
    announcement TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER PROFILES TABLE (Linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'clinic_admin', 'doctor', 'content_editor')),
    doctor_id UUID,
    active_status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    profile_image_url TEXT,
    qualifications VARCHAR(255) NOT NULL,
    medical_registration_details VARCHAR(255),
    specialty_summary VARCHAR(255) NOT NULL,
    biography TEXT NOT NULL,
    designation VARCHAR(255),
    languages TEXT[] DEFAULT ARRAY['Odia', 'Hindi', 'English'],
    consultant_type VARCHAR(50) NOT NULL DEFAULT 'regular' CHECK (consultant_type IN ('regular', 'visiting')),
    verification_status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (verification_status IN ('draft', 'pending_verification', 'verified', 'rejected')),
    publication_status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (publication_status IN ('draft', 'pending_verification', 'published', 'changed', 'cancelled', 'archived')),
    contact_number VARCHAR(50),
    experience_years INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SPECIALTIES TABLE
CREATE TABLE IF NOT EXISTS specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'Stethoscope',
    publication_status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published', 'archived'))
);

-- 5. DOCTOR SPECIALTIES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS doctor_specialties (
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    specialty_id UUID NOT NULL REFERENCES specialties(id) ON DELETE CASCADE,
    PRIMARY KEY (doctor_id, specialty_id)
);

-- 6. DOCTOR SCHEDULES TABLE (Recurring weekly timings)
CREATE TABLE IF NOT EXISTS doctor_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 1=Monday...
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    session_type VARCHAR(50) DEFAULT 'morning' CHECK (session_type IN ('morning', 'evening', 'full_day')),
    effective_from DATE,
    effective_until DATE,
    publication_status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'pending_verification', 'published', 'changed', 'cancelled', 'archived')),
    updated_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SCHEDULE EXCEPTIONS TABLE (Date-specific cancellations, holidays, special clinics)
CREATE TABLE IF NOT EXISTS schedule_exceptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    consultation_date DATE NOT NULL,
    exception_type VARCHAR(50) NOT NULL CHECK (exception_type IN (
        'unavailable', 'weekly_holiday', 'special_clinic', 'rescheduled',
        'cancelled', 'temporary_change', 'visiting_specialist', 'additional_session'
    )),
    start_time TIME,
    end_time TIME,
    notes TEXT,
    publication_status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'pending_verification', 'published', 'changed', 'cancelled', 'archived')),
    created_by UUID REFERENCES user_profiles(id),
    updated_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DOCTOR CHANGE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS doctor_change_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES user_profiles(id),
    change_type VARCHAR(50) NOT NULL CHECK (change_type IN ('profile_update', 'schedule_change', 'holiday_request', 'cancellation_request', 'special_clinic')),
    proposed_data JSONB NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES user_profiles(id),
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- 9. WEBSITE PAGES TABLE
CREATE TABLE IF NOT EXISTS website_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    meta_description TEXT,
    publication_status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published')),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. HEALTH ARTICLES TABLE
CREATE TABLE IF NOT EXISTS health_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time_minutes INT DEFAULT 4,
    publication_status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. FAQ ITEMS TABLE
CREATE TABLE IF NOT EXISTS faq_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    sort_order INT DEFAULT 0,
    publication_status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published'))
);

-- 12. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    publication_status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published'))
);

-- 13. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID,
    actor_name VARCHAR(255),
    actor_role VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    change_summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_doctors_slug ON doctors(slug);
CREATE INDEX IF NOT EXISTS idx_doctors_status ON doctors(verification_status, publication_status);
CREATE INDEX IF NOT EXISTS idx_schedules_doctor_day ON doctor_schedules(doctor_id, day_of_week);
CREATE INDEX IF NOT EXISTS idx_exceptions_doctor_date ON schedule_exceptions(doctor_id, consultation_date);
CREATE INDEX IF NOT EXISTS idx_change_requests_status ON doctor_change_requests(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON health_articles(slug);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS POLICIES (Strictly published & verified records only!)
CREATE POLICY "Public read clinic settings" ON clinic_settings FOR SELECT USING (true);

CREATE POLICY "Public read verified published doctors" ON doctors
    FOR SELECT USING (verification_status = 'verified' AND publication_status = 'published');

CREATE POLICY "Public read published specialties" ON specialties
    FOR SELECT USING (publication_status = 'published');

CREATE POLICY "Public read doctor specialties" ON doctor_specialties
    FOR SELECT USING (true);

CREATE POLICY "Public read published schedules" ON doctor_schedules
    FOR SELECT USING (publication_status = 'published');

CREATE POLICY "Public read published exceptions" ON schedule_exceptions
    FOR SELECT USING (publication_status = 'published');

CREATE POLICY "Public read published website pages" ON website_pages
    FOR SELECT USING (publication_status = 'published');

CREATE POLICY "Public read published articles" ON health_articles
    FOR SELECT USING (publication_status = 'published');

CREATE POLICY "Public read published FAQs" ON faq_items
    FOR SELECT USING (publication_status = 'published');

CREATE POLICY "Public read active published announcements" ON announcements
    FOR SELECT USING (publication_status = 'published' AND is_active = true);

-- STAFF & DOCTOR AUTH POLICIES
-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE auth_user_id = auth.uid() AND role IN ('super_admin', 'clinic_admin') AND active_status = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Super / Clinic Admins have full access
CREATE POLICY "Admins full access clinic_settings" ON clinic_settings FOR ALL USING (is_admin());
CREATE POLICY "Admins full access user_profiles" ON user_profiles FOR ALL USING (is_admin());
CREATE POLICY "Admins full access doctors" ON doctors FOR ALL USING (is_admin());
CREATE POLICY "Admins full access specialties" ON specialties FOR ALL USING (is_admin());
CREATE POLICY "Admins full access doctor_specialties" ON doctor_specialties FOR ALL USING (is_admin());
CREATE POLICY "Admins full access doctor_schedules" ON doctor_schedules FOR ALL USING (is_admin());
CREATE POLICY "Admins full access schedule_exceptions" ON schedule_exceptions FOR ALL USING (is_admin());
CREATE POLICY "Admins full access doctor_change_requests" ON doctor_change_requests FOR ALL USING (is_admin());
CREATE POLICY "Admins full access website_pages" ON website_pages FOR ALL USING (is_admin());
CREATE POLICY "Admins full access health_articles" ON health_articles FOR ALL USING (is_admin());
CREATE POLICY "Admins full access faq_items" ON faq_items FOR ALL USING (is_admin());
CREATE POLICY "Admins full access announcements" ON announcements FOR ALL USING (is_admin());
CREATE POLICY "Admins full access audit_logs" ON audit_logs FOR ALL USING (is_admin());

-- Doctors can view their own profile (including draft status) and submit change requests
CREATE POLICY "Doctors view own profile" ON doctors FOR SELECT
    USING (id IN (SELECT doctor_id FROM user_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Doctors view own schedules" ON doctor_schedules FOR SELECT
    USING (doctor_id IN (SELECT doctor_id FROM user_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Doctors create own change requests" ON doctor_change_requests FOR INSERT
    WITH CHECK (requested_by IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Doctors view own change requests" ON doctor_change_requests FOR SELECT
    USING (requested_by IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
