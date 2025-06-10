import React from 'react';
import { motion } from 'framer-motion';
import type { GroupedTimelineItems } from '../types/timeline';
import { TimelineItem } from './TimelineItem';

interface TimelineProps {
  groupedItems: GroupedTimelineItems;
  t: (key: string, fallback?: string) => string;
}

export const Timeline: React.FC<TimelineProps> = ({ groupedItems, t }) => {
  const years = Object.keys(groupedItems).sort((a, b) => parseInt(b) - parseInt(a));
  
  if (years.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg">
          {t('timeline.no_data')}
        </div>
      </div>
    );
  }

  let globalIndex = 0;

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Central timeline line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 h-full shadow-sm"></div>

      {years.map((year, yearIndex) => (
        <div key={year} id={`year-${year}`} className="mb-8">
          {/* Year marker */}
          <motion.div
            className="relative flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
          >
            <div className="relative z-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full shadow-lg border-4 border-white">
              <span className="font-bold text-lg">{year}</span>
            </div>
          </motion.div>

          {/* Timeline items for this year */}
          <div className="space-y-4">
            {groupedItems[year].map((item) => (
              <TimelineItem
                key={item.slug || `${item.date}-${globalIndex}`}
                item={item}
                index={globalIndex++}
                t={t}
              />
            ))}
          </div>
        </div>
      ))}

      {/* End of timeline marker */}
      <motion.div
        className="relative flex justify-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="relative z-10 w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-md"></div>
      </motion.div>
    </div>
  );
};
