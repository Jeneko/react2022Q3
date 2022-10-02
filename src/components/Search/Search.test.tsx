import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Search, LOCAL_STORAGE_KEY } from '../Search';

const TEST_STRING = 'Give me some sugar, baby';

describe('Test Search component', () => {
  it('renders Search component', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/Search\.\.\./i)).toBeInTheDocument();
  });

  it('renders Search component with data from localStorage', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, TEST_STRING);
    render(<Search />);
    expect(screen.getByDisplayValue(TEST_STRING)).toBeInTheDocument();
  });

  it('save value from Search component to localStorage when unmount', () => {
    localStorage.clear();
    const { unmount } = render(<Search />);
    userEvent.type(screen.getByPlaceholderText(/Search\.\.\./i), TEST_STRING);
    unmount();
    render(<Search />);
    expect(screen.getByDisplayValue(TEST_STRING)).toBeInTheDocument();
  });
});
