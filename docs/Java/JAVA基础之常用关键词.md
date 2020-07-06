# JAVA基础之常用关键词
## 标识符 （identifier）
类的名字等
- 标识符由字母、数字、下划线“_”、汉字、美元符号“$”组成，第一个字符不能是数字。
- 不能把Java关键字和保留字作为标识符
- 标识符没有长度限制
- 标识符对大小写敏感
## 关键字
~~~
abstract, boolean, break, byte, case, catch,
char, class, continue, default, do, double,
else, extends, false, final, finally, float,
for, if, implements, import, native, int,
interface, long, instanceof, new, null, package,
private, protected, public, return, short, static,
super, switch, synchronized, this, throw, throws, 
transient, true, try, void, volatile, while
~~~
### abstract关键字解析
#### 用abstract修饰的类，即抽象类，用abstract修饰的方法，即抽象方法
何为抽象，就是知道存在，但不确定具体是什么。定义成抽象类的目的，就是为了在子类中实现抽象类【不实现会出错】。
~~~
public abstract class Animal {
  String name;
  int agel
  public static void name(){};
  public static void age(){};
  /**
  * 不确定会不会叫
  */
  public abstract void cry();
}
class cat extends Animal {
  // 抽象方法的实现
  public void cry(){
    System.out.println("狗在叫");
  }
}
~~~
#### 抽象方法不能有主体
~~~
abstract void xxx();
~~~
- 抽象类不能被实例化。抽象类中方法未具体化，是一种不完整的类，所以直接实例化是没有意义的。
- 抽象类不一定包含abstrace方法。
- 一旦类中包含abstract方法，那类就必须声明为abstract类，且该类不能用来创建对象。
- 如果一个类继承于一个抽象类，或把子类也定义为abstract类
- 抽象类可以提供成员方法的实现细节，抽象类的成员变量可以是各种类型的
- 抽象方法必须为public或protected
- 他是一种模板式的设计
### continus、break关键字的用法
#### 明确两个概念
* 循环：按照规定次数重复执行某一操作的全过程；其关键字语句有 for、foreach、while、do、while
* 迭代：指循环过程中单次操作，1次循环由n次迭代构成
#### 用法归纳
* break 跳出当前循环，并结束此次循环
* continue 停止当前迭代，并回到此次循环的开始位置，继续下一次迭代
* break label 中断所有迭代，并回到label处，结束当前正在执行的所有循环（内外循环均终止）
* continue label 中断所有迭代，回到label处，从外循环重新开始下一次循环
#### 示例
~~~
public class LabeledFor {
  public static void main(String[] args){
    int i=0;
    outer:
      for(; i<10; i++){
        System.out.println("i="+i);
        if(2==i){
          System.out.println("continue");
          continue;
        }
        if(3==i){
          System.out.println("break");
          break;
        }
        if(7==i){
          System.out.println("continue inner");
          i++;
          continue outer;
        }
        if(8==i){
          System.out.println("break outer");
          break outer;
        }
      }
  }
}
~~~

### byte
## 变量
## 数据类型
## 类型转换
## 常量