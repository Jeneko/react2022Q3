import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHeading } from '../PageHeading';

const TEST_STRING = 'Test heading';

describe('Test Spinner component', () => {
  it('renders Spinner component', () => {
    render(<PageHeading>{TEST_STRING}</PageHeading>);
    expect(screen.getByText(TEST_STRING)).toBeInTheDocument();
  });
});
