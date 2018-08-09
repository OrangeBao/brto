const path = require('path');

module.exports = {
  entry: './index.js',
  devtool: 'inline-source-map',
  mode: 'production',
  output: {
    filename: 'rto.js',
    path: path.resolve(__dirname, '../src/plugins')
  }
};