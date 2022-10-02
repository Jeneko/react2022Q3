import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Test Button component', () => {
  it('renders Button component', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toHaveClass('btn');
  });
});
