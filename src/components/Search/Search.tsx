import { useCallback, useRef, useEffect } from 'react';
import { useGeoDataContext } from '../../contexts/GeoDataContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { GeoJsonFeature } from '../../types';
import styles from './Search.module.css';
import { normalize } from '../../utils/utils';
import { useSearchContext } from '../../contexts/SearchContext';

export default function Search() {
  const { geoJson } = useGeoDataContext();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { searchQuery, isExpanded, suggestions, selectedIndex, dispatch } =
    useSearchContext();

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  useClickOutside(containerRef as React.RefObject<HTMLElement>, () => {
    dispatch({ type: 'SET_EXPANDED', expanded: false });
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
            selectedIndex < suggestions.length - 1
              ? selectedIndex + 1
              : selectedIndex,
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch({
          type: 'SET_SELECTED_INDEX',
          index: selectedIndex > 0 ? selectedIndex - 1 : selectedIndex,
        });
      } else if (
        e.key === 'Enter' &&
        selectedIndex >= 0 &&
        selectedIndex < suggestions.length
      ) {
        dispatch({ type: 'SET_EXPANDED', expanded: false });
        dispatch({ type: 'RESET' });
      }
    },
    [suggestions, selectedIndex, dispatch]
  );

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <button
        className={`${styles.searchButton} ${isExpanded ? styles.active : ''}`}
        onClick={() =>
          dispatch({ type: 'SET_EXPANDED', expanded: !isExpanded })
        }
        aria-label="Toggle search"
      >
        <i className="fas fa-search" aria-hidden="true" />
      </button>
      <div
        className={`${styles.searchInputContainer} ${isExpanded ? styles.expanded : ''}`}
      >
        <input
          ref={searchInputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {suggestions.length > 0 && isExpanded && (
          <ul className={styles.suggestionsList}>
            {suggestions.map((feature, index) => (
              <li
                key={feature.properties.ADMIN}
                className={`${styles.suggestionItem} ${
                  index === selectedIndex ? styles.selected : ''
                }`}
                onClick={() => {
                  dispatch({ type: 'SET_EXPANDED', expanded: false });
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
