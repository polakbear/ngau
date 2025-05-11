export const normalize = (str: string) => {
  if (!str) return '';
  // Special cases for country names that might cause issues
  const specialCases: { [key: string]: string } = {
    'united states': 'unitedstatesofamerica',
    'united states of america': 'unitedstatesofamerica',
    usa: 'unitedstatesofamerica',
    kosovo: 'kosovo',
    'republic of kosovo': 'kosovo',
  };

  const normalized = str.toLowerCase().trim();

  // Check for special cases first
  for (const [key, value] of Object.entries(specialCases)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  // Regular normalization for other countries
  return normalized
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
};
