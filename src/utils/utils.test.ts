import { describe, it, expect } from 'vitest';
import { normalize } from './utils';

describe('normalize', () => {
  it('removes diacritics and non letters', () => {
    const input = ' Café-le Monde! 123';
    expect(normalize(input)).toBe('cafelemonde');
  });

  it('returns empty string for empty input', () => {
    expect(normalize('')).toBe('');
  });
});
