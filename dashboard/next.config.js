// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp'],
  },
  compiler: {
    // removeConsole: true,
  },
  webpack: (config) => ({
    ...config,
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  }),
};

module.exports = nextConfig;
