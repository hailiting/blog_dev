# offsetHeight scrollHeight clientHeight 区别

- 盒子模型`box-sizing: border-box`
- offsetHeight: border+padding+content
- clientHeight: padding+content
- scrollHeight: padding+实际内容尺寸

```js
const container = document.getElementById("container");
console.log("offsetHeight", container.offsetHeight);
console.log("offsetWidth", container.offsetWidth);
console.log("clientHeight", container.clientHeight);
console.log("clientWidth", container.clientWidth);
console.log("scrollHeight", container.scrollHeight);
console.log("scrollWidth", container.scrollWidth);
```
