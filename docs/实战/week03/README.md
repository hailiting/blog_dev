# 知识点
1. 使用``X-Tag``封装点赞插件``<x-praise></x-praise>``;
2. 使用Glup编译koa2源代码并能监控源代码变化自动编译；
3. 使用webpack配置上线版本、开发版本配置文件，并能监控文件的变化自动刷新浏览器；
4. 使用webpack能够对css、js进行编译压缩打包合并并生成MD5;
5. 去掉System.js，利用webpack进行文件引用（同时提取公共文件成独立JS包）
6. 将编译后的文件能按照Chunk规律分发静态文件并编译进Swig;

## ``X-Tag``是什么
他是一个JavaScript库，具体用法：
~~~
// html
<body>
  <x-clock></x-clock>
</body>
<script src="./x-tag-raw.js"></script>
<script src="index.js"></script>
// index.js   create   register
xtag.create("x-clock", class extends XTagElement{
  connectedCallback(){
    this.start();
  }
  start(){
    this.update();
    this._interval = setInterval(()=>this.update(), 1000);
  }
  stop(){
    this._interval = clearInterval(this._data.interval);
  }
  update(){
    this.textContent = new Date().toLocaleTimeString();
  }
  "tap::event"(){
    if(this._interval) this.stop();
    else this.start();
  }
})
~~~
## ``glup``：基于流（stream）的自动化构建工具
~~~
npm i gulp-cli -g
mkdir gulpdir
cd gulpdir
npm i --save-dev gulp
npx -p touch nodetouch gulpfile.js
gulp --help

// gulpfile.js
const {src, dest} = require("gulp");
function copy(){
  return src("input/*.js").pipe(dest("output/"));
}
export.copy = copy
~~~
#### gulp-babel 8 + babel 7
~~~
> gulp-babel 8 对应babel 7
> npm install --save-dev gulp-babel @babel/core @babel/preset-env
> npm install --save-dev @babel/plugin-transform-runtime  // 防止 regeneratorRuntime is not defined
> npm install --save @babel/runtime

> gulp-babel 7 对应babel 6  
> npm install --save-dev gulp-babel@7 babel-core babel-preset-env
const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("praise", () => {
  return gulp.src(["app/**", "!app/views/**"])
    .pipe(babel(
      {
        "presets": [
          [
            "@babel/preset-env",
            {
              "targets": {
                "node": "4"
              }
            }
          ]
        ],
        "plugins": [
          "@babel/plugin-transform-runtime"
        ]
      }
    ))
    .pipe(gulp.dest("./build"))
})

gulp.task("default", gulp.series("praise", () => {
  gulp.watch(["app/**", "!app/views/**"], gulp.series("praise"))
}));
~~~
## ``webpack``
better-npm-run   package.json 处理
### 常见的webpack参数
~~~
webpack -- config xxx.js // 使用另一份配置文件（比如webpack.config2.js）来打包
webpack --watch // 监听变动并自动打包
webpack -p  // 压缩混淆脚本
webpack -d  // 生成map映射文件，告知哪些模块被最终打包到哪里
webpack --progress // 显示进度条
webpack --color  // 显示颜色 
~~~
#### ``webpack-livereload-plugin``监控文件变化
需要谷歌的 livereload 
~~~
# for webpack 4 
npm install --save-dev webpack-livereload-plugin
# for webpack 3 
npm install --save-dev webpack-livereload-plugin@1


// webpack.config.js
var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
  plugins: [
    new LiveReloadPlugin(options)
  ]
}
~~~
#### ``babel-loader``
~~~
npm install -D babel-loader @babel/core @babel/preset-env webpack
npm install -D @babel/plugin-transform-runtime
npm install --save @babel/runtime
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }
  ]
}
~~~
#### ``extract-text-webpack-plugin-last``
打包css
~~~
// webpack v4
npm install --save-dev extract-text-webpack-plugin@4.0.0-beta.0;
// 用法
const ExtractTextPlugin = require("extract-text-webpack-plugin");
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
npm install --save-dev style-loader css-loader
module: {
  rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }
  ]
},
plugins: [
  new ExtractTextPlugin("styles.css") // 路径与名称
]
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
npm install --save-dev style-loader css-loader sass-loader node-sass
modules: {
  rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }
  ]
}
~~~
#### ``optimize-css-assets-webpack-plugin``
打包压缩
~~~
npm install --save-dev optimize-css-assets-webpack-plugin
// 使用
var OptimizeCssAssertsPlugin = require("optimize-css-assets-webpack-plugin");
...
plugins: [
  new ExtractTextPlugin("styles.css")
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: require("cssnano"),
    cssProcessorPluginOptions: {
      preset: ["default", {discardComments: {removeAll: true}}]
    },
    canPrint: true
  })
]
...
~~~
#### ``SplitChunksPlugin``
CommonsChunkPlugin 主要是提取第三方库和公共模块，避免首屏加载bundle文件或按需加载的bundle文件体积过大
##### ``第三方库``,``自定义公共模块``,``webpack运行文件``
~~~
splitChunks: {
  chunks: "async",
  minSize: 30000, // 30kb 模块的最小体积
  minChunk: 1, // 模块的最小被引用次数
  maxAsyncRequests: 5,  // 按需加载的最大并行请求数
  maxInitialRequests: 3, // 一个入口最大并行请求数
  automaticNameDelimiter: "~", // 文件名的连接符
  name: true,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      priority: -10
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
} 
~~~
#### ``html-webpack-plugin``
~~~
npm i --save-dev html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins: [
  ...
  new HtmlWebpackPlugin({
    filename: "./views/layout.html",
    template: "app/views/layout.html"
  }),
  new HtmlWebpackPlugin({
    filename: "./views/index.html",
    template: "app/views/index.html"
  })
]
~~~


