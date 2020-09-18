# nodejs\_特殊 Api

- setTimeout 和 setInterval 线程池不参与
- process.nextTick()实现 setTimeout 类似的功能【每次调用放入列表，在下一轮循环中取出】
- setImmediate()比 process.nextTick()优先级低
- Node 实现一个 sleep

```
async function test(){
  console.log("hello");
  await sleep(1000);
  console.log("world!");
}
function sleep(ms){
  return new Promise(resolve=> setTimeout(resolve, ms))
}
```
