import Link from "next/link";
import { siteConfig } from "@/lib/config";
import SearchButton from "./SearchButton";

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
          flexWrap: "wrap",
          gap: "1rem",
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

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "1.5rem",
          flexWrap: "wrap"
        }}>
          <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
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
          </nav>
          
          <SearchButton />
        </div>
      </div>
    </header>
  );
}
