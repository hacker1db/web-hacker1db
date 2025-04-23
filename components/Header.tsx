import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <span className="header__inner">
        <Link href="/">
          <a className="logo">
            <img src="/images/logo.png" alt="Logo" className="logo__mark" />
            <span className="logo__text">hacker1db</span>
          </a>
        </Link>

        <span className="header__right">
          <nav className="menu">
            <ul className="menu__inner">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/posts">
                  <a>Posts</a>
                </Link>
              </li>
            </ul>
          </nav>
          <span className="menu-trigger">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </span>
        </span>
      </span>
    </header>
  );
};

export default Header;
