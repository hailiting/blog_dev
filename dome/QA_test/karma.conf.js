// Karma configuration
// Generated on Thu Apr 08 2021 10:11:24 GMT+0800 (GMT+08:00)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: ["./tests/unit/*.js", "./tests/unit/*.spec.js"],

    // list of files / patterns to exclude
    exclude: [],

    // 对哪些文件进行覆盖率的检查
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "./tests/unit/**/*.js": ["coverage"],
    },

    // 测试结果的报告
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "coverage"],
    // 报表
    coverageReporter: {
      type: "html",
      dir: "./docs/coverage/",
    },
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["PhantomJS"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true, // 如果是无头浏览器  必须是true

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
