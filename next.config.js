/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.raw\.tsx?$/,
      use: 'raw-loader',
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.raw.tsx': ['raw-loader'],
      },
    },
  },
};

module.exports = nextConfig;
