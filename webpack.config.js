const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {
  DuplicateReporterPlugin,
} = require('duplicate-dependencies-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dependencies = require('./package.json').dependencies;
delete dependencies['@svgr/webpack'];
delete dependencies['react-scripts'];
delete dependencies['web-vitals'];
delete dependencies['firebase'];
const listDependencies = Object.keys(dependencies);
listDependencies.push(
  'firebase/compat/app',
  'firebase/compat/auth',
  'firebase/compat/firestore',
  'firebase/firestore',
);

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  console.log('devMode', devMode);
  return {
    context: path.join(__dirname, '/src'),
    entry: {
      app: {
        import: './index.tsx',
        dependOn: 'react-vendors',
      },
      'react-vendors': listDependencies,
    },
    target: 'web',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
      clean: true,
    },
    devServer: {
      static: './public',
      port: 3000,
      liveReload: true,
      hot: true,
      historyApiFallback: true,
    },
    watchOptions: {
      ignored: ['**/node_modules', '**/dist', '**/.git'],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
      modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.css$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 2,
              },
            },
            { loader: 'postcss-loader' },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] },
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                exportType: 'named',
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
          resourceQuery: /url/,
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        filename: 'index.html',
        manifest: './public/manifest.json',
        inject: true,
        minify: devMode
          ? {}
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        openAnalyzer: false,
      }),
      new DuplicateReporterPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              path.dirname(require.resolve('pdfjs-dist/package.json')),
              'cmaps'
            ),
            to: 'cmaps/',
          },
          {
            from: path.join(
              path.dirname(require.resolve('pdfjs-dist/package.json')),
              'build',
              'pdf.worker.min.js'
            ),
          },
          {
            from: path.join(__dirname, 'public', 'robots.txt'),
            to: 'robots.txt',
          },
          {
            from: path.join(__dirname, 'public', 'sitemap.xml'),
            to: 'sitemap.xml',
          },
        ],
      }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    optimization: {
      usedExports: true,
      minimize: !devMode,
      moduleIds: 'deterministic',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
            },
          },
          parallel: true,
        }),
      ],
    },
    devtool: devMode ? 'inline-source-map' : 'source-map',
  };
};
