import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__content">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>
            <a href="/">hacker1db</a>
          </span>
          <span>hacker1db.dev</span>
          <span>
            <a href="/rss.xml" target="_blank" title="rss">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-rss"
              >
                <path d="M4 11a9 9 0 0 1 9 9"></path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>
                <circle cx="5" cy="19" r="1"></circle>
              </svg>
            </a>
          </span>
          <a href="https://newsletter.hacker1db.dev/">news letter</a>
        </div>
      </div>
      <div className="footer__inner">
        <div className="footer__content">
          <span>
            Powered by <a href="http://gohugo.io">Hugo</a>
          </span>
          <span>
            Made with &#10084; by <a href="https://github.com/hacker1db">hacker1db</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
