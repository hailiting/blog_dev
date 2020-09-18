# Generator

## generator(生成器)是 ES6 标准引入新的数据类型，一个 generator 看上去像一个函数，但返回多次

一个函数的完整代码：调用一个函数，传入参数，返回结果：

```
function foo(x){
    return x+x;
}
var r=foo(1); // 有return 则return，没return,实际return undefined;
```

generator 和函数不同， generator 由`function*`定义，并且，除了 return，还可以用`yield`返回多次。

```
function* foo(x){
    yield x+1;
    yield  x+2;
    return x+x;
}
var f = foo(5);
console.log(f.next()) // {value: 6, done: false}
console.log(f.next()) // {value: 7, done: false}
console.log(f.next()) // {value: 10, done: true}
console.log(f.next()) // {value: undefined, done: true}
// 婓波那契数列
function* fib(max){
    var t,
        a=0,
        b=1,
        n=0;
    while (n<max){
        yield a;
        [a,b] = [b,a+b];
        // console.log(a,b)
        n++;
    }
    return;
}
for (var x of fib(10)){
    console.log(x)
}
```

### generator 和普通函数相比，有什么用？

1，是一个可以记住执行状态函数
2，把异步回调代码变为‘同步’代

```
try{
    r1 = yield ajax('api/url1', data1);
    r2 = yield ajax('api/url2', data2);
    r3 = yield ajax('api/url3', data3);
    success(r3)
} catch(err){
    console.log(err)
    handle(err)
}


function* next_id(k){
    let id = 0;
    for(;;){
        if(id<k){
            yield ++id
        } else{
            return
        }
    }
}
for(var x of next_id(10)){
    console.log(x)
}
```

```
// 初始化任务
function init({sliceList, callback}){
    if(!isFunction(callback)){
        console.log('callback必传，并为function');
        return;
    }
    // 添加切片队列
    this.generator = this.sliceQueue({
        sliceList,
        callback // 用来通知切片的位置
    })
    // 开始切片
    this.next();
}
// 切片队列
function* sliceQueue({sliceList, callback}){
    let listOrNum = (isNum(sliceList) && sliceList) || (isArray(sliceList) && sliceList.length);
    for(let i=0;i<listOrNum; ++i){
        const start = performance.now();
        callback(i);
        while (performance.now()-start<16.7){
            yield;
        }
    }
}
function next(){
    const {generator} = this;
    const start = performance.now();
    let res = null;
    do{
        res=generator.next();
    } while(!res.done && performance.now()-start<16.7);
    if(res.done) return;
    raf(this.next.bind(this))
}
```
