export const normalize = (str: string) => {
  if (!str) return '';

  const normalized = str.toLowerCase().trim();

  return normalized
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
};

export function getAffectedCount(percentage: number) {
  const total = percentage < 5 ? 100 : 20;
  const affected = Math.round((percentage / 100) * total);

  return { total, affected };
}
