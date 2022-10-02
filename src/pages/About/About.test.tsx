import React from 'react';
import { render, screen } from '@testing-library/react';
import { AboutPage } from '../About';

describe('Test AboutPage component', () => {
  it('renders AboutPage component', () => {
    render(<AboutPage />);
    expect(screen.getByText(/About Page/i)).toBeInTheDocument();
  });
});
