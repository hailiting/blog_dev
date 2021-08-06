const { join } = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"); // 友好的错误提示
const WebpackBuildNotifierPlugin = require("webpack-build-notifier"); // webpack 弹窗提示
const setTitle = require("node-bash-title"); // 设置小黑板窗口title
const setIterm2Badge = require("set-iterm2-badge"); // 小黑板水印
const CopyPlugin = require("copy-webpack-plugin"); // copy文件插件

setTitle("🍊开发环境配置");
setIterm2Badge("8081");

module.exports = {
  devServer: {
    contentBase: join(__dirname, "../dist"),
    hot: true,
    quiet: true, // 配合FriendlyErrorsWebpackPlugin
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: join(__dirname, "../", "src/client/views/layouts/layout.html"),
          to: "../views/layouts/layout.html",
        },
      ],
    }),
    new CopyPlugin(
      {
        patterns: [
          {
            from: join(__dirname, "../", "src/client/components"),
            to: "../components",
          },
        ],
      },
      { ignore: ["*.js", "*.css", ".DS_Store"] }
    ),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: join(__dirname, "../dogs.png"),
      suppressSuccess: true,
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        // 启动成功
        messages: ["You application is running here http://localhost:8081"],
        notes: ["编译成功啦~"],
      },
    }),
  ],
};
