const isProd = process.env.NODE_ENV === 'production';

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_staticImage: true,
});

module.exports = {
  ...withNextra(),
  basePath: isProd ? '/dw' : '',
  assetPrefix: isProd ? '/dw/' : '',
  images: {
    loader: 'imgix',
    path: '',
  },
};
