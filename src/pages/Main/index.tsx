import React from 'react';
import { Spinner } from 'components/Spinner';
import { CardsList } from 'components/CardList';
import { PageHeading } from 'components/PageHeading';
import { Search, LOCAL_STORAGE_KEY } from 'components/Search';
import { FlickrPhoto, flickrPhotoSearch } from 'API/flickr';
import { FlickrFullInfo } from 'components/FlickrFullInfo';
import { Modal } from 'components/Modal';

interface MainPageState {
  photos: FlickrPhoto[];
  fullInfoPhotoId: string;
  showLoading: boolean;
  showModal: boolean;
}

class MainPage extends React.Component<object, MainPageState> {
  constructor(props: object) {
    super(props);
    this.state = { photos: [], showLoading: false, showModal: false, fullInfoPhotoId: '' };
    this.updatePhotos = this.updatePhotos.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const search = localStorage.getItem(LOCAL_STORAGE_KEY) || '';
    this.updatePhotos(search);
  }

  async updatePhotos(search: string): Promise<void> {
    if (!search) {
      this.setState({ photos: [], showLoading: false });
      return;
    }

    this.setState({ showLoading: true });
    const photos = await flickrPhotoSearch(search);
    this.setState({ photos, showLoading: false });
  }

  getPhotoById(id: string): FlickrPhoto | undefined {
    return this.state.photos.find((photo) => photo.id === id);
  }

  render() {
    let selectedPhoto;

    if (this.state.showModal && this.state.fullInfoPhotoId) {
      selectedPhoto = this.getPhotoById(this.state.fullInfoPhotoId);
    }

    return (
      <div className="main">
        {this.state.showModal && selectedPhoto && (
          <Modal onClose={() => this.setState({ showModal: false })}>
            <FlickrFullInfo {...selectedPhoto} />
          </Modal>
        )}

        {this.state.showLoading && <Spinner />}

        <div className="container">
          <PageHeading>Main Page</PageHeading>
        </div>

        <Search onEnter={this.updatePhotos} />

        <div className="container">
          <CardsList
            cards={this.state.photos}
            onShowMore={(photoId: string) => {
              this.setState({ fullInfoPhotoId: photoId, showModal: true });
            }}
          />
        </div>

        {!this.state.photos.length && (
          <p style={{ textAlign: 'center' }}>
            Please, enter your <b>search request</b> in the&nbsp;field above
          </p>
        )}
      </div>
    );
  }
}

export { MainPage };
