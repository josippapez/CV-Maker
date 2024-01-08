/** @type {import('next').NextConfig} */

import withNextIntl from 'next-intl/plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
// });
import NextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled:
    process.env.ANALYZE === 'true' && process.env.NODE_ENV === 'production',
});

const nextConfig = {
  // transpilePackages: ['redux-persist'],
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost'],
    unoptimized: true,
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
            from: path.join('./', 'node_modules/pdfjs-dist/cmaps'),
            to: path.join('./', 'public/cmaps'),
          },
          {
            from: path.join(
              './',
              'node_modules/pdfjs-dist/build/pdf.worker.min.js'
            ),
            to: path.join('./', 'public'),
          },
        ],
      })
    );
    return config;
  },
};

export default withBundleAnalyzer(
  withNextIntl('src/translations/i18n.ts')(nextConfig)
);
