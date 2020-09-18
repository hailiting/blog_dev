# Future 与 FutureBuilder

## 什么是 Future

`Future`表示在接下来的某个时间的值或错误，借助 Future，可以在 Flutter 实现异步操作。

> 类似 ES6 中的 Promise，提供 then 和 catchError 的链式调用
> Future 是 dart:async 包中的一个类，使用它时需要导入`dart:async`包，Future 有两种状态

- pending - 执行中
- completed - 执行结束，分两种情况-> 成功或失败

## Future 的常见用法

### 使用 future.then 获取 future 的值与捕获 future 异常

```
import 'dart:async';
Future<String> testFuture(){
  // throw new Error();
  return Future.value('success');
  // return Future.error('error');
}
main(){
  testFuture().then((s){
    print(s);
  }, onError: (e){
    print(e);
  }).catchError((e){
    print('catchError: $e');
  });
}
```

> 如果 catchError 与 onError 同时存在，则只会调用 onError;
> Future 的 then 原型

```
Future<R> then<R>(FutureOr<r> onValue(T value), {Function onError});
```

### 结合 async await

Future 是异步的，借助`async await`来完成同步

```
import 'dart:async';
test() async{
  int result = await Future.delayed(Duration(milliseconds: 2000), (){
    return Future.value(123);
  })
  print('t3: ${DateTime.now().toString()}');
}
main(){
  print('t1: ${DateTime.now().toString()}');
  test();
  print('t2: ${DateTime.now().toString()}');
}
```

### future.whenComplete

`Future`结束时做的事情，相当于 try catch 里的 finally

```
import 'dart:async';
import 'dart:math';

void main(){
  var random = Random();
  Future.delayed(Duration(seconds: 3), (){
    if(random.nextBool()){
      return 100;
    } else {
      throw 'boom!';
    }
  }).then(print).catchError(print).whenComplete((){
    print('done!');
  });
}

```

### future.timeout

设置请求超时

```
import 'dart:async';
void main(){
  new Future.delayed(new Duration(seconds: 3), (){
    return 1;
  }).timeout(new Duration(seconds: 2)).then(print).catchError(print);
}
```

结果： `TimeoutException after 0:00:02.000000: Future not completed`。

## 什么是 FutureBuilder

`FutureBuilder`是一个将异步操作与异步 UI 更新结合在一起的类，通过它，我们可以将网络请求，数据库读取等结果更新到页面上。

### FutureBuilder 的构造方法

```
FutureBuilder({
  Key key,
  Future<T> future, // future: Future对象，表示此构建器当前连接的异步计算
  T initialData, // 表示一个非空的Futture完成前的初始化数据
  @required AsyncWidgetBuilder<T> builder, // AsyncWidgetBuilder类型的回调函数，是一个基于异步交互构建widget的函数
})
```

这个`builder`函数接受两个参数`BuildContext context`和`AsyncSnapshot<T> snapshot`,返回一个 Widget.

#### AsyncSnapshot 包含异步计算信息，具有以下属性：

- `connectionState`: 表示与异步计算的连接状态，ConnectionState 有四个值: `none`,`waiting`,`active`和`done`；
- `data`: 异步接受的最新数据
- `error`: 异步计算接收的最新错误对象
- `hasDate`: 是否包含空数据
- `hasError`: 是否有错误值

## FutureBuilder 使用

```
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main()=>runApp(new MyApp());

class MyApp extends StatefulWidget{
  @override
  State<StatefulWidget> createState()=>_MyAppState();
}

class _MyAppState extends State<MyApp>{
  String  showResult = '';
  Future<CommonModel> fetchPost() async {
    final response = await http.get('http://www.devio.org/io/flutter_app/json/test_common_model.json');
    Utf8Decoder utf8decoder = Utf8Decoder(); // 防止中文乱码
    var result = json.decode(utf8decoder.convert(response.bodyBytes));
    return CommonModel.fromJson(result);
  }
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('FutureBuilder dome'),
        ),
        body: FutureBuilder<CommonModel>(
          future: fetchPost(),
          builder: (BuilderContext context, AsyncSnapshot<CommonModel> snapshot){
            switch (snapshot.connectionState) {
              case ConnectionState.none:
                return new Text('Input a url to start');
              case ConnectionState.waiting:
                return new Center(child: new CircularProgressIndicator());
              case ConnectionState.active:
                return new Text('');
              case ConnectionState.done:
                if(snapshot.hasError){
                  return Text(
                    '${snapshot.error}',
                    style: TextStyle(color: Colors.red),
                  );
                } else {
                  return new Column(children: <Widget>[
                    Text('icon: ${snapshot.data.icon}'),
                    Text('statusBarColor: ${snapshot.data.statusBarColor}'),
                    Text('title: ${snapshot.data.title}'),
                    Text('url: ${snapshot.data.url}'),
                  ]);
                }
            }
          }
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
