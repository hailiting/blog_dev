# webpack merge

作用： 连接数组并合并对象，原数组不变。一般用于项目复杂度高的 webpack 配置中。

```js
const merge = require("webpack-merge");
merge({ a: [1], b: 5, c: 20 }, { a: [2], b: 10, d: 421 }); // {a: [1,2], b:10, c: 20, d: 421}
```

## 在项目中的具体用法

```shell
npm install webpack-merge --save-dev
```

```js
// webpack.config.js
const commConfig = require("./config/webpack/comm");
const developmmentConfig = require("./config/webpack.development");
const productionConfig = require("./config/webpack.producetion");
const merge = require("webpack-merge");
module.exports = (mode) => {
  if (mode === "production") {
    return merge(commConfig, productionConfig, { mode });
  }
  return merge(commConfig, developmmentConfig, { mode });
};

// webpack.comm.js
const merge = require("webpack-merge");
const parts = require("./webpack.parts"); // webpack.parts为任意额外节点配置
const config = {
  // 书写公共配置
}
module.exports = merge([
  config,
  parts....
])

// webpack.development.js
const merge = require("webpack-merge");
const parts = require("./webpack.loadCSS");
module.exports = merge([
  config,
  parts.loadCSS(),
])

// webpack.loadCSS.js
exports.loadCSS = ({reg= /\.css$/, include, exclude, uses =[]}={})=>({
  module: {
    rules: [{
      test: reg,
      include,
      exclude,
      use[{
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      }].concat(uses),
    }]
  }
})
```
