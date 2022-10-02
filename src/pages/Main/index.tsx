import React from 'react';
import { CardsList } from 'components/CardList';
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
        <CardsList />
      </div>
    </div>
  );
}

export { MainPage };
