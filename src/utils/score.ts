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
