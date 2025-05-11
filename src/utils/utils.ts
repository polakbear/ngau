export const normalize = (str: string) => {
  if (!str) return '';

  const normalized = str.toLowerCase().trim();

  return normalized
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
};
