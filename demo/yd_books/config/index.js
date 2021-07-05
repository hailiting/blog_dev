const _ = require("lodash");
let config;
if (process.env.NODE_ENV === "development") {
  config = {
    port: 3000,
  };
}
if (process.env.NODE_ENV === "production") {
  config = {
    port: 8080,
  };
}

module.exports = config;
