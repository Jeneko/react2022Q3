import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainPage } from '../Main';

describe('Test MainPage component', () => {
  it('renders MainPage component', () => {
    render(<MainPage />);
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });
});
