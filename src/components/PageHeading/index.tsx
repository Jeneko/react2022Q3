import React from 'react';
import './PageHeading.css';

interface PageHeadingsProps {
  children: string;
}

function PageHeading(props: PageHeadingsProps) {
  return <h1 className="page-heading">{props.children}</h1>;
}

export { PageHeading };
