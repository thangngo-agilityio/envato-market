/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    reactStrictMode: true,
    swcMinify: true,
    remotePatterns: [
      {
        minimumCacheTTL: 60,
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
