# for-await-of 有什么作用

- `for await ...of`用于遍历多个 Promise

```js
function createPromise(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, 1000);
  });
}
(async function () {
  const p1 = createPromise(100);
  const p2 = createPromise(200);
  const p3 = createPromise(300);
  const p4 = createPromise(400);
  const list = [p1, p2, p3, p4];
  // Promise.all(list).then((res) => console.log(res));
  for await (let res of list) {
    console.log(res);
  }
})();
```
