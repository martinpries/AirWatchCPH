import * as yaml from 'js-yaml';
import type { TimelineItem, GroupedTimelineItems } from '../types/timeline';

/**
 * Load all YAML files from the data directory and parse them into TimelineItem objects
 */
export async function loadTimelineData(): Promise<TimelineItem[]> {
  const dataFiles = import.meta.glob('/data/**/*.yaml', { query: '?raw', import: 'default' });
  const items: TimelineItem[] = [];
  for (const [path, loadFile] of Object.entries(dataFiles)) {
    try {
      const content = await loadFile() as string;
      const parsed = yaml.load(content) as TimelineItem;
      
      // Extract slug from filename
      const filename = path.split('/').pop()?.replace('.yaml', '') || '';
      parsed.slug = filename;
      
      // Validate required fields
      if (isValidTimelineItem(parsed)) {
        items.push(parsed);
      } else {
        console.warn(`Invalid timeline item in ${path}:`, parsed);
      }
    } catch (error) {
      console.error(`Failed to load ${path}:`, error);
    }
  }

  // Sort by date descending (newest first)
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Group timeline items by year
 */
export function groupItemsByYear(items: TimelineItem[]): GroupedTimelineItems {
  return items.reduce((groups, item) => {
    const year = new Date(item.date).getFullYear().toString();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(item);
    return groups;
  }, {} as GroupedTimelineItems);
}

/**
 * Filter timeline items by type
 */
export function filterItemsByType(items: TimelineItem[], types: string[]): TimelineItem[] {
  if (types.length === 0) return items;
  return items.filter(item => types.includes(item.type));
}

/**
 * Search timeline items by text query
 */
export function searchItems(items: TimelineItem[], query: string): TimelineItem[] {
  if (!query.trim()) return items;
  
  const searchTerm = query.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.short_description.toLowerCase().includes(searchTerm) ||
    item.long_description.toLowerCase().includes(searchTerm) ||
    item.author.toLowerCase().includes(searchTerm) ||
    item.publisher.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get all unique years from timeline items
 */
export function getAvailableYears(items: TimelineItem[]): string[] {
  const years = new Set(items.map(item => new Date(item.date).getFullYear().toString()));
  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
}

/**
 * Get all unique types from timeline items
 */
export function getAvailableTypes(items: TimelineItem[]): string[] {
  const types = new Set(items.map(item => item.type));
  return Array.from(types).sort();
}

/**
 * Validate if an object is a valid TimelineItem
 */
function isValidTimelineItem(item: unknown): item is TimelineItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as Record<string, unknown>).title === 'string' &&
    typeof (item as Record<string, unknown>).date === 'string' &&
    typeof (item as Record<string, unknown>).publisher === 'string' &&
    typeof (item as Record<string, unknown>).author === 'string' &&
    typeof (item as Record<string, unknown>).short_description === 'string' &&
    typeof (item as Record<string, unknown>).long_description === 'string' &&
    typeof (item as Record<string, unknown>).type === 'string' &&
    // Make reference and link optional - they can be null or undefined
    (typeof (item as Record<string, unknown>).reference === 'string' || (item as Record<string, unknown>).reference == null) &&
    (typeof (item as Record<string, unknown>).link === 'string' || (item as Record<string, unknown>).link == null) &&
    isValidDate((item as Record<string, unknown>).date as string) &&
    isValidType((item as Record<string, unknown>).type as string)
  );
}

/**
 * Check if date string is in valid YYYY-MM-DD format
 */
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date.toISOString().split('T')[0] === dateString;
}

/**
 * Check if type is valid
 */
function isValidType(type: string): boolean {
  const validTypes = ['news', 'scientific', 'report', 'government', 'company', 'political', 'organization', 'expert', 'social'];
  return validTypes.includes(type);
}
