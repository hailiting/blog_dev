# ES6基础_newSet
Set对象储存的值总是唯一的, 本身返回的是对象
## Set对象方法
* add 添加某个值，返回Set对象本身
* clear 删除所有键值对，没有返回值
* delete 删除某个键，返回true，如果删除失败，返回false
* forEach 对每个元素执行指定操作
* has 返回一个布尔值，表示某个键是否在当前Set对象中
### Set 对象作用
#### 数组去重
~~~
var arr = [1,2,3,3,1,4];
[...new Set(arr)]; // [1,2,3,4]
Array.from(new Set(arr));  // [1,2,3,4]
// arr 本身没有改变
[...new Set('abaaacsaads')].join(''); // "abcsd"  字符串去重
new Set("ice");  //  ["i","c","e"]
// "aasd ass".split(" "); // ["aasd", "ass"]  =>  本身数组没有改变
~~~
#### 并集
~~~
var a  = new Set([1,2,3]);
var b = new Set([5,2,1,4]);
var union = new Set([...a, ...b]);  // {1, 2, 3, 5, 4}
~~~
#### 交集
~~~
var a  = new Set([1,2,3]);
var b = new Set([5,2,1,4]);
var intersect = new Set([...a].filter(x=>b.has(x))); // {1, 2}
~~~
#### 差集
~~~
var a =  new Set([1,2,3,4,5]);
var b =  new Set([5,2,31,5]); 
var difference = new Set([...a].filter(x=>!b.has(x)));  //  {1, 3, 4}
~~~