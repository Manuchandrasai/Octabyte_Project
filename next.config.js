/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true }, // optional
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
