import React from 'react';
import spinnerUrl from './spinner.svg';
import './Spinner.css';

function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__content">
        <img className="spinner__circle" src={spinnerUrl} width="132" height="132" title="" />
        <div className="spinner__text">Loading...</div>
      </div>
    </div>
  );
}

export { Spinner };
