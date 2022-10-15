import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardsList } from '../CardList';
import { mockData } from 'mocks/mockData';

describe('Test CardsList component', () => {
  it('renders CardsList component containing 15 cards', () => {
    render(<CardsList cards={mockData.photos.photo} onShowMore={jest.fn} />);
    expect(screen.getAllByRole('article').length).toBe(15);
  });
});
