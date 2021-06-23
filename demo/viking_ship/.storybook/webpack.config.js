const path = require("path");
module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    },
    {
      test: /\.(stories|story)\.[tj]sx?$/,
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
  return config;
};
