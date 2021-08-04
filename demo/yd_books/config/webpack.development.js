const { join } = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const setTitle = require("node-bash-title"); // 设置小黑板窗口title
const setIterm2Badge = require("set-iterm2-badge"); // 小黑板水印
const CopyPlugin = require("copy-webpack-plugin"); // copy文件插件
