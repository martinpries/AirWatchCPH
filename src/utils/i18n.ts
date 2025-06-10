import * as yaml from 'js-yaml';
import type { LanguageContent } from '../types/timeline';

/**
 * Load language files and return translations
 */
export async function loadLanguageFiles(): Promise<Record<string, LanguageContent>> {
  const langFiles = import.meta.glob('/src/lang/*.yaml', { query: '?raw', import: 'default' });
  const languages: Record<string, LanguageContent> = {};
  
  console.log('Loading language files:', Object.keys(langFiles));
  
  for (const [path, loadFile] of Object.entries(langFiles)) {
    try {
      const content = await loadFile() as string;
      const parsed = yaml.load(content) as LanguageContent;
      
      // Extract language code from filename (e.g., 'en' from 'en.yaml')
      const langCode = path.split('/').pop()?.replace('.yaml', '') || 'en';
      languages[langCode] = parsed;
      console.log(`Loaded language: ${langCode}`, Object.keys(parsed));
    } catch (error) {
      console.error(`Failed to load language file ${path}:`, error);
    }
  }

  console.log('All loaded languages:', Object.keys(languages));
  return languages;
}

/**
 * Get nested value from object using dot notation
 */
export function getNestedValue(obj: LanguageContent, path: string): string {
  return path.split('.').reduce((current: LanguageContent | string, key: string) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as LanguageContent)[key];
    }
    return path; // Return the path itself if not found (fallback)
  }, obj) as string;
}

/**
 * Translation function
 */
export function createTranslator(translations: LanguageContent) {
  return (key: string, fallback?: string): string => {
    const value = getNestedValue(translations, key);
    return value !== key ? value : (fallback || key);
  };
}

/**
 * Get the stored language preference from localStorage or return default
 */
export function getStoredLanguage(): string {
  try {
    const stored = localStorage.getItem('preferred-language');
    if (stored && stored in AVAILABLE_LANGUAGES) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read language preference from localStorage:', error);
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Store the language preference in localStorage
 */
export function storeLanguage(language: string): void {
  try {
    if (language in AVAILABLE_LANGUAGES) {
      localStorage.setItem('preferred-language', language);
    }
  } catch (error) {
    console.warn('Failed to store language preference in localStorage:', error);
  }
}

/**
 * Available languages configuration
 */
export const AVAILABLE_LANGUAGES = {
  en: 'English',
  da: 'Dansk'
};

export const DEFAULT_LANGUAGE = 'da'; // Changed default to Danish
