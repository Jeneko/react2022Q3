import React from 'react';
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

export interface ProductState {
  like: number;
  fav: boolean;
}

class Card extends React.Component<ProductProps, ProductState> {
  constructor(props: ProductProps) {
    super(props);
    this.state = { like: 0, fav: false };
    this.handleLike = this.handleLike.bind(this);
    this.handleFav = this.handleFav.bind(this);
  }

  handleLike() {
    this.setState((state) => ({
      like: state.like + 1,
    }));
  }

  handleFav() {
    this.setState((state) => ({
      fav: !state.fav,
    }));
  }

  render() {
    let cardClass = 'card';

    if (this.state.fav) {
      cardClass += ' card--fav';
    }

    return (
      <article className={cardClass}>
        <h3 className="card__title" title={this.props.title}>
          {this.props.title}
        </h3>
        <img className="card__img" src={this.props.image} alt={this.props.title} />
        <div className="card__buttons">
          <Button
            text="Like"
            type={ButtonType.default}
            icon={ButtonIcon.like}
            counter={this.state.like}
            onClick={this.handleLike}
            title="Add like"
          />
          <Button
            selected={this.state.fav}
            type={ButtonType.transparent}
            onClick={this.handleFav}
            icon={ButtonIcon.fav}
            title="Favourite"
          />
        </div>
        <p className="card__desc">{this.props.description}</p>
      </article>
    );
  }
}

export { Card };
