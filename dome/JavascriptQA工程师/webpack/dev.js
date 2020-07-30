'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base')

const MiniCssExtractPlugin  = require('mini-css-extract-plugin')


const HOST = 'localhost'
const PORT = 3005

module.exports = merge(baseConfig, {
  mode: 'development',

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: 'localhost',
    port: (process.env.port || '3005'),
    open: true,
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    }
  },

  module: {
   rules: [
    {
      test: /\.html$/,
      use: [
          {
              loader: "html-loader",
              options: { minimize: true }
          }
      ]
  },
  {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
  },
  // Scss compiler
  {
      test: /\.scss$/,
      use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
      ]
  }
  
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash:4].css"
  })
  ]
})
