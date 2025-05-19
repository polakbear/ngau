import { useCallback, useState, useRef, useEffect } from 'react';
import { GeoJsonFeature } from '../types';
import styles from './Search.module.css';
import { normalize } from '../utils/utils';

interface SearchProps {
  geoJson: any;
  onCountryFound: (feature: GeoJsonFeature) => void;
}

export default function Search({ geoJson, onCountryFound }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [suggestions, setSuggestions] = useState<GeoJsonFeature[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setSelectedIndex(-1);

      if (!query || !geoJson?.features) {
        setSuggestions([]);
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
        .slice(0, 5); // Limit to 5 suggestions

      setSuggestions(matches);
    },
    [geoJson]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        onCountryFound(suggestions[selectedIndex]);
        setIsExpanded(false);
        setSearchQuery('');
        setSuggestions([]);
      }
    },
    [suggestions, selectedIndex, onCountryFound]
  );

  // const handleSearch = useCallback(
  //   (query: string) => {
  //     setSearchQuery(query);

  //     if (!query || !geoJson?.features) return;

  //     const normalizedQuery = normalize(query.trim());
  //     console.log('Search query:', normalizedQuery);
  //     console.log('GeoJSON features:', geoJson.features.slice(0, 3));

  //     const feature = geoJson.features.find((f: GeoJsonFeature) => {
  //       const adminMatch = normalize(f.properties.ADMIN).includes(
  //         normalizedQuery
  //       );
  //       const nameMatch = normalize(f.properties.NAME).includes(
  //         normalizedQuery
  //       );
  //       console.log(
  //         'Matching:',
  //         f.properties.ADMIN,
  //         adminMatch,
  //         f.properties.NAME,
  //         nameMatch
  //       );
  //       return adminMatch || nameMatch;
  //     });

  //     if (feature) {
  //       console.log('Found feature:', feature);
  //       onCountryFound(feature);
  //     }
  //   },
  //   [geoJson, onCountryFound]
  // );

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <button
        className={`${styles.searchButton} ${isExpanded ? styles.active : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
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
                  onCountryFound(feature);
                  setIsExpanded(false);
                  setSearchQuery('');
                  setSuggestions([]);
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
