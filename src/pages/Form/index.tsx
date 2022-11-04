import React, { useContext } from 'react';
import { AppContext } from 'state';
import { ActionType } from 'state/reducers';
import { PageHeading } from 'components/PageHeading';
import { CreateUserForm } from 'components/CreateUserForm';
import { UserList } from 'components/UserList';
import { UserCardProps } from 'components/UserCard';
import './Form.css';

function FormPage() {
  const { state, dispatch } = useContext(AppContext);
  const cards = state.userCards;

  function addFormCard(card: UserCardProps) {
    dispatch({ type: ActionType.AddUserCard, payload: [card] });
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
