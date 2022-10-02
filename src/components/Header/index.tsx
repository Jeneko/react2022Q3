import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <NavLink to="/">Main</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </header>
  );
}

export { Header };
