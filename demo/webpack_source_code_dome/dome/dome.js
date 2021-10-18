const fs = require("fs");
const ejs = require("ejs"); // 使用模板生成 Template
const Path = require("path");
let entry = "./index.js";
let output = Path.resolve(__dirname, "./dist/index.js");
const getEntry = fs.readFileSync(Path.resolve(__dirname, entry), "utf-8");
// 分析模块依赖，替换require -> webpack_require_ -> 在上一个里return执行下一个
let dependency = [];
const dealEntry = getEntry.replace(
  /(require)\(['"](.+?)["']\)/g,
  ($1, $2, $3) => {
    console.log(11);
    console.log({ $1, $2, $3 });
    let cont = fs.readFileSync(Path.resolve(__dirname, $3), "utf-8");
    dependency.push(cont);
    return ($2 = `__webpack_require__(${dependency.length})`);
  }
);
console.log({ dealEntry, dependency });
console.log("开始构建");
let template = `
(function (modules) {
  function __webpack_require__(moduleId) {
    const module = {
      exports: {}
    }
    modules[moduleId].call(module.exports, module, module.exports,__webpack_require__);
    return module.exports;
  }
  return __webpack_require__(0)
})([
  (function (module, exports, __webpack_require__) {<%- dealEntry  %>}),
  // 模板循环语法
  <% for (var i = 0; i < dependency.length; i++){ %>
      (function (module, exports, __webpack_require__) {
        <%- dependency[i] %>
      })
  <% } %>
])`;
let result = ejs.render(template, {
  dealEntry,
  dependency,
});
// function makeDir(path) {
//   deleteFolder(path);
//   if (makeDir(Path.dirname(Path.resolve(__dirname, path)))) {
//     fs.mkdirSync(Path.resolve(__dirname, path));
//     return true;
//   }
// }
// function deleteFolder(path) {
//   console.log({ path });
//   if (fs.existsSync(Path.resolve(__dirname, path))) {
//     let files = fs.readFileSync(Path.resolve(__dirname, path)) || [];
//     console.log({ curPath });
//     files.forEach(function(file, index) {
//       let curPath = path + "/" + file;
//       console.log({ curPath });
//       if (fs.statSync(Path.resolve(__dirname, curPath)).isDirectory) {
//         deleteFolder(curPath);
//       } else {
//         fs.unlinkSync(Path.resolve(__dirname, curPath));
//       }
//     });
//     fs.rmdirSync(Path.resolve(__dirname, path));
//   }
// }

// makeDir("./dist");
fs.writeFileSync(output, result);
console.log("构建成功");
