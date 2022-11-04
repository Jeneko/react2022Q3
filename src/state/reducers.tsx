import { FlickrPhoto } from 'API/flickr';
import { UserCardProps } from 'components/UserCard';

export type Action<T> = {
  type: ActionType;
  payload: T;
};

export type Reducer<T> = (state: T, action: Action<T>) => T;

export enum ActionType {
  SetSearchReq = 'SET_SEARCH_REQ',
  SetSearchRes = 'SET_SEARCH_RES',
  AddUserCard = 'ADD_USER_CARD',
}

export const searchRequestReducer: Reducer<string> = (state, action) => {
  switch (action.type) {
    case ActionType.SetSearchReq:
      return action.payload;
    default:
      return state;
  }
};

export const searchResultReducer: Reducer<FlickrPhoto[]> = (state, action) => {
  switch (action.type) {
    case ActionType.SetSearchRes:
      return action.payload;
    default:
      return state;
  }
};

export const userCardsReducer: Reducer<UserCardProps[]> = (state, action) => {
  switch (action.type) {
    case ActionType.AddUserCard:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
