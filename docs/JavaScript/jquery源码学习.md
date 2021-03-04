# jquery 源码学习

## 插件绑定

```js
/// 目的是为了取到挂载到`jQuery.fn`上的方法
(function (window, undefined) {
  var jQuery = function () {
    // jQuery.fn.init.prototype == jQuery.fn
    // jQuery.fn.init.prototype == jQuery.prototype
    return new jQuery.fn.init();
  };
  jQuery.fn = jQuery.prototype = {};
  var init = (jQuery.fn.init = function () {});
  init.prototype = jQuery.fn;
})(window);
```

## `$()`回调

```js
function addMethod(object, name, f) {
  var old = object[name];
  object[name] = function () {
    // console.log(f);
    if (f.length === arguments.length) {
      return f.apply(this, arguments);
    } else {
      return old.apply(this, arguments);
    }
  };
}
var people = {
  name: ["a1", "a2", "a3"],
};
var find0 = function () {
  return this.name;
};
var find1 = function (name) {
  var arr = this.name;
  for (var i = 0; i <= arr.length; i++) {
    if (arr[i] === name) {
      return arr[i] + "在" + i + "位";
    }
  }
};
function fn(a1, a2) {
  console.log(`实参 ${arguments.length}`);
  console.log(`形参 ${fn.length}`);
}
fn("s", "d", "as");

addMethod(people, "find", find0);
addMethod(people, "find", find1);
console.log(people.find("a1"));
```

## 多重短路和短路

```js
// 哪里走通是哪里
console.log(false || "test"); // test
console.log(true || "test"); // true
console.log("test" || false); // test
console.log("test" || true); // test

// 哪里走不通是哪里
console.log("test" && false); // false
console.log("test" && true); // true
console.log(false && "test"); // false
console.log(true && "test"); // test

// 钩子
var data = {
  index1: 1,
  index2: 2,
};
var s = "index1";
data[s] && function () {};
```

## trim- 充分利用变量

```js
var core_version = "1.19.2";
var core_trim = core_version.trim;
function trim(data) {
  return core_trim.bind(data)(data);
}
console.log(trim(" da;   ").length);
```

## `$.ready`

```js
var $ = (window.ready = function (fn) {
  if (document.addEventListener) {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        // arguments.callee 指向arguments对象的函数
        document.removeEventListener(
          "DOMContentLoaded",
          arguments.callee,
          false
        );
        fn();
      },
      false
    );
  } else if (document.attachEvent) {
    IEContentLoaded(window, fn);
  }
  function IEContentLoaded(w, fn) {
    var d = w.document,
      done = false,
      init = function () {
        if (!done) {
          done = true;
          fn();
        }
      };
    (function () {
      try {
        d.documentElement.doScroll("left");
      } catch (e) {
        // 报错  50ms后 回来在执行
        setTimeout(arguments.calle, 50);
        return;
      }
      init();
    })();
    d.onreadystatechange = function () {
      if (d.readyState === "complete") {
        d.onreadystatechang = null;
        init();
      }
    };
  }
});
ready(function () {
  alert(1);
});
```
