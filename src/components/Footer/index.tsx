import React from 'react';
import './Footer.css';
import github from './github-logo.svg';
import rsschool from './rsschool-logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <a
            className="footer__github-link"
            href="https://github.com/Jeneko"
            target="_blank"
            rel="noreferrer"
            title="My Github"
          >
            <img src={github} alt="Github Logo" />
          </a>
          <div className="footer__copyright">{new Date().getFullYear()} ©</div>
          <a
            className="footer__rsschool-link"
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
            title="RS School React Course"
          >
            <img src={rsschool} alt="RS School Logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
