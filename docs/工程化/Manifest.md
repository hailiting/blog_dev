# Manifest
## 不同情况，不同含义的Manifest
* html标签的manifest属性：离线缓存（目前已废弃）;
* PWA: 将Web应用程序安装到设备的主屏幕上;
* webpack中webpack-manifest-plugin插件打包出来的manifest.json文件，用来生成一份资源清单，为后端渲染服务;
* webpack中DLL打包时，输出的manifest.json文件，用来分析已经打包过的文件，优化打包速度和大小；
* webpack中manifest运行时的代码
## html属性
~~~
<!DOCTYPE html>
<html lang="en" manifest="/tc.mymanifest">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/theme.css">
    <script src="/main.js"></script>
    <script src="/mai2.js"></script>
  </head>
</html>
// 缓存清单可以是任意后缀名，不过必须制定content-type属性为text/cache-manifest
// tc.mymanifest
# v1 这是注释
CACHE MANIFEST // 指定需要缓存的文件，第一次下载完成以后，文件都不会在从网络请求了，除非tc.mymanifest更新，标记了manifest的html本身也会被缓存
/theme.css   
/main.js

NETWORK:  // 指定非缓存文，所有类似资源的请求都会绕过缓存，即使用户处于离线也不会读缓存
*

FALLBack:  // 指定了一个后备页面，当资源无法访问时，浏览器会使用这个页面
/html5/ /404.html   // 比如离线访问/html5/目录时，就会用本地的/404.html页


// js监听更新事件，重新加载页面
window.addEventListener("load", function(e){
  window.applicationCache.addEventtListener("updateready", function(e){
    if(window.applicationCache.status == window.applicationCache.UPDATEREADY){
      // 更新缓存，重新加载
      window.applicationCache.swapCache();
      window.location.reload();
    }
  })
})
~~~
## PWA
为了实现PWA应用添加至桌面的功能，除了要求站点支持HTTPS外，还需要准备manifest.json文件去配置应用的图标、名称等信息
~~~
<link rel="manifest" href="/manifest.json">

// manifest.json
{
  "name": "Minimal PWA",
  "short_name": "PWA Demo",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#313131",
  "background_color": "#313131",
  "icons": [
    {
      "src": "images/touch/homescreen48.png",
      "sizes": "48x48",
      "type": "image/png",
    }
  ]
}
~~~
## 基于webpack的react开发环境
### 搭建webpack项目
安装依赖
~~~
npm init -y
npm install @babel/polyfill react react-dom --save


npm install webpack webpack-cli webpack-dev-server @babel/core @babel/preset-env @babel/preset-react add-asset-html-webpack-plugin autoprefixer babel-loader clean-webpack-plugin css-loader html-webpack-plugin mini-css-extract-plugin node-sass postcss-loader sass-loader style-loader --save-dev
~~~
新建``.babelrc``
~~~
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage", // 根据browserlist填写浏览器，自动添加polyfill
        "corejs": 2, 
      }
    ],
    "@babel/preset-react" // 编译react
  ],
  "plugins": []
}
~~~
新建postcss.config.js
~~~
module.exports = {
  plugins: [
    require("autoprefixer") // 根据browserslist填写浏览器，自动添加css前缀
  ]
}
~~~
新建.browserslistrc
~~~
last 10 versions
ie >= 11
ios >= 9
android >= 6
~~~
新建webpack.dev.js
~~~
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    port: 9001,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 2,
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: "./src/index.html"}), // index打包模板
  ]
}
~~~
新建src目录，并新建src/index.html
~~~
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>learn dll</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
~~~
新建src/home.js
~~~
import React from "react";
import "./Home.scss";
export default ()=> <div className="home">home</div>
~~~
新建src/Home.scss
~~~
.home{
  color: red;
}
~~~
src/index.js
~~~
import React,{Component} from "react";
import ReactDom from "react-dom";
import Home from "./Home";
class Demo extends Component{
  render(){
    return <Home/>
  }
}
ReactDom.render(<Demo/>,document.getElementById("app"));
~~~
修改package.json
~~~
// npm start
"scripts": {
  "start": "webpack-dev-server --config webpack.dev.js"
}
~~~
新建webpack.prod.js
~~~
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 2,
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  // 代码分割
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chukFilename: "[id].[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
}
~~~
package.json
~~~
"build": "webpack --config webpack.prod.js"
~~~
### webpack-manifest-plugin
生成打包后的清单，对应打包后文件的真正路径
~~~
npm i webpack-manifest-plugin -D
~~~
修改webpack.prod.js
~~~
const ManifestPlugin = require("webpack-manifest-plugin");
module.exports = {
  // ...
  plugins: [
    new ManifestPlugin()
  ]
}
~~~
dist目录会生成一个manifest.json
~~~
{
  "main.css": "main.198b3634.css",
  "main.js": "main.d312f172.js",
  "index.html": "index.html"
}
~~~
比如在SSR开发时，前端打包后，node后端可以通过这个json数据，返回正确的资源路径的html模板
~~~
const buildPath = require("./dist/manifest.json");
res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content=ie-edge">
      <title>ssr</title>
      <link href="${buildPath['main.css']}" rel="stylesheet">
    </head>
    <body>
      <div id="app"></div>
      <script type="text/javasript" src="${buildPath["main.js]}"></script>
    </body>
  </html>
`)
~~~
### Dll打包
目的是提升打包速度：在第一次构建vendor.js以后，下次打包，就直接跳过那些被打包到vendor.js里的代码，从而提升打包速度。
dll打包原理：
  1. 把指定的库代码打包到一个dll.js，同时生成一份对应的manifest.json文件。
  2. webpack打包时，读取manifest.json，知道哪些代码可以直接忽略，从而提高构建速度
- 新建一个webpack.dll.js
~~~
// "build:dll": "webpack --config webpack.dll.js",
const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    vendors: ["react", "react-dom"] // 手动指定哪些库
  },
  output: {
    filename: "[name].[hash:8].dll.js",
    path: path.resolve(__dirname, "./dll"),
    library: "[name]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, "./dll/[name].manifest.json"), // 生成对应的manifest.json，给webpack打包用
      name: "[name]",
    })
  ]
}
~~~
- 修改webpack.prod.js【同时 npm i add-asset-html-webpack-plugin -D】
~~~
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 2,
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: "./src/index.html"}),
    new AddAssetHtmlPlugin({filepath: path.resolve(__dirname,"./dll/*.dll.js")}), // 把dll.js加到index.html里，并拷贝文件到dist目录
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css",
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/vendors.manifest.json") // 读取dll打包后的manifest.json，分析哪些代码跳过
    }),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  }
}
~~~
## runtime
webpack中有运行时的概念，比如我们跳过webpack打包分割成dll.js, vendors.js,main.js，这三个代码调用的先后顺序是由运行时代码组织（通过读取manifest数据）。
- 为优化缓存，可以把运行时代码单独提取出来，这样某些文件发生改变后，一些与之相关的文件hash值并不会随之改变。
~~~
// 通过配置runtimeChunk实现
optimization: {
  runtimeChunk: {name:"manifest"},
}
~~~
