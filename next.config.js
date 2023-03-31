/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled:
    process.env.ANALYZE === 'true' && process.env.NODE_ENV === 'production',
});

const nextConfig = withPWA({
  transpilePackages: ['redux-persist'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost'],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.unshift({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules/pdfjs-dist/cmaps'),
            to: path.join(__dirname, 'public/cmaps'),
          },
          {
            from: path.join(
              __dirname,
              'node_modules/pdfjs-dist/build/pdf.worker.min.js'
            ),
            to: path.join(__dirname, 'public'),
          },
        ],
      })
    );

    return config;
  },
});

module.exports = withBundleAnalyzer(nextConfig);
