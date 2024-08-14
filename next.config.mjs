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

/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ['redux-persist'],
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'localhost'],
    unoptimized: true,
  },
  webpack: config => {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.unshift({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    // config.plugins.push(
    //   new CopyPlugin({
    //     patterns: [
    //       {
    //         from: path.join('./', 'node_modules/pdfjs-dist/cmaps'),
    //         to: path.join('./', 'public/cmaps'),
    //       },
    //       {
    //         from: path.join(
    //           './',
    //           'node_modules/pdfjs-dist/build/pdf.worker.min.js'
    //         ),
    //         to: path.join('./', 'public'),
    //       },
    //     ],
    //   })
    // );
    return config;
  },
};

export default withBundleAnalyzer(
  withNextIntl('src/translations/i18n.ts')(nextConfig)
);
