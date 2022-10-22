import { UserCardProps } from 'components/UserCard';

export enum Region {
  usa = 'USA',
  europe = 'Europe',
  asia = 'Asia',
}

export enum ErrorText {
  Name = 'Name must be 2 or more characters',
  Date = 'Please, pick your birthday',
  Agree = 'You must agree to the terms',
  Region = 'Please, select your region',
  Picture = 'Please, select a picture',
}

export enum SuccessText {
  UserCreated = 'Success: user created',
}

export interface CreateUserFormProps {
  onFormSubmit: (card: UserCardProps) => void;
}

export interface CreateUserFormState {
  submitDisabled: boolean;
  showSuccess: boolean;
  errorsQty: number;
  error: { [k: string]: string };
}

export interface FormInput {
  name: string;
  date: string;
  region: Region;
  picture: FileList;
  sex: boolean;
  agree: boolean;
}
