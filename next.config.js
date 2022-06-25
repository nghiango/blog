const  { 
  NODE_ENV
} = process.env;
const packageJSON = require('./package.json');
const transpiledPackages = Object.keys(packageJSON.dependencies).filter(it => it.includes('@shared/'));

const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);
const basePath = NODE_ENV === 'production' ? '/blog' : '';
const withPlugins = require('next-compose-plugins');
module.exports = withPlugins([withTM], {
  async rewrites() {
  return [
    {
      source: '/blog/images/:path*',
      destination: '/images/:path*',
    },
  ]
},
env: {
  BASE_PATH: '',
},
images: {
loader: 'akamai',
path: '',
},
reactStrictMode: true,
distDir: 'build',
assetPrefix: '/',
basePath: ''
});
