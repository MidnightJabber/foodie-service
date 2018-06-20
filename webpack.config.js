const path = require('path');

require('dotenv').config(); // Fetching env variables
const { MODE } = process.env;

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.mjs', '.js']
  },

  target: 'node',
  mode: MODE,

  watch: true,
  watchOptions: {
    ignored: ['node_modules']
  }
};
