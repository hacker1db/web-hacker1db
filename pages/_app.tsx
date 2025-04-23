import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
