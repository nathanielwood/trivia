// modeled after https://github.com/gaearon/react-transform-boilerplate

import express from 'express';
import webpack from 'webpack';
import path from 'path';

const APP_PORT = 3000;

const app = express();
const config = require('./webpack.config.js');
config.devtool = 'cheap-module-eval-source-map';
config.entry.unshift('webpack-hot-middleware/client');
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`Client dev server is now listening on port ${APP_PORT}`); // eslint-disable-line
});
