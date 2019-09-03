# Dart基础_抽象类&抽象方法&接口
## 概述
* 抽象类使用``abstract``关键字声明
* 抽象类中没有方法体的方法是抽象方法
* 子类继承抽象类必须实现抽象类中的抽象方法
* 抽象类作为接口使用的时候必须实现所有的属性和方法
* 抽象类不能被实例化继承抽象类的子类可以
* 作为抽象类继承的子类不需要对属性重写
~~~
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
~~~
## 接口的实现和差异
作为接口使用的时候，子类必须重写接口内的所有方法和属性
~~~
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
~~~
##  什么时候用抽象类 vs 什么时候用接口 
* 用抽象类继承的子类都用到了父类的同一个或多个 方法或属性的情况下
* 用接口继承的子类只是把父类作为一个模板和标准的时候需要自己全部实现属性和方法的时候