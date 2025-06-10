import { useState, useEffect, useMemo } from 'react';
import { Timeline } from './components/Timeline';
import { Header } from './components/Header';
import { YearNav } from './components/YearNav';
import { Filters } from './components/Filters';
import { Footer } from './components/Footer';
import { 
  loadTimelineData, 
  groupItemsByYear, 
  filterItemsByType, 
  searchItems,
  getAvailableYears
} from './utils/loadData';
import { TYPE_CONFIG } from './utils/typeConfig';
import { loadLanguageFiles, createTranslator, getStoredLanguage, storeLanguage } from './utils/i18n';
import type { TimelineItem, LanguageContent } from './types/timeline';

function App() {
  // State management
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(getStoredLanguage());
  const [languages, setLanguages] = useState<Record<string, LanguageContent>>({});
  const [currentYear, setCurrentYear] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Translation function
  const t = useMemo(() => {
    console.log('Creating translator for language:', currentLanguage);
    console.log('Available languages:', Object.keys(languages));
    console.log('Current language data exists:', !!languages[currentLanguage]);
    
    if (languages[currentLanguage]) {
      console.log('Using translations for:', currentLanguage);
      return createTranslator(languages[currentLanguage]);
    }
    // Fallback to English if current language is not available
    if (languages['en']) {
      console.log('Falling back to English translations');
      return createTranslator(languages['en']);
    }
    // Last resort fallback
    console.log('Using fallback translator');
    return (key: string, fallback?: string) => {
      console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
      return fallback || key;
    };
  }, [languages, currentLanguage]);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [items, langs] = await Promise.all([
          loadTimelineData(),
          loadLanguageFiles()
        ]);
        
        setTimelineItems(items);
        setLanguages(langs);
        setError(null);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(t('messages.error_loading'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtered and processed data
  const filteredItems = useMemo(() => {
    let items = timelineItems;
    
    // Apply search
    if (searchQuery.trim()) {
      items = searchItems(items, searchQuery);
    }
    
    // Apply type filters
    if (selectedTypes.length > 0) {
      items = filterItemsByType(items, selectedTypes);
    }
    
    return items;
  }, [timelineItems, searchQuery, selectedTypes]);

  const groupedItems = useMemo(() => {
    return groupItemsByYear(filteredItems);
  }, [filteredItems]);

  const availableYears = useMemo(() => {
    return getAvailableYears(timelineItems);
  }, [timelineItems]);

  const availableTypes = useMemo(() => {
    return Object.keys(TYPE_CONFIG);
  }, []);

  // Event handlers
  const handleLanguageChange = (lang: string) => {
    console.log('Language change requested:', lang);
    console.log('Previous language:', currentLanguage);
    setCurrentLanguage(lang);
    storeLanguage(lang);
    console.log('Language changed to:', lang);
  };

  const handleYearClick = (year: string) => {
    setCurrentYear(year || null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">{t('timeline.loading')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {t('messages.try_again')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        t={t}
      />
      
      <YearNav
        years={availableYears}
        currentYear={currentYear}
        onYearClick={handleYearClick}
        t={t}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Filters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedTypes={selectedTypes}
          onTypeToggle={handleTypeToggle}
          availableTypes={availableTypes}
          onClearFilters={handleClearFilters}
          t={t}
        />

        {filteredItems.length === 0 && (searchQuery || selectedTypes.length > 0) ? (
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg mb-4">
              {searchQuery 
                ? t('messages.search_no_results') 
                : t('messages.filter_no_results')
              }
            </div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {t('filters.clear_filters')}
            </button>
          </div>
        ) : (
          <Timeline groupedItems={groupedItems} t={t} />
        )}
      </main>

      <Footer t={t} />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-2.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 z-30 backdrop-blur-sm"
        aria-label={t('navigation.back_to_top')}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}

export default App;
