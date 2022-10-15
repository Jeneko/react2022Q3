import React from 'react';
import { FlickrCard } from '../FlickrCard';
import { FlickrPhoto } from 'API/flickr';
import './CardList.css';

interface CardsListProps {
  cards: FlickrPhoto[];
  onShowMore: (id: string) => void;
}

class CardsList extends React.Component<CardsListProps> {
  render() {
    const photos = this.props.cards;

    return (
      <div className="card-list">
        {photos.map((photo) => (
          <FlickrCard {...photo} key={photo.id} onShowMore={this.props.onShowMore} />
        ))}
      </div>
    );
  }
}

export { CardsList };
