const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.json'],
    alias: {
      schema: path.resolve(__dirname, 'src/schema/'),
      test: path.resolve(__dirname, 'src/test/'),
      services: path.resolve(__dirname, 'src/services/'),
    },
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};
