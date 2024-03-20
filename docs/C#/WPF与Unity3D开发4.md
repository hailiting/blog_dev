# WPF 与 Unity3D 开发 4

## 继承与复合

复合和继承是面向对象思想的核心，描述了对象之间的作用与被作用关系。

- 松耦合设计思想
- 类关系与 UML
- 继承
- 复合
- 问题
  - 高内聚、低耦合是什么意思
  - 如何获得松耦合代码
  - 如何理解复合优于继承
  - UML 是什么

### 什么叫耦合

- 耦合（coupling）是一种测量各类和子系统关系的方法 -> 避免高耦合
  - 封装（encapsulate），对业务逻辑实现细节的隐藏
  - 类的关联性
    - 依赖、关联、聚合、组合、泛化等等
  - 使用接口
    - 面向对象的思想核心，解决耦合的基本思路，重点中的重点

### UML 类关系 - 依赖、关联、聚合、组合、泛化

- UML（统一建模语言，Unified Modeling Language）是一种标准化的图形建模语言，用于描述、可视化、构造和文档化软件系统

- 依赖、关联、聚合、组合与泛化代表类与类之间的耦合度依次递增
  - 依赖关系：在组合中表现为类成员函数的局部变量、形参、返回值或静态方法的调用
  - 关联、聚合与组合在编码形式上都以类成员变量的形式来表示
- 依赖、关联、聚合与组合是逻辑上的关联，泛指是物理上的关联。

#### 依赖 Dependency

```C#
public class Computer {
  public static void start(){
    Console.WirteLine("电脑")
  }
}
public class Student {
  // 返回值构成依赖
  public Computer program();
  // 形参构成依赖
  public void program(Computer computer);
  public void playGame() {
    Computer computer = new Computer();
    // 静态方法调用构成依赖
    Computer.start();
  }
}
```

#### 关联 Association

依赖和关联

- 相似
  - 关联暗示了依赖，两者都用来表示无法用聚合和组合表示的关系
- 区别

  - 发生依赖关系的两个类都不会增加属性
  - 从关系的生命周期来看
    - 依赖关系是仅当类的方法被调用时而产生，伴随着方法的结束而结束
    - 关联关系当类实例化的时候产生，当类对象销毁的时候关系结束。相比依赖，关联关系的生存期更长

- 有单向关联，双向关联，自身关联，多维关联

```c#
public class Teacher {

}
public class Student {
  public Teacher teacher; // 成员变量
  public void study();
}
```

#### 聚合 (Aggregation)

聚合：表示集体与个体之间的关联关系

```C#
public class Student {

}
public class Class {
  private Student _student; // 成员变量
  public Class(Student student) {
    _student = student;
  }
}
```

#### 组合 (复合，Composition)

- 组合又叫复合，用来表示个体和组成部分之间的关联关系。

```c#
public class Heart {}
public class Student {
  private Heart _heart; // 成员变量
  public Student() {
    _heart = new Heart();
  }
}
```

聚合与组合对比

- 1. 聚合关系没有组合紧密
- 2. 聚合成员可独立，复合成员必须依赖于整体才有意义

#### 泛化

泛化指的是类与类之间的继承关系和类与接口之间的实现关系

### 继承

- 省去绝大部分重复性的代码、提高代码的复用性
- 多态
  - 继承对象的某一个行为却具有多个不同表现形式的能力

```c#
public class PresentationObject
{

}
public class Text:PresentationObject
{

}
```

## C# 有什么是继承特点

- 访问修饰符 protected 与 internal
- 构造函数的继承
- 问题
  - 访问修饰符 protected 与 internal 有什么区别
  - C#中的构造方法如何继承

## 什么是对象类型转换

- 向上转型与向下转型
- 装箱与拆箱
- 问题
  - Object o2 = 10; 是装箱吗，为什么
