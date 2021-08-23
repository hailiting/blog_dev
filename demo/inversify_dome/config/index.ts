const _ = require("lodash");
let config;
const localConfig = {
  port: 3000,
  baseUrl: "http://localhost/yii2/web/index.php?r=",
};
config = _.extend(config, localConfig);

export default config;
