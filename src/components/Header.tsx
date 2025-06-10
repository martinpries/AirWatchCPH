import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LangSwitcher } from './LangSwitcher';
import { AddDataInfo } from './AddDataInfo';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  t
}) => {
  const [showAddDataInfo, setShowAddDataInfo] = useState(false);
  return (
    <motion.header
      className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white overflow-hidden min-h-[280px] flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating particles representing air molecules */}
        <div className="absolute top-12 left-[10%] w-2 h-2 bg-cyan-300 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-20 right-[15%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-delayed opacity-50"></div>
        <div className="absolute bottom-16 left-[20%] w-3 h-3 bg-teal-400 rounded-full animate-float-slow opacity-40"></div>
        <div className="absolute bottom-12 right-[25%] w-1 h-1 bg-sky-300 rounded-full animate-float opacity-70"></div>
        <div className="absolute top-32 left-[60%] w-2 h-2 bg-blue-400 rounded-full animate-float-delayed opacity-50"></div>
        <div className="absolute bottom-20 right-[45%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float-slow opacity-60"></div>
        
        {/* Gradient overlay circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-500/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Language switcher positioned absolutely */}
      <div className="absolute top-4 right-4 z-20">
        <LangSwitcher
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>

      {/* Main content - perfectly centered */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Icon and title section */}
          <div className="flex flex-col items-center space-y-4">
            {/* Modern logo design */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 6.41L15.41 5L21 10.59L15.41 16.18L14 14.77L17.18 11.59H3V10.41H17.18L14 7.23L14 6.41ZM6 2V4H18V6H6C4.89 6 4 6.89 4 8V16C4 17.11 4.89 18 6 18H18V20H6C3.79 20 2 18.21 2 16V8C2 5.79 3.79 4 6 4V2H6Z"/>
                </svg>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 -z-10"></div>
            </motion.div>

            {/* Title with gradient text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                {t('app.title')}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          {/* Subtitle and description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-3 max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-blue-100 font-medium">
              {t('app.subtitle')}
            </p>
            <p className="text-blue-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t('app.description')}
            </p>
          </motion.div>          {/* Call to action badges */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6 pt-4"
          >
            <button
              onClick={() => setShowAddDataInfo(true)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-blue-100">Add Data</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-8 text-gray-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C150,100 350,80 600,100 C850,120 1050,100 1200,80 L1200,120 Z"
            fill="currentColor"          />
        </svg>
      </div>

      {/* Add Data Info Modal */}
      <AddDataInfo
        isOpen={showAddDataInfo}
        onClose={() => setShowAddDataInfo(false)}
        t={t}
      />
    </motion.header>
  );
};
