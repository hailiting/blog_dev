# WPF 与 Unity3D 开发 4

System.Object 是 .NET 中所有类的基类

- Equals(object obj) 比较两个对象的内容是否相等
- GetHashCode() 返回对象的哈希代码
- GetType() 获取当前对象的确切类型
- MemberwiseClone() 用于创建当前对象的浅复制
- ToString() 返回当前对象的字符串(类的名称和内存地址)

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
  public int Width {get; set;}
  public int Height {get; set;}
  public void Copy()
  {
    Console.WriteLine("复制");
  }
  public void Paste()
  {
    Console.WriteLine("粘贴");
  }
}
public class Text:PresentationObject
{

}
```

### 复合 Class Composition

- DbMigrator 负责处理具体数据库的迁移
- logger, 日志系统，记录安装和数据迁移过程
- 安装程序 installer, 负责向操作系统中安装的程序

```c#
using System;
namespace HelloWord
{
    class Logger
    {
        public void Log(string message)
        {
            Console.WriteLine($"日志：{DateTime.Now} - {message}");
        }
    }
    class DbMigrator
    {
        private readonly Logger _logger;
        public DbMigrator(Logger logger)
        {
            _logger = logger;
        }
        public void Migrate()
        {
            _logger.Log("数据迁移开始");
        }
    }
    class Install
    {
        private readonly Logger _logger;
        public Install(Logger logger)
        {
            _logger = logger;
        }
        // 安装
        public void InstallCall()
        {
            _logger.Log("安装开始");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            var logger = new Logger();
            var dbMigrator = new DbMigrator(logger);
            var install = new Install(logger);
            install.InstallCall();
            dbMigrator.Migrate();
            Console.Read();
        }
    }
}
```

## C# 有什么是继承特点

- 访问修饰符 protected 与 internal
- 构造函数的继承
- 问题
  - 访问修饰符 protected 与 internal 有什么区别
  - C#中的构造方法如何继承

### protected 与 internal

- protected: 只能被自己、或被继承与自己的子类访问
- internal: 访问范围限定在同一个项目的程序集中

```c#
namespace car;
public class Wulinghongguang : Car
{
  internal void Drift()
  {
    this.Accelerate();
    this.Stop();
  }
}
public class Car
{
  public void Accelerate()
  {
    Console.WriteLine("加油");
  }
  protected void Stop()
  {
    Console.WriteLine("制动");
  }
}


using System;
using car;
namespace HelloWord
{

    class Program
    {
        static void Main(string[] args)
        {
            var myCar = new Wulinghongguang();
            myCar.Accelerate();
            myCar.Drift();
        }
    }
}
```

### 构造函数的继承

- 在初始化时，基类构造方法总是会首先运行
- 基类的构造方法不会被继承，在派生类中需要重新定义
  - 通过 base 关键词正确选择需要的构造方法

```c#
namespace HelloWord
{
  public class Staff
  {
    public Staff()
    {
      Console.WriteLine("员工类初始化");
    }
    public Staff(int number)
    {
      Number = number;
    }
    // 员工编号
    public int Number {get; set;}
  }
  public class Manager:Staff
  {
    public Manager()
    {
      Console.WriteLine("经理类初始化");
    }
    public Manager(int number): base(number)
    {
      Console.WriteLine($"{number}经理类初始化");
    }
  }
  class Program
  {
    static void Main(string[] args)
    {
      var manager = new Manager(123);
      Console.WriteLine(manager.Number);
      Console.Read();
    }
  }
}
```

## 什么是对象类型转换

- 向上转型与向下转型
  - 向上转型（upcasting）: 把一个派生类类型转换为其他基类
    - 派生对象内存引用可以被隐型转化为它的基类的内存引用
  - 向下转型 downcasting
  - as 强行转换， is 检查对象的类型
- 装箱与拆箱
- 问题
  - Object o2 = 10; 是装箱吗，为什么

```c#
public class Shape
{
}
public class Circle:Shape
{
}

class Program
{
  static void Main(string[] args)
  {
    Circle circle = new Circle();
    // 这个过程是隐式的, implicit
    Shape shape = circle;
    // 显式 explicit 转化
    Circle circle2 = (Circle)shape;
    // 1
    Car car = (Car)shape;  // 抛出异常
    // 2
    Car car = shape as Car; // 不会抛出异常
    if(car != null){

    }
    // 3
    if(shape is Car) {
      Car car = (Car)obj; // 绝对不会出错
    }
  }
}

using System.Collections;

// ArrayList 向上转型
// 任何类型进入ArrayList都会转换成Object类型
var array = new ArrayList();
array.add(1);
array.add("sss");
array.add(shape);

// 向下转型
var ma = new Manager();
var shapeList = new List<Staff>();
shapeList.Add(new Staff());
shapeList.Add(ma);
Manager text = (Manager)shapeList[1];
```

### 装箱与拆箱

- 值类型 ValueType vs 引用类型 ReferenceType
- 内存: Stack(栈)与 heap(堆)
  - Stack
    - 值类型保存在 Stack 内
    - 基本数据类型(如 byte、int、float、char、bool), 以及结构(struct)
    - 内存由编译器自动分配，程序结束内存会自动被回收
  - heap
    - 引用类型保存在 heap 内存中
    - 数据长度不固定，数据类型、结构复杂
    - 程序员手动释放内存(Java C#有自动垃圾回收机制)
    - Class、对象属于引用类型，保存在 heap 中
