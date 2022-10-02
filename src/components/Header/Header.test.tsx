import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Test Header component', () => {
  it('renders Header component links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
