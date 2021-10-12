// const { AsyncSeriesHook } = require("tapable");

// 发布订阅
// 1. SyncHook 同步串行钩子，不关心函数的返回值
// 2. SyncBailHook 同步串行的钩子，上一个返回值不是null，跳过剩下逻辑
// 3. AsyncParallelHook 异步并行
// 4. AsyncSeriesHook 各种各样的hook

class AsyncSeriesHook {
  constructor() {
    this.hooks = [];
  }
  tapAsync(name, fn) {
    console.log(name);
    this.hooks.push(fn);
  }
  callAsync() {
    let args = Array.from(arguments);
    let done = args.pop();
    let idx = 0;
    let that = this;
    function next(err) {
      if (err) return done();
      let fn = that.hooks[idx++];
      fn ? fn(...args, next) : done();
    }
    next();
  }
}

console.time("cost");
let queue = new AsyncSeriesHook(["name"]);
// 1. 订阅
queue.tapAsync("1", function(name, cb) {
  setTimeout(function() {
    console.log("--1--", name);
    cb();
    // cb("sss");
  }, 1000);
});
// 2. 订阅
queue.tapAsync("2", function(name, cb) {
  setTimeout(function() {
    console.log("--2--", name);
    cb("ss3333s");
  }, 2000);
});
queue.callAsync(["webpack", "webpack-cli"], (res) => {
  console.log("res: ", res);
  console.timeEnd("cost");
});
