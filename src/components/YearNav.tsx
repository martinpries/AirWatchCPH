import React from 'react';
import { motion } from 'framer-motion';

interface YearNavProps {
  years: string[];
  currentYear: string | null;
  onYearClick: (year: string) => void;
  t: (key: string, fallback?: string) => string;
}

export const YearNav: React.FC<YearNavProps> = ({ years, currentYear, onYearClick, t }) => {
  const scrollToYear = (year: string) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
    onYearClick(year);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onYearClick('');
  };

  if (years.length === 0) return null;

  return (
    <motion.nav
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 px-4 shadow-sm"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto scrollbar-hide">
          {/* All Years button */}
          <button
            onClick={scrollToTop}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              !currentYear
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            {t('navigation.all_years')}
          </button>

          {/* Separator */}
          <div className="w-px h-4 bg-gray-200 mx-1"></div>

          {/* Year buttons */}
          {years.map((year) => (
            <button
              key={year}
              onClick={() => scrollToYear(year)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                currentYear === year
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};
