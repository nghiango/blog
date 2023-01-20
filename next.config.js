const  { 
  NODE_ENV
} = process.env;
const basePath = NODE_ENV === 'production' ? '/blog' : '';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/blog/images/:path*",
        destination: "/images/:path*",
      },
    ];
  },
  env: {
    BASE_PATH: "",
  },
  images: {
    loader: 'akamai',
    path: ''
  },
  reactStrictMode: true,
  distDir: "build",
  assetPrefix: "/",
  basePath: "",
};

module.exports = nextConfig;
