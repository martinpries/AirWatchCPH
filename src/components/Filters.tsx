import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTypeConfig } from '../utils/typeConfig';

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  availableTypes: string[];
  onClearFilters: () => void;
  t: (key: string, fallback?: string) => string;
}

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  availableTypes,
  onClearFilters,
  t
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTypes.length > 0;

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Compact filter header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-gray-800">
              {t('filters.title')}
            </h3>
            {hasActiveFilters && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {(searchQuery ? 1 : 0) + selectedTypes.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-4"
          >
            {/* Search input */}
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t('filters.search_placeholder')}
                  className="block w-full pl-9 pr-9 py-2.5 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Type filters */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Content Types
              </h4>              
              <div className="flex flex-wrap gap-1.5">
                {availableTypes.map((type) => {
                  const typeConfig = getTypeConfig(type);
                  const isSelected = selectedTypes.includes(type);
                  
                  return (
                    <button
                      key={type}
                      onClick={() => onTypeToggle(type)}
                      className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? `${typeConfig.color} ${typeConfig.bgColor} ring-1 ring-current`
                          : 'text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-1.5 text-sm">{typeConfig.icon}</span>
                      {t(`types.${type}`, typeConfig.label)}
                      {isSelected && (
                        <svg
                          className="ml-1.5 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
