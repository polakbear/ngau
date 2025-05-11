import { CountryData, Nullable } from '../types';
import { normalize } from './utils';

// Get performance label based on rank position
export function getPerformanceLabel(
  rank: number | null,
  total: number
): string {
  if (rank === null) return 'N/A';
  const percentile = (total - rank) / total;

  if (percentile >= 0.8) return 'Excellent';
  if (percentile >= 0.6) return 'Good';
  if (percentile >= 0.4) return 'Fair';
  if (percentile >= 0.2) return 'Poor';
  return 'Very Poor';
}

// Get CSS class based on rank position
export function getPerformanceClass(
  rank: number | null,
  total: number
): string {
  if (rank === null) return 'qual--na';
  const label = getPerformanceLabel(rank, total)
    .toLowerCase()
    .replace(' ', '-');
  return `qual--${label}`;
}

// Get intuitive label that shows both rank and relative standing
export function getFullLabel(rank: number | null, total: number): string {
  if (rank === null) return 'No Data';
  const label = getPerformanceLabel(rank, total);
  const percentile = Math.round(((total - rank) / total) * 100);
  return `${label} (Top ${100 - percentile}%)`;
}

// Legacy functions maintained for backward compatibility
export function scoreLabel(score: Nullable): string {
  if (score == null) return 'N/A';
  if (score < 0.2) return 'Very Poor';
  if (score < 0.4) return 'Poor';
  if (score < 0.6) return 'Fair';
  if (score < 0.8) return 'Good';
  return 'Excellent';
}

export function scoreClass(score: Nullable): string {
  if (score == null) return 'qual--na';
  if (score < 0.2) return 'qual--very-poor';
  if (score < 0.4) return 'qual--poor';
  if (score < 0.6) return 'qual--fair';
  if (score < 0.8) return 'qual--good';
  return 'qual--excellent';
}

export function rankLabel(rank: number, total: number): string {
  return getFullLabel(rank, total);
}

export function getKriScore(feat: any, data: CountryData[]): number | null {
  const countryName = normalize(feat.properties.ADMIN);
  const country = data.find((d) => normalize(d.country) === countryName);
  return country?.kri_score ?? null;
}
