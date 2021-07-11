# gulp 配置

`Gulp.js`是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见无。Gulp 是基于 nodejs 构建的，利用 nodejs 流的威力，可以快速构建项目并减少频繁的 IO 操作。  
io 基于流式的打包

```js
> npm i gulp-cli --save-dev
> npm i gulp -D
> npx -p touch nodetouch gulpfile.js
> gulp
```

在运行`gulp`时会自动加载`gulpfile.js`

- 对于 TypeScript，重命名为 gulpfile.ts 并安装 ts-node 模块。
- 对于 Babel，重命名为 gulpfile.babel.js 并安装 @babel/register 模块。

```js
// gulpfile.js
const { src, dest, parallel } = require("gulp");
const pug = require("gulp-pug");
const less = require("gulp-less");
const minifyCSS = require("gulp-csso");
const concat = require("gulp-concat");

function html() {
  return src("client/templates/*.pug")
    .pipe(pug())
    .pipe(dest("build/html"));
}

function css() {
  return src("client/templates/*.less")
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest("build/css"));
}

function js() {
  return src("client/javascript/*.js", { sourcemaps: true })
    .pipe(concat("app.min.js"))
    .pipe(dest("build/js", { sourcemaps: true }));
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);
```
