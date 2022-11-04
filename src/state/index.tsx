import React from 'react';
import { Action, searchRequestReducer, searchResultReducer, userCardsReducer } from './reducers';
import { FlickrPhoto } from 'API/flickr';
import { UserCardProps } from 'components/UserCard';

interface State {
  searchRequest: string;
  searchResult: FlickrPhoto[];
  userCards: UserCardProps[];
}

interface Context {
  state: State;
  dispatch: React.Dispatch<unknown>;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const INITIAL_STATE: State = {
  searchRequest: '',
  searchResult: [],
  userCards: [],
};

const AppContext = React.createContext<Context>({ state: INITIAL_STATE, dispatch: () => {} });
AppContext.displayName = 'State Context';

const mainReducer = ({ searchResult, searchRequest, userCards }: State, action: unknown) => ({
  searchRequest: searchRequestReducer(searchRequest, action as Action<string>),
  searchResult: searchResultReducer(searchResult, action as Action<FlickrPhoto[]>),
  userCards: userCardsReducer(userCards, action as Action<UserCardProps[]>),
});

const AppProvider: React.FC<AppProviderProps> = function ({ children }) {
  const [state, dispatch] = React.useReducer(mainReducer, INITIAL_STATE);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
