'use strict'
const path = require('path');
const fs = require('fs');


const merge = require('webpack-merge')
const baseConfig = require('./base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


let pathsToClean = [
  'build'
]

let cleanOptions = {
  root: __dirname,
  verbose: false, // Write logs to console.
  dry: false
}

module.exports = merge(baseConfig, {
  mode: 'production',
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "all",
  //       },
  //     },
  //   },
  // },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
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
          "sass-loader?indentedSyntax"
        ]
      }
    ]
  },
  performance: {
    hints: "warning"
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash:4].css"
    }),
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
    })
  ]
})
