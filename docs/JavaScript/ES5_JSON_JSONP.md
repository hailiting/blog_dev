# ES5 JSON JSONP

## json

```js
"use strict";
var result = JSON.parse('{"a":1, "b":"2"}', function (key, value) {
  if (typeof value == "string") {
    return parseInt(value);
  } else {
    return value;
  }
});
console.log(result);

/// 反向处理
var luckyData = JSON.stringify(
  {
    first: 1,
    second: 2,
    k: {
      a: 1,
      b: 4,
    },
  },
  function (key, value) {
    if (value == 2) {
      return 2 + 2;
    }
    return value;
  },
  2 // 格式化行数
);
```

## JSON 和 JSONP

### 区别

- 定义不同
  JSON 是一种基于文本的数据交换方式（不支持跨域），而 JSONP 是一种非官方跨域数据交互协议
- 核心不同
  json 的核心是通过 XMLHttpRequest 获取非本页内容，而 jsonp 的核心则是动态添加`<script>`标签来调用服务器提供的 js 脚本
- 使用方法

```js
/// jsonp
$.getJSON(
  "https://跨度的DNS/document!searchJSON.action?name1=" +
    value1 +
    "&jsoncallback=?",
  function (json) {
    if (json.属性名 == 值) {
      // todo
    }
  }
);
// jsonp
$.ajax({
  type: "get",
  async: false,
  url: "http://....aspx?code=CA1998",
  dataType: "jsonp",
  jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
  jsonpCallback: "flightHandler", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
  success: function (json) {
    alert(
      "您查询到航班信息：票价： " +
        json.price +
        " 元，余票： " +
        json.tickets +
        " 张。"
    );
  },
  error: function () {
    alert("fail");
  },
});
// json
var res = await getData();
JSON.parse(res);
```
