const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("praise", () => {
  return gulp.src(["app/**", "!app/views/**", "!app/widget/**", "!app/public/**"])
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
  gulp.watch(["app/**", "!app/views/**", "!app/widget/**", "!app/public/**"], gulp.series("praise"))
}));