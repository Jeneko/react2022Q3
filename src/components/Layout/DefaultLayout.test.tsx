import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { DefaultLayout } from '../Layout/DefaultLayout';

describe('Test DefaultLayout component', () => {
  it('renders DefaultLayout component links', () => {
    render(
      <BrowserRouter>
        <DefaultLayout />
      </BrowserRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
