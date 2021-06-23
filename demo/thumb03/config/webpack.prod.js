const webpack = require("webpack");
const path = require("path");
const LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  entry: {
    index: [
      path.join(__dirname, "../app/public/scripts/x-praise.js"),
      path.join(__dirname, "../app/public/scripts/add.js")
    ]
  },
  output: {
    filename: "public/scripts/[name]-[hash:5].js",
    path: path.resolve(__dirname, "../dist/")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "prod",
    }),
    new LiveReloadPlugin({
      appendScriptTag: true,
    })
  ],
  optimization: {
    minimize: true
  }
}