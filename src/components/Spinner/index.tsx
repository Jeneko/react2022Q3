import React from 'react';
import './Spinner.css';

function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__content">
        <div className="spinner__text">Loading...</div>
      </div>
    </div>
  );
}

export { Spinner };
