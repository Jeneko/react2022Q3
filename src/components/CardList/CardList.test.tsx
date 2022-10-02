import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardsList } from '../CardList';

describe('Test CardsList component', () => {
  it('renders CardsList component containing 10 cards', () => {
    render(<CardsList />);
    expect(screen.getAllByRole('article').length).toBe(10);
  });
});
