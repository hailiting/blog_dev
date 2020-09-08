const path = require("path");
module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    },
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes("node_modules");
              }
              return true;
            },
          },
        },
      ],
    }
  );
  config.resolve = {
    ...config.resolve,
    modules: [path.resolve(__dirname, "../src"), "node_modules"],
    // The same approach as in config-overrides.js
    alias: {
      ...config.resolve?.alias,
      "react-dom": "@hot-loader/react-dom",
    },
  };
  return config;
};
