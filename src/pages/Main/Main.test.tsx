import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MainPage } from '../Main';
import { searchText, mockData } from 'mocks/mockData';

describe('Test MainPage component', () => {
  it('renders MainPage component', () => {
    render(<MainPage />);
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });

  it('searches photos', async () => {
    render(<MainPage />);
    userEvent.type(screen.getByPlaceholderText(/Search\.\.\./i), `${searchText}{enter}`);
    expect(await screen.findByText(mockData.photos.photo[0].title)).toBeInTheDocument();
  });

  it('gets photos and then clears search', async () => {
    render(<MainPage />);
    userEvent.type(screen.getByPlaceholderText(/Search\.\.\./i), `${searchText}{enter}`);
    expect(await screen.findByText(mockData.photos.photo[0].title)).toBeInTheDocument();
    userEvent.clear(screen.getByPlaceholderText(/Search\.\.\./i));
    expect(screen.queryByText(mockData.photos.photo[0].title)).not.toBeInTheDocument();
  });

  it('shows modal by clicking on button (with additional info - ownername)', async () => {
    render(<MainPage />);
    userEvent.type(screen.getByPlaceholderText(/Search\.\.\./i), `${searchText}{enter}`);
    userEvent.click((await screen.findAllByText(/More info/i))[0]);
    expect(
      await screen.findByText(mockData.photos.photo[0].ownername as string)
    ).toBeInTheDocument();
  });

  it('shows modal by clicking on image (with additional info - ownername)', async () => {
    render(<MainPage />);
    userEvent.type(screen.getByPlaceholderText(/Search\.\.\./i), `${searchText}{enter}`);
    userEvent.click((await screen.findAllByTestId(/flickr-card__img/i))[0]);
    expect(
      await screen.findByText(mockData.photos.photo[0].ownername as string)
    ).toBeInTheDocument();
  });

  it('closes modal', async () => {
    render(<MainPage />);
    userEvent.type(screen.getByPlaceholderText(/Search\.\.\./i), `${searchText}{enter}`);
    userEvent.click((await screen.findAllByText(/More info/i))[0]);
    userEvent.click(screen.getByTestId(/close-modal/i));
    expect(screen.queryByTestId(/modal-component/i)).not.toBeInTheDocument();
  });
});
