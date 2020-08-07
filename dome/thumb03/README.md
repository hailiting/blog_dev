# 知识点
1. 使用``X-Tag``封装点赞插件``<x-praise></x-praise>``;
2. 使用Gulp编译koa2源代码并能监控源代码变化自动编译；
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
## ``gulp``：基于流（stream）的自动化构建工具
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
#### cssnano
对css做多方面的压缩，以确保最终生成的文件对生产环境来说体积最小
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
主要有两个作用
* 1. 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
* 2. 可以生成创建html入口文件，比如单页面可以生成一个html文件认可，配置N个html-webpack-plugin就可以生成N个页面入口
##### 常见的配置作用
~~~
plugins: [
  new HtmlWebpackPlugin({ // 打包输出html
    title: "my app", // 生成html的title
    filename: "index.html", // 输出的html文件名称

    /**
    * template: 根据自己的指定模板文件来生成特定的html文件，这里的模板类型可以是任
    * 意你喜欢的模板，如 html, jade, ejs, hbs等。但要注意，使用自定义模板文件时，
    * 需要提前安装对应的loader,否则webpack不能正确解析。
    */
    template: "index.html",  // html模板所在的文件路径

    /**
    * 注入选项，有四个选项值 true, body, head, false
    * 1, true, 默认值，script标签位于html文件的body底部
    * 2, body, script标签位于html文件body底部 （同true）
    * 3, head: script标签位于head标签内
    * 4, false: 不能插入删除的js,只是单纯的html文件
    */
    inject: true,
    favicon: "./favicon.svg", // 给生成的html加favicon，值为favicon文件所在目录
    minify: { // 压缩HTML文件
      caseSensitive: true, // 是否对大小写敏感，默认false
      collapseBooleanAttributes: true, // 是否简写boolean格式的属性 如：disabled = "disabled" 简写为disabled，默认为false
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 删除空白符和换行符
      minifyCSS: true, // 压缩内联css
      minifyJS: true, // 压缩html里的js 使用 uglify-js 进行压缩
      preventAttributesEscaping: true, //防止转义属性值
      removeAttributeQuotes: true, // 是否移除属性里的引号
      removeCommentsFromCDATA: true, // 是否从脚本和样式删除注释
      removeEmptyAttributes: true, // 是否删除空属性
      removeOptionalTags: false, // true时 生成的html没有body和head, html也未合并
      removeRedundantAttributes: true, // 删除多余属性
      removeScriptTypeAttributes: true, // 删除script的属性类型["text/javascript"]
      removeStyleLinkTypeAttribute: true, // 删除style 的 text/css type属性
      useShortDoctype: true, // 使用短的文档类型，默认为false
      hash: true, // 给文件加hash
      cache: true, // 内容变化的时候生成一个新的文件
      showErrors: true, // 定位错误

      /**
      * chunks 主要用于多入口文件，编译后生成多个打包后的文件
      * entry: {
      *   index: path.resolve(__dirname, "./src/index.js"),
      *   devor: path.resolve(__dirname, "./src/devor.js"),
      *   main: path.resolve(__dirname, "./src/main.js"),
      * }
      * plugins: [
      *   new httpWebpackPlugin({
      *     chunks: ['index', 'main'], // 等同于 excludeChunks: ["devor.js"]
      *   })
      * ]
      * 编译后生成的文件
      * <script type=text/javascript src="index.js"></script>
      * <script type=text/javascript src="main.js"></script>
      * 
      */
      chunks: ['index', 'main'], // 
    },
  })
]
~~~


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


