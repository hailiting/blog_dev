# JS 常用 api（一）

## 一，用 ES5 实现数组的 map 方法

```
Array.prototype.MyMap =  function(fn, context){
    var arr = Array.prototype.slice.call(this); // 深拷贝
    var mappedArr = [];
    for(var i=0;i<arr.length; i++ ){
        mappedArr.push(fn.call(context,arr[i],i,this));
    }
    return mappedArr;
}

var arr01 = ['213','12312','12ad'];
var arr02=arr01.MyMap(function(acc,index){
    return acc
})
```

## 二，用 ES5 实现数组的 reduce 方法

### reduce()

1，reduce()方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
2，reduce()可以作为高阶函数，用于函数的 compose;
tips: reduce()对于空数组是不会执行回调函数的。

```
var numbers = [12,23,31,123];
function getSum(total, num){
    return total+num;
}
function myFunction(item){
    var sum = numbers.reduce(getSum);
}
```

> `array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`
> total: 必须。初始值，或计算结束后的返回值。
> currentValue: 必须。当前元素
> currentIndex: 可选。 当前元素的索引
> arr: 可选。当前元素所属的数组对象
> initialValue: 可选。传递给函数的初始值

```
Array.prototype.myReduce = function(fn, initialValue){
    var arr = Array.prototype.slice.call(this);
    var res, startIndex; // 如果没有初始值   startindex 为1，如果有  startindex为0
    res = initialValue?initialValue: arr[0]
    startIndex = initialValue? 0:1;
    for(var i=startIndex; i<arr.length;i++){
        res=fn.call(null, res, arr[i], i, this);
    }
    return res;
}
```

## 三，实现 call/apply

### call()、apply()、bind()

```
// 例一：
var name = "小王", age = 17;
var obj = {
    name: '小张',
    objAge: this.age,  // this指 window
    myFun: function(){
        console.log(this.name + '年龄：'+this.age); // this这obj
    }
}
obj.objAge; // 17
obj.myFun(); // 小张年龄：undefined
// 例二：
var fav = "盲僧";
function shows(){
    console.log(this.fav);
}
shows(); // 盲僧
```

call()、apply()、bind() 重新定义 this 对象

```
var name = "小王", age = 17;
var obj = {
    name: '小张',
    objAge: this.age,  // this指 window
    myFun: function(){
        console.log(this.name + '年龄：'+this.age); // this这obj
    }
}
var db={
    name: "小红",
    age: 18,
}
obj.objAge; // 17
obj.myFun.call(db); // 小红年龄：18
obj.myFun.apply(db); // 小红年龄：18
obj.myFun.bind(db)(); // 小红年龄：18
```

tip： bind 返回的是一个新的函数，必须在次调用才会执行

#### 传参

```
var name = "小王", age = 17;
var obj = {
    name: '小张',
    objAge: this.age,  // this指 window
    myFun: function(a,b){
        console.log(this.name + '年龄：'+this.age+'来自'+a+", 去往"+b+'.'); // this这obj
    }
}
var db={
    name: "小红",
    age: 18,
}
obj.objAge; // 17
obj.myFun.call(db, '火星', '木星'); // 小红年龄：18， 来自火星, 去往木星。
obj.myFun.apply(db,['火星', '木星']); // 小红年龄：18， 来自火星, 去往木星。
obj.myFun.bind(db, '火星', '木星')(); // 小红年龄：18， 来自火星, 去往木星。
obj.myFun.bind(db,['火星', '木星'])(); // 小红年龄：18， 来自火星, 木星, 去往 undefind。
```

call, apply, bind 第一个参数都是 this 的指向对象，第二个参数有所不同。
apply 必须放到一个数组里

```
// 实现apply只要把下一行中的...args换为args即可
Function.prototype.myCall = function(context=window, ...args){
    let Func = this;
    let fn = Symbol('fn');
    context[fn] = func;
    let res = context[fn](...args); // 重点代码，利用this指向，相当于context.caller(...args);
    delete context[fn];
    return res;
}
```

## 四: object.create

```
function create(proto){
    function F(){};
    F.prototype = proto;
    F.prototype.constructor = F;
    return new F()
}
```
