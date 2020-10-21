# Dart 基础\_Mixin

Mixins(混入功能)相当于多继承，也就是说可以继承多个列

## 概述

- Mixin 是面向对象程序程序设计语言中的类，提供了方法的实现。
- 其他类可以访问 mixin 类的方法而不必成为其子类。
- Mixin 有时被称作`included（包含）`而不是`inherited（继承）`。
- Mixin 为使用它的 class 提供额外的功能，但自身却不单独使用（不能单独生成实例对象，属于抽象类）。

#### 优势

Mixin 有利于代码复用，避免了多继承的复杂。  
使用 Mixin 享有单一继承的单纯性和多重继承的共有性。  
接口和 Mixin 都可以多继承，而 Mixin 是带实现的。

## 结构

```
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

```
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

### 使用 with 关键字来实现 Mixins 的功能

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
