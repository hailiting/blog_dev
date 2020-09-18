# Dart 基础\_变量

## 变量

变量都是引用，变量 name 包含对一个 String 对象值是`Bob`的引用

```
var name = 'Bob';
```

### 默认值

未初始化的变量具有`null`的初始值。即使是数字类型，初始值也是 null，因为数字是对象。

```
int lineCount;
// 断言（assert），在生产环境下会被忽略。在检查模式下，如果为true，则继续执行下面的语句，反之则会丢出一个异常  AssertionError
assert(lineCount == null);
```

### 可选类型

```
String
var
int
...
```

### final 和 const

如果从不打算改变一个变量，使用`final`或`const`代替 var 或者其他类型。一个`final`变量只能被设置一次；一个`const`变量是一个编译时常数。

```
final name = 'Bob'; // or: final String name = 'Bob';
// name = 'Alice';  //  err: name值不能改变
```

> 延迟初始化变量最终有助于应用程序启动更快。
> 使用常量作为要编译的常数变量，如果 const 的变量是在类级别，将其标记为静态常量。（实例变量不能是 const）。  
> 如果你声明的变量，设置该值为 编译时常数设置，如：文字，一个 const 变量，或常数算术运算的结果

```
const bar = 1000000;   // 压力单位(dynes/cm2)
const atm = 1.01325*bar; // 标准大气压
```
