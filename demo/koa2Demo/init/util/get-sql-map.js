const fs = require("fs");
const walkFile = require("./walk-file");
/**
 * 获取sql目录下的文件目录数据
 * @return {object}
 */
function getSqlMap() {
  let basePath = __dirname;
  console.log(basePath);
  basePath = basePath.replace(/\\/g, "/");
  let pathArr = basePath.split("/");
  pathArr = pathArr.splice(0, pathArr.length - 1);
  basePath = pathArr.join("/") + "/sql/";
  console.log("basePath: ", basePath);
  let fileList = walkFile(basePath, "sql");
  return fileList;
}

module.exports = getSqlMap;
