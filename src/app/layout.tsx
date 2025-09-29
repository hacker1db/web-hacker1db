import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Commented out due to network issues
import { siteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MDXProvider from "@/components/MDXProvider";

// const inter = Inter({ subsets: ["latin"] }); // Commented out due to network issues

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
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
      <body>
        {/* className={inter.className} removed due to font loading issues */}
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
            <MDXProvider>{children}</MDXProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
