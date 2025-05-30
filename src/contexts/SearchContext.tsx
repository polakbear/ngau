import { createContext, useContext } from 'react';
import { SearchState, SearchAction } from '../components/Search/types';

export interface SearchContextValue extends SearchState {
  dispatch: React.Dispatch<SearchAction>;
}

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined
);

export function useSearchContext(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx)
    throw new Error('useSearchContext must be used within a SearchProvider');
  return ctx;
}
