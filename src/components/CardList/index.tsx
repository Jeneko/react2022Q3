import React from 'react';
import { FlickrCard } from '../FlickrCard';
import { FlickrPhoto } from 'API/flickr';
import './CardList.css';

interface CardsListProps {
  cards: FlickrPhoto[];
  onShowMore: (id: string) => void;
}

function CardsList(props: CardsListProps) {
  const photos = props.cards;

  return (
    <div className="card-list">
      {photos.map((photo) => (
        <FlickrCard {...photo} key={photo.id} onShowMore={props.onShowMore} />
      ))}
    </div>
  );
}

export { CardsList };
