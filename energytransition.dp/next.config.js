/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/et360.dp',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unilag-energy-club-backend.up.railway.app',
        pathname: '/api/files/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
}

module.exports = nextConfig
