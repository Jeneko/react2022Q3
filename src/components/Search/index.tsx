import React, { ChangeEvent } from 'react';
import './Search.css';

export const LOCAL_STORAGE_KEY = 'searchValue';

interface SearchState {
  value: string;
}

class Search extends React.Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = { value: localStorage.getItem(LOCAL_STORAGE_KEY) || '' };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentWillUnmount(): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, this.state.value);
  }

  onChangeHandler(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    this.setState({ value: target.value });
  }

  render() {
    return (
      <div className="search-container">
        <div className="search">
          <input
            type="search"
            className="search__input"
            onChange={this.onChangeHandler}
            placeholder="Search..."
            value={this.state.value}
          />
          <div className="search__icon"></div>
        </div>
      </div>
    );
  }
}

export { Search };
