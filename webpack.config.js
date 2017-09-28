/* eslint-disable global-require, import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const includePaths = [
  path.resolve(__dirname, './src/assets/scss'),
  path.resolve(__dirname, './node_modules/foundation-sites/scss'),
];

const extractStyles = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true,
  disable: !isProduction,
});

const common = {
  entry: {
    viewer: path.join(__dirname, 'src', 'viewer', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: extractStyles.extract({
              fallback: 'vue-style-loader',
              use: [
                'css-loader',
                { loader: 'sass-loader', options: { includePaths } },
              ],
            }),
            sass: extractStyles.extract({
              fallback: 'vue-style-loader',
              use: [
                'css-loader',
                { loader: 'sass-loader', options: { includePaths, indentedSyntax: true } },
              ],
            }),
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          { loader: 'sass-loader', options: { includePaths } },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
        options: {
          minimize: false,
        },
      },
    ],
  },
  externals: {
    twitch: 'Twitch',
  },
  plugins: [
    extractStyles,
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'viewer.html'),
      filename: 'viewer.html',
      chunks: ['viewer'],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

if (isProduction) {
  module.exports = merge(common, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
    ],
    devtool: 'source-map',
  });
} else {
  module.exports = merge(common, {
    devtool: 'cheap-module-inline-source-map',
  });
}
