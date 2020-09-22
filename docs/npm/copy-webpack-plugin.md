# copy-webpack-plugin

在 webpack 中拷贝文件和文件夹

## 如何使用

```shell
npm install --save-dev copy-webpack-plugin
```

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");
new CopyWebpackPlugin([
  {
    from: __dirame + "/src/components",
    to: __dirname + "/dist",
    ignore: [".*"],
  },
]);
```

## 常用配置

```shell
from 定义要拷贝的源文件 from: __dirame + "/src/components",
to 定义要拷贝到的目标文件  to: __dirname + "/dist",
toType file或dir  可选，默认是文件
force boolean 强制覆盖前面的文件  默认为false 可选
context string  决定如何解释from路径的路径 默认 base
flatten 只拷贝指定文件 可模糊匹配
ignore  忽略啥文件
```
