const path = require("path");
const ConsoleLogOnBuildWebpackPlugin = require("./plugin/ConsoleLogOnBuildWebpackPlugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve("./loader/index.js"),
            options: {
              data: "🍌自定义配置",
            },
          },
        ],
      },
    ],
  },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
};
