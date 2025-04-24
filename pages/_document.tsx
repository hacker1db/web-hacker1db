import Document, { Html, Head, Main, NextScript } from 'next/document';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <DefaultSeo {...SEO} />
          <meta name="description" content="Hack Your Life One Day At a Time" />
          <meta name="keywords" content="Homepage, Blog, Programming, Cyber Security, DevSecOps, Music, Travel, Coffee" />
          <meta name="author" content="hacker1db" />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Hacker1db.dev" />
          <meta property="og:url" content="https://hacker1db.dev/" />
          <meta property="og:image" content="https://hacker1db.dev/images/profile.png" />
          <meta property="og:description" content="Hack Your Life One Day At a Time" />
          <meta property="og:title" content="Hacker1db.dev blog" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@hacker1db" />
          <meta name="twitter:creator" content="@hacker1db" />
          <meta name="twitter:title" content="Hacker1db.dev blog" />
          <meta name="twitter:description" content="Hack Your Life One Day At a Time" />
          <meta name="twitter:image" content="https://hacker1db.dev/images/profile.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
