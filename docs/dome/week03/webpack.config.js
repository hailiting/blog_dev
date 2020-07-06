const webpack = require('webpack');
const DevWebpack = require("./config/webpack.dev");
const ProdWebpack = require("./config/webpack.prod");
module.exports = () => {
  let webpackConfig = {};
  if (process.env.NODE_ENV && process.env.NODE_ENV === "prod") {
    webpackConfig = ProdWebpack;
  } else {
    webpackConfig = DevWebpack;
  }
  return webpackConfig;
}
