const path = require("path");
const webpack = require("webpack");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Manifest = require("webpack-manifest");
const { tree } = require("gulp");

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
    filename: "public/scripts/[name].js",
    path: path.join(__dirname, "../build/"),
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
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
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "dev",
    }),
    new LiveReloadPlugin({
      appendScriptTag: true,
    }),
    new ExtractTextPlugin("public/css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "public/scripts/common/vendor.min.js",
    }),
    new HtmlWebpackPlugin({
      filename: "./views/layout.html",
      template: "src/widget/layout.html",
      inject: false,
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "./views/index.html",
      template: "src/views/index.js",
      inject: false,
      minify: false,
      chunks: ["vendor", "index", "tag"]
    }),
    new HtmlWebpackPlugin({
      filename: "./widget/index.html",
      template: "src/widget/index.html",
      inject: false,
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "./views/star.html",
      template: "src/views/star.js",
      minify: false,
      inject: false,
      chunks: ["vendor", "index", "tag"]
    }),
    new HtmlWebpackPlugin({
      filename: "./widget/star.html",
      template: "src/widget/star.html",
      inject: false,
      minify: false,
    }),
    new Manifest({
      cache: [
        "./public/css/vendor.css"
      ],
      timestamp: true, // add time in comments
      filename: "cache.manifest", // 生成的文件名字 选填
      network: [
        " *",
      ],
      headcomment: "praisethumb4", // manifest 文件中添加注释
      master: ["./views/layout.html"]
    })
  ]
}