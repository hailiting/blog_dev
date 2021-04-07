var fs = require("fs");
var _ = require("lodash");
// 基础函子
class Functor {
  constructor(val) {
    this.val = val;
  }
  map(f) {
    return new Functor(f(this.val));
  }
}
// Monad函子
class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    // 1. f==接受一个函数返回的是IO函子
    // 2. this.val 等于上一步的脏操作
    // 3. this.map(f)  compose(f,this.val)函数组合 需要手动执行
    // 4. 返回这个组合函数并执行，注意先后顺序
    return this.map(f).join();
  }
}
var compose = _.flowRight;
// IO函子用来包裹脏操作
class IO extends Monad {
  // val是最初的脏操作
  static of(val) {
    return new IO(val);
  }
  map(f) {
    return IO.of(compose(f, this.val));
  }
}
var readFile = function(filename) {
  return IO.of(function() {
    return fs.readFileSync(filename, "utf-8");
  });
};
var print = function(x) {
  console.log("111");
  return IO.of(function() {
    console.log("22222");
    return x + "函数式";
  });
};
var tail = function(x) {
  console.log(1111 + x);
  return IO.of(function() {
    return x + "1121212";
  });
};
const result = readFile("./user.txt").flatMap(print);
// .flatMap(print)()
// .flatMap(tail)();
console.log(result().val());
// console.log(result.val());
