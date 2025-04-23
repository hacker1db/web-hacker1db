const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  future: {
    webpack5: true,
  },
  experimental: {
    modern: true,
  },
  postcssLoaderOptions: {
    postcssOptions: {
      plugins: [
        'tailwindcss',
        'autoprefixer',
      ],
    },
  },
});
