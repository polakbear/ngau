import { CountryData, Nullable } from '../types';
import { normalize } from './utils';

export function getPerformanceLabel(
  rank: number | null,
  total: number
): string {
  if (rank === null) return 'N/A';
  const percentile = (total - rank) / total;

  if (percentile >= 0.9) return 'Excellent';
  if (percentile >= 0.6) return 'Good';
  if (percentile >= 0.4) return 'Fair';
  if (percentile >= 0.1) return 'Poor';
  return 'Very Poor';
}

export function getFullLabel(rank: number | null, total: number): string {
  if (rank === null) return 'No Data';
  return getPerformanceLabel(rank, total);
}

export function scoreLabel(score: Nullable): string {
  if (score == null) return 'N/A';

  if (score >= 0.9) return 'Excellent';
  if (score >= 0.6) return 'Good';
  if (score >= 0.4) return 'Fair';
  if (score >= 0.1) return 'Poor';
  return 'Very Poor';
}

export function scoreClass(score: Nullable): string {
  if (score == null) return 'qual--na';

  if (score >= 0.9) return 'qual--excellent';
  if (score >= 0.6) return 'qual--good';
  if (score >= 0.4) return 'qual--fair';
  if (score >= 0.1) return 'qual--poor';
  return 'qual--very-poor';
}

export function rankLabel(rank: number, total: number): string {
  return getFullLabel(rank, total);
}

export function getKriScore(feat: any, data: CountryData[]): number | null {
  const countryName = normalize(feat.properties.ADMIN);
  const country = data.find((d) => normalize(d.country) === countryName);
  return country?.kri_score ?? null;
}
