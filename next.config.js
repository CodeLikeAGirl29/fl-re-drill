/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Maps a secure backend proxy to bypass browser-level "Failed to fetch" blocks
  async rewrites() {
    return [
      {
        source: '/api/cloudinary/:path*',
        destination: 'https://api.cloudinary.com/v1_1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;