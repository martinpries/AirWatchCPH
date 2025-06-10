export interface TimelineItem {
  title: string;
  date: string; // YYYY-MM-DD format
  publisher: string;
  author: string;
  short_description: string;
  long_description: string;
  type: 'news' | 'scientific' | 'report' | 'government' | 'company' | 'political' | 'organization' | 'expert' | 'social';
  reference?: string; // Made optional
  link?: string; // Made optional
  slug?: string; // Generated from filename
}

export interface GroupedTimelineItems {
  [year: string]: TimelineItem[];
}

export interface LanguageContent {
  [key: string]: string | LanguageContent;
}

export interface AppConfig {
  title: string;
  defaultLanguage: string;
  availableLanguages: string[];
}

export type TimelineItemType = TimelineItem['type'];

export interface TypeConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

export interface TypeConfigMap {
  [key in TimelineItemType]: TypeConfig;
}
