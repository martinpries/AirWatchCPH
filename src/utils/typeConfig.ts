import type { TypeConfigMap } from '../types/timeline';

export const TYPE_CONFIG: TypeConfigMap = {
  news: {
    label: 'News',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: '📰'
  },
  scientific: {
    label: 'Scientific',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: '🔬'
  },
  report: {
    label: 'Report',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: '📄'
  },
  government: {
    label: 'Government',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    icon: '🏛️'
  },
  company: {
    label: 'Company',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    icon: '🏢'
  },
  political: {
    label: 'Political',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: '🗳️'
  },
  organization: {
    label: 'Organization',
    color: 'text-pink-700',
    bgColor: 'bg-pink-100',
    icon: '🤝'
  },
  expert: {
    label: 'Expert',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
    icon: '👨‍🔬'
  },
  social: {
    label: 'Social',
    color: 'text-teal-700',
    bgColor: 'bg-teal-100',
    icon: '💬'
  }
};
