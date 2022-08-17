# 请描述 JS Bridge 原理

## 什么是 js bridge

- js 无法直接调用 Native API
- 需要用一些特定”格式“来调用
- 这些格式就统称`js-bridge`，例如微信的 JSSDK

app => 灌输很多 api => js 对 api 封装 => js 调用

- 注册全局 api
  - 问题：异步
- URL Scheme

```html
<iframe id="iframe1"></iframe>
<script>
  const iframe1 = document.getElementById("iframe1");
  iframe1.onload = () => {
    const content = iframe1.contentWindow.document.body.innerHTML;
    console.log("conent", content);
  };
  // iframe1.src = "http://127.0.0.1:5500/index.html";
  // app 获取识别到src为内定的，则app逻辑处理
  // url-scheme
  iframe1.src = "my-app-name://api/getversion";
</script>
```

```js
// 封装js-bridge
const sdk = {
  invoke(url, data = {}, onSuccess, onError) {
    const iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
    iframe.onload = () => {
      const content = iframe.contentWindow.document.body.innerHTML;
      onSuccess(JSON.parse(content));
      iframe.remove();
    };
    iframe.onerror = () => {
      onError();
      iframe.remove();
    };
    iframe.src = `my-app-name://${url}?data=${JSON.stringfy(data)}`;
  },
  fn1(data, onSuccess, onError) {
    this.invoke("api/fn1", data, onSuccess, onError);
  },
};
sdk.fn1("{'name': 'aaaa'}");
```
