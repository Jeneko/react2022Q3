import { PageHeading } from 'components/PageHeading';
import React from 'react';
import img from './404.gif';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <PageHeading>404</PageHeading>
      <h2>Nothing to&nbsp;be&nbsp;found :(</h2>
      <img className="not-found__image" src={img} alt="Cat on the laptop printing 404" />
    </div>
  );
}

export { NotFound };
