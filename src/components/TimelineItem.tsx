import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineItem as TimelineItemType } from '../types/timeline';
import { TYPE_CONFIG } from '../utils/typeConfig';

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  t: (key: string, fallback?: string) => string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, t }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;
  
  // Get type configuration with fallback
  const getTypeConfig = (type: string) => {
    const configs = TYPE_CONFIG as any;
    return configs[type] || configs.news;
  };
  
  const typeConfig = getTypeConfig(item.type);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`relative flex items-start ${isEven ? 'justify-end pr-8' : 'justify-start pl-8'}`}>      {/* Timeline dot */}
      <div className="absolute left-1/2 top-6 transform -translate-x-1/2 z-20">
        <div className={`timeline-dot w-3 h-3 rounded-full border-2 border-white shadow-md ${typeConfig.bgColor.replace('bg-', 'bg-opacity-90 bg-')}`}></div>
      </div>

      {/* Content card */}
      <motion.div
        className={`w-full max-w-md ${isEven ? 'text-right' : 'text-left'}`}
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div className="card-hover bg-white rounded-xl shadow-md border border-gray-100 p-5">
          {/* Header */}
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${typeConfig.color} ${typeConfig.bgColor} border ${typeConfig.color.replace('text-', 'border-').replace('-600', '-200')}`}>
              <span className={`${isEven ? 'ml-1.5 mr-0' : 'mr-1.5 ml-0'} text-sm`}>{typeConfig.icon}</span>
              {t(`types.${item.type}`, typeConfig.label)}
            </span>
            <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md">
              {formatDate(item.date)}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-base font-semibold text-gray-900 mb-2 leading-tight ${isEven ? 'text-right' : 'text-left'}`}>
            {item.title}
          </h3>

          {/* Short description */}
          <p className={`text-sm text-gray-600 mb-3 line-clamp-2 ${isEven ? 'text-right' : 'text-left'}`}>
            {item.short_description}
          </p>

          {/* Metadata */}
          {(item.author || item.publisher) && (
            <div className={`text-xs text-gray-500 mb-3 space-y-1 ${isEven ? 'text-right' : 'text-left'}`}>
              {item.author && (
                <div><span className="font-medium">By:</span> {item.author}</div>
              )}
              {item.publisher && (
                <div><span className="font-medium">Via:</span> {item.publisher}</div>
              )}
            </div>
          )}

          {/* Expand/Collapse button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors duration-200 flex items-center gap-1 ${isEven ? 'flex-row-reverse ml-auto' : 'flex-row mr-auto'}`}
          >
            {isExpanded ? t('timeline.collapse') : t('timeline.expand')}
            <svg 
              className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                {/* Long description */}
                <div className={`mb-4 ${isEven ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.long_description}</p>
                </div>

                {/* Additional details */}
                <div className={`text-xs text-gray-600 space-y-2 mb-4 ${isEven ? 'text-right' : 'text-left'}`}>
                  {item.reference && (
                    <div>
                      <span className="font-medium">{t('item_fields.reference')}:</span> {item.reference}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">{t('item_fields.date')}:</span> {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* External link */}
                {item.link && (
                  <div className={`${isEven ? 'text-right' : 'text-left'}`}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 gap-1"
                    >
                      {t('timeline.external_link')}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
