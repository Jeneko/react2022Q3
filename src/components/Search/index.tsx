import React, { ChangeEvent, KeyboardEvent } from 'react';
import './Search.css';

export const LOCAL_STORAGE_KEY = 'searchValue';

interface SearchProps {
  onEnter: (value: string) => void;
}

interface SearchState {
  value: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { value: localStorage.getItem(LOCAL_STORAGE_KEY) || '' };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
  }

  componentWillUnmount(): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, this.state.value);
  }

  onKeyDownHandler(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const trimmedValue = this.state.value.trim();
      localStorage.setItem(LOCAL_STORAGE_KEY, trimmedValue);
      this.setState({ value: trimmedValue });
      this.props.onEnter(trimmedValue);
    }
  }

  onChangeHandler(e: ChangeEvent): void {
    const target = e.target as HTMLInputElement;
    this.setState({ value: target.value });

    if (target.value.trim() === '') {
      this.props.onEnter('');
    }
  }

  render() {
    return (
      <div className="search-container">
        <div className="search">
          <input
            type="search"
            className="search__input"
            onChange={this.onChangeHandler}
            onKeyDown={this.onKeyDownHandler}
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
