# 浏览器与 nodejs(Event Loop) 事件循环有什么区别

## 浏览器

- js 是单线程的
- 浏览器中的 js 执行和 DOM 渲染共用一个线程
- 异步是单线程的解决方案
  - 宏任务: setTimeout, setInterval 网络请求
  - 微任务: promise, async/await, MulationObserver
  - 微任务在下一轮 DOM 渲染之前执行，宏任务在之后执行
  - 下一个宏任务可以开始执行的必要条件：1. 微任务队列为空，2. DOM 树没有检测到更新

```js
const p = document.createElement("p");
p.innerHTML = "new paragraph";
document.body.appendChild(p);
const list = document.getElementsByTagName("p");
console.log("length---", list.length);

console.log("start");
setTimeout(() => {
  const list = document.getElementsByTagName("p");
  console.log("setTimeout length on timeout---", list.length);
  // alert("setTimeout 阻塞");
}); // 宏任务->渲染之后触发
Promise.resolve().then(() => {
  const list = document.getElementsByTagName("p");
  console.log("Promise length on timeout---", list.length);
  // alert("Promise 阻塞");
}); // 微任务-> 渲染前触发
console.log("end");

ajax(url, fn); // 300ms
// 300ms 后 fn 才会放到eventLoop执行队列里

// 微任务 -> Dom渲染 -> 微任务
```

## nodejs

- Nodejs 同样使用 ES 语法，也是单线程，也需要异步
- 异步任务也分：宏任务与微任务
- 但是，它的宏任务和微任务，分不同类型，有不同优先级

### nodejs 宏任务类型及优先级

- Timers - setTimeout, setInterval
- I/O callbacks - 处理网络，流， TCP 的错误回调
- Idle, prepare - 闲置状态（Nodejs 内部使用）
- Poll 轮询 - 执行 poll 中的 I/O 队列
- Check 检查 - 存储 setImmediate 回调
- Close callbacks - 关闭回调，如 socket.on("close")

### nodejs 微任务类型与优先级

- 包括`process.nextTick`，`promise`，`async/await`
- 注意：`process.nextTick` 优先级最高

### nodejs event loop

- 执行同步代码
- 执行微任务（process.nextTick 优先级更高）
- 按顺序执行 6 个类型的宏任务（每个开始之前都执行当前的微任务）

### 开发注意事项

- 推荐使用`setImmediate`代替`process.nextTick`

```js
// A
setImmediate(() => {
  console.info("A setImmediate");
}, 0);
// B
setTimeout(() => {
  console.info("B setTimeout");
}, 0);
// C
Promise.resolve().then(() => {
  console.log("C promise then");
});
// D
process.nextTick(() => {
  console.log("D next tick");
});
// E
console.info("E end");

// E D C B A
```

```js
// nodejs
setImmediate(() => {
  // A
  console.log(1);
  // C
  Promise.resolve().then(() => {
    console.log(2);
  });
}, 0);
new Promise((resolve) => {
  // B
  console.log(3);
  resolve();
})
  // H
  .then(() => {
    console.log(4);
    // D
    process.nextTick(() => {
      console.log(5);
    });
    // E
    setTimeout(() => {
      console.log(6);
    }, 0);
  })
  // F
  .then(() => {
    console.log(7);
  });
// G
console.log(8);

// 同步： B G
// 微任务：
//   微任务一级： H
//   微任务一级->微任务：D
//   微任务一级->宏任务：E
//   微任务二级： F
// 宏任务：
//   A
//   宏任务->微任务： C

// nodejs 顺序
// B G H F D E A C
// 3 8 4 7 5 6 1 2
// 浏览器 eventLoop顺序
// B G H D F A C E
// 3 8 4 5 7 1 2 6
```

```js
new Promise((resolve) => {
  // B
  console.log(3);
  resolve();
})
  // H
  .then(() => {
    console.log(4);
    // D
    Promise.resolve().then(() => {
      console.log(5);
    });
    // E
    setTimeout(() => {
      console.log(6);
    }, 0);
  })
  // F
  .then(() => {
    console.log(7);
  });
setTimeout(() => {
  // A
  console.log(1);
  // C
  Promise.resolve().then(() => {
    console.log(2);
  });
}, 0);

// G
console.log(8);
// -----第一层分析
// 同步任务 G

// --- 微任务0层 -> 同步任务 B
// --- 微任务一层 -> 同步任务 H
// --- 微任务一层 -> 微任务 D

// --- 微任务二层 -> 同步任务 F

// --- 宏任务 -> 同步任务 A
// --- 宏任务 -> 微任务 C
// --- 宏任务 ->宏任务
// --- 微任务一层 -> 宏任务 E // 放在宏任务队列

// ---- 归类
```
