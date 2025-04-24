import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="logo">
          <Link href="/">
            <a>$ cd /home/</a>
          </Link>
        </div>
        <nav className="menu">
          <ul className="menu__inner">
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
            <li><Link href="/posts"><a>Posts</a></Link></li>
            <li><Link href="/tags"><a>Tags</a></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
