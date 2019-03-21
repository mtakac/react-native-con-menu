const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: 'react',
    'react-native': 'react-native'
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
};
