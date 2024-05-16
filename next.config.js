/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require('next-plausible')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
};

module.exports = nextConfig
