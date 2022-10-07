import React, { FormEvent, createRef } from 'react';
import { UserCardProps } from 'components/UserCard';
import {
  CreateUserFormProps,
  CreateUserFormState,
  ErrorText,
  SuccessText,
} from './CreateUserForm.types';
import './CreateUserForm.css';

const SUCCESS_TIMEOUT_MS = 5000;

class CreateUserForm extends React.Component<CreateUserFormProps, CreateUserFormState> {
  inputSex: React.RefObject<HTMLInputElement>;
  inputName: React.RefObject<HTMLInputElement>;
  inputDate: React.RefObject<HTMLInputElement>;
  inputPicture: React.RefObject<HTMLInputElement>;
  selectRegion: React.RefObject<HTMLSelectElement>;
  checkboxAgree: React.RefObject<HTMLInputElement>;

  constructor(props: CreateUserFormProps) {
    super(props);

    this.state = {
      submitDisabled: true,
      showSuccess: false,
      errorsQty: 0,
      error: {},
    };

    this.inputSex = createRef<HTMLInputElement>();
    this.inputName = createRef<HTMLInputElement>();
    this.inputDate = createRef<HTMLInputElement>();
    this.inputPicture = createRef<HTMLInputElement>();
    this.selectRegion = createRef<HTMLSelectElement>();
    this.checkboxAgree = createRef<HTMLInputElement>();

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(e: FormEvent): void {
    const fieldName = (e.target as HTMLInputElement).name;
    const newState = { ...this.state };

    if (newState.error[fieldName]) {
      delete newState.error[fieldName];
      newState.errorsQty -= 1;
    }

    newState.submitDisabled = newState.errorsQty !== 0;

    this.setState(newState);
  }

  validateForm(): boolean {
    const newState = { ...this.state };

    newState.error = {};
    newState.errorsQty = 0;

    if (this.inputName.current && this.inputName.current.value.length < 2) {
      newState.error.name = ErrorText.Name;
      newState.errorsQty += 1;
    }

    if (this.inputDate.current && this.inputDate.current.value === '') {
      newState.error.date = ErrorText.Date;
      newState.errorsQty += 1;
    }

    if (this.selectRegion.current && this.selectRegion.current.value === '') {
      newState.error.region = ErrorText.Region;
      newState.errorsQty += 1;
    }

    if (this.inputPicture.current && !this.inputPicture.current.files?.length) {
      newState.error.picture = ErrorText.Picture;
      newState.errorsQty += 1;
    }

    if (this.checkboxAgree.current && this.checkboxAgree.current.checked === false) {
      newState.error.agree = ErrorText.Agree;
      newState.errorsQty += 1;
    }

    newState.submitDisabled = newState.errorsQty !== 0;
    this.setState(newState);

    return newState.errorsQty === 0;
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (this.validateForm()) {
      const inputPicture = this.inputPicture.current as HTMLInputElement;
      const pictureFile = (inputPicture.files as FileList)[0];
      const picture = URL.createObjectURL(pictureFile);

      const card: UserCardProps = {
        sex: (this.inputSex.current as HTMLInputElement).checked,
        name: (this.inputName.current as HTMLInputElement).value,
        date: (this.inputDate.current as HTMLInputElement).value,
        region: (this.selectRegion.current as HTMLSelectElement).value,
        picture,
      };

      this.props.onFormSubmit(card);
      this.resetForm();

      this.setState({ submitDisabled: true, showSuccess: true });
      setTimeout(() => this.setState({ showSuccess: false }), SUCCESS_TIMEOUT_MS);
    }
  }

  resetForm(): void {
    (this.inputSex.current as HTMLInputElement).checked = false;
    (this.inputName.current as HTMLInputElement).value = '';
    (this.inputDate.current as HTMLInputElement).value = '';
    (this.inputPicture.current as HTMLInputElement).value = '';
    (this.selectRegion.current as HTMLSelectElement).value = '';
    (this.checkboxAgree.current as HTMLInputElement).checked = false;
  }

  render() {
    return (
      <form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className="card-form"
        data-testid="create-user-form"
      >
        <h2 className="card-form__heading">Create New&nbsp;User</h2>
        <div className="card-form__control">
          <label className="card-form__label" htmlFor="card-form-name">
            Name
          </label>
          <input
            type="text"
            name="name"
            ref={this.inputName}
            id="card-form-name"
            className="card-form__input"
            placeholder="Enter your name"
          />
          {this.state.error.name && <div className="card-form__error">{this.state.error.name}</div>}
        </div>
        <div className="card-form__control">
          <label className="card-form__label" htmlFor="card-form-date">
            Birthday
          </label>
          <input
            type="date"
            name="date"
            ref={this.inputDate}
            id="card-form-date"
            className="card-form__input"
          />
          {this.state.error.date && <div className="card-form__error">{this.state.error.date}</div>}
        </div>
        <div className="card-form__control">
          <label className="card-form__label" htmlFor="card-form-region">
            Region
          </label>
          <select
            name="region"
            ref={this.selectRegion}
            defaultValue=""
            id="card-form-region"
            className="card-form__select"
          >
            <option value="" disabled>
              Choose your region
            </option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
          </select>
          {this.state.error.region && (
            <div className="card-form__error">{this.state.error.region}</div>
          )}
        </div>
        <div className="card-form__control">
          <label className="card-form__label" htmlFor="card-form-picture">
            Picture
          </label>
          <input
            type="file"
            name="picture"
            ref={this.inputPicture}
            accept="image/png, image/jpeg"
            id="card-form-picture"
            className="card-form__input"
          />
          {this.state.error.picture && (
            <div className="card-form__error">{this.state.error.picture}</div>
          )}
        </div>
        <div className="card-form__control card-form__control--no-error">
          Male
          <label className="card-form__label" htmlFor="card-form-sex">
            <input
              type="checkbox"
              name="sex"
              ref={this.inputSex}
              id="card-form-sex"
              className="card-form__toggle-checkbox"
              data-testid="sex-checkbox"
            />
            <span className="card-form__toggle"></span>
          </label>
          Female
        </div>
        <div className="card-form__control">
          <label className="card-form__label card-form__label--checkbox">
            <input
              type="checkbox"
              name="agree"
              ref={this.checkboxAgree}
              className="card-form__checkbox"
              data-testid="agree-checkbox"
            />
            I agree&nbsp;to the&nbsp;terms
          </label>
          {this.state.error.agree && (
            <div className="card-form__error">{this.state.error.agree}</div>
          )}
        </div>
        <div className="card-form__control">
          <button
            className="card-form__submit"
            disabled={this.state.submitDisabled}
            data-testid="submit-button"
          >
            Submit
          </button>
          {this.state.showSuccess && (
            <div className="card-form__success">{SuccessText.UserCreated}</div>
          )}
        </div>
      </form>
    );
  }
}

export { CreateUserForm };
