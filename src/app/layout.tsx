import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const globalStyles = `
  body {
    margin: 0;
    padding: 0;
    background-color: #1a1d21;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-height: 100vh;
  }
  
  .terminal-cursor::after {
    content: "_";
    animation: blink 1s infinite;
    color: #6FC1FF;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .circle {
    border-radius: 50%;
    max-width: 200px;
    height: auto;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  a:hover {
    color: #6FC1FF;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body className={inter.className}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <main
            style={{
              flexGrow: 1,
              maxWidth: "1024px",
              margin: "0 auto",
              padding: "2rem 1rem",
            }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

