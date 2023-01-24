const path = require('path')
const  { 
  NODE_ENV
} = process.env;
const basePath = NODE_ENV === 'production' ? '/blog' : '';
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/blog/images/:path*',
        destination: '/images/:path*',
      },
    ]
  },
  transpilePackages: ['react-syntax-highlighter'],
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    BASE_PATH: ''
  },
  distDir: 'build',
  assetPrefix: '/',
  basePath: ''
}