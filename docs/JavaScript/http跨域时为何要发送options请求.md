# http 跨域时为何要发送 options 请求

- options 请求是发生在跨域访问的时候。
  - 跨域资源访问通过一种机制来检查服务器是否会允许要发送真实请求，该机制通过浏览器发起一个到服务器托管的跨域资源“预检”请求。在预检中，浏览器发送的头中标有 http 方法和真实请求中会用到的头

## 跨域请求

- 浏览器同源策略
- 同源策略一般限制 Ajax 网络请求，不能跨域请求 server
- 不会限制`<link>`, `<img>`,`<script>`,`<iframe>`加载第三方资源

### jsonp

```html
<!-- www.aaa.com -->
<script src="https://www.bbb.com/getData"></script>
<!-- 'onSuccess({errno: 0, data: {/* 数据内容 */}})' -->
<script>
  window.onSuccess = function (data) {
    console.log(data);
  };
</script>
```

### cors

```js
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8011");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader(
  "Access-Control-Allow-Methods",
  "PUT,POST,GET,DELETE,OPTIONS"
);
// 允许跨域接收cookie
// 前端： withCredentials = true
response.setHeader("Access-Control-Allow-Credentials", "true");
```
