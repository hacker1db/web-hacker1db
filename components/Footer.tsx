import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__content">
          <span>&copy; {new Date().getFullYear()}</span>
          <span><a href="/">hacker1db.dev</a></span>
          <span>Powered by <a href="https://nextjs.org/">Next.js</a></span>
          <span>Made with &#10084; by <a href="https://github.com/hacker1db">hacker1db</a></span>
          <a href="https://newsletter.hacker1db.dev/">news letter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
