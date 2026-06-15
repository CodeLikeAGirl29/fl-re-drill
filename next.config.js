// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pins the workspace root so Next stops inferring it from the stray
  // lockfile in your home directory (silences the build warning).
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Maps a secure backend proxy to bypass browser-level "Failed to fetch" blocks
  async rewrites() {
    return [
      {
        source: "/api/cloudinary/:path*",
        destination: "https://api.cloudinary.com/v1_1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
