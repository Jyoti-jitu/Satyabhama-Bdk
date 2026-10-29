import {
  DayOfWeek,
  Doctor,
  DoctorSchedule,
  ScheduleException,
  CalculatedConsultation,
  Specialty,
} from '@/types';

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export function getDayName(dayIndex: number): string {
  return DAYS_OF_WEEK[dayIndex % 7] || 'Unknown';
}

/**
 * Format 24hr "09:00" or "17:30" to 12hr "9:00 AM" or "5:30 PM"
 */
export function formatTime12h(timeStr: string): string {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  return `${hours}:${minutes} ${ampm}`;
}

export function formatTimeRange(startTime: string, endTime: string): string {
  if (!startTime) return '';
  if (!endTime) return formatTime12h(startTime);
  return `${formatTime12h(startTime)} – ${formatTime12h(endTime)}`;
}

/**
 * Format YYYY-MM-DD to "Mon, 27 Oct 2026"
 */
export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Get current date string in IST (Asia/Kolkata) as YYYY-MM-DD
 */
export function getTodayISTString(): string {
  const now = new Date();
  const istFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return istFormatter.format(now);
}

/**
 * Get the day of week (0-6) for a given YYYY-MM-DD date in IST
 */
export function getDayOfWeekFromDate(dateStr: string): DayOfWeek {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getDay() as DayOfWeek;
}

/**
 * Add days to YYYY-MM-DD date
 */
export function addDaysToDate(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Calculates upcoming consultation sessions for a specific doctor or all doctors
 * within a range of days (e.g. next 14 days), correctly applying exceptions over recurring schedules.
 */
export function calculateUpcomingConsultations(
  doctors: Doctor[],
  schedules: DoctorSchedule[],
  exceptions: ScheduleException[],
  specialties: Specialty[],
  daysLookahead = 14
): CalculatedConsultation[] {
  const results: CalculatedConsultation[] = [];
  const todayStr = getTodayISTString();

  const specialtyMap = new Map<string, string>();
  specialties.forEach((s) => specialtyMap.set(s.id, s.name));

  for (let i = 0; i < daysLookahead; i++) {
    const targetDateStr = addDaysToDate(todayStr, i);
    const targetDayOfWeek = getDayOfWeekFromDate(targetDateStr);
    const dayName = getDayName(targetDayOfWeek);

    for (const doc of doctors) {
      // Must be verified doctor with published profile
      if (doc.verification_status !== 'verified' || doc.publication_status !== 'published') {
        continue;
      }

      // Check for date-specific exceptions first
      const docExceptions = exceptions.filter(
        (ex) =>
          ex.doctor_id === doc.id &&
          ex.consultation_date === targetDateStr &&
          ex.publication_status === 'published'
      );

      // Check recurring schedules for this weekday
      const recurringSchedules = schedules.filter(
        (s) =>
          s.doctor_id === doc.id &&
          s.day_of_week === targetDayOfWeek &&
          s.publication_status === 'published'
      );

      // Handle exceptions first
      if (docExceptions.length > 0) {
        for (const ex of docExceptions) {
          if (ex.exception_type === 'cancelled' || ex.exception_type === 'unavailable' || ex.exception_type === 'weekly_holiday') {
            results.push({
              id: `ex-${ex.id}`,
              doctor_id: doc.id,
              doctor_name: doc.full_name,
              doctor_slug: doc.slug,
              doctor_image: doc.profile_image_url,
              specialty_name: doc.specialty_summary,
              qualifications: doc.qualifications,
              consultant_type: doc.consultant_type,
              date: targetDateStr,
              day_name: dayName,
              start_time: ex.start_time || '',
              end_time: ex.end_time || '',
              schedule_type: 'rescheduled',
              status_label: 'Cancelled',
              is_exception: true,
              notes: ex.notes || 'Doctor unavailable on this date',
            });
          } else {
            const isSpecial = ex.exception_type === 'special_clinic' || ex.exception_type === 'visiting_specialist';
            results.push({
              id: `ex-${ex.id}`,
              doctor_id: doc.id,
              doctor_name: doc.full_name,
              doctor_slug: doc.slug,
              doctor_image: doc.profile_image_url,
              specialty_name: doc.specialty_summary,
              qualifications: doc.qualifications,
              consultant_type: doc.consultant_type,
              date: targetDateStr,
              day_name: dayName,
              start_time: ex.start_time || '09:00',
              end_time: ex.end_time || '13:00',
              schedule_type: isSpecial ? 'special_clinic' : 'temporary_change',
              status_label: isSpecial ? 'Special Clinic' : 'Schedule Changed',
              is_exception: true,
              notes: ex.notes,
            });
          }
        }
      } else {
        // No exception for this date; process recurring schedules
        for (const rec of recurringSchedules) {
          // Check effective date boundaries if set
          if (rec.effective_from && targetDateStr < rec.effective_from) continue;
          if (rec.effective_until && targetDateStr > rec.effective_until) continue;

          results.push({
            id: `rec-${rec.id}-${targetDateStr}`,
            doctor_id: doc.id,
            doctor_name: doc.full_name,
            doctor_slug: doc.slug,
            doctor_image: doc.profile_image_url,
            specialty_name: doc.specialty_summary,
            qualifications: doc.qualifications,
            consultant_type: doc.consultant_type,
            date: targetDateStr,
            day_name: dayName,
            start_time: rec.start_time,
            end_time: rec.end_time,
            schedule_type: 'regular',
            status_label: 'Regular Schedule',
            is_exception: false,
          });
        }
      }
    }
  }

  // Sort by date then start_time
  return results.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.start_time.localeCompare(b.start_time);
  });
}

/**
 * Returns the single next confirmed consultation for a doctor
 */
export function getNextConfirmedConsultation(
  doctor: Doctor,
  schedules: DoctorSchedule[],
  exceptions: ScheduleException[],
  specialties: Specialty[]
): CalculatedConsultation | null {
  const upcoming = calculateUpcomingConsultations([doctor], schedules, exceptions, specialties, 21);
  const nextAvailable = upcoming.find((c) => c.status_label !== 'Cancelled');
  return nextAvailable || null;
}
