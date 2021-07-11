# webpack 配置

## 模块化

> 可维护 可复用 开发效率 【高内聚、低耦合】

CommonJS

```
var math = require("math");
math.add(2,3);
```

RequireJS(AMD) / Sea.js(CMD)

```
import math from "math";
math.add(2,3);
```

ES6 Module

## 作用

打包成浏览器可认识的语言
everything is module

- 拆分依赖到代码块，按需加载
- 快速初始化加载
- 所有静态资源都可当成模块
- 第三方库模块化
- 自定义模块化打包
- 适合大型项目

```
npm i webpack
webpack ./app.js app.bundle.js
```

```
entry: 配置入口资源
output: 配置编译后的资源
module: 资源处理
resolve: 配置资源别名/扩展名
plugins: 插件
```

### loader features

- 链式调用，资源通过管道 最后一个 loader 返回 javascript
- 可以同步或异步执行
- 运行在 Nodejs 无所不能
- loaders 可以接受参数，你可以在配置文件中设置 loaders
- 可以通过资源扩展名或正则表达式来匹配每个 loader 生效范围
- loaders 可以通过 npm 安装和发布
- 插件可以提供给 loaders 更多功能

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        test: /\.(scss|css)$/,
        exclude: [/\.krem.(scss|css)$/],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // modules: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  // ...
};
```

### 模式【mode】

```js
// 只在配置中提供mode
module.exports = {
  mode: "production",
}
// 从CLI参数中传递
webpack --mode=production
```

tips: 只设置`NODE_ENV`，则不会自动设置`mode`，

## 具体实践

### 打包 JavaScript

```js
module.exports = {
  // ...
  // 配置模块如何解析
  resolve: {
    // 按顺序解析这些后缀名
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      Utilities: path.resolve(__dirname, "src/utilities/"),
      Templates: path.resolve(__dirname, "src/templates/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
};
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "module": "esnext",
    "target": "es5",
    "lib": ["es6", "dom", "es2016", "es2017"],
    "sourceMap": true,
    "allowJs": false,
    "jsx": "react",
    "declaration": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": false,
    "noUnusedParameters": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src", "types"],
  "exclude": ["node_modules", "dist", "example", "rollup.config.js"]
}
```

`.babelrc`

```js
{
    "presets": [
        "@babel/env",
        "@babel/react",
        "@babel/preset-typescript"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```

### 开发服务器

```js
var path = require("path");
module.exports = {
  // ...
  devServer: {
    // 告诉服务器内容来源，仅在需要静态文件时才配置
    contentBase: path.join(__dirname,"src");
    // 为每个静态文件开启 gzip compression
    compress: true,
    port: 9000,
  }
}
```

### 打包样式资源

```js
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    // 输出文件名
    filename: "build.js",
    // 输出路径
    path: resolve(__dirname, "build"),
    publicPath: "dist/", // 配置网站根目录
  },
  module: {
    rules: [
      {
        // 匹配哪些文件
        testt: /\.(less|csss)$/i,
        // 使用哪些loader进行处理
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          MiniCssExtractPlugin.loader,
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  mode: process.env.NODE_ENV || "development",
};
```

### 打包 html 资源

plugin:

- 1. 下载
- 2. 引入
- 3. 使用

```js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // 入口
  entry: "./src/index.js",
  output: {
    // 输出文件名
    filename: "build.js",
    // 输出路径
    path: resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: process.env.NODE_ENV || "development",
};
```

### 打包图片资源

```js
const ImageminPlugin = require("imagemin-webpack-plugin").dafult;
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 处理图片资源，但处理不了HTML中的img路径问题
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 小于8kb使用url-loader,否则使用file-loader
              limit: 8 * 1024,
              // 关闭es6
              esModule: false,
              name: "[hash:10].[ext]",
            },
          },
          "img-loader",
        ],
      },
      {
        // 处理HTML中的img
        test: /\.html$/,
        loader: "html-loader",
        options: {
          // 将标签的指引作为模块资源
          attrs: ["img:src", "a:href"],
        },
      },
    ],
  },
  plugins: [
    new ImageminPlugin({
      maxConcurrency: 1,
      test: (filename) => {
        console.log(`Attempting to compress "${filename}"...`);
        try {
          return /\.(jpe?g|png|gif|svg)$/i.test(filename);
        } catch (e) {
          return null;
        }
      },
      plugins: [
        imageminJpegtran({ progressive: true }),
        imageminPngquant({ strip: true }),
      ],
      disable: !isProduction,
    }),
  ],
  // ...
};
```

### 压缩

```js
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {},
      }),
    ],
    usedExports: true,
  },
  watch: !isProduction,
};
```

### 打包其他资源

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          publicPath: "../",
        },
      },
    ],
  },
};
if (isProduction) {
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname,
      },
    })
  );
}
```
