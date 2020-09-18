# Dart 基本数据类型

## 概述

1，Dart 是强类型语言，静态类型（如：Java, c#等）  
2，面向对象的语言，OOP（如：Python, C++, Objective-C, Java, Kotliin, Swift, C#, Ruby 与 PHP 等）  
3，JIT & AOT

- JIT: 即时编译，开发期间，更快编译，更快的重载
- AOT: 事前编译，release 期间，更快更流畅

## 知识体系

### 常用数据类型

快速新建 dart 文结构 `stfuk` =》 `new stateful widge`;  
按 `option` + `enter` 选择要引入的依赖；

#### 数字 num int double

```
// 数字类型
void _numType() {
    num  num1 = -1.0; // 浮点类型  是数字类型的父类
    num  num2 = 2; // 整型  是数字类型的父类
    int int1 = 3; // 只能是整数
    double d1 = 1.68; // 双精度
    print("num: $num1   num02: $num2  int: $int1 double: $d1");
    print(num1.abs()); // 求绝对值 1.0
    print(num1.toInt()); // -1
    print(num1.toDouble()); // -1.0
}
```

#### 字符串 String

```
  _stringType(){
    String str1="字符串1", str2='字符串2';
    String str3 = "str1: $str1, str2: $str2";
    String str4 = "str1: "+ str1+", str2: "+ str2;
    String str5 = "常用数据类型，在控制台输出";
    print(str3);
    print(str4);
    // 常用方法
    print(str5.substring(1,5)); // 用数据类   字符串截取
    print(str5.indexOf('类型')); // 4   获取指定字符串位置
    // startsWith, replaceAll, contains, split
    print(str5.startsWith('用', 1)); // true  返回true or  false 验证在index 是否以x开头
    print(str5.replaceAll('类型', '123')); // 常231addd数据类型，在控制台输出   把 xxx 替换为 xxx
    print(str5.contains('用'));  // true 是否包含xxx
    print(str5.split('用')); // [常, 数据类型，在控制台输出]   从xx分割成数组
  }
```

#### 布尔（bool）

```
  _boolType(){
    bool success = true, fail = false;
    print(success);
    print(fail);
    print(success || fail);
    print(success && fail);
  }
```

#### 集合 List Map

##### List 集合

```
_listType(){
    print('---_listType---');
    // 集合初始化
    List list = [1,2,3,'asdfas'];  // 泛型 <dynamic>
    print(list);
    List<int>list2=[];
    // list2 = list; // err List<dynamic> is not a subtype of type List<int>
    List list3 = [];
    list3.add('list3');
    list3.addAll(list);
    print(list3);  // [list3, 1, 2, 3, asdfas]
    List list4 = List.generate(3, (index)=>index*2); // 生成函数
    print(list4);  // [0,2,4]
    // 集合遍历的3种方式
    for(int i=0;i<list.length;i++){
      print(list[i]);
    }
    for(var o in list){
      print(o);
    }
    // 匿名函数 (){}
    list.forEach((e){
      print(list.indexOf(i).toString());
      print(e);
    });
//    // list.removeXx, insert, sublist, indexOf 等
//    list.removeLast();
//    print(list);  // [1, 2, 3]
//    list.removeAt(0); // 删除 xx 下标的元素，并返回新数组 （如果xx大于本身长度，会报错）
//    print(list);  // [2, 3]
//    list.remove(2);
//    print(list);  // [3]
    list.removeRange(1, 3);
    print(list);
    list.insert(2, 'adfsad');
    print(list);
    var a = list.indexOf('asdf');
    print(a); // -1

  }
```

##### Map 集合

Map 是 key, value 相关联的对象，key 和 value 都可以是任何类型的对象，并且 key 是唯一的，如果 key 重复后面添加的覆盖前面的

```
_mapType(){
    // 定义是时候初始化
    Map student = {'name':'小明', 'age': 18};
    print(student);
    Map ages = {};
    student['classname'] ='1年(2)班';
    student['bestfriend'] ='小红';
    print(student);
    // Map 遍历
    student.forEach((key,value){
      print('$key: $value');
    });
    Map student02 = student.map((key,value){
      return MapEntry(value, key);
    });
    print(student02);
    for(var key in student.keys){
      print('$key ${student[key]}');
    }
    print(student.keys); // (name, age, classname, bestfriend)
    print(student.values); // (小明, 18, 1年(2)班, 小红)
    print(student.remove('name')); // 小明
    print(student); // {age: 18, classname: 1年(2)班, bestfriend: 小红}
    print(student.containsKey('age')); // true
    print(student.containsKey('ageasda')); // false
}
```

#### 类型转换 && dynamic, var, Object 三者的区别

```
_tips(){
    print('---tips---');
    dynamic x = 'hai'; // 会使dart数据类型检查的失败
    print(x.runtimeType); // String
    print(x);
    x=123;
    print(x.runtimeType); // int
    print(x);
    // var 关键字 不关心数据类型
    var a = 123;
    print(a.runtimeType); // int
    print(a);
    // a ='adsf';  // err 数据类型不能修改
    Object o1='111';
    print(o1.runtimeType); // String
    print(o1); // Object 只能调用Object属性
    o1 =  123;
    print(o1.runtimeType); // int
    print(o1);
}
```
