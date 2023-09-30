const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/restructedpyjs.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'restructedpyjs.bundle.js',
    library: 'restructedpyjs',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
    splitChunks: false,
    runtimeChunk: false,
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
};
