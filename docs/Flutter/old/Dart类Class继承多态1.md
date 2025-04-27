# Dart 类 Class 继承多态(一)

## 一：类的声明与使用

### 1，声明一个 Person 类

在`lib/Person.dart` 声明一个 Person class:

```dart
class Person{
    String name;
    int age;
    int sex;
    // 普通构造函数
    Person(String name, int age, [int sex=1]){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    // 方法声明
    void getInfo(){
        print('My name is ${name}, my age is ${age}, and I am a ${sex===1?'man':'woman'}');
    }
    void changeName(String name){
        if(name !== null){
            this.name = name;
        }
    }
}
```

### 2，类的引入

在 dart 文件中引入 Person 类：

```dart
import 'lib/Person.dart';
```

### 3，实例化 Person 类

```dart
Person p = new Person('asdfs', 123, 1);
p.getInfo();
p.changeName('123123asdas');
p.getInfo();
<!-- 输出结果 -->
flutter: ------------
flutter: My name is asdfs, my age is 123, and I am a man
flutter: ------------
flutter: My name is 123123asdas, my age is 123, and I am a man
```

### 4，私有属性以及私有方法

```dart
class Person {
    // ...
    String _secret; // 私有属性，只在本class有效
    // ...
    // 私有方法
    void _run(){
        print('private function _run');
    }
    // 对外暴露私有方法
    void executeRun(){
        this._run();
    }
}
```

访问私有属性和方法

```dart
Person p4 = new Person.secret('_secret message');
print(p4.getSecret());
p4.setSecret('new _secret message');
print(p4.getSecret());
```

### 5，命名构造函数

命名构造函数容许多个不同名称构造函数的存在，调用不同名称的构造函数，可以实例化出不同的实例。

```dart
Person.now(){
    print(new DateTime.now());
}
Person.setInfo(this.name,this.age,[this.sex])
Person.secret(this._secret);
```

使用命名构造函数：

```dart
Person p2 = new Person.now();
print(p2); // Instance of 'Person'
p2.getInfo();
p2.changeName('postburd');
p2.getInfo();



Person p3 = new Person.setInfo();
p3.getInfo();
p3.changeName('sfasdf');
p3.getInfo();
```

### 6，getter 和 setter

getter 和 setter 可以最大程度简化值的获取或者格式化以及设置

```dart
String get school=>_school;
// stu1.school = '987';
get info{
    return 'My name is ${name}, my age is ${age}, and i am a ${sex == 1?'man':'woman'}';
}
set newName(String name){
    if(name != null){
        this.name = name;
    }
}
```

使用

```dart
Person p5 = new Person('postbid', 20);
print(p5.info);
p5.newName = 'sadfsdaf';
print(p5.info);
```

### 7，初始化构造列表

初始化构造函数可以默认初始化一个值，不过单个 class 上没有实际意义  
在子类上初始化列表

```dart
String defaultCountry;
Person(String name, int age, [int sex = 1]):defaultCountry = 'CN'{
    this.name = name;
    this.age = age;
    this.sex = sex;
}

class Children extends Person{
    String _family;
    int country;
    String name;
    // 在子类构造器方法体之前，可以初始化实例变量
    Person(this._family, String name, int age, {this.country = 'China'})
    :
    name = '$_family.$country',
    // 如果父类没有默认（无参）的构造方法，则需要在初始化列表中调用父类的构造方法进行初始化
    super(name,age){
        // 类的方法体（不是必须的）
        print(name,age);
    };
}




Person p6 = new Person('postbird', 20);
print(p6.defaultCountry);
```

### 简写构造函数

如果构造函数没有特殊逻辑处理，可以使用简写的构造函数

```dart
Person(this.name, this.age, [this.sex]);
```

## 静态成员

静态方法只能访问静态属性，不能访问非静态属性。  
非静态方法可以正常访问静态属性。

```dart
class Person {
    static String name;
    int age;

    static void setName(String name){
        Person.name = name;
        // this.age = 20; // err,静态方法只能访问静态属性
    }
    void printName(){
        print('name is ${Person.name}');
    }
}
```

## `?`、`is`、`as`和`..`操作符

`?` 如果实例存在则调用，否则不调用  
`is` 判断是否归属于某个类或者子类  
`as` 声明某个实例当做某个类使用，比如`子类as父类`  
`..` 级联操作符，用于串联操作  
代码示例：

```dart
import 'demo6.dart';
class Person {
    String name;
    int age;
    Person(this.name,this.age);
    void printInfo(){
        print('name is $name, age is $age');
    }
}
void main(){
    print('--------?条件运算符--------');
    Person p1;
    p1?.printInfo();
    Person p2 = new Person('postbird', 20);
    p2?.printInfo();
    print('--------is--------');
    if(p2 is Person){
        p2.name = 'newPers';
    }
    p2.printInfo();
    print('-------as--------');
    var p3 = p2;
    (p3 as Person).name='newOtss';
    p3.printInfo();
    (p3 as Person).printInfo();

    print('-------..级联操作符--------');
    Person p4 = new Person('XImo', 20);
    p4..name = 'new Name'
        ..age = 22
        ..printInfo();
}
```

## extends 继承

子类继承父类使用`extends`关键字，  
重写方法要加`@override`注释，便于协作  
子类构造方法中，如果要初始化父类构造方法，使用`super`关键字，比如 Dog(String name,int age,[String nickName]): super(name, age),子类中调用父类的方法使用`super.fun()`;

```dart
class Animal {
    String name;
    int age;
    // 标准构造方法
    Animal(this.name,this.age);
    void speak(){}
    void printInfo(){
        print('name is $name');
    }
    void parentPrint(){
        print('i am parent');
    }
}
class Dog extends Animal {
    String nickName;
    Dog(String name, int age, [String nickName]): super(name, age); // 完成父类初始化，才能开始子类的初始化

    @override
    void speak(){
        this.parentPrint();
        super.parentPrint();
        print('wang wang!!');
    }
    void setNickName(String name){
        if(name!=null){
            this.nickName = name;
        }
    }
    get fullInfo{
        return {
            'name': this.name,
            'age': this.age,
            'nickName': this.nickName
        };
    }
}
void main(){
    print('-----继承-----');
    Dog d = new Dog('qiu', 3, 'kitty');
    d.printInfo();
    d.speak();
    d.setNickName('Nicjsdsa');
    print(d.fullInfo);
}
```

## 类的多态

通俗讲，父类可以调用子类同名的方法，输出结果和子类相同，但不能调用父类没有子类中有的方法，也就是子类的方法覆盖了父类的方法
比如：`Animal d1=new Dog()`,因为 d1 类型是 Animal,因此`d1.speak()`=>实际上调用 d1 子类方法差不多，但 Animal 没有`run`,所以不能调用`d1.run()`

```dart
class Animal {
    speak(){}
}
class Dog extends Animal {
    @override
    speak(){
        print('wang wang!!');
    }
    run(){
        print('bey bey!!');
    }
}
void main(){
    Animal d1 = new Dog();
    Dog d2 = new Dog();
    d1.run(); // err
    d1.speak();
    d2.run();
}
```
