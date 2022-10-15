const API_URL = 'https://www.flickr.com/services/rest/';
const RES_URL = 'https://live.staticflickr.com';
const API_KEY = '103748fb7aab53c9a957a632d5c8cb12';
const PER_PAGE = '15';

export enum APIMethods {
  search = 'flickr.photos.search',
}

export enum SizeSuffix {
  thumbnail = 's', // 75 px
  small = 'm', // 240 px
  medium = 'c', // 800 px
  large = 'b', // 1024 px
}

export interface FlickrPhotosResponse {
  stat: string;
  code?: string;
  message?: string;
  photos: FlickrPhotos;
}

export interface FlickrPhotos {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: FlickrPhoto[];
}

export interface FlickrPhoto {
  farm: number;
  id: string;
  isfamily: 0 | 1;
  isfriend: 0 | 1;
  ispublic: 0 | 1;
  owner: string;
  secret: string;
  server: string;
  title: string;
  description?: {
    _content: string;
  };
  dateupload?: string;
  ownername?: string;
}

export function getPhotoUrl(server: string, id: string, secret: string): string {
  return `${RES_URL}/${server}/${id}_${secret}_${SizeSuffix.large}.jpg`;
}

export async function flickrPhotoSearch(searchText: string): Promise<FlickrPhoto[]> {
  const url = new URL(API_URL);

  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('per_page', PER_PAGE);
  url.searchParams.append('method', APIMethods.search);
  url.searchParams.append('text', searchText);
  url.searchParams.append('extras', 'description,date_upload,owner_name'); // get additional info: description
  url.searchParams.append('format', 'json'); // get json (will be wrapped in cb)
  url.searchParams.append('nojsoncallback', '1'); // get RAW json (without cb)

  const response = await fetch(url);
  const data = (await response.json()) as FlickrPhotosResponse;
  return data.photos.photo;
}
