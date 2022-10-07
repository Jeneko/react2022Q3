import React from 'react';
import './UserCard.css';

export interface UserCardProps {
  name: string;
  date: string;
  region: string;
  picture: string;
  sex: boolean;
}

function UserCard(card: UserCardProps) {
  return (
    <article className="form-card" data-testid="user-card">
      <h2 className="form-card__name">{card.name}</h2>
      <img className="form-card__picture" src={card.picture} title={card.name} />
      <div className="form-card__birthday">
        <b>Birthday:</b> {card.date}
      </div>
      <div className="form-card__region">
        <b>Region:</b> {card.region}
      </div>
      <div className="form-card__sex">
        <b>Sex:</b> {card.sex ? 'female' : 'male'}
      </div>
    </article>
  );
}

export { UserCard };
