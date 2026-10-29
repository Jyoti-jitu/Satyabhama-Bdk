import React from 'react';

interface StatusBadgeProps {
  status: 'Regular Schedule' | 'Special Clinic' | 'Schedule Changed' | 'Cancelled' | 'To Be Confirmed' | string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs font-semibold';

  switch (status) {
    case 'Regular Schedule':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5" />
          Regular Schedule
        </span>
      );

    case 'Special Clinic':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-300 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
          Special Clinic
        </span>
      );

    case 'Schedule Changed':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
          Schedule Changed
        </span>
      );

    case 'Cancelled':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
          Cancelled
        </span>
      );

    case 'To Be Confirmed':
    default:
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5" />
          To Be Confirmed
        </span>
      );
  }
}
