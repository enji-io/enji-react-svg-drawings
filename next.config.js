/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.raw\.tsx?$/,
      use: 'raw-loader',
    });
    return config;
  },
  // Turbopack config (empty for now - webpack config handles raw-loader)
  turbopack: {},
};

module.exports = nextConfig;
