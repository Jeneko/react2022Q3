import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateUserForm } from '../CreateUserForm';
import userEvent from '@testing-library/user-event';

describe('Testing CreateUserForm component', () => {
  const mockOnSubmit = jest.fn();

  it('renders CreateUserForm component', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByTestId('create-user-form')).toBeInTheDocument();
  });

  it('has Name input', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('has Birthday input', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/birthday/i)).toBeInTheDocument();
  });

  it('has Region select', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/region/i)).toBeInTheDocument();
  });

  it('has Picture input', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/picture/i)).toBeInTheDocument();
  });

  it('has sex toggle', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByTestId('sex-checkbox')).toBeInTheDocument();
  });

  it('has agree checkbox', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByTestId('agree-checkbox')).toBeInTheDocument();
  });

  it('has submit button', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('has submit button disabled at start', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    expect((screen.getByTestId('submit-button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('types name input', () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    userEvent.type(screen.getByLabelText(/name/i), 'A');
    expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe('A');
  });

  it('prevents short names', async () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    userEvent.type(screen.getByLabelText(/name/i), 'A');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(await screen.findByText(/Name must be 2 or more characters/i)).toBeInTheDocument();
  });

  it('removes error after input update', async () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    userEvent.type(screen.getByLabelText(/name/i), 'A');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(await screen.findByText(/Name must be 2 or more characters/i)).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    expect(screen.queryByText(/Name must be 2 or more characters/i)).not.toBeInTheDocument();
  });

  it('prevents empty region', async () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(await screen.findByText(/Please, select your region/i)).toBeInTheDocument();
  });

  it('prevents empty picture', async () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(await screen.findByText(/Please, select a picture/i)).toBeInTheDocument();
  });

  it('prevents empty agreement checkbox', async () => {
    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);
    userEvent.type(screen.getByLabelText(/name/i), 'Ab');
    userEvent.click(screen.getByTestId('submit-button'));
    expect(await screen.findByText(/You must agree to the terms/i)).toBeInTheDocument();
  });

  it('Submits correct data', async () => {
    const file = new File(['userpic'], 'userpic.png', { type: 'image/png' });

    render(<CreateUserForm onFormSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Birthday'), { target: { value: '2020-05-12' } });
    userEvent.selectOptions(screen.getByLabelText('Region'), 'Europe');

    const input = screen.getByLabelText('Picture');
    userEvent.upload(input, file);

    fireEvent.click(screen.getByTestId('agree-checkbox'));
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(mockOnSubmit).toBeCalled());
  });
});
