const webpack = require('webpack');
const commonConfig = require('./webpack.config.common');

module.exports = {
  ...commonConfig,
  mode: 'production',
  devServer: {
    contentBase: '../public/dist'
  }
};
