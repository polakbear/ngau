import { createContext } from 'react';
import { GeoJsonFeature } from '../types';

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

export interface SearchContextValue {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
}

const defaultContextValue: SearchContextValue = {
  state: {
    searchQuery: '',
    isExpanded: false,
    suggestions: [],
    selectedIndex: -1,
  },
  dispatch: () => {},
};

export const SearchContext =
  createContext<SearchContextValue>(defaultContextValue);
