# nodejs_特殊Api
* setTimeout和setInterval线程池不参与
* process.nextTick()实现setTimeout类似的功能【每次调用放入列表，在下一轮循环中取出】
* setImmediate()比process.nextTick()优先级低
* Node实现一个sleep
~~~
async function test(){
  console.log("hello");
  await sleep(1000);
  console.log("world!");
}
function sleep(ms){
  return new Promise(resolve=> setTimeout(resolve, ms))
}
~~~