module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        __dirname: true,
        __filename: true,
        global: true,
      };
    }
    return config;
  },
};
