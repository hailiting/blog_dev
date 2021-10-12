const loaderUtils = require("loader-utils");
// this 当前loader的类
module.exports = function(content, map, meta) {
  const options = loaderUtils.getOptions(this);
  console.log("xxx", options);
  return content + `console.log("1${options.data}")`;
};
