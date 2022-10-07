import React from 'react';
import { UserCard, UserCardProps } from 'components/UserCard';
import './UserList.css';

interface UserListProps {
  cards: UserCardProps[];
}

class UserList extends React.Component<UserListProps> {
  render() {
    return (
      <div className="form-card-list" data-testid="user-list">
        {this.props.cards.map((card, i) => (
          <UserCard {...card} key={i} />
        ))}
      </div>
    );
  }
}

export { UserList };
