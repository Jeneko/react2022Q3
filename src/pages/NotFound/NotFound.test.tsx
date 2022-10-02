import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../NotFound';

describe('Test NotFound component', () => {
  it('renders NotFound component', () => {
    render(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
