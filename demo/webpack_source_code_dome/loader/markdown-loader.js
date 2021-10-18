"use strict";
const marked = require("marked");
const loaderUtils = require("loader-utils");
// module.exports 提供一个对外的函数
// loader1 string(源代码) -> AST (遍历这棵树替换const->var) -> string
// loader2 string/buffer -> AST -> string
// n*(string_+AST+string) -> 1*(string_+AST+string)
module.exports = function(markdown) {
  // merge params and default config
  const options = loaderUtils.getOptions(this);
  // 当前loader开启缓存
  this.cacheable();
  // 用户的 options->marked
  marked.setOptions(options);
  // string
  return marked(markdown);
};
