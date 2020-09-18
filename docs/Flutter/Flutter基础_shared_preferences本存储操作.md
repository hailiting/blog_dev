# 基于`shared_prefernces`本存储操作

## `shared_preferences`是什么

页面缓存、从网络上获取数据本地持久化等都需要本地数据储存，shared_preferences 是 Flutter 社区开发的一个本地数据存取插件。

- 简单的，异步的，持久化的 key-value 存储系统
- 在 Android 上，它是基于`SharedPreferences`的
- 在 iOS 上它是基于`NSUserDefault`的

> sharedpreferences 类似于 RN 中的 AsyncStorage

## 如何使用`shared_preferences`

1，在`pubspec.yaml`文件中添加

```
dependencies:
    shared_preferences: ^0.5.1+
```

2，运行`flutter packages get`
3，导入

```
import 'package:shared_preferences/shared_preferences.dart';
```

4，添、删、改、查

```
final prefs = await SharedPreferences.getInstance();
// set value
prefs.setInt('counter', counter);
// try reading data from the country key. if it does not exit, return 0.
final counter = prefs.getInt('counter') ?? 0;
// remove
prefs.remove('counter');
```

## `shared_preferences`常用的 API

存取相关的

```
setString(String key, String value);
setBool(String key, bool value);
setDouble(String key, double value);
setInt(String key, int value);
setStringList(String key, List value);
```

读取相关的

```
get(String key);
getBool(String key);
getDouble(String key);
getInt(String key);
getKeys(String key);
getString(String key);
getStringList(String key);
toString();
```

## 基于`shared_preferences`实现计算器 Demo

```
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
void main(){
  runApp(MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('shared_preferences'),
        ),
        body: _CounterWidget(),
      )
  ));
}
class _CounterWidget extends StatefulWidget{
  @override
  _CounterState createState() =>  _CounterState();
}
class _CounterState extends State<_CounterWidget>{
  String countString = '';
  String localCount = '';
  @override
  Widget build(BuildContext context){
    return Center(
        child: Column(
            children: <Widget>[
              RaisedButton(
                  onPressed: _incrementCounter,
                  child: Text('Increment Counter')
              ),
              RaisedButton(
                  onPressed: _getCounter,
                  child: Text('Increment Counter')
              ),
              Text(
                countString,
                style: TextStyle(fontSize: 20),
              ),
              Text(
                  'result: '+localCount,
                  style: TextStyle(
                      fontSize: 20
                  )
              )
            ]
        )
    );
  }
  _incrementCounter() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState((){
      countString = countString + '1';
    });
    int counter = (prefs.getInt('counter') ?? 0)+1;
    await prefs.setInt('counter', counter);
    print('countString： $counter');
  }
  _getCounter() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState((){
      localCount = prefs.getInt('counter').toString();
    });
  }
}
```
