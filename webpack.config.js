const path = require('path');

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'build/static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
    }],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    noInfo: true,
  },
};
