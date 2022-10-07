import React from 'react';
import { PageHeading } from 'components/PageHeading';
import { CreateUserForm } from 'components/CreateUserForm';
import { UserList } from 'components/UserList';
import { UserCardProps } from 'components/UserCard';
import './Form.css';

interface FormPageState {
  cards: UserCardProps[];
}

class FormPage extends React.Component<object, FormPageState> {
  constructor(props: object) {
    super(props);
    this.state = { cards: [] };
    this.addFormCard = this.addFormCard.bind(this);
  }

  addFormCard(card: UserCardProps) {
    this.setState({ cards: [...this.state.cards, card] });
  }

  render() {
    return (
      <div className="form-page container" data-testid="form-page">
        <PageHeading>Form Page</PageHeading>
        <div className="form-page__content">
          <div className="form-page__form">
            <CreateUserForm onFormSubmit={this.addFormCard} />
          </div>
          <div className="form-page__list">
            <h2 className="form-page__list-heading">User List</h2>
            {Boolean(this.state.cards.length) ? (
              <UserList cards={this.state.cards} />
            ) : (
              <p>Create new user to show in the list</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export { FormPage };
