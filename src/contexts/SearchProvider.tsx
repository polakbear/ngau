import { useReducer, ReactNode, useState, useCallback } from 'react';
import { SearchContext, SearchState, SearchAction } from './SearchContext';
import { GeoJsonFeature } from '../types';
import { useCountryFocus } from '../hooks/useCountryFocus';

const initialState: SearchState = {
  searchQuery: '',
  isExpanded: false,
  suggestions: [],
  selectedIndex: -1,
};

function searchReducer(
  state: SearchState,
  action: SearchAction,
  initialState: SearchState
): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        searchQuery: action.query,
        suggestions: action.suggestions,
        selectedIndex: -1,
      };
    case 'SET_SUGGESTIONS_DROPDOWN_OPEN':
      return {
        ...state,
        isExpanded: action.expanded,
      };
    case 'SET_SUGGESTIONS':
      return {
        ...state,
        suggestions: action.suggestions,
      };
    case 'SET_SELECTED_INDEX':
      return {
        ...state,
        selectedIndex: action.index,
      };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    (state: SearchState, action: SearchAction) =>
      searchReducer(state, action, initialState),
    initialState
  );

  const [globeRef, setGlobeRef] = useState<any>(null);
  const {
    focusCountry: focusCountryHook,
    focusedCountry,
    fadeProgress,
  } = useCountryFocus();

  const focusCountry = useCallback(
    (feature: GeoJsonFeature) => {
      focusCountryHook(feature, globeRef);
    },
    [focusCountryHook, globeRef]
  );

  return (
    <SearchContext.Provider
      value={{
        state,
        dispatch,
        globeRef,
        setGlobeRef,
        focusCountry,
        focusedCountry,
        fadeProgress,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
