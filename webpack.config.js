const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (env) => ({
  mode: 'development',
  entry: ['babel-regenerator-runtime', path.resolve(__dirname, 'src', 'index.jsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' },
      ],
    }),
    new Dotenv({
      path: `./.env.${env.NODE_ENV}`,
    }),
  ],
  devtool: 'cheap-module-source-map',
});
