import * as d3 from 'd3-scale';
import { Nullable } from '../types';

const MAX_RANK = 194;
const NUM_STOPS = 20;

export const colors = {
  excellent: '#00C2B2',
  good: '#1B9C8C',
  fair: '#4FB5D9',
  poor: '#375B82',
  veryPoor: '#2A3445',
  noData: '#FEFEFE',
};

export const rankBasedColorScale = d3
  .scaleLinear<string>()
  .domain([1, MAX_RANK])
  .range([colors.excellent, colors.veryPoor]);

export function getContrastingTextColor(color: string): 'white' | 'black' {
  try {
    let r: number, g: number, b: number;

    if (color.startsWith('#')) {
      let hex = color.slice(1);

      // expand short hex (#fff → #ffffff)
      if (hex.length === 3) {
        hex = hex
          .split('')
          .map((c) => c + c)
          .join('');
      }

      if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
        throw new Error('Invalid hex format');
      }

      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else if (color.startsWith('rgb')) {
      const match = color.match(
        /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
      );

      if (!match) throw new Error('Invalid RGB format');

      r = parseInt(match[1], 10);
      g = parseInt(match[2], 10);
      b = parseInt(match[3], 10);
    } else {
      throw new Error('Unsupported format');
    }

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  } catch {
    return 'white';
  }
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

export function getGradientStyle() {
  const colorStops: string[] = [];
  for (let i = 0; i < NUM_STOPS; i++) {
    const rank = Math.round(MAX_RANK - (i * (MAX_RANK - 1)) / (NUM_STOPS - 1));
    const percent = (i / (NUM_STOPS - 1)) * 100;
    const color = rankBasedColorScale(rank);
    colorStops.push(`${color} ${percent}%`);
  }
  return {
    background: `linear-gradient(to right, ${colorStops.join(', ')})`,
  };
}
