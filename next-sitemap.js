module.exports = {
  siteUrl: 'https://hacker1db.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './out',
  exclude: ['/404'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404'],
      },
    ],
  },
};
