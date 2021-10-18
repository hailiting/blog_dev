// const {
//   SyncHook,
//   SyncBailHook,
//   SyncWaterfallHook,
//   SyncLoopHook,
//   AsyncParallelHook,
//   AsyncParallelBailHook,
//   AsyncSeriesHook,
//   AsyncSeriesBailHook,
//   AsyncSeriesWaterfallHook,
// } = require("tapable");

// 发布订阅
// 1. SyncHook 同步串行钩子，不关心函数的返回值
// 2. SyncBailHook 同步串行的钩子，上一个返回值不为null时跳过剩下逻辑
// 3. SyncWaterfallHook  同步串行  上一个监听函数返回值可以传递给下一个函数
// 4. SyncLoopHook  同步循环hook  如果这个函数返回true返回的执行undefined退出
// 5. AsyncParalleHook  异步 + 并发 + 不关心每一个返回值
// 6. AsyncParallelBailHook  异步+并发 上一个返回值不为null，跳过剩下逻辑
// 7. AsyncSeriesHook  异步+串行  不关心callback的参数
// 8. AsyncSeriesBailHook  callback 参数不为null
// 9. AsyncSeriersWaterfallHook  异步串行  上一个监听函数的返回值可以传递给下一个函数

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
