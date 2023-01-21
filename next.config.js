const path = require('path')

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['react-syntax-highlighter'],
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
}