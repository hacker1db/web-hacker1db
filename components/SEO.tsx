import { NextSeo } from 'next-seo';
import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    url?: string;
    title?: string;
    description?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
    site_name?: string;
  };
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, openGraph }) => {
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
