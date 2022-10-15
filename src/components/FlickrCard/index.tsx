import React from 'react';
import { Button, ButtonType } from 'components/Button';
import { FlickrPhoto, getPhotoUrl } from 'API/flickr';
import './FlickrCard.css';

interface FlickrCardProps extends FlickrPhoto {
  onShowMore: (id: string) => void;
}

class FlickrCard extends React.Component<FlickrCardProps> {
  constructor(props: FlickrCardProps) {
    super(props);
  }

  render() {
    const { server, id, secret, title } = this.props;
    const cardClass = 'flickr-card';
    const imgUrl = getPhotoUrl(server, id, secret);

    return (
      <article className={cardClass}>
        <div className="flickr-card__img-container" title="More info">
          <img
            className="flickr-card__img"
            src={imgUrl}
            alt={title}
            onClick={() => this.props.onShowMore(id)}
          />
        </div>

        <h3 className="flickr-card__title" title={title}>
          {title}
        </h3>

        <div className="flickr-card__buttons">
          <Button
            text="More info"
            title="More info"
            type={ButtonType.primary}
            onClick={() => this.props.onShowMore(id)}
          />
        </div>
      </article>
    );
  }
}

export { FlickrCard };
