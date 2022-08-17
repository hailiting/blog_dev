# requestIdleCallback 和 requestAnimationFrame 有什么区别

- rAF 浏览器用于定时循环操作的一个接口，主要用途是按帧对网页进行重绘

## requestIdleCallback

### 由 React fiber 引起的关注

- 组件树转换为链表，可分段渲染
- 渲染时可以暂停，去执行其他高优任务，空闲时再继续渲染
- 如何判断空闲-> requestIdleCallback

- requestAnimationFrame 与 setTimeout 的执行顺序不确定
  - requestAnimationFrame 是宏任务，因为要等 DOM 渲染结束才执行
- 浏览器会在下一次重绘前执行`window.requestAnimationFrame()`

## 区别

- requestAnimationFrame 每次渲染都会执行，高优(不管怎么样，这一帧完成后一定要执行)
- requestIdleCallback 空闲时才会执行，底优(空闲是渲染)

```html
<p id="box">part one</p>
<button id="btn1">btn1</button>
<script>
  const box = document.getElementById("box");
  document.getElementById("btn1").addEventListener("click", () => {
    let curWidth = 100;
    const maxWidth = 400;
    let add = true;
    function addWidth() {
      if (add && curWidth < maxWidth) {
        curWidth = curWidth + 3;
      } else if (!add && curWidth >= 0) {
        curWidth = curWidth - 3;
        add = false;
      } else {
        if (curWidth === maxWidth) {
          add = false;
        } else {
          add = true;
        }
      }
      box.style.width = `${curWidth}px`;
      window.requestAnimationFrame(addWidth);
    }
    addWidth();
  });
</script>
```

```js
window.onload = () => {
  console.info("start");
  new Promise((resolve) => {
    console.info("promise");
    resolve();
  }).then(() => {
    console.info("promise.then");
  });
  setTimeout(() => {
    console.info("setTimeout");
  });
  window.requestAnimationFrame(() => {
    console.info("requestAnimationFrame");
  });
  window.requestIdleCallback(() => {
    console.info("requestIdleCallback");
  });
  console.info("end");
};
```
