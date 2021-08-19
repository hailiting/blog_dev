const gulp = require("gulp");
const entry = "./src/server/**/*.js";
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const cleanEntry = ["./src/server/config/index.js"];
const rollup = require("gulp-rollup"); // 做流清洗 也就是tree shaking
const replace = require("rollup-plugin-replace"); // 用提供的结果去替换打包后的变量名

function builddev() {
  return watch(entry, { ignoreInitial: false }, function() {
    gulp
      .src(entry)
      .pipe(
        babel({
          babelrc: false, // 需要自己独立的编译 很重要 忽略外面的.babelrc文件
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            "@babel/plugin-transform-modules-commonjs",
          ], // 需要安装@babel/plugin-transform-modules-commonjs
        })
      )
      .pipe(gulp.dest("dist"));
  });
}

// 上线环境
function buildprod() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false,
        ignore: cleanEntry, // 忽略掉此文件
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          "@babel/plugin-transform-modules-commonjs",
        ],
      })
    )
    .pipe(gulp.dest("dist"));
}

// 上线配置 tree shaking
function buildconfig() {
  return (
    gulp
      .src(entry)
      // transform the files here.
      .pipe(
        rollup({
          output: {
            format: "cjs", // common js 规范
          },
          // any option supported by Rollup can be set here.
          input: cleanEntry,
          plugins: [
            replace({
              "process.env.NODE_ENV": JSON.stringify("production"),
            }),
          ],
        })
      )
      .pipe(gulp.dest("./dist"))
  );
}

// 校验
function lint() {}

// Gulp 4抛弃了依赖参数（dependency parameter），用执行函数来代替：
// gulp.series 用于串行（顺序）执行
// gulp.parallel 用于并行执行

let build = gulp.series(builddev);

if (process.env.NODE_ENV == "production") {
  build = gulp.series(buildprod, buildconfig);
}

if (process.env.NODE_ENV == "lint") {
  build = gulp.series("lint");
}

gulp.task("default", build);
