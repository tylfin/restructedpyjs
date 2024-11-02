const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/restructedpyjs.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'restructedpyjs.bundle.js',
    library: 'restructedpyjs',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      'node-fetch': 'axios',
    },
    fallback: {
      // Ensure that the standard modules are also set to false
      'fs': false,
      'path': false,
      'url': false,
      'crypto': false,
      'vm': false,
      'child_process': false,
    },
  },
  optimization: {
    minimize: true,
    splitChunks: false,
    runtimeChunk: false,
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^node:/ // Ignores imports starting with 'node:'
    })
  ],
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
};
