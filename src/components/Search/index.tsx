import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './Search.css';

export const LOCAL_STORAGE_KEY = 'searchValue';

interface SearchProps {
  onEnter: (value: string) => void;
}

function Search(props: SearchProps) {
  const [value, setValue] = useState(localStorage.getItem(LOCAL_STORAGE_KEY) || '');

  useEffect(() => () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
  });

  function onKeyDownHandler(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const trimmedValue = value.trim();
      localStorage.setItem(LOCAL_STORAGE_KEY, trimmedValue);
      setValue(trimmedValue);
      props.onEnter(trimmedValue);
    }
  }

  function onChangeHandler(e: ChangeEvent): void {
    const target = e.target as HTMLInputElement;
    setValue(target.value);

    if (target.value.trim() === '') {
      props.onEnter('');
    }
  }

  return (
    <div className="search-container">
      <div className="search">
        <input
          type="search"
          className="search__input"
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          placeholder="Search..."
          value={value}
        />
        <div className="search__icon"></div>
      </div>
    </div>
  );
}

export { Search };
