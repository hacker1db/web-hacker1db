const SEO = {
  title: "Hacker1db.dev blog",
  description: "Hack Your Life One Day At a Time",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hacker1db.dev/',
    site_name: 'Hacker1db.dev',
    images: [
      {
        url: 'https://hacker1db.dev/images/profile.png',
        width: 800,
        height: 600,
        alt: 'Hacker1db.dev',
      },
    ],
  },
  twitter: {
    handle: '@hacker1db',
    site: '@hacker1db',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Homepage, Blog, Programming, Cyber Security, DevSecOps, Music, Travel, Coffee',
    },
  ],
};

export default SEO;
