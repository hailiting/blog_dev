# ajax fetch axios 三者的区别

不同维度

- ajax，一种技术统称（`Asynchronous Javascript and XML`）
- fetch 具体的 API
  - 浏览器原生 api，xmlHttpRequest 一个级别，支持 promise
- axios npm 库

## 用 XMLHttpRequest 实现简单 ajax 库

```js
function ajax1(url, successFn) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(xhr.responseText);
      }
    }
  };
  xhr.send(null);
}
function ajax2(url) {
  return fetch(url).then((res) => res.json());
}
```
