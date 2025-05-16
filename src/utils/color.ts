import * as d3 from 'd3-scale';
import { Nullable } from '../types';

export const colors = {
  excellent: '#00C2B2',
  good: '#1B9C8C',
  fair: '#4FB5D9',
  poor: '#375B82',
  veryPoor: '#2A3445',
  noData: '#383838',
};

export const rankBasedColorScale = d3
  .scaleLinear<string>()
  .domain([1, 194])
  .range([colors.excellent, colors.veryPoor]);

export function getContrastingTextColor(bg: string): string {
  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140 ? '#000' : '#fff';
}

export function getColorFromRank(rank: number | null, total: number): string {
  if (rank === null) return colors.noData;
  const percentile = (total - rank) / total;

  if (percentile >= 0.9) return colors.excellent;
  if (percentile >= 0.6) return colors.good;
  if (percentile >= 0.4) return colors.fair;
  if (percentile >= 0.1) return colors.poor;
  return colors.veryPoor;
}

export function getBarColor(rank: Nullable): string {
  if (rank == null) return colors.noData;
  return rankBasedColorScale(rank);
}
