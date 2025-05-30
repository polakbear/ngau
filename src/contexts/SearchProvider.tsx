import { useReducer, ReactNode, useState, useCallback } from 'react';
import { SearchContext, SearchState, SearchAction } from './SearchContext';
import { GeoJsonFeature } from '../types';
import { useDeviceType } from '../hooks/useDeviceType';

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
  const deviceType = useDeviceType();

  const focusCountry = useCallback(
    (feature: GeoJsonFeature) => {
      if (globeRef && feature.properties) {
        const isMobile = deviceType === 'mobile';
        const altitude = isMobile ? 2.5 : 1.7;
        const [lng, lat] = (feature as any).__centroid || [0, 0];
        const coords = {
          lat,
          lng,
          altitude,
        };
        globeRef.pointOfView(coords, 1000);
      }
    },
    [globeRef, deviceType]
  );

  return (
    <SearchContext.Provider
      value={{ state, dispatch, globeRef, setGlobeRef, focusCountry }}
    >
      {children}
    </SearchContext.Provider>
  );
}
