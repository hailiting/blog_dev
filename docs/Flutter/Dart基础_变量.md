# Dart 基础\_变量

## 变量

变量都是引用

```dart
// 变量 name 包含对一个 string 对象值是`Bob`的引用
var name = 'Bob';
```

### 默认值

未初始化的变量具有`null`的初始值。即使是数字类型，初始值也是 null，因为数字是对象。

```dart
int lineCount;
// 断言（assert），在生产环境下会被忽略。在检查模式下，如果为true，则继续执行下面的语句，反之则会丢出一个异常  AssertionError
assert(lineCount == null);
```

### 可选类型

```dart
String
var
int
...
```

### `final` 和 `const` 和 `var`

如果从不打算改变一个变量，使用`final`或`const`代替`var`或者其他类型。

#### final

`final`用来修饰变量，只能被赋值一次，是在运行时赋值的，所谓运行时，是当程序执行到这块代码，才会对 final 修饰的变量进行赋值。

- 当`final`使用在类中时，在声明变量时，就必须对其初始化赋值

```dart
// 错误写法
class testPage {
  final String title; // error: title必须被初始化
  void test(){
    title = "aaa"; // error  title是final变量，不能被赋值
  }
}
// 正确写法
class testPage {
  final String title="aaa";
  void test(){
    // do sth
  }
}
```

- 当`final`运行在`StatefulWidget`中用来修饰变量时：

```dart
class TestPage extends StatefulWidget{
  final String title; // 这里不会报错，因为只有当定义的StatefulWidget被初始化使用时，这里的final修饰的变量才会被赋值，当然也是赋值一次。
  TestPage({this.title});
  @override
  _TestPageState createState()=>_TestPageState();
}
```

#### `const`

`const`可用来修饰变量、修饰常量构造函数，修饰的变量只能被赋值一次。  
`const`修饰的变量会在编译器以至于应用的整个生命周期内都是不可变的常量，在内存中只会被创建一次，之后的每次调用都复用第一次创建的对象。

```dart
// 全局变量 声明
const String name = "aaa";
class TestPage2 {
  // 类常量 规范要求必须使用static修饰
  static const String name = "bbb";
  void test(){
    // 方法块 常量
    const String name = "ccc";
  }
}
```

`const`可以用来修饰常量构造函数

```dart
class testPage {
  final String title;
  const testPage({this.title});
}
```

#### `final`与`const`的不同点

- `final`与`const`修饰的变量取值时机不同
  所谓的取值时机不同，是指`const`修饰的变量是在编译时已经确定下来的值，而`final`修饰的变量是在运行时才确定下来的。  
  `const`修饰的变量是在编译期，程序运行前就有确定值。  
  使用`const`修饰的常量的值，必须由可在编译时可计算的结果。对于在运行时需要获取的值，是不可修饰的。

```dart
class testPage{
  final age = 18;
  // DateTime.now() 需要运行时才能获取到值
  final date1 = DateTime.now();
  static const name = "Dav";
  static const date2 = DateTime.now(); // error: const variables must be initialized with a constant value
}
```

- 应用范畴不同
  `final`只可用来修饰变量，`const`关键字即可修饰变量，也可修饰常量构造函数

#### 使用 const 和 final 的好处

> 延迟初始化变量最终有助于应用程序启动更快。
> 使用常量作为要编译的常数变量，如果 const 的变量是在类级别，将其标记为静态常量。（实例变量不能是 const）。  
> 如果你声明的变量，设置该值为 编译时常数设置，如：文字，一个 const 变量，或常数算术运算的结果

```dart
const bar = 1000000;   // 压力单位(dynes/cm2)
const atm = 1.01325*bar; // 标准大气压
```
