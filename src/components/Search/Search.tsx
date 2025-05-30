import { useCallback, useRef, useEffect, useContext } from 'react';
import { useGeoDataContext } from '../../contexts/GeoDataContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { GeoJsonFeature } from '../../types';
import styles from './Search.module.css';
import { normalize } from '../../utils/utils';
import { SearchContext } from '../../contexts/SearchContext';

export default function Search() {
  const { geoJson } = useGeoDataContext();
  const { state, dispatch, focusCountry } = useContext(SearchContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [state.isExpanded]);

  useClickOutside(containerRef as React.RefObject<HTMLElement>, () => {
    dispatch({ type: 'SET_SUGGESTIONS_DROPDOWN_OPEN', expanded: false });
    dispatch({ type: 'RESET' });
  });

  const handleSearch = useCallback(
    (query: string) => {
      if (!query || !geoJson?.features) {
        dispatch({ type: 'SET_QUERY', query, suggestions: [] });
        return;
      }

      const normalizedQuery = normalize(query.trim());

      const matches = geoJson.features
        .filter((f: GeoJsonFeature) => {
          const adminMatch = normalize(f.properties.ADMIN).includes(
            normalizedQuery
          );
          const nameMatch = normalize(f.properties.NAME).includes(
            normalizedQuery
          );
          return adminMatch || nameMatch;
        })
        .slice(0, 5);

      dispatch({ type: 'SET_QUERY', query, suggestions: matches });
    },
    [geoJson, dispatch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dispatch({
          type: 'SET_SELECTED_INDEX',
          index:
            state.selectedIndex < state.suggestions.length - 1
              ? state.selectedIndex + 1
              : state.selectedIndex,
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch({
          type: 'SET_SELECTED_INDEX',
          index:
            state.selectedIndex > 0
              ? state.selectedIndex - 1
              : state.selectedIndex,
        });
      } else if (
        e.key === 'Enter' &&
        state.selectedIndex >= 0 &&
        state.selectedIndex < state.suggestions.length
      ) {
        focusCountry(state.suggestions[state.selectedIndex]);
        dispatch({ type: 'SET_SUGGESTIONS_DROPDOWN_OPEN', expanded: false });
        dispatch({ type: 'RESET' });
      }
    },
    [state.suggestions, state.selectedIndex, focusCountry, dispatch]
  );

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <button
        className={`${styles.searchButton} ${state.isExpanded ? styles.active : ''}`}
        onClick={() =>
          dispatch({
            type: 'SET_SUGGESTIONS_DROPDOWN_OPEN',
            expanded: !state.isExpanded,
          })
        }
        aria-label="Toggle search"
      >
        <i className="fas fa-search" aria-hidden="true" />
      </button>
      <div
        className={`${styles.searchInputContainer} ${state.isExpanded ? styles.expanded : ''}`}
      >
        <input
          ref={searchInputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search for a country..."
          value={state.searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {state.suggestions.length > 0 && state.isExpanded && (
          <ul className={styles.suggestionsList}>
            {state.suggestions.map((feature, index) => (
              <li
                key={feature.properties.ADMIN}
                className={`${styles.suggestionItem} ${
                  index === state.selectedIndex ? styles.selected : ''
                }`}
                onClick={() => {
                  focusCountry(feature);
                  dispatch({
                    type: 'SET_SUGGESTIONS_DROPDOWN_OPEN',
                    expanded: false,
                  });
                  dispatch({ type: 'RESET' });
                }}
              >
                {feature.properties.ADMIN}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
