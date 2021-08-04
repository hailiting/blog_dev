const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlAfterPlugin = require("./config/htmlAfterPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const merge = require("webpack-merge");
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
  console.log(item, "-------");
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) === true) {
    const entryKey = RegExp.$1;

    const [dist, template] = entryKey.split("-");

    _entry[entryKey] = item;
    // 打包多页，去获取每个页面需要用到的js
    _plugins.push(
      new HtmlWebpackPlugin({
        // 生成的html文件的标题
        title: "sss",
        // html文件的文件名
        filename: `../views/${dist}/pages/${template}.html`,
        // 指定生成文件所依赖的html模板
        template: `src/client/views/${dist}/pages/${template}.html`,
        // 生成的js放哪   
        // true || body    body底部
        // head 在head中
        // false 不插入
        favicon: "./favicon.ico"
        inject: false,
        // 指定当前html要使用哪些js
        chunks: [entryKey],
        // html-webpack-plugin集成了html-minifier
        minify: {
          // removeAttributeQuotes: true,
        }
      })
    );
  }
}

console.log(_entry, "entry");

const webpackConfig = {
  entry: _entry,
  output: {
    path: path.join(__dirname, "./dist/assets"),
    publicPath: "/",
    filename: "scripts/[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    ..._plugins,
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css",
    }),
    new htmlAfterPlugin
  ],
  watch: __modeFlag
}
module.exports = merge(webpackConfig, _mergeConfig);