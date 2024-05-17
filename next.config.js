/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/modules/js/script.js',
        destination: 'https://analytics.techhaven.io/js/script.js'
      },
      {
        source: '/modules/api/event',
        destination: 'https://analytics.techhaven.io/api/event'
      }
    ]
  },
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
