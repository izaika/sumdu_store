const webpack = require('webpack');
const commonConfig = require('./webpack.config.common');

module.exports = {
  ...commonConfig,
  mode: 'development',
  devServer: {
    contentBase: '../public/dist'
  }
};
