const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    filename: 'rto.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'RTO',
    libraryTarget: 'umd'
  },
  devtool: 'source-map'
};