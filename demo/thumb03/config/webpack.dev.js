const webpack = require("webpack");
const path = require("path");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  entry: {
    index: [
      path.join(__dirname, "../app/public/scripts/add.js"),
      path.join(__dirname, "../app/public/scripts/x-praise.js"),
    ],
  },
  output: {
    filename: "public/scripts/[name].js",
    path: path.resolve(__dirname, "../build/")
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
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "dev",
    }),
    new LiveReloadPlugin({
      appendScriptTag: true,
    }),
    new ExtractTextPlugin("public/css/[name].css"), // 路径与名称
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),

    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'views/layout.html',
      template: 'app/widget/layout.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: "views/index.html",
      template: "app/views/index.js",
      inject: false, // 不被注入
      chunks: ["vendor", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "widget/index.html",
      template: "app/widget/index.html",
      inject: false,
    }),
  ],
  // 压缩
  optimization: {
    minimize: true,
    // 三方库或webpack运行文件分离
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          filename: "public/scripts/commons/[name].min.js",
          minChunks: 1,
        }
      }
    }
  }
}