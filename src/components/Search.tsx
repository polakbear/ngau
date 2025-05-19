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

      if (!query || !geoJson?.features) return;

      const normalizedQuery = normalize(query.trim());
      console.log('Search query:', normalizedQuery);
      console.log('GeoJSON features:', geoJson.features.slice(0, 3));

      const feature = geoJson.features.find((f: GeoJsonFeature) => {
        const adminMatch = normalize(f.properties.ADMIN).includes(
          normalizedQuery
        );
        const nameMatch = normalize(f.properties.NAME).includes(
          normalizedQuery
        );
        console.log(
          'Matching:',
          f.properties.ADMIN,
          adminMatch,
          f.properties.NAME,
          nameMatch
        );
        return adminMatch || nameMatch;
      });

      if (feature) {
        console.log('Found feature:', feature);
        onCountryFound(feature);
      }
    },
    [geoJson, onCountryFound]
  );

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
        />
      </div>
    </div>
  );
}
