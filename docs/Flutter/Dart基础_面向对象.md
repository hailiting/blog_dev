# Dart 基础\_面向对象

## 什么是面向对象

面向对象是一种软件开发思想，就是把事务对象化，包括属性和行为。面向对象编程更贴近实际生活思想。总体来说，面向对象的底层还是面向过程，面向过程抽象成类，然后封装，方便使用就是面向对象（万物皆对象）。

在类里，除了构造方法之外，都是实例方法。

静态方法：有`static`标识的;

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
  // name是当前class的变量
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

```dart
abstract class People{
  int PeopleNumber;
  void Say();     // 没有方法体（未实现的方法）的抽象方法
}
class Man extends People{
  // 作为抽象类的子类，不需要对属性重写
  @overrride
  // 继承抽象类的子类必须实现抽象方法
  void Say(){
    print('Man say Hello!');
  }
}
void main(){
  Man m1 =   new Man();
  m1.Say();
}
```

##### 接口的实现和差异

作为接口使用的时候，子类必须重写接口内的所有方法和属性

```dart
abstract class People{
  int  PeopleNumberr;
  void Say();
}
// implements 关键字 子类继承这个接口
class Man implements People{
  @override
  int PeopleNumber;   // 接口必须实现属性
  @override
  void Say(){
    print('Man say Hello!');
  }
}
void main(){
  Man m1 =  new Man();
  m1.Say();
}
```

##### 什么时候用抽象类 vs 什么时候用接口

- 用抽象类继承的子类都用到了父类的同一个或多个 方法或属性的情况下
- 用接口继承的子类只是把父类作为一个模板和标准的时候需要自己全部实现属性和方法的时候

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

### [Mixin]

Mixins(混入功能)相当于多继承，也就是说可以继承多个列

#### 概述

- Mixin 是面向对象程序程序设计语言中的类，提供了方法的实现。
- 其他类可以访问 mixin 类的方法而不必成为其子类。
- Mixin 有时被称作`included（包含）`而不是`inherited（继承）`。
- Mixin 为使用它的 class 提供额外的功能，但自身却不单独使用（不能单独生成实例对象，属于抽象类）。

#### 优势

Mixin 有利于代码复用，避免了多继承的复杂。  
使用 Mixin 享有单一继承的单纯性和多重继承的共有性。  
接口和 Mixin 都可以多继承，而 Mixin 是带实现的。

#### 结构

```dart
mixin Musical {
    bool canPlayPiao = false;
    void entertainMe(){
        // code
    }
}

class Musician extends Performer with Musical,Danced{
    Musician(String name, int age) : super(name, age);
    @override
    // ...
}
```

#### 实例

```dart
abstract class Animal {}
abstract class Mammal extends Animal{}
abstract class Bird extends Animal{}
abstract class Fish extends Animal{}
mixin Walker{
    // 函数返回类型为void
    void walk(){
        print('I am working!');
    }
}
mixin Swimmer {
    void swim(){
        print('I am swimming!');
    }
}
mixin Flyer{
    void fly(){
        print('I am flying');
    }
}
class Dolphin extends Mammal with Swimmer{};
class Bat extends Mammal with Walker,Flyer{};
class Cat extends Mammal with Walker{}
main(list<String>arguments){
    Cat cat01 = Cat();
    // cat01.fly();  cat不能飞
}
```

#### 使用 with 关键字来实现 Mixins 的功能

```dart
class First {
    void printSth(){
        print("im first printSth");
    }
}
class Second {
    void printSth(){
        print("test");
    }
    void secondPrint(){
        print("im secenc printSth");
    }
}
class A = Second with First;
main(){
    A a = new A();
    a.printSth();
    a.secondPrint();
}
// 会打印以下
// im first printSth
// im secenc printSth
// Second printsth 不会走
```

### 泛型

#### List<...>

常用的泛型名称 E、T、S、K、V，这些字母本身没有意义，只是可读性和协作方面有优势  
`E => Element`
`T => Type`
`K => key`
`V => value`

#### 为什么使用泛型

- 1，指定泛型类型，可以使代码更安全，提高代码的可读性；

```dart
var names = new List<String>();
names.addAll(['Seth','Kathy','Lars']);
// 检查模式编译失败，生产模式编译成功
names.add(42);
```

- 2，使用泛型可以避免代码重复。提高解决类、接口、方法的复用性、以及对不特定数据类型的支持

```dart
//  T是自定义类型的占位符
abstract class Cache<T> {
    T getByKey(String key);
    setByKey(String key, T value);
}


main(List<String> args){
    TestGeneric asdfsd= TestGeneric();
    asdfsd.start();
}
class TestGeneric {
    void start(){
        Cache<String>cache1 = Cache();
        // cache1.setItem('cache1',11); // err
        cache1.setItem('cache1','11'); // ok
        String string1 = cache1.getItem('cache1');
        print(string1);
        Cache<int>cache2 = Cache();
        cache2.setItem('cache1',12); // ok
    }
}
class Cache<T>{
    static final Map<String, Object> _cached = Map();
    void setItem(String key, T value){
        _cached[key]= value;
    }
    T getItem(String key){
        return _cached[key];
    }
}
=>
// 接口缓存对象
abstract class ObjectCache {
    Object getByKey(String key);
    setByKey(String key, Object value);
}
// 只是String接口
abstract class StringCache {
    String getByKey(String key);
    setByKey(String key, String value);
}
// ...
main(List<String> args){
    // 指定了String，就不能在add 1
    Cache<String> strList = Cache<String>();
    strList.add('a');
    strList.add(1);
}
```

#### 使用集合文字

List,Map 文字可以参数化。

```dart
// <type>用于列表
var names=<String>['123','adad','asdad'];
// <keyType, valueType>用于映射
var pages = <String, String>{
    'index.html':'homepagw',
    'robots.txt':'Hints for web r',
    ...
}
```

#### 使用带构造函数的参数化类型

可以检查 泛型集合及其包含的类型

```dart
var names = List<String>();
names.addAll(['setcg','karrch','sdf']);
var nameSet = Set<String>.from(names);
// 可以检查 泛型集合及其包含的类型
print(nameSet is List<String>); // true

// 创建一个具有整形键和类型视图的映射
var views = Map<int, View>();
```

#### 限制参数化类型

用`extend`来实现

```dart
class Foo<T extends SomeBaseClass>{
    String toString()=> "Instance of 'Foo<$T>'";
}
class Extender extends SomeBaseClass{
    ...
}
```

可以使用 SomeBaseClass 或它的任何子类作为通用参数

```dart
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```

也可以不指定通用参数

```dart
var someBaseClassFoo = Foo();
```

指定其他非 SomeBaseClass 类型将导致错误

```dart
var foo = Foo<Object>(); // err
```

## 使用泛型的方法

```dart
T first<T>(List<T> ts){
    T tmp = ts[0];
    return tmp;
}
```

## 代码

```dart
// main.dart
import "package:flutter/material.dart";
import "package:flutter_dart_file/data_type.dart";
import "package:flutter_dart_file/oop_learn.dart";

void main()=>runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      title: "Flutter Dart",
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: "Flutter必备Dart基础"),
    )
  }
}

class MyHomePage  extends StatefulWidget {
  MyHomePage({Key key, this.title}):super(key:key);
  final String title;
  @override
  _MyHomePageState createState()=>_MyHomePageState();
}
class _MyHomePageState extends State<MyHomePage>{
  @override
  Widget build(BuildContext context){
    _oopLearn();
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title)
      ),
      body: Center(
        child:ListView(
          children: <Widget>[]
        )
      )
    )
  }
  void  _oopLearn(){
    // 创建Student的对象
    Student stu1 = Student("清华", "Jack", 18);
    stu1.school = "985";
    print(stu1.toString());
    Student stu2 = Student("北大","Tom", 16, city:"上海", country: "中国");
    print(stu2.toString());
    Student.doPrint("_oopLearn");
    StudyFlutter sf = StudyFlutter();
    sf.study();

    Logger log1=Logger();
    Logger log2=Logger();
    print(log1 == log2);
  }
}
// oop_learn.dart
class Person {
  String name;
  int age;
  Person(this.name, this.age);
  /// 重写父类方法
  @override
  String toString(){
    return "name: $name, age: $age";
  }
}

class Student extends Person {
  // 定义类的变量
  String _school; // 下划线用来标识私有变量
  String city;
  String country;
  String name;
  static Student instance;
  /// 构造方法
  /// 通过 this.school 初始化自有参数
  /// name, age交给父类进行初始化
  /// city为可选参数
  /// country设有默认参数
  Student(this._school, String name, int age, {this.city, this.country = "China"})
  // 初始化列表，除了调用父类构造器，在子类构造器方法体之前，可以初始化实例变量，不同的初始化变量之间用逗号分隔开
  :name="$country.$city",
  // 如果父类没没有默认构造方法（无参构造方法），则需要在初始化列表中调用父类构造方法进行初始化
  super(name, age){
    // 构造方法体不是必须的
    print("构造方法体不是必须的")；
  }
  // 命名构造方法：【类名.方法名】
  // 使用命名构造方法为类实现多个构造方法
  Student.cover(Student stu): super(stu.name, stu.age){
    print("命名构造方法");
  }
  // 命名工厂构造方法：factory 【类名.方法名】
  // 他可以有返回值，而且不需要将类的final变量作为参数，是提供一种灵活获取类对象的方法
  factory Student.stu(Student stu){
    return Student(stu._school, stu.name, stu.age, city: stu.city, country: stu.country);
  }
  @override
  String toString(){
    /// 实例方法，对象的实例方法 可以访问到实例变量与this，如下面的this._school
    return "name: $name, school: ${this._school}, city: $city, country: $country ${super.toString()}";
  }
  // 可以为私有字段设置getter来让外界获取到私有字段
  String get school => _school;
  // 可以为私有变量设置setter来控制外界对私有字段的修改
  set school(String value){
    _school = value;
  }
  // 静态方法
  static doPrint(String str){
    print("doPrint: $str");
  }
}

/// 工厂构造方法
class Logger{
  static Logger _cache;
  // 工厂构造方法：
  // 不仅仅是构造方法，也是一种模式
  // 有时候为了返回一个之前已创建的缓存对象，原始的构造方法已经不能满足要求
  // 那么可以使用工厂模式来定义构造方法
  factory Logger(){
    if(_cache == null){
      _cache == Logger._internal();
    }
    return _cache;
  }
  Logger._internal();
  void log(String msg){
    print(msg);
  }
}
// 使用abstract修饰符来定义一个抽象类，该类不能被实例化，抽象类在定义接口的时候非常有用，抽象类也可以包含一些实现
abstract class Study {
  void study();
}
/// 为类添加特征：mixins
/// mixins 是在多个类层次结构中重用代码的一种方式
/// 要使用minxins， 在with关键字后跟一个或多个mixin的名字，有对号隔开，并且with要用在extends关键字之后
/// mixins的特征：实现mixin,就创建一个继承Object类的子类，不声明任何构造方法，不调用super

class Test extends Person with Study {
  Test(String name, int age): super(name, age);
  @override
  void study(){
    //
  }
}
```
