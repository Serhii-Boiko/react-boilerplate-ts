const webpack = require('webpack');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { resolve, getClientEnvironment } = require('./utils')


require('dotenv').config({path: resolve('.env')});

const env = getClientEnvironment();

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'tslint-loader',
        },
      },
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp|mp4|ogg|woff|woff2|ttf|eot|ico|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][contenthash][ext]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: resolve('./public/index.html'),
      filename: resolve('./dist/index.html'),
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new HtmlWebpackHarddiskPlugin(),
    new SimpleProgressWebpackPlugin({
      format: 'minimal',
    }),
    new webpack.DefinePlugin(env),
  ],
};
