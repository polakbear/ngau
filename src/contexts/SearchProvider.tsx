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
  const [focusedCountry, setFocusedCountry] = useState<string | null>(null);
  const [fadeProgress, setFadeProgress] = useState<number>(0);
  const deviceType = useDeviceType();

  const focusCountry = useCallback(
    (feature: GeoJsonFeature) => {
      if (globeRef && feature.properties) {
        const countryName = feature.properties.ADMIN;
        setFocusedCountry(countryName);
        setFadeProgress(1); // Start at full intensity

        const isMobile = deviceType === 'mobile';
        const altitude = isMobile ? 2.5 : 1.7;
        const [lng, lat] = (feature as any).__centroid || [0, 0];
        const coords = {
          lat,
          lng,
          altitude,
        };
        globeRef.pointOfView(coords, 1000);

        // Start fade out after 1 second, fade for 1 second
        setTimeout(() => {
          const startTime = Date.now();
          const fadeDuration = 500; // 1 second fade

          const fade = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.max(0, 1 - elapsed / fadeDuration);

            setFadeProgress(progress);

            if (progress > 0) {
              requestAnimationFrame(fade);
            } else {
              setFocusedCountry(null);
            }
          };

          requestAnimationFrame(fade);
        }, 1000); // Start fading after 1 second
      }
    },
    [globeRef, deviceType]
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
