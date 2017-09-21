const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'trackThis.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      // exclude: [/node_modules/],
      options: {
        presets: ['es2015']
        // plugins: ['transform-es2015-parameters']
      }
    }],
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false,
  //     },
  //     output: {
  //       comments: false,
  //     },
  //   }),
  // ]
}
