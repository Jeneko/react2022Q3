import React from 'react';
import { FlickrPhoto, getPhotoUrl } from 'API/flickr';
import './FlickrFullInfo.css';

class FlickrFullInfo extends React.Component<FlickrPhoto> {
  render() {
    const { server, id, secret, title } = this.props;
    const imgUrl = getPhotoUrl(server, id, secret);
    const owner = this.props.ownername ? this.props.ownername : '';
    const date = this.props.dateupload ? new Date(Number(this.props.dateupload)) : '';
    const content = this.props.description?._content ? this.props.description?._content : '';

    return (
      <div className="flickr-full-info">
        <h3 className="flickr-full-info__title">{title}</h3>
        <img className="flickr-full-info__img" src={imgUrl} alt={title} />

        {content && (
          <div
            className="flickr-full-info__desc"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}

        {(owner || date) && (
          <div className="flickr-full-info__addition">
            {owner && (
              <div className="flickr-full-info__owner">
                <b>Owner: </b>
                <span>{owner}</span>
              </div>
            )}

            {date && (
              <div className="flickr-full-info__date">
                <b>Uploaded: </b>
                <span>{date.toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export { FlickrFullInfo };
