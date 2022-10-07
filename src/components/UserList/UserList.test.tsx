import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserList } from '../UserList';
import { UserCardProps } from 'components/UserCard';

const MOCK_DATA: UserCardProps[] = [
  {
    name: 'John',
    date: '05-10-2022',
    picture: 'image-1.png',
    region: 'Europe',
    sex: false,
  },
  {
    name: 'Shiva',
    date: '06-11-2023',
    picture: 'image-2.png',
    region: 'USA',
    sex: true,
  },
];

describe('Test UserList component', () => {
  it('renders UserList component', () => {
    render(<UserList cards={MOCK_DATA} />);
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });
});
