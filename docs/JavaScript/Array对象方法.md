# Array 对象方法

## connect() 连接两个或更多的数组，并返回结果

## copyWithin() 从数组的指定位置拷贝元素到数组的另一个指定位置中

## entries() 返回数组的可迭代对象

## every() 检测数值元素的每个元素是否都符合条件

## fill() 使用一个固定值来填充数组

## filter() 检测数值元素，并返回符合条所有元素的数组

## find() 返回符合传入测试（函数）条件的数组元素

## findIndex() 返回符合传入测试（函数）条件的数组元素索引

## forEach() 数组每个元素都执行一次回调函数

## from() 通过给定的对象中创建一个数组

## includes() 判断一个数组是否包含一个指定的值

## indexOf() 搜索数组中的元素，并返回它所在的位置

## isArray() 判断对象是否为数组

## join() 把数组的所有元素放入一个字符串

## keys() 返回数组的可迭代对象，包含原始数组的键(key)

## lastIndexOf() 搜索数组中的元素，并返回它最后出现的位置

## map() 通过指定的函数处理数组的每个元素，并返回处理后的数组

## shift() 删除并返回数组的第一个元素

## pop() 删除数组的最后一个元素并返回删除的元素

## push() 向数组尾部添加一个或多个元素，并返回新的长度

## reduce() 将数组元素计算为一个值（从左到右）

`array.reduce(function(total,currentValue,currentIndex,arr),initialValue)`

#### total: 必须，初始值，或者计算结果后的返回值

#### currentValue: 必须，当前元素

#### currentIndex: 可选，当前元素的索引

#### arr: 可选，当前元素所属的数组对象

```
const nums = [1,2,3]
const total = nums.reduce((acc,item)=>act+item,0)
```

## reduceRight() 将数组元素计算为一个值（从右到左）

## reverse() 反转数组的元素顺序

## slice() 选取数组的一部分，并返回一个新的数组

## some() 检测数组元素中是否有元素符合指定条件

## sort() 对数组元素进行排序

## splice() 从数组中添加或删除元素

```
var array = ["one", "two", "four"];
console.log(JSON.stringify(array));//["one","two","four"]
//在指定位置添加元素,第一个参数指定位置,第二个参数指定要删除的元素,如果为0,则追加
array.splice(2, 0, "three");
console.log(JSON.stringify(array));//["one","two","three","four"]
```

## toString() 把数组转换为字符串，并返回结果

## unshift() 向数组开头添加一个或多个元素，并返回新的长度

## valueOf() 返回数组对象的原始值
