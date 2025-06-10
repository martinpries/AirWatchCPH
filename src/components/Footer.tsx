import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  t: (key: string, fallback?: string) => string;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-slate-900 text-white py-6 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold mb-2">{t('app.title')}</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              {t('app.description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Links</h3>
            <div className="space-y-1">              <a
                href="https://github.com/martinpries/AirWatchCPH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-xs"
              >
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('footer.github')}              </a>              <a
                href="https://github.com/martinpries/AirWatchCPH/issues/new?assignees=&labels=data-submission%2Cneeds-review&projects=&template=new_data_point.md&title=%5BDATA%5D+"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-xs"
              >
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {t('footer.contribute')}
              </a>
            </div>
          </div>          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-2">About</h3>
            <p className="text-gray-300 text-xs">
              Tracking ultrafine particles, environmental studies, and air quality 
              discussions related to Copenhagen Airport.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-400 text-xs">
            © {currentYear} AirWatch CPH.
          </p>
          <div className="flex items-center text-gray-500 text-xs">
            Built with React + TypeScript + Tailwind CSS
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
