import { CountryData, Nullable } from '../types';
import { normalize } from './utils';

// Get performance label based on rank position
export function getPerformanceLabel(
  rank: number | null,
  total: number
): string {
  if (rank === null) return 'N/A';
  const percentile = (total - rank) / total;

  if (percentile >= 0.9) return 'Top 10%';
  if (percentile >= 0.6) return 'Above Average';
  if (percentile >= 0.4) return 'Average';
  if (percentile >= 0.1) return 'Below Average';
  return 'Bottom 10%';
}

// Get CSS class based on rank position
export function getPerformanceClass(
  rank: number | null,
  total: number
): string {
  if (rank === null) return 'qual--na';
  const percentile = (total - rank) / total;

  if (percentile >= 0.9) return 'qual--excellent';
  if (percentile >= 0.6) return 'qual--good';
  if (percentile >= 0.4) return 'qual--fair';
  if (percentile >= 0.1) return 'qual--poor';
  return 'qual--very-poor';
}

// Get intuitive label that shows both rank and relative standing
export function getFullLabel(rank: number | null, total: number): string {
  if (rank === null) return 'No Data';
  return getPerformanceLabel(rank, total);
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
