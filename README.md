# Satyabhama Health Care Professional Website
### Premium Medical Website + Doctor Dashboard + Consultation Schedule Management
**Developed by JOVIX Technologies | *Technology for a Brighter Tomorrow***  
Website: [https://www.jovix.co.uk](https://www.jovix.co.uk) • Contact: `hello@jovix.co.uk`

---

## 1. Project Overview & Clinical Mission
**Satyabhama Health Care** is a leading multispecialty outpatient clinic located at Nehru Stadium, Stadium Road, near Bonth Chhak, Bhadrak, Odisha 756100, India.

This platform provides:
- **Professional Clinic Branding**: Authentic circular clinic seal emblem, deep navy blue and teal medical design palette with rose/burgundy clinic accents.
- **Doctor Directory & Profiles**: Comprehensive database-driven directory with verified qualifications, council registration numbers, clinical biographies, and consultant designations.
- **Live Consultation Timetable**: Weekly recurring morning/evening sessions combined with date-specific exceptions (special clinics, visiting specialists, and leave notices).
- **Secure Doctor Dashboard**: Separate portal for doctors to manage professional profiles, request credential updates, propose schedule timings, and submit absence notices.
- **Secure Administrator Dashboard**: Real-time clinic metrics, doctor management, schedule publishing, change request approval workflows, and audit logs.
- **Direct Phone Helpline**: Click-to-call integration (`+91 70086 10481`) for schedule confirmation before patient travel.

### Strict Scope Exclusions
Per operational requirements, the following features are strictly excluded:
- ❌ No online appointment booking system
- ❌ No booking request forms or appointment calendars
- ❌ No patient registration, login, or patient portals
- ❌ No Electronic Health Records (EHR) or patient medical histories
- ❌ No prescription generation or pharmacy ordering
- ❌ No payment gateway or fee processing
- ❌ No "Book Now" buttons

---

## 2. Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19 & TypeScript 5
- **Styling**: Tailwind CSS v4 with bespoke glassmorphism & medical design tokens
- **Database**: Supabase PostgreSQL with complete Row Level Security (RLS)
- **Icons**: Lucide React
- **Timezone**: Indian Standard Time (`Asia/Kolkata`)
- **Hosting**: Vercel & Supabase Cloud

---

## 3. Database Architecture & Migrations
The database schema is fully defined in [`supabase/migrations/20261023_init_schema.sql`](./supabase/migrations/20261023_init_schema.sql) and [`supabase/seed.sql`](./supabase/seed.sql).

### Tables Created:
1. `clinic_settings`: Clinic name, address, phone numbers, hours, map link, announcement banners, developer credits.
2. `user_profiles`: Roles (`super_admin`, `clinic_admin`, `doctor`, `content_editor`), linked to `auth.users`.
3. `doctors`: Full name, slug, qualifications, medical registration details, specialty summary, biography, designation, languages, consultant type (`regular` vs `visiting`), verification status, publication status.
4. `specialties`: Name, slug, description, icon, publication status.
5. `doctor_specialties`: Junction mapping doctors to specialties.
6. `doctor_schedules`: Recurring weekly schedules (days 0–6, start/end time, morning/evening session).
7. `schedule_exceptions`: Date-specific exceptions (special clinic, visiting specialist, temporary change, cancelled, holiday).
8. `doctor_change_requests`: Doctor-submitted profile updates, schedule changes, and leaves for admin review.
9. `website_pages`: Managed content pages.
10. `health_articles`: Health awareness articles written by clinic doctors.
11. `faq_items`: Categorized patient questions and answers.
12. `announcements`: Urgent notices and visiting specialist announcements.
13. `audit_logs`: Full administrative audit trail for compliance and governance.

### Row Level Security (RLS) Policies
- **Public Visitors**: Read-only access to published clinic settings, published specialties, verified & published doctors, and active published schedules.
- **Doctors**: Can only view their own profile, submit change requests for themselves, and view their own schedule history. Cannot edit other doctors' records.
- **Clinic & Super Administrators**: Full CRUD permissions across all clinic settings, doctor profiles, schedules, approvals, and audit logs.

---

## 4. Local Development Setup

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm 10+

### Installation
```bash
# Clone the repository
git clone <repo-url> satyabhama-healthcare
cd satyabhama-healthcare

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Staff & Doctor Portal Credentials (Demo Mode)

The application includes an in-memory/localStorage reactive database that works out-of-the-box even before Supabase credentials are provided.

To access the portals, navigate to `/login`:
- **Clinic Administrator**: Click **"Clinic Administrator Demo Login"** or enter `admin@satyabhama.com` / `admin123`.
- **Doctor Portal**: Click **"Dr. Priyaranjan Barik Demo Login"** or enter `dr.priyaranjan@satyabhama.com` / `doctor123`.
- **Content Editor**: Enter `editor@satyabhama.com` / `editor123`.

---

## 6. Verified Clinic Information
- **Clinic Name**: Satyabhama Health Care
- **Address**: Nehru Stadium, Stadium Road, near Bonth Chhak, Bhadrak, Odisha 756100, India
- **Public Telephone Helpline**: `+91 70086 10481`
- **Opening Hours**: Monday – Sunday: 8:00 AM – 9:00 PM
- **Landmark**: Near Bonth Chhak, adjacent to Nehru Stadium entrance

---

## 7. Client Handover & Verification Checklist
- [x] Authentic Satyabhama emblem logo loaded in header, hero, and footer.
- [x] 12 medical specialties configured and categorized.
- [x] Verified doctor directory with Odisha Medical Council registrations.
- [x] Unverified research leads kept strictly draft and unpublished until clinic approval.
- [x] Weekly recurring schedule and date-specific exception calculator in Indian Standard Time (`Asia/Kolkata`).
- [x] Click-to-call links (`tel:+917008610481`) throughout the website.
- [x] Informational disclaimers on all schedule pages confirming walk-in model and no online booking.
- [x] Functional Doctor Dashboard with permitted bio updates and change request submissions.
- [x] Functional Administrator Dashboard with metrics, doctor verification, schedule management, and audit logs.
- [x] Full PostgreSQL migration script with Row Level Security policies.
- [x] Production build tested and verified (`npm run build`).

---
Developed by **JOVIX Technologies**  
*Technology for a Brighter Tomorrow*  
Website: [https://www.jovix.co.uk](https://www.jovix.co.uk) • Email: `hello@jovix.co.uk`
