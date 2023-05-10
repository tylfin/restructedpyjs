const path = require('path');

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
};
