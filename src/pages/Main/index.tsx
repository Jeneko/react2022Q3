import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from 'state';
import { ActionType } from 'state/reducers';
import { Spinner } from 'components/Spinner';
import { CardsList } from 'components/CardList';
import { PageHeading } from 'components/PageHeading';
import { Search, LOCAL_STORAGE_KEY } from 'components/Search';
import { FlickrPhoto, flickrPhotoSearch } from 'API/flickr';
import { FlickrFullInfo } from 'components/FlickrFullInfo';
import { Modal } from 'components/Modal';

function MainPage() {
  const { state, dispatch } = useContext(AppContext);
  const photos = state.searchResult;

  const [showLoading, setShowLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fullInfoPhotoId, setFullInfoPhotoId] = useState('');

  useEffect(() => {
    const search = localStorage.getItem(LOCAL_STORAGE_KEY) || '';
    updatePhotos(search);
  }, []);

  function setSearchRequest(searchRequest: string): void {
    dispatch({ type: ActionType.SetSearchReq, payload: searchRequest });
  }

  function setSearchResults(photos: FlickrPhoto[]): void {
    dispatch({ type: ActionType.SetSearchRes, payload: photos });
  }

  async function updatePhotos(search: string): Promise<void> {
    if (!search) {
      setSearchResults([]);
      setShowLoading(false);
      return;
    }

    if (state.searchRequest === search) {
      return;
    }

    setShowLoading(true);
    const curPhotos = await flickrPhotoSearch(search);
    setSearchResults(curPhotos);
    setSearchRequest(search);
    setShowLoading(false);
  }

  function getPhotoById(id: string): FlickrPhoto | undefined {
    return photos.find((photo) => photo.id === id);
  }

  let selectedPhoto;

  if (showModal && fullInfoPhotoId) {
    selectedPhoto = getPhotoById(fullInfoPhotoId);
  }

  return (
    <div className="main">
      {showModal && selectedPhoto && (
        <Modal onClose={() => setShowModal(false)}>
          <FlickrFullInfo {...selectedPhoto} />
        </Modal>
      )}

      {showLoading && <Spinner />}

      <div className="container">
        <PageHeading>Main Page</PageHeading>
      </div>

      <Search onEnter={updatePhotos} />

      <div className="container">
        <CardsList
          cards={photos}
          onShowMore={(photoId: string) => {
            setFullInfoPhotoId(photoId);
            setShowModal(true);
          }}
        />
      </div>

      {!photos.length && (
        <p style={{ textAlign: 'center' }}>
          Please, enter your <b>search request</b> in the&nbsp;field above
        </p>
      )}
    </div>
  );
}

export { MainPage };
