import React, { useState } from 'react';
import { Button, ButtonType, ButtonIcon } from 'components/Button';
import './Card.css';

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function Card(props: ProductProps) {
  const [like, setLike] = useState(0);
  const [fav, setFav] = useState(false);

  function handleLike() {
    setLike(like + 1);
  }

  function handleFav() {
    setFav(!fav);
  }

  let cardClass = 'card';

  if (fav) {
    cardClass += ' card--fav';
  }

  return (
    <article className={cardClass}>
      <h3 className="card__title" title={props.title}>
        {props.title}
      </h3>
      <img className="card__img" src={props.image} alt={props.title} />
      <div className="card__buttons">
        <Button
          text="Like"
          type={ButtonType.default}
          icon={ButtonIcon.like}
          counter={like}
          onClick={handleLike}
          title="Add like"
        />
        <Button
          selected={fav}
          type={ButtonType.transparent}
          onClick={handleFav}
          icon={ButtonIcon.fav}
          title="Favourite"
        />
      </div>
      <p className="card__desc">{props.description}</p>
    </article>
  );
}

export { Card };
