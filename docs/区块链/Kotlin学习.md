# Kotlin 学习

- 靠他灵
- Jetbrains 发布基于 JVM 的编程语言
- Jetbrains 是做编译器起家的公司，总部捷克，有圣彼得堡和美国部分
- Jetbrains https://www.jetbrains.com/
- IDEA

## Kotlin 有点

- 简洁-数据类扩展方法区间
- 空值安全(针对空值处理的运算符)
- 100% 兼容 java scala（scala 和 Java 不兼容）
- 函数式编程 JDK1.8 （Java 是面向对象编程，对象是一等公民，而函数式编程函数是一等公民，JDK1.8 Lambda 表达式）
- 协程 thread（协程轻量级，线程成本高，协程可以像写同步代码一样写异步代码，线程对专门接口回调）
- DSL 领域特定语言

```java
class News {
  private String title;
  private String desc;
  public String getTitle(){
    return title;
  }
  public void setTitle(String title){
    this.title = title;
  }
  public String getDesc(){
    return desc;
  }
  public void setDesc(String desc){
    this.desc = desc;
  }
}
```

空指针异常分为两种：编译异常和空指针异常。Kotlin 添加了空值判断运算符

```java
Person person = null;
if(person!=null){
  String name = person.getName()
}
```

DSL

```js
html {
  head {
    title { +"this is title"}
  }
  body {
    h1{+"this is body"}
  }
}
```

- Kotlin script(gradle).kts
- Java 虚拟机应用
  - Web Kotlinee
  - Javafx JDK1.8 之后
- 前端开发 kotlinjs
- Android 开发
- 支持开发 iOS
- kotlin Native 程序（完全抛弃 JVM 虚拟机）
- 全站工程师

## 参考资料

- [官方文档](!https://kotlinlang.org/docs/home.html)
- [Kotlin 源码](!http://github.con/JetBrains/kotlin)
- [Kotlin 官方博客](!http://blog.jetbrains.com/kotlin)
- [IntelliJ IDEA 破解方法](!https://www.exception.site/essay/how-to-free-use-intellij-idea-2019-3)
- [设置默认的 SDK](!https://blog.csdn.net/zhou_zhao_xu/article/details/118598078)

## HelloWorld

```java
fun main(args: Array<String>){
  println("hello world");
  println("arguments: ${args.joinToString()}")
}
```

## 查看 kotlin 对应的 Java 代码

- 找到 Kotlin 生成字节码 使用 jclasslib 插件
- 字节码对应的 Java 代码
