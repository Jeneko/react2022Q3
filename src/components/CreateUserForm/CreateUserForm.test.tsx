import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateUserForm } from '../CreateUserForm';
import userEvent from '@testing-library/user-event';

const mockUserPicture = new File(['userpic'], 'userpic.png', { type: 'image/png' });

describe('Testing CreateUserForm component', () => {
  it('renders CreateUserForm component', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByTestId('create-user-form')).toBeInTheDocument();
  });

  it('has Name input', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('has Birthday input', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/birthday/i)).toBeInTheDocument();
  });

  it('has Region select', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/region/i)).toBeInTheDocument();
  });

  it('has Picture input', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/picture/i)).toBeInTheDocument();
  });

  it('has sex toggle', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByTestId('sex-checkbox')).toBeInTheDocument();
  });

  it('has agree checkbox', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByTestId('agree-checkbox')).toBeInTheDocument();
  });

  it('has submit button', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('has submit button disabled at start', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    expect((screen.getByTestId('submit-button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('types name input', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    userEvent.type(screen.getByLabelText(/name/i), 'A');
    expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe('A');
  });

  it('prevents short names', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    userEvent.type(screen.getByLabelText(/name/i), 'A');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByText(/Name must be 2 or more characters/i)).toBeInTheDocument();
  });

  it('removes error after input update', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    userEvent.type(screen.getByLabelText(/name/i), 'A');
    userEvent.click(screen.getByTestId('submit-button'));
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    expect(screen.queryByText(/Name must be 2 or more characters/i)).not.toBeInTheDocument();
  });

  it('prevents empty region', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByText(/Please, select your region/i)).toBeInTheDocument();
  });

  it('prevents empty picture', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByText(/Please, select a picture/i)).toBeInTheDocument();
  });

  it('prevents empty agreement checkbox', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByText(/You must agree to the terms/i)).toBeInTheDocument();
  });

  it('Submits correct data', () => {
    render(<CreateUserForm onFormSubmit={jest.fn()} />);
    userEvent.type(screen.getByLabelText('Name'), 'John');
    userEvent.type(screen.getByLabelText('Birthday'), '2020-05-12');
    userEvent.selectOptions(screen.getByLabelText('Region'), 'Europe');
    userEvent.upload(screen.getByLabelText('Picture'), mockUserPicture);
    userEvent.click(screen.getByTestId('agree-checkbox'));
    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByText(/Success: user created/i)).toBeInTheDocument();
  });
});
