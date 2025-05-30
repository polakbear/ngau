import { GeoJsonFeature } from '../../types';

export type SearchState = {
  searchQuery: string;
  isExpanded: boolean;
  suggestions: GeoJsonFeature[];
  selectedIndex: number;
};

export type SearchAction =
  | { type: 'SET_QUERY'; query: string; suggestions: GeoJsonFeature[] }
  | { type: 'SET_EXPANDED'; expanded: boolean }
  | { type: 'SET_SUGGESTIONS'; suggestions: GeoJsonFeature[] }
  | { type: 'SET_SELECTED_INDEX'; index: number }
  | { type: 'RESET' };
