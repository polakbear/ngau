import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Legend } from './Legend';

describe('Legend component', () => {
  it('renders scale labels', () => {
    render(<Legend />);
    expect(screen.getByText(/Very Poor/i)).toBeInTheDocument();
    expect(screen.getByText(/Excellent/i)).toBeInTheDocument();
  });
});
