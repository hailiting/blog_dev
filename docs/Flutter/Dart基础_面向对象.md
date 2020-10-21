# Dart 基础\_面向对象

## 什么是面向对象

面向对象是一种软件开发思想，就是把事务对象化，包括属性和行为。面向对象编程更贴近实际生活思想。总体来说，面向对象的底层还是面向过程，面向过程抽象成类，然后封装，方便使用就是面向对象（万物皆对象）。

## 面向对象的基本知识点

- 实例化成员变量
- 有构造函数
- 读取和写入对象
- 重运算符载操作
- 继承类
- 抽象类
- 枚举类型
- Mixins(混入功能)
- 泛型
- 库【封装的类】

### 实例化成员变量

类定义中，所有的变量都会隐式的定义`setter`方法，针对非空的变量会额外增加 `getter` 方法。

```dart
class User {
  string name;
  int age;
}
main(){
  var user = new User();
  user.name = "张三";
  user.age = 25;
}
```

### 构造函数

构造函数是用来构造当前类的函数，是一种特殊的函数，函数名称必须要和类的名称相同。

#### 1. 常规的构造函数

```dart
class User {
  String name;
  int age;
  // 常规构造函数
  // 在函数里，给User类的两个成员变量初始化值
  User(String mName, int mAge){
    this.name = mName;
    this.age =  mAge;
  }
}
--- 简化---->
class User {
  String name;
  int age;
  // 把初始化成员直接变为实例化类的变量，在实例化类的时候，直接进行赋值初始化
  User(this.name, this.age)
}
```

#### 2. 命名构造函数

使用命名构造函数从另一类或现有的数据中快速实现构造函数。
在 Java 或 dart 里，相同参数个数的构造方法只能有一个，所有可以用命名构造函数的方法给多个构造函数起名。

```dart
class User{
  String name;
  int age;
  // 普通构造函数
  User(this.name, this.age);
  // 命名构造函数
  User.fromJson(Map json){
    name = json['name'];
    age = json['age'];
  }
}

// 在实例化类的时候，如果没有传参，会默认调用无参数的构造方法
// 普通构造函数
var user = new User("张三", 25);
// 命名构造函数
final mMapJson = {
  name: "张三",
  age: 25
}
var user = new User.fromJson(mMapJson);
```

#### 3. 子类的创建

> 1. 子类在继承父类的时候，如果父类中有显示的提供一个无名，无参数的构造函数，不会继承父类无名有参数的构造函数和命名函数，即：子类自会继承父类无名无参的构造函数(系统会给一个类隐式生成一个无名、无参的构造函数)

```dart
class Father {
  // 我是父类无名无参的命名构造函数
  Father.printSth(){
    print("我是父类无名无参的命名构造函数");
  }
}
class Son extends Father {
  // 因为父类没有有显式的声明一个无名、无参的构造函数，所以要手动调用父类的构造函数。
  Son.fromJson(Map aaa) : super.printSth(){
    print("我是子类的命名构造函数");
  }
}
var son= new Son.fromJson(mMapJson);
// 我是父类无名无参的构造函数
// 我是子类的命名构造函数
```

> 2. 子类在继承父类的时候，如果在父类中没有显示的提供一个无名、无参的构造函数，子类必须手动调用父类的一个构造函数，在这种情况下，调用父类的构造函数要放在子类的构造函数之后，与子类构造函数体用`:`分隔。

```dart
class Father {
  // 我是父类无名无参的命名构造函数
  Father.printSth(){
    print("我是父类无名无参的命名构造函数");
  }
}
class Son extends Father {
  // 因为父类没有有显式的声明一个无名、无参的构造函数，所以要手动调用父类的构造函数。
  Son.fromJson(Map mMapJson) : super Father.printSth{
    print("我是子类的命名构造函数");
  }
}
```

> 3. 父类的构造函数会在子类的构造函数前调用
> 4. 默认情况下，子类只能调用父类无名、无参的构造函数

#### 4. 构造函数初始化列表

初始化成员变量的方法有两种：1. 在构造函数方法体内初始化；2. 在构造函数运行前初始化；

特点：在构造函数的方法体前(大括号前)来初始化成员变量，用`,`号分隔。

```dart
class User{
  String name;
  int age;
  User(mName, mAge):name = mName, age=mAge{
      // do sth
    }
  }
}
```

### 读取和写入对象 [get(), set()]

get()和 set()方法是专门用于读取和写入对象的属性的方法，每一个类的实例，系统都会隐式的包含`get()`和`set()`方法。
例如：定义一个矩形的类，有上下左右：top、bottom、left、right 四个成员变量，使用`get`及`set`关键字分别对`right`、`bottom`进行获取和设置值：

```dart
class Rectangle {
  num left;
  num top;
  num width;
  num height;
  Rectangle(this.left, this.top, this.width, this.height);

  num get right => left+width;  // 第一行 获取right的值
  set right(num value)=> left = value-width; // 第二行 设置right的值，同时left也发生了变化
  num get bottom => top+height;
  set bottom(num value)=> top= value-height;
}
main(){
  var rect = new Rectangle(3,4,20,15);

  print("left: ", +rect.left.toString());
  print("right: ", +rect.right.toString());
  rect.right = 30; // right发生变化的话， left也会发生改变  执行第二行代码， left=30-20;
  print("left: ", +rect.left.toString());
  print("right: ", +rect.right.toString());
}
```

### 重运算符载操作

`operator`和运算符一起使用，表示一个运算符重载函数。【可以把 operator 和运算符 视为一个函数名-> 如：`operator+`或`operator-`】

```dart
class Vector {
  final int x;
  final int y;
  const Vector(this.x, this.y);
  // 重载加号 (a+b)
  Vector operator+ (Vector v){
    return new Vector(x+v.x, y+v.y);
  }
}
main(){
  // 实例化两个变量
  final result1= new Vector(10, 20);
  final result2 = new Vector(30, 40);
  final result = result1+result2;
  print("result.x="+result.x.toString() +", +result.y="+result.y.toString());
  // result.x=40, +result.y=60
}
```

### 继承类

继承是面向对象编程技术的一块基石，因为它允许创建分等级层次的类。继承就是子类继承父类的特征和行为，使得子类对象具有父类的实例域和方法；
或子类从父类继承方法，使得子类具有父类相同的行为。Dart 里使用`extends`关键字来实现继承，super 关键字来指定父类。

```dart
class Animal {
  void eat(){
    print("所有小动物都会吃")
  }
  void run(){
    print("动物会跑");
  }
}
class Human extends Animal {
  void say(){
    print("人会说");
  }
  void think(){
    print("人会思考");
  }
}
main(){
  var animal =  new Animal();
  var human = new Human();
  human.eat()
  human.run()
  human.say()
  human.think()
}
```

### 抽象类

抽象类类似于 java 中的接口。抽象类里不具体实现方法，只是写好定义的接口，具体实现留调用的人去实现。  
抽象类可以使用`abstract`关键字定义类。

- 抽象类通过`abstract`关键字来定义
- Dart 中的抽象方法不能用`abstract`声明，Dart 里没有具体的方法定义抽象方法
- 如果子类继承抽象类，就必须实现里面的抽象方法
- 如果把抽象类当作接口实现的话，就必须得实现抽象类里面的所有属性和方法
- 抽象类不能实例化，只能继承，可以实例化继承他的子类

```dart
abstract class Animal {
  eat();
  run();
  void printInfo(){
    print("我只是抽象类里的普通方法");
  }
}
class Dog extends Animal {
  @override
  eat(){
    print("dog is eatting");
  }
  @override
  run(){
    print("dog is running");
  }
}
main(){
  Dog d = new Dog();
  d.printInfo();
}
```

### 枚举类型

枚举类型是一种特殊的类，通常用来表示相同类型的一组常量值，用`enum`来定义。
每个枚举类型都有一个`index`和`getter`，index 用来标记元素位置。第一个枚举元素的索引是 0，枚举不能被继承，不能被创建实例。

```dart
// 定义一个枚举
enum Color {
  red,
  green,
  blue
}
// 打印枚举类中green的索引
print(Color.green.index); // 1
// 获取枚举类中的所有值，使用value常数
List<Color> colorList = Color.values;
print(colorList); // [Color.red, Color.green, Color.blue]

// 枚举用switch
main(){
  Color mColor = Color.blue;
  switch(mColor){
    case Color.red:
      print("红色");
      break;
    default:
      break;
  }
}
```

### [Mixin](./Dart基础_Mixin.md)

### [泛型](./Dart基础_泛型.md)
