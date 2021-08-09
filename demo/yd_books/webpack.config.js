const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlAfterWebpackPlugin = require("./config/htmlAfterWebpackPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { join, resolve } = require("path");
const { merge } = require("webpack-merge");
// 取命令行参数
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development"; // 区分开发环境还是线上环境
const __modeFlag = _mode === "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
// 查找文件
const glob = require("glob");

const files = glob.sync("./src/client/views/**/*.entry.js");

let _entry = {};
let _plugins = [];

for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) === true) {
    const entryKey = RegExp.$1;
    console.log("🍌🍌🍌", item);
    let [dist, template] = entryKey.split("-");
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        chunks: ["runtime", entryKey],
        template: `src/client/views/${dist}/pages/${template}.html`,
        inject: false,
      })
    );
    _entry[entryKey] = item;
  }
}

console.log("entry", _entry);

const webpackConfig = {
  entry: _entry,
  output: {
    path: join(__dirname, "./dist/assets"),
    publicPath: "/",
    filename: "scripts/[name].bundle.js",
  },
  module: {
    rules: [
      // {
      //   test: /\.?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    ..._plugins,
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css",
    }),
    new htmlAfterWebpackPlugin(),
  ],
  resolve: {
    alias: {
      "@": resolve("src/client/components"),
    },
  },
  watch: __modeFlag,
};
module.exports = merge(webpackConfig, _mergeConfig);
