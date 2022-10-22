import React from 'react';
import { UserCard, UserCardProps } from 'components/UserCard';
import './UserList.css';

interface UserListProps {
  cards: UserCardProps[];
}

function UserList(props: UserListProps) {
  return (
    <div className="form-card-list" data-testid="user-list">
      {props.cards.map((card, i) => (
        <UserCard {...card} key={i} />
      ))}
    </div>
  );
}

export { UserList };
