import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Card, ProductProps } from '../Card';

const MOCK_DATA: ProductProps = {
  id: 1,
  category: 'Mock category',
  description: 'lorem ipsum something something',
  image: '\\product.jpg',
  price: 99,
  title: 'Mock product',
};

describe('Test single Card component', () => {
  it('renders Card component', () => {
    render(<Card {...MOCK_DATA} />);
    expect(screen.getByText(/Mock product/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('click on Fav button', () => {
    render(<Card {...MOCK_DATA} />);
    fireEvent.click(screen.getByTitle('Favourite'));
    expect(screen.getByRole('article')).toHaveClass('card--fav');
  });

  it('click on Like button', () => {
    render(<Card {...MOCK_DATA} />);
    fireEvent.click(screen.getByTitle('Add like'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
