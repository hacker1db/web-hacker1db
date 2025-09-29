import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Header() {
  return (
    <header className="bg-primary border-b border-gray-600 py-4">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <Link
          href={siteConfig.logo.logoHomeLink}
          className="font-mono text-lg text-cursor hover:text-cursor/80 transition-colors duration-200"
        >
          <span>{siteConfig.logo.logoText}</span>
          <span
            className="terminal-cursor"
            style={{ color: siteConfig.logo.logoCursorColor }}
          ></span>
        </Link>

        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-cursor transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="text-gray-300 hover:text-cursor transition-colors duration-200"
          >
            Posts
          </Link>
          <Link
            href="/series"
            className="text-gray-300 hover:text-cursor transition-colors duration-200"
          >
            Series
          </Link>
          <Link
            href="/tags"
            className="text-gray-300 hover:text-cursor transition-colors duration-200"
          >
            Tags
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-cursor transition-colors duration-200"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
