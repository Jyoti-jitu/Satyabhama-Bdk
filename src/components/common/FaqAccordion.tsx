'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItemData {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItemData[];
  columns?: 1 | 2;
  variant?: 'card' | 'subtle';
  showNumber?: boolean;
  defaultOpenIndex?: number | null; // null by default = unopened
}

export function FaqAccordion({
  items,
  columns = 2,
  variant = 'card',
  showNumber = false,
  defaultOpenIndex = null,
}: FaqAccordionProps) {
  // Set of open item keys (unopened by default)
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (defaultOpenIndex !== null && items[defaultOpenIndex]) {
      initial.add(items[defaultOpenIndex].id || `faq-${defaultOpenIndex}`);
    }
    return initial;
  });

  const toggleItem = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const gridClass =
    columns === 2
      ? 'grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5'
      : 'space-y-3 sm:space-y-4';

  return (
    <div className={gridClass}>
      {items.map((item, idx) => {
        const key = item.id || `faq-${idx}`;
        const isOpen = openKeys.has(key);
        const contentId = `faq-content-${key}`;
        const headerId = `faq-header-${key}`;

        const isSubtle = variant === 'subtle';

        return (
          <div
            key={key}
            className={`transition-all duration-200 rounded-xl sm:rounded-2xl border ${
              isSubtle
                ? isOpen
                  ? 'bg-slate-50/90 border-teal-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                : isOpen
                ? 'bg-white border-teal-300 shadow-md ring-1 ring-teal-400/20'
                : 'bg-white border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow'
            }`}
          >
            {/* Header / Clickable Toggle Button */}
            <button
              id={headerId}
              type="button"
              onClick={() => toggleItem(key)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl sm:rounded-2xl transition-colors select-none"
            >
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 pr-1">
                {showNumber ? (
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full font-bold text-[11px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border transition-colors ${
                      isOpen
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-teal-50 text-teal-700 border-teal-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                ) : (
                  <HelpCircle
                    className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 transition-colors ${
                      isOpen ? 'text-teal-600' : 'text-slate-400'
                    }`}
                  />
                )}
                <h3
                  className={`text-xs sm:text-sm md:text-base font-bold leading-snug transition-colors ${
                    isOpen ? 'text-teal-900' : 'text-slate-900'
                  }`}
                >
                  {item.question}
                </h3>
              </div>

              {/* Dropdown Arrow: Rotates when open */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isOpen
                    ? 'bg-teal-100 text-teal-700 rotate-180'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 rotate-0'
                }`}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </div>
            </button>

            {/* Expandable Answer Section */}
            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 mt-1 animate-accordion-fade"
              >
                <div className="pt-2.5 pl-6 sm:pl-8 text-slate-600 leading-relaxed">{item.answer}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
