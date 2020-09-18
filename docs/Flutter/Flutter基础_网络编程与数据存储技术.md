# 网络编程与数据存储技术

- 常使用 http 的哪些类型的请求
- 如何解决 http 请求中中文乱码的问题
- 对比 Future 与 ES6 的 Promise，有哪些异同
- FutureBuilder 都可以用来做什么
- JSON 解析都有哪些实用方式
- shared_preferences 在 Android 和 ios 中分别基于什么实现的？
- 在复杂 JSON 转模型上有哪些技巧

## http

Http 是 Flutter 社区开发的可组合，跨平台用于 Flutter 网络的请求插件

- 插件安装: `pubspec.yaml`中引入 http

```
dependenceies:
  http: <latest_version>
```

### http - get

```
Future<http.Responese> fetchPost(){
  return http.get('https://jsonplaceholder.typicode.com/posts/1');
}
```

http.get()返回一个包含 http.Response 的 Future:

- Future: 是与异步操作一起工作的核心 Dart 类。它用于表示未来某个时候可能会出现的可用值或错误；
- http.Response: 类包含一个成功的 HTTP 请求接收到的数据；

### http - post

```
Future<http.Response> fetchPost(){
  return http.post('https://jsonplaceholder.typicode.com/posts/1');
}
```

## 如何将 Response 转换成 Dart object

#### 1，创建一个 CommonModel 类

CommonModel 包含网络请求的数据，包括一个工厂构造函数，他容许通过 JSON 创建一个 CommonModel 对象。

```
class CommonModel{
  final String icon;
  final String title;
  final String url;
  final String statusBarColor;
  final bool hideAppBar;
  CommonModel({this.icon, this.title, this.url, this.statusBarColor, this.hideAppBar});
  factory CommonModel.fromJson(Map<String, dynamic> json){
    return CommonModel(
      icon: json['icon'],
      title: json['title'],
      url: json['url'],
      statusBarColor: json['statusBarColor'],
      hideAppBar: json['hideAppBar'],
    );
  }
}
```

#### 2，将 http.Response 转换为 CommonModel 对象

2.1 用`dart:convert`package 将响应内容转化为 json Map;
2.2 使用 fromJson 工厂函数，将 json Map 转化为 CommonModel 对象；

```
Future<CommonModel> fetchPost() asnyc{
  final response = await http.get('https://jsonplaceholder.typicode.com/posts/1');
  final result = json.decode(response.body);
  return new CommonModel.fromJson(result);
}
```

### 整体代码

```
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main()=> runApp(new MyApp());
class MyApp extends StatefulWidget{
  @override
  State<StatefulWidget> createState()=> _MyAppState();
}
class _MyAppState extends State<MyApp>{
  String showResult = '';
  Future<CommonModel> fetchPost() async{
    final response = await http.get('http://www.devio.org/io/flutter_app/json/test_common_model.json');
    final result = json.decode(response.body);
    return CommonModel.fromJson(result);
  }
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Http')
        ),
        body: Column(
          children: <Widget>[
            InkWell(
              onTap: (){
                fetchPost().then((CommonModel value){
                  setState((){
                    showResult = 'hideAppBar: ${value.hideAppBar} \n icon: ${value.icon}';
                  });
                });
              },
              child: Text(
                '点我',
                style: TextStyle(fontSize: 26),
              ),
            ),
            Text(showResult),
          ]
        )
      )
    );
  }
}
class CommonModel{
  final String icon;
  final String title;
  final String url;
  final String statusBarColor;
  final bool hideAppBar;
  CommonModel({
    this.icon, this.title, this.url, this.statusBarColor, this.hideAppBar
  });
  factory CommonModel.fromJson(Map<String, dynamic> json){
    return CommonModel(
      icon: json['icon'],
      title: json['title'],
      url: json['url'],
      statusBarColor: json['statusBarColor'],
      hideAppBar: json['hideAppBar'],
    );
  }
}
```
