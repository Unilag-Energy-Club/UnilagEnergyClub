/** @type {import('next').NextConfig} */
const nextConfig = {
  // Served behind the main app's reverse proxy under /uecdp
  basePath: '/uecdp',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unilag-energy-club-backend.up.railway.app',
        pathname: '/api/files/**',
      },
    ],
  },
  // Sharp needs this on some deployment platforms
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
}

module.exports = nextConfig
