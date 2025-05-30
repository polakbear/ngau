import { useReducer, ReactNode, useMemo } from 'react';
import { SearchContext } from './SearchContext';
import { SearchState, SearchAction } from '../components/Search/types';
import { searchReducer } from '../components/Search/reducer';

const initialState: SearchState = {
  searchQuery: '',
  isExpanded: false,
  suggestions: [],
  selectedIndex: -1,
};

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    (state: SearchState, action: SearchAction) =>
      searchReducer(state, action, initialState),
    initialState
  );

  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
