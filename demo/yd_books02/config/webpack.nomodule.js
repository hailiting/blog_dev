/**
 * 使用babel-loader 编译js
 */
module.exports = {
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/present-env"],
          },
        },
      },
    ],
  },
};
