import { useCallback, useState } from 'react';
import { GeoJsonFeature } from '../types';
import styles from './Search.module.css';
import { normalize } from '../utils/utils';

interface SearchProps {
  geoJson: any;
  onCountryFound: (feature: GeoJsonFeature) => void;
}

export default function Search({ geoJson, onCountryFound }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
