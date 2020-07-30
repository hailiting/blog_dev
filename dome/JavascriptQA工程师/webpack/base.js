"use strict";
const path = require('path');
const fs = require('fs');

const publicPath = '/';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');






module.exports = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: resolveApp('dist'),
    filename: 'assets/js/[name].[hash:4].js',
    chunkFilename: 'assets/js/[name].[hash:4].chunk.js',
    publicPath: publicPath,
    // hotUpdateChunkFilename: 'hot/hot-update.js',
    // hotUpdateMainFilename: 'hot/hot-update.json'
  },

  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/components/'),
      Containers: path.resolve(__dirname, '../src/containers/'),
      Assets: path.resolve(__dirname, '../src/assets/'),
      Util: path.resolve(__dirname, '../src/util/'),
      Routes: path.resolve(__dirname, '../src/routes/'),
      Constants: path.resolve(__dirname, '../src/constants/'),
      Redux: path.resolve(__dirname, '../src/redux/'),
      Data: path.resolve(__dirname, '../src/data/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"]
          }
        }
      },
    ]
  },

  plugins: [

    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: 'assets/img' },
      { from: 'src/assets/fonts', to: 'assets/fonts' }
    ]),

    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      //favicon: './public/favicon.ico'
    }),
  ]
};
