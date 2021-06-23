const path = require("path");
const webpack = require("webpack");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: [
      path.join(__dirname, "../src/public/scripts/index.es6"),
      path.join(__dirname, "../src/public/scripts/indexadd.es6"),
    ],
    tag: [
      path.join(__dirname, "../src/public/scripts/tag.es6"),
      path.join(__dirname, "../src/public/scripts/star.es6"),
    ]
  },
  output: {
    filename: "public/scripts/[name]-[hash:5].js",
    publicPath: "http://192.168.0.130:3000/",
    path: path.join(__dirname, "../build/")
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        })
      }
    ]
  },
  plugin: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "prod",
    }),
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    new ExtractTextPlugin("public/css/[name]-[hash:5].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "public/scripts/common/vendor-[hash:5].min.js",
    }),
    new HtmlWebpackPlugin({
      filename: "./views/layout.html",
      template: "src/widget/layout.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "./views/index.html",
      template: "src/views/index.js",
      inject: false,
      chunks: ["vendor", "index", "tag"]
    }),
    new HtmlWebpackPlugin({
      filename: "./widget/index.html",
      template: "src/widget/index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "./views/star.html",
      template: "src/views/star.js",
      inject: false,
      chunks: ["vendor", "index", "tag"]
    }),
    new HtmlWebpackPlugin({
      filename: "./widget/star.html",
      template: "src/widget/star.html",
      inject: false,
    })
  ]
}
