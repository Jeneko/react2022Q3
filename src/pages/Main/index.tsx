import React from 'react';
import { PageHeading } from 'components/PageHeading';
import { Search } from 'components/Search';

function MainPage() {
  return (
    <div className="main">
      <div className="container">
        <PageHeading>Main Page</PageHeading>
      </div>
      <Search />
      <div className="container">
        <h2>Card List</h2>
      </div>
    </div>
  );
}

export { MainPage };
