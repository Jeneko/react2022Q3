import React from 'react';
import { render, screen } from '@testing-library/react';
import { FlickrCard } from '../FlickrCard';
import { mockData } from 'mocks/mockData';

const flickrPhotoData = mockData.photos.photo[0];

describe('Test FlickrCard component', () => {
  it('renders FlickrCard component', () => {
    const mockData = { ...flickrPhotoData };
    render(<FlickrCard {...mockData} onShowMore={jest.fn} />);
    expect(screen.getByText(flickrPhotoData.title)).toBeInTheDocument();
  });
});
