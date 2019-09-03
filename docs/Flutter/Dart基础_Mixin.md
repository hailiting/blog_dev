# Dart基础_Mixin
## 概述
* Mixin是面向对象程序程序设计语言中的类，提供了方法的实现。                              
* 其他类可以访问mixin类的方法而不必成为其子类。                 
* Mixin有时被称作``included（包含）``而不是``inherited（继承）``。              
* Mixin为使用它的class提供额外的功能，但自身却不单独使用（不能单独生成实例对象，属于抽象类）。    

#### 优势
Mixin有利于代码复用，避免了多继承的复杂。                   
使用Mixin享有单一继承的单纯性和多重继承的共有性。                 
接口和Mixin都可以多继承，而Mixin是带实现的。      
## 结构        
~~~
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
~~~
#### 实例
~~~
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
~~~
