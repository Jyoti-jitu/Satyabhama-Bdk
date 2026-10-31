export type UserRole = 'super_admin' | 'clinic_admin' | 'doctor' | 'content_editor';

export interface UserProfile {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  doctor_id?: string;
  active_status: boolean;
  created_at: string;
  updated_at: string;
}

export type ConsultantType = 'regular' | 'visiting';
export type VerificationStatus = 'draft' | 'pending_verification' | 'verified' | 'rejected';
export type PublicationStatus = 'draft' | 'pending_verification' | 'published' | 'changed' | 'cancelled' | 'archived';

export interface Doctor {
  id: string;
  full_name: string;
  slug: string;
  profile_image_url: string | null;
  qualifications: string;
  medical_registration_details?: string;
  specialty_summary: string;
  biography: string;
  designation?: string;
  languages: string[];
  consultant_type: ConsultantType;
  verification_status: VerificationStatus;
  publication_status: PublicationStatus;
  contact_number?: string;
  experience_years?: number;
  created_at: string;
  updated_at: string;
}

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  publication_status: 'draft' | 'published' | 'archived';
}

export interface DoctorSpecialty {
  doctor_id: string;
  specialty_id: string;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Sunday, 1=Monday, ... 6=Saturday
export type SessionType = 'morning' | 'evening' | 'full_day';

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  day_of_week: DayOfWeek;
  start_time: string; // e.g. "09:00"
  end_time: string; // e.g. "13:00"
  session_type?: SessionType;
  effective_from?: string; // YYYY-MM-DD
  effective_until?: string; // YYYY-MM-DD
  publication_status: PublicationStatus;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export type ExceptionType =
  | 'unavailable'
  | 'weekly_holiday'
  | 'special_clinic'
  | 'rescheduled'
  | 'cancelled'
  | 'temporary_change'
  | 'visiting_specialist'
  | 'additional_session';

export interface ScheduleException {
  id: string;
  doctor_id: string;
  consultation_date: string; // YYYY-MM-DD
  exception_type: ExceptionType;
  start_time?: string;
  end_time?: string;
  notes?: string;
  publication_status: PublicationStatus;
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export type ChangeRequestType =
  | 'profile_update'
  | 'schedule_change'
  | 'holiday_request'
  | 'cancellation_request'
  | 'special_clinic';

export type ChangeRequestStatus = 'pending' | 'approved' | 'rejected';

export interface DoctorChangeRequest {
  id: string;
  doctor_id: string;
  requested_by: string;
  requested_by_name: string;
  change_type: ChangeRequestType;
  proposed_data: Record<string, any>;
  status: ChangeRequestStatus;
  reviewed_by?: string;
  reviewed_by_name?: string;
  review_notes?: string;
  created_at: string;
  reviewed_at?: string;
}

export interface ClinicSettings {
  id: string;
  clinic_name: string;
  tagline: string;
  logo_url: string;
  website_url?: string;
  address: string;
  phone: string;
  secondary_phone?: string;
  email: string;
  opening_hours: string;
  map_url: string;
  timezone: string;
  developer_name: string;
  developer_url: string;
  developer_tagline: string;
  announcement?: string;
  updated_at: string;
}

export interface WebsitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  publication_status: 'draft' | 'published';
  updated_at: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  related_doctor_slug?: string;
  related_specialty_slug?: string;
  read_time_minutes: number;
  publication_status: 'draft' | 'published' | 'archived';
  published_at?: string;
  updated_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  publication_status: 'draft' | 'published';
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  publication_status: 'draft' | 'published';
}

export interface AuditLog {
  id: string;
  actor_id: string;
  actor_name: string;
  actor_role: string;
  action: string;
  entity_type: string;
  entity_id: string;
  change_summary: string;
  created_at: string;
}

// Display-ready consultation instance for calendar/preview
export interface CalculatedConsultation {
  id: string;
  doctor_id: string;
  doctor_name: string;
  doctor_slug: string;
  doctor_image?: string | null;
  specialty_name: string;
  qualifications: string;
  consultant_type: ConsultantType;
  date: string; // YYYY-MM-DD
  day_name: string; // e.g. "Monday"
  start_time: string;
  end_time: string;
  schedule_type: 'regular' | 'special_clinic' | 'rescheduled' | 'temporary_change' | 'visiting_specialist';
  status_label: 'Regular Schedule' | 'Special Clinic' | 'Schedule Changed' | 'Cancelled' | 'To Be Confirmed';
  is_exception: boolean;
  notes?: string;
}
