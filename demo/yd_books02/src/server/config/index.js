const _ = require("lodash");
let config;
if (process.env.NODE_ENV === "development") {
  const localConfig = {
    port: 3000,
    baseUrl: "http://localhost/yii2/web/index.php?r=",
  };
  config = _.extend(config, localConfig);
}
if (process.env.NODE_ENV === "production") {
  const prodConfig = {
    port: 3000,
    baseUrl: "http://localhost/yii2/web/index.php?r=",
  };
  config = _.extend(config, localConfig);
}

module.exports = config;
