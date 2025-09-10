/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  // 🔍 Enable source maps in production builds
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
