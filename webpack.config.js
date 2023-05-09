const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/restructedpyjs.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'restructedpyjs.bundle.js',
    library: 'RestructedPyJS',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxAssetSize: 600000, // Adjust this value based on your requirements
    maxEntrypointSize: 600000, // Adjust this value based on your requirements
  },
};
