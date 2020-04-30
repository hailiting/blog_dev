# webpack简易打包
中文文档地址[https://www.webpackjs.com/guides/]
## npm
~~~
npm install --save-dev webpack
npm install --save-dev webpack-cli
~~~
## package.json
~~~
"scripts": {
    "start": "webpack --config webpack.config.js"
}
~~~
## webpack.config.js
~~~
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  }
};
~~~