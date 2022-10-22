import React, { useState } from 'react';
import { UserCardProps } from 'components/UserCard';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  CreateUserFormProps,
  ErrorText,
  SuccessText,
  Region,
  FormInput,
} from './CreateUserForm.types';
import './CreateUserForm.css';

const SUCCESS_TIMEOUT_MS = 5000;

function hasError(errors: object): boolean {
  return Object.keys(errors).length !== 0;
}

function CreateUserForm(props: CreateUserFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<FormInput>({ reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const pictureFile = data.picture[0];
    const picture = URL.createObjectURL(pictureFile);

    const card: UserCardProps = {
      sex: data.sex,
      name: data.name,
      date: data.date,
      region: data.region,
      picture,
    };

    props.onFormSubmit(card);
    reset();

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), SUCCESS_TIMEOUT_MS);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-form" data-testid="create-user-form">
      <h2 className="card-form__heading">Create New&nbsp;User</h2>
      <div className="card-form__control">
        <label className="card-form__label" htmlFor="card-form-name">
          Name
        </label>
        <input
          type="text"
          id="card-form-name"
          className="card-form__input"
          placeholder="Enter your name"
          {...register('name', {
            required: true,
            minLength: { value: 2, message: ErrorText.Name },
            onChange: () => clearErrors('name'),
          })}
        />
        {errors.name && <div className="card-form__error">{ErrorText.Name}</div>}
      </div>
      <div className="card-form__control">
        <label className="card-form__label" htmlFor="card-form-date">
          Birthday
        </label>
        <input
          type="date"
          id="card-form-date"
          className="card-form__input"
          {...register('date', { required: true, onChange: () => clearErrors('date') })}
        />
        {errors.date && <div className="card-form__error">{ErrorText.Date}</div>}
      </div>
      <div className="card-form__control">
        <label className="card-form__label" htmlFor="card-form-region">
          Region
        </label>
        <select
          defaultValue=""
          id="card-form-region"
          className="card-form__select"
          {...register('region', { required: true, onChange: () => clearErrors('region') })}
        >
          <option value="" disabled>
            Choose your region
          </option>
          <option value={Region.usa}>{Region.usa}</option>
          <option value={Region.europe}>{Region.europe}</option>
          <option value={Region.asia}>{Region.asia}</option>
        </select>
        {errors.region && <div className="card-form__error">{ErrorText.Region}</div>}
      </div>
      <div className="card-form__control">
        <label className="card-form__label" htmlFor="card-form-picture">
          Picture
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="card-form-picture"
          className="card-form__input"
          {...register('picture', {
            validate: async (filelist: FileList) => filelist?.length > 0,
            onChange: () => clearErrors('picture'),
          })}
        />
        {errors.picture && <div className="card-form__error">{ErrorText.Picture}</div>}
      </div>
      <div className="card-form__control card-form__control--no-error">
        Male
        <label className="card-form__label" htmlFor="card-form-sex">
          <input
            type="checkbox"
            id="card-form-sex"
            className="card-form__toggle-checkbox"
            data-testid="sex-checkbox"
            {...register('sex')}
          />
          <span className="card-form__toggle"></span>
        </label>
        Female
      </div>
      <div className="card-form__control">
        <label className="card-form__label card-form__label--checkbox">
          <input
            type="checkbox"
            className="card-form__checkbox"
            data-testid="agree-checkbox"
            {...register('agree', {
              required: true,
              onChange: () => clearErrors('agree'),
            })}
          />
          I agree&nbsp;to the&nbsp;terms
        </label>
        {errors.agree && <div className="card-form__error">{ErrorText.Agree}</div>}
      </div>
      <div className="card-form__control">
        <button
          className="card-form__submit"
          disabled={!isDirty || hasError(errors)}
          data-testid="submit-button"
        >
          Submit
        </button>
        {showSuccess && <div className="card-form__success">{SuccessText.UserCreated}</div>}
      </div>
    </form>
  );
}

export { CreateUserForm };
