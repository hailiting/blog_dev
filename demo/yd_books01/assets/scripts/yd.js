(function() {
  var root =
    (typeof self === "object" && self.self === self && self) ||
    (typeof global === "object" && global.global === global && global) ||
    this ||
    {};
  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;
  // var arr = [1, 2, 3];
  // _(arr).map(arr, (item) => {
  //   console.log(item, 1);
  // });
  // _.map(arr, (item) => {
  //   console.log(item, 2);
  // });
  var _ = function(obj) {
    if (obj instanceof _) return obj; // 如果传入的对象是 _ 的实例
    // 非 new _(xxx)调用时，只有 new 调用 this 才与构造函数的原型链相等
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
  /**
   * 节流
   */
  _.throttle = function(fn, wait = 500) {
    let timer;
    return function(...args) {
      if (timer == null) {
        timer = setTimeout(() => {
          timer = null;
        }, wait);
        return fn.apply(this, args);
      }
    };
  };
  _.map = function(wrapped, cb) {
    console.log(wrapped, cb, "🍊");
  };
  // // 会污染map方法 实例下面的map方法改变，会导致原型链下map方法的改变
  // _.prototype.map = _.map;
  // _.prototype.map = function () {
  //   return _.map.call(this);  // 取构造函数下面的map方法执行，只是借用执行
  // }
  _.each = function(arr, cb) {
    /**
     * arr 为["map", "each", "isFunction", "mixin", ...]的数组
     * iteratee 为回调
     */
    if (Array.isArray(arr)) {
      for (let item of arr) {
        cb && cb.call(_, item);
      }
    }
  };
  _.functions = function(obj, cb) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };
  _.isFunction = function(obj) {
    return typeof obj === "function" || false;
  };
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = (_[name] = obj[name]);
      // 取构造函数原型链下面的 _[name] 方法执行， 只是借用执行
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(_, args);
      };
    });
    return _;
  };
  _.mixin(_);
  // 挂载到全局环境上
  if (typeof exports !== "undefined" && !exports.nodeType) {
    if (typeof module !== "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
})();
