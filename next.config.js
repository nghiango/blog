const  {
  NODE_ENV
} = process.env;
const basePath = NODE_ENV === 'production' ? '/blog' : '';
module.exports = {
  env: {
    BASE_PATH: '',
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  reactStrictMode: true,
  distDir: NODE_ENV === 'production' ? 'docs':'build',
  assetPrefix: '/',
  basePath: '',
  output: NODE_ENV === 'production' ? 'export':'standalone',
}