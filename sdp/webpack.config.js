const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const { extendDefaultPlugins } = require('svgo');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};

function optimization() {
  const config = {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          convertShapeToPath: {
                            convertArcs: true,
                          },
                        },
                      },
                    },
                    'removeViewBox',
                    {
                      name: 'addAttributesToSVGElement',
                      params: {
                        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimize = true;
    config.minimizer.push(
      ...[new CssMinimizerPlugin(), new TerserWebpackPlugin()]
    );
  }

  return config;
}

const plugins = () => {
  const basePlugins = [
    new MiniCssExtractPlugin({
      filename: `./${filename('css')}`,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/markup/pages/index.pug'),
      filename: 'index.html',
      // chunks: ['index.js'],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src/markup/pages/catalog.pug'),
    //   filename: 'catalog.html',
    //   // chunks: ['catalog.js'],
    //   minify: {
    //     collapseWhitespace: isProd,
    //   },
    // }),
    new FaviconsWebpackPlugin({
      logo: './assets/svg/favIcon.svg',
      inject: true,
    }),
  ];

  if (isDev) {
    basePlugins.push(new ESLintPlugin());
  }

  if (isProd) {
    // basePlugins.push(new BundleAnalyzerPlugin());
  }

  return basePlugins;
};

module.exports = () => ({
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: ['@babel/polyfill', './js/index.js'],
    // catalog: ['@babel/polyfill', './js/catalog.js'],
  },
  output: {
    filename: `${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: `assets/${filename('[ext]')}`,
    publicPath: '',
    clean: true,
  },
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@': path.resolve(__dirname, 'src'),
      '@svg': path.resolve(__dirname, 'src/assets/svg'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: jsLoaders(),
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svgo-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
      },
    ],
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : 'source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8000,
  },
});
