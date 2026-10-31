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
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ARTICLES,
  INITIAL_AUDIT_LOGS,
  INITIAL_CHANGE_REQUESTS,
  INITIAL_DOCTORS,
  INITIAL_EXCEPTIONS,
  INITIAL_FAQS,
  INITIAL_SCHEDULES,
  INITIAL_SPECIALTIES,
  INITIAL_USERS,
} from './mock-db';

const STORAGE_KEYS = {
  SETTINGS: 'satyabhama_settings_v3',
  DOCTORS: 'satyabhama_doctors_v3',
  SPECIALTIES: 'satyabhama_specialties_v3',
  SCHEDULES: 'satyabhama_schedules_v3',
  EXCEPTIONS: 'satyabhama_exceptions_v3',
  CHANGE_REQUESTS: 'satyabhama_change_requests_v3',
  FAQS: 'satyabhama_faqs_v3',
  ARTICLES: 'satyabhama_articles_v3',
  ANNOUNCEMENTS: 'satyabhama_announcements_v3',
  AUDIT_LOGS: 'satyabhama_audit_logs_v3',
  USERS: 'satyabhama_users_v3',
};

class DataStore {
  private settings: ClinicSettings = { ...CLINIC_CONFIG };
  private doctors: Doctor[] = [...INITIAL_DOCTORS];
  private specialties: Specialty[] = [...INITIAL_SPECIALTIES];
  private schedules: DoctorSchedule[] = [...INITIAL_SCHEDULES];
  private exceptions: ScheduleException[] = [...INITIAL_EXCEPTIONS];
  private changeRequests: DoctorChangeRequest[] = [...INITIAL_CHANGE_REQUESTS];
  private faqs: FAQItem[] = [...INITIAL_FAQS];
  private articles: HealthArticle[] = [...INITIAL_ARTICLES];
  private announcements: Announcement[] = [...INITIAL_ANNOUNCEMENTS];
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private users: UserProfile[] = [...INITIAL_USERS];

  private isClient = typeof window !== 'undefined';

  constructor() {
    if (this.isClient) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) this.settings = JSON.parse(storedSettings);

      const storedDoctors = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      if (storedDoctors) {
        const parsed = JSON.parse(storedDoctors);
        // Verify if stored data matches the official 10 doctors in exact serial order
        const matchesTenOrder =
          Array.isArray(parsed) &&
          parsed.length === 10 &&
          parsed[0]?.slug === 'dr-priya-ranjan-barik' &&
          parsed[3]?.slug === 'dr-swarupananda-mishra' &&
          parsed[9]?.slug === 'dr-subharansu-sekhar-lenka';

        if (!matchesTenOrder) {
          // Fresh sync to ensure the 10 doctors are in exact serial order
          this.doctors = [...INITIAL_DOCTORS];
          this.schedules = [...INITIAL_SCHEDULES];
          this.saveItem(STORAGE_KEYS.DOCTORS, this.doctors);
          this.saveItem(STORAGE_KEYS.SCHEDULES, this.schedules);
        } else {
          this.doctors = parsed;
        }
      } else {
        this.doctors = [...INITIAL_DOCTORS];
        this.saveItem(STORAGE_KEYS.DOCTORS, this.doctors);
      }

      const storedSpecialties = localStorage.getItem(STORAGE_KEYS.SPECIALTIES);
      if (storedSpecialties) this.specialties = JSON.parse(storedSpecialties);

      const storedSchedules = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
      if (storedSchedules && this.doctors[1]?.slug === 'dr-sanjay-pany') {
        this.schedules = JSON.parse(storedSchedules);
      } else {
        this.schedules = [...INITIAL_SCHEDULES];
        this.saveItem(STORAGE_KEYS.SCHEDULES, this.schedules);
      }

      const storedExceptions = localStorage.getItem(STORAGE_KEYS.EXCEPTIONS);
      if (storedExceptions) this.exceptions = JSON.parse(storedExceptions);

      const storedRequests = localStorage.getItem(STORAGE_KEYS.CHANGE_REQUESTS);
      if (storedRequests) this.changeRequests = JSON.parse(storedRequests);

      const storedFaqs = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (storedFaqs) this.faqs = JSON.parse(storedFaqs);

      const storedArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (storedArticles) this.articles = JSON.parse(storedArticles);

      const storedAnnouncements = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (storedAnnouncements) this.announcements = JSON.parse(storedAnnouncements);

      const storedAuditLogs = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (storedAuditLogs) this.auditLogs = JSON.parse(storedAuditLogs);

      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        INITIAL_USERS.forEach((initU) => {
          if (!parsedUsers.some((u: UserProfile) => u.id === initU.id)) {
            parsedUsers.push(initU);
          }
        });
        this.users = parsedUsers;
      }
    } catch (e) {
      console.warn('Failed to load mock data from localStorage, using in-memory state', e);
    }
  }

  private saveItem(key: string, data: any) {
    if (this.isClient) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.warn('Failed to save to localStorage', e);
      }
    }
  }

  // Clinic Settings
  getClinicSettings(): ClinicSettings {
    return { ...this.settings };
  }

  updateClinicSettings(newSettings: Partial<ClinicSettings>): ClinicSettings {
    this.settings = {
      ...this.settings,
      ...newSettings,
      updated_at: new Date().toISOString(),
    };
    this.saveItem(STORAGE_KEYS.SETTINGS, this.settings);
    return this.settings;
  }

  // Doctors
  getDoctors(includeUnpublished = false): Doctor[] {
    if (includeUnpublished) return [...this.doctors];
    return this.doctors.filter(
      (d) => d.publication_status === 'published' && d.verification_status === 'verified'
    );
  }

  getDoctorBySlug(slug: string, includeUnpublished = false): Doctor | undefined {
    // Support aliases for backward compatibility
    let targetSlug = slug;
    if (slug === 'dr-priyaranjan-barik') targetSlug = 'dr-priya-ranjan-barik';
    if (slug === 'dr-srikanta-acharya') targetSlug = 'dr-srikant-acharya';
    if (slug === 'dr-dilip-kumar-chand') targetSlug = 'dr-dillip-kumar-chand';
    if (slug === 'dr-subranshu-sekhar-lenka') targetSlug = 'dr-subhranshu-sekhar-lenka';

    const doc = this.doctors.find((d) => d.slug === targetSlug || d.slug === slug);
    if (!doc) return undefined;
    if (!includeUnpublished && (doc.publication_status !== 'published' || doc.verification_status !== 'verified')) {
      return undefined;
    }
    return doc;
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find((d) => d.id === id);
  }

  createDoctor(data: Omit<Doctor, 'id' | 'created_at' | 'updated_at'>): Doctor {
    const newDoc: Doctor = {
      ...data,
      id: `doc-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.doctors.push(newDoc);
    this.saveItem(STORAGE_KEYS.DOCTORS, this.doctors);
    return newDoc;
  }

  updateDoctor(id: string, data: Partial<Doctor>): Doctor {
    const index = this.doctors.findIndex((d) => d.id === id);
    if (index === -1) throw new Error(`Doctor not found: ${id}`);
    this.doctors[index] = {
      ...this.doctors[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.saveItem(STORAGE_KEYS.DOCTORS, this.doctors);
    return this.doctors[index];
  }

  deleteDoctor(id: string): boolean {
    const prevLen = this.doctors.length;
    this.doctors = this.doctors.filter((d) => d.id !== id);
    this.saveItem(STORAGE_KEYS.DOCTORS, this.doctors);
    return this.doctors.length < prevLen;
  }

  // Specialties
  getSpecialties(includeUnpublished = false): Specialty[] {
    if (includeUnpublished) return [...this.specialties];
    return this.specialties.filter((s) => s.publication_status === 'published');
  }

  getSpecialtyBySlug(slug: string): Specialty | undefined {
    return this.specialties.find((s) => s.slug === slug);
  }

  createSpecialty(data: Omit<Specialty, 'id'>): Specialty {
    const newSpec: Specialty = {
      ...data,
      id: `spec-${Date.now()}`,
    };
    this.specialties.push(newSpec);
    this.saveItem(STORAGE_KEYS.SPECIALTIES, this.specialties);
    return newSpec;
  }

  updateSpecialty(id: string, data: Partial<Specialty>): Specialty {
    const index = this.specialties.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Specialty not found: ${id}`);
    this.specialties[index] = { ...this.specialties[index], ...data };
    this.saveItem(STORAGE_KEYS.SPECIALTIES, this.specialties);
    return this.specialties[index];
  }

  // Schedules
  getSchedules(doctorId?: string, includeUnpublished = false): DoctorSchedule[] {
    let list = this.schedules;
    if (doctorId) list = list.filter((s) => s.doctor_id === doctorId);
    if (!includeUnpublished) {
      list = list.filter((s) => s.publication_status === 'published');
    }
    return [...list];
  }

  createSchedule(data: Omit<DoctorSchedule, 'id' | 'created_at' | 'updated_at'>): DoctorSchedule {
    const newSch: DoctorSchedule = {
      ...data,
      id: `sch-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.schedules.push(newSch);
    this.saveItem(STORAGE_KEYS.SCHEDULES, this.schedules);
    return newSch;
  }

  updateSchedule(id: string, data: Partial<DoctorSchedule>): DoctorSchedule {
    const index = this.schedules.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Schedule not found: ${id}`);
    this.schedules[index] = {
      ...this.schedules[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.saveItem(STORAGE_KEYS.SCHEDULES, this.schedules);
    return this.schedules[index];
  }

  deleteSchedule(id: string): boolean {
    const prevLen = this.schedules.length;
    this.schedules = this.schedules.filter((s) => s.id !== id);
    this.saveItem(STORAGE_KEYS.SCHEDULES, this.schedules);
    return this.schedules.length < prevLen;
  }

  // Exceptions
  getExceptions(doctorId?: string, includeUnpublished = false): ScheduleException[] {
    let list = this.exceptions;
    if (doctorId) list = list.filter((e) => e.doctor_id === doctorId);
    if (!includeUnpublished) {
      list = list.filter((e) => e.publication_status === 'published');
    }
    return [...list];
  }

  createException(data: Omit<ScheduleException, 'id' | 'created_at' | 'updated_at'>): ScheduleException {
    const newEx: ScheduleException = {
      ...data,
      id: `exc-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.exceptions.push(newEx);
    this.saveItem(STORAGE_KEYS.EXCEPTIONS, this.exceptions);
    return newEx;
  }

  updateException(id: string, data: Partial<ScheduleException>): ScheduleException {
    const index = this.exceptions.findIndex((e) => e.id === id);
    if (index === -1) throw new Error(`Exception not found: ${id}`);
    this.exceptions[index] = {
      ...this.exceptions[index],
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.saveItem(STORAGE_KEYS.EXCEPTIONS, this.exceptions);
    return this.exceptions[index];
  }

  deleteException(id: string): boolean {
    const prevLen = this.exceptions.length;
    this.exceptions = this.exceptions.filter((e) => e.id !== id);
    this.saveItem(STORAGE_KEYS.EXCEPTIONS, this.exceptions);
    return this.exceptions.length < prevLen;
  }

  // Change Requests
  getChangeRequests(doctorId?: string): DoctorChangeRequest[] {
    if (doctorId) return this.changeRequests.filter((r) => r.doctor_id === doctorId);
    return [...this.changeRequests];
  }

  createChangeRequest(data: Omit<DoctorChangeRequest, 'id' | 'created_at'>): DoctorChangeRequest {
    const newReq: DoctorChangeRequest = {
      ...data,
      id: `req-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.changeRequests.push(newReq);
    this.saveItem(STORAGE_KEYS.CHANGE_REQUESTS, this.changeRequests);
    return newReq;
  }

  resolveChangeRequest(
    id: string,
    status: 'approved' | 'rejected',
    reviewNotes: string,
    reviewedBy: string,
    reviewedByName: string
  ): DoctorChangeRequest {
    const index = this.changeRequests.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Change request not found: ${id}`);
    const req = this.changeRequests[index];
    req.status = status;
    req.review_notes = reviewNotes;
    req.reviewed_by = reviewedBy;
    req.reviewed_by_name = reviewedByName;
    req.reviewed_at = new Date().toISOString();

    // If approved, apply proposed changes
    if (status === 'approved') {
      if (req.change_type === 'profile_update') {
        this.updateDoctor(req.doctor_id, req.proposed_data);
      } else if (req.change_type === 'schedule_change' && req.proposed_data.schedule_id) {
        this.updateSchedule(req.proposed_data.schedule_id, {
          start_time: req.proposed_data.proposed_start_time,
          end_time: req.proposed_data.proposed_end_time,
          publication_status: 'published',
        });
      } else if (req.change_type === 'holiday_request' || req.change_type === 'cancellation_request') {
        this.createException({
          doctor_id: req.doctor_id,
          consultation_date: req.proposed_data.date,
          exception_type: 'cancelled',
          notes: req.proposed_data.reason || 'Doctor unavailable',
          publication_status: 'published',
        });
      }
    }

    this.saveItem(STORAGE_KEYS.CHANGE_REQUESTS, this.changeRequests);
    return req;
  }

  // FAQs
  getFAQs(): FAQItem[] {
    return [...this.faqs].sort((a, b) => a.sort_order - b.sort_order);
  }

  createFAQ(data: Omit<FAQItem, 'id'>): FAQItem {
    const newFaq: FAQItem = {
      ...data,
      id: `faq-${Date.now()}`,
    };
    this.faqs.push(newFaq);
    this.saveItem(STORAGE_KEYS.FAQS, this.faqs);
    return newFaq;
  }

  updateFAQ(id: string, data: Partial<FAQItem>): FAQItem {
    const index = this.faqs.findIndex((f) => f.id === id);
    if (index === -1) throw new Error(`FAQ not found: ${id}`);
    this.faqs[index] = { ...this.faqs[index], ...data };
    this.saveItem(STORAGE_KEYS.FAQS, this.faqs);
    return this.faqs[index];
  }

  deleteFAQ(id: string): boolean {
    const prev = this.faqs.length;
    this.faqs = this.faqs.filter((f) => f.id !== id);
    this.saveItem(STORAGE_KEYS.FAQS, this.faqs);
    return this.faqs.length < prev;
  }

  // Articles
  getArticles(includeUnpublished = false): HealthArticle[] {
    if (includeUnpublished) return [...this.articles];
    return this.articles.filter((a) => a.publication_status === 'published');
  }

  getArticleBySlug(slug: string): HealthArticle | undefined {
    return this.articles.find((a) => a.slug === slug && a.publication_status === 'published');
  }

  createArticle(data: Omit<HealthArticle, 'id' | 'updated_at'>): HealthArticle {
    const newArt: HealthArticle = {
      ...data,
      id: `art-${Date.now()}`,
      updated_at: new Date().toISOString(),
    };
    this.articles.push(newArt);
    this.saveItem(STORAGE_KEYS.ARTICLES, this.articles);
    return newArt;
  }

  // Announcements
  getAnnouncements(): Announcement[] {
    return this.announcements.filter((a) => a.is_active && a.publication_status === 'published');
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return [...this.auditLogs].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  addAuditLog(
    actorId: string,
    actorName: string,
    actorRole: string,
    action: string,
    entityType: string,
    entityId: string,
    summary: string
  ): AuditLog {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      actor_id: actorId,
      actor_name: actorName,
      actor_role: actorRole,
      action,
      entity_type: entityType,
      entity_id: entityId,
      change_summary: summary,
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
    this.saveItem(STORAGE_KEYS.AUDIT_LOGS, this.auditLogs);
    return newLog;
  }

  // Users
  getUsers(): UserProfile[] {
    return [...this.users];
  }

  getUserByEmail(email: string): UserProfile | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): UserProfile | undefined {
    return this.users.find((u) => u.id === id || u.auth_user_id === id);
  }
}

export const dataStore = new DataStore();
