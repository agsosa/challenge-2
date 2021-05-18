/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
};
