import React, { useState } from 'react';
import { PageHeading } from 'components/PageHeading';
import { CreateUserForm } from 'components/CreateUserForm';
import { UserList } from 'components/UserList';
import { UserCardProps } from 'components/UserCard';
import './Form.css';

function FormPage() {
  const [cards, setCards] = useState([] as UserCardProps[]);

  function addFormCard(card: UserCardProps) {
    setCards([...cards, card]);
  }

  return (
    <div className="form-page container" data-testid="form-page">
      <PageHeading>Form Page</PageHeading>
      <div className="form-page__content">
        <div className="form-page__form">
          <CreateUserForm onFormSubmit={addFormCard} />
        </div>
        <div className="form-page__list">
          <h2 className="form-page__list-heading">User List</h2>
          {Boolean(cards.length) ? (
            <UserList cards={cards} />
          ) : (
            <p>Create new user to show in the list</p>
          )}
        </div>
      </div>
    </div>
  );
}

export { FormPage };
