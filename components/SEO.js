import { NextSeo } from 'next-seo';

const SEO = ({ title, description, canonical, openGraph }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={openGraph}
    />
  );
};

export default SEO;
