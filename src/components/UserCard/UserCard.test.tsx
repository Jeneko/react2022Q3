import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserCard, UserCardProps } from '../UserCard';

const MOCK_DATA: UserCardProps = {
  name: 'John',
  date: '05-10-2022',
  picture: 'image.png',
  region: 'Europe',
  sex: false,
};

describe('Test UserCard component', () => {
  it('renders UserCard component', () => {
    render(<UserCard {...MOCK_DATA} />);
    expect(screen.getByTestId('user-card')).toBeInTheDocument();
  });

  it('has user name', () => {
    render(<UserCard {...MOCK_DATA} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('has user date', () => {
    render(<UserCard {...MOCK_DATA} />);
    expect(screen.getByText('05-10-2022')).toBeInTheDocument();
  });

  it('has user picture', () => {
    render(<UserCard {...MOCK_DATA} />);
    expect((screen.getByRole('img') as HTMLImageElement).src).toEqual('http://localhost/image.png');
  });

  it('has user region', () => {
    render(<UserCard {...MOCK_DATA} />);
    expect(screen.getByText('Europe')).toBeInTheDocument();
  });

  it('has male sex if sex=false', () => {
    render(<UserCard {...MOCK_DATA} sex={false} />);
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('has female sex if sex=true', () => {
    render(<UserCard {...MOCK_DATA} sex={true} />);
    expect(screen.getByText('female')).toBeInTheDocument();
  });
});
