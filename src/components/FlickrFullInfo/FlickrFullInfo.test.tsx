import React from 'react';
import { render, screen } from '@testing-library/react';
import { FlickrFullInfo } from '../FlickrFullInfo';
import { mockData } from 'mocks/mockData';

const flickrPhotoData = mockData.photos.photo[0];

describe('Test FlickrFullInfo component', () => {
  it('renders FlickrFullInfo component', () => {
    const mockData = { ...flickrPhotoData };
    render(<FlickrFullInfo {...mockData} />);
    expect(screen.getByText(flickrPhotoData.title)).toBeInTheDocument();
  });

  it("doesn't render empty owner", () => {
    const mockData = { ...flickrPhotoData };
    mockData.ownername = '';
    render(<FlickrFullInfo {...mockData} />);
    expect(screen.queryByTestId(/owner/i)).not.toBeInTheDocument();
  });

  it("doesn't render empty date", () => {
    const mockData = { ...flickrPhotoData };
    mockData.dateupload = '';
    render(<FlickrFullInfo {...mockData} />);
    expect(screen.queryByTestId(/date/i)).not.toBeInTheDocument();
  });

  it("doesn't render empty description", () => {
    const mockData = { ...flickrPhotoData };
    mockData.description!._content = '';
    render(<FlickrFullInfo {...mockData} />);
    expect(screen.queryByTestId(/desc/i)).not.toBeInTheDocument();
  });
});
