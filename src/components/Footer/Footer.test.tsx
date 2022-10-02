import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Test Footer component', () => {
  it('renders Footer component', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toHaveClass('footer');
  });
});
