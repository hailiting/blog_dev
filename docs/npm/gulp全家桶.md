# gulp 全家桶

## 常用的 npm 包

- `gulp`
- `gulp-watch`
- `gulp-babel`
- `gulp-rollup`
- `rollup-plugin-replace`
- `gulp-sequence`
- `gulp-eslint`
- `gulp-log-line`
- `gulp-uglify` 对 js 进行压缩
- `gulp-concat` 对 js 进行合并操作
- `gulp-htmlmin` 对 html 进行压缩
- `gulp-less` 对 less 文件编译
- `gulp-sass` 对 sass/scss 文件编译
- `gulp-rename` 重命名
- `gulp-clean-css` 对 css 进行压缩操作
- `gulp-imagemin` 压缩图片
- `del` 删除文件 | 文件夹
- `gulp-cache` 加缓存

### `gulp`

gulp: 前端自动化构建工具

#### 常用核心方法

- `gulp.task("任务名", function(){})` => 创建任务
- `gulp.src("./\*.css")` => 指定想要处理的文件
- `gulp.dest()` => 指定最终处理后的文件和存放路径
- `gulp.watch()` => 自动监视文件的变化，然后执行相应任务
- `gulp.run("任务名")` => 直接执行相应的任务

#### `npmjs.com`的范例

```js
const gulp = require("gulp");
const less = require("gulp-less");
const babel = require("gulp-babel");
const concat = require("gulp.conncat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

const imageminPngquant = require("imagemin-pngquant");
const imageminZopfli = require("imagemin-zopfli");
const imageminMozjpeg = require("imagemin-mozjpeg"); //need to run 'brew install libpng'
const imageminGiflossy = require("imagemin-giflossy");

const del = require("del");

const paths = {
  styles: {
    src: "src/styles/**/*.less",
    dest: "assets/styles/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "assets/scripts/",
  },
  images: {
    src: "src/images/**/*.{gif,png,jpg,jpeg}",
    dest: "assets/img/",
  },
};
function clean() {
  return del(["assets"]);
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(
      rename({
        basenname: "main",
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(
      babel({
        // 关闭外侧的 .babelrc
        babelrc: false,
        plugins: [
          "babel-plugin-transfron-es2105-modules-commonjs",
          "transfrom-decorators-legacy",
        ],
      })
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}
function images() {
  return (
    gulp
      .src(paths.images.src, { since: gulp.lastRun(images) })
      // .pipe(imagemin({optimizationLevel: 5}))
      .pipe(
        cache(
          imagemin([
            //png
            imageminPngquant({
              speed: 1,
              quality: 98, //lossy settings
            }),
            imageminZopfli({
              more: true,
              // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
              optimizationLevel: 3,
              optimize: 3, //keep-empty: Preserve empty transparent frames
              lossy: 2,
            }),
            //svg
            imagemin.svgo({
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            }),
            //jpg lossless
            imagemin.jpegtran({
              progressive: true,
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
              quality: 90,
            }),
          ])
        )
      )
      .pipe(gulp.dest(paths.images.dest))
  );
}
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}
const bulid = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean = claen; // gulp claen
exports.styles = styles; // gulp styles
exports.scripts = scripts; // gulp scripts
exports.images = images; // gulp images
exports.watch = watch; // gulp watch
exports.build = build; // gulp build

exports.default = build; // gulp
```

### `gulp-less`

### `gulp-clean-css`

```js
const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
gulp.task("minify-css", () => {
  return gulp
    .src("styles/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist"));
});
```

### `gulp-rename`

```js
const gulp = require("gulp");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

gulp.task("rename", function() {
  gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(rename("*.min.js"))
    .pipe(gulp.dest("dist/js"));
});
```

```js
// 老式写法
const gulp = require("gulp"),
  watch = require("gulp-watch");
const babel = require("glob-babel");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const gulpSequence = require("gulp-sequence");
const eslint = require("gulp-eslint");
const logLine = require("gulp-log-line");
gulp.task("builddev", () => {
  return watch(
    "./src/nodeuii/**/*.js",
    {
      ignoreInitial: false,
    },
    () => {
      gulp
        .src("./src/nodeuii/**/*.js")
        .pipe(
          babel({
            // 关闭外侧的 .babelrc
            babelrc: false,
            plugins: [
              "babel-plugin-transfron-es2105-modules-commonjs",
              "transfrom-decorators-legacy",
            ],
          })
        )
        .pipe(logLine(["console.log", "winston.info"]))
        .pipe(gulp.dest("dist"));
    }
  );
});
gulp.task("buildprod", () => {
  gulp
    .src("./src/nodeuii/**/*.js")
    .pipe(
      babel({
        // 关闭外侧的 .babelrc
        babelrc: false,
        ignore: ["./src/nodeuii/config/*.js"],
        plugins: [
          "babel-plugin-transfron-es2105-modules-commonjs",
          "transfrom-decorators-legacy",
        ],
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("configclean", function() {
  gulp
    .src("./src/nodeuii/**/*.js")
    .pipe(
      rollup({
        output: {
          format: "cjs",
        },
        input: "./src/nodeuii/config/index.js",
        plugins: [
          replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
          }),
        ],
      })
    )
    .pipe(gulp.dest("./dist"));
});
gulp.task("lint", function() {
  gulp
    .src("./src/nodeuii/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

let _task = ["builddev"];
if (process.env.NODE_ENV === "production") {
  console.log("production");
  _task = gulpSequence("buildprod", "configclean");
}
if (process.env.NODE_ENV === "lint") {
  console.log("lint");
  _task = gulpSequence("buildprod", "lint");
}
// console.error(_task)
gulp.task("default", _task);
```
