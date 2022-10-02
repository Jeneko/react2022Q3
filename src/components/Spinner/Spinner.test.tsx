import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Test Spinner component', () => {
  it('renders Spinner component', () => {
    render(<Spinner />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
