import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#1a1d21",
        borderBottom: "1px solid #374151",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href={siteConfig.logo.logoHomeLink}
          style={{
            fontFamily: "Monaco, Menlo, Courier New, monospace",
            fontSize: "1.125rem",
            color: "#6FC1FF",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
        >
          <span>{siteConfig.logo.logoText}</span>
          <span
            className="terminal-cursor"
            style={{ color: siteConfig.logo.logoCursorColor }}
          ></span>
        </Link>

        <nav style={{ display: "flex", gap: "1.5rem" }}>
          <Link
            href="/"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            Home
          </Link>
          <Link
            href="/posts"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            Posts
          </Link>
          <Link
            href="/series"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            Series
          </Link>
          <Link
            href="/tags"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            Tags
          </Link>
          <Link
            href="/about"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            About
          </Link>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              transition: "color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            title="RSS Feed"
          >
            RSS
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ opacity: 0.8 }}
            >
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
