import { rest } from 'msw';
import { API_URL, API_KEY, PER_PAGE, APIMethods } from 'API/flickr';
import { mockData, searchText } from './mockData';

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    req.url.searchParams.append('api_key', API_KEY);
    req.url.searchParams.append('per_page', PER_PAGE);
    req.url.searchParams.append('method', APIMethods.search);
    req.url.searchParams.append('text', searchText);
    req.url.searchParams.append('extras', 'description,date_upload,owner_name'); // get additional info: description
    req.url.searchParams.append('format', 'json'); // get json (will be wrapped in cb)
    req.url.searchParams.append('nojsoncallback', '1'); // get RAW json (without cb)
    return res(ctx.status(200), ctx.json(mockData));
  }),
];
