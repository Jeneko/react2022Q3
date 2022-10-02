import React from 'react';
import { Card, ProductProps } from '../Card';
import { Spinner } from '../Spinner';
import json from 'data/products.json';
import './CardList.css';

interface CardsListState {
  products: ProductProps[];
}

class CardsList extends React.Component<object, CardsListState> {
  constructor(props: object) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount(): void {
    this.setState({ products: json });
  }

  render() {
    const products = this.state.products;

    return (
      <>
        <ul className="card-list">
          {products.map((product) => (
            <Card {...product} key={product.id} />
          ))}
        </ul>
        {!products.length && <Spinner />}
      </>
    );
  }
}

export { CardsList };
