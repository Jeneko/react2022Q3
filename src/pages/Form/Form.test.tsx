import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormPage } from '../Form';

const mockUserPicture = new File(['userpic'], 'userpic.png', { type: 'image/png' });

describe('Testing FormPage component', () => {
  it('renders FormPage component', () => {
    render(<FormPage />);
    expect(screen.getByTestId('form-page')).toBeInTheDocument();
  });

  it('adds user card', () => {
    render(<FormPage />);

    userEvent.type(screen.getByLabelText('Name'), 'John');
    userEvent.type(screen.getByLabelText('Birthday'), '2020-05-12');
    userEvent.selectOptions(screen.getByLabelText('Region'), 'Europe');
    userEvent.upload(screen.getByLabelText('Picture'), mockUserPicture);
    userEvent.click(screen.getByTestId('agree-checkbox'));
    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByText(/Success: user created/i)).toBeInTheDocument();
  });
});
