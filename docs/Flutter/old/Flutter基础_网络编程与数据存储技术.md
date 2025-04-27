# Flutter 基础\_网络编程与数据存储技术

## http

Http 是 Flutter 社区开发的可组合，跨平台用于 Flutter 网络的请求插件

- 插件安装: `pubspec.yaml`中引入 http

```yaml
dependenceies:
  http: <latest_version>
```

- 引用

```dart
import 'package:http/http.dart' as http;
var url ="https://example.com/whatsit/create";
var response = await http.post(url, body({
  "name": "doodle",
  "color": "blue"
}));
print("Response status: ${response.statusCode}");
print("Response body: ${response.body}");
print(await http.read("https://example.com/foobar.txt"));
```

### http - get

```dart
Future<http.Responese> fetchPost(){
  return http.get('https://jsonplaceholder.typicode.com/posts/1');
}
```

http.get()返回一个包含 http.Response 的 Future:

- Future: 是与异步操作一起工作的核心 Dart 类。它用于表示未来某个时候可能会出现的可用值或错误；
- http.Response: 类包含一个成功的 HTTP 请求接收到的数据；

### http - post

```dart
Future<http.Response> fetchPost(){
  return http.post('https://jsonplaceholder.typicode.com/posts/1');
}
```

## 如何将 Response 转换成 Dart object

#### 1，创建一个 CommonModel 工厂类

CommonModel 包含网络请求的数据，包括一个工厂构造函数，他容许通过 JSON 创建一个 CommonModel 对象。

```dart
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

```dart
import "dart:convert";

Future<CommonModel> fetchPost() asnyc{
  final response = await http.get('https://jsonplaceholder.typicode.com/posts/1');
  final result = json.decode(response.body);
  return new CommonModel.fromJson(result);
}
```

### 整体代码

```dart
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

## dio

dio 是一个强大的 Dart Http 请求库，支持 RestfulAPI、FormData、拦截器、请求取消、Cookie 管理、文件上传/下载、超时、自定义适配等

### 基本用法

1. 添加依赖

```yaml
dependencies:
  dio: ^3.0.10
```

2. 基本用法

```dart
import "package:dio/dio.dart";
void getHttp() async{
  try{
    Response response = await Dio().get("xxx.com");
    print(response);
  } catch(e){
    print(e);
  }
}
```

### 在项目中的使用

在`http_request.dart`文件里创建一个专门的`网络管理`工具类`NetworkManager`。

```dart
import "package:dio/dio.dart";

const String BASEURL = "https://xxx.com";

class HTTPConfig{
  static const baseURL = BASEURL;
  static const timeout = 1000;
}

class HttpRequest {
  static final BaseOptions options = BaseOptions(
    baseUrl: HTTPConfig.baseURL,
    connectTimeout: HTTPConfig.timeout
  );
  static final Dio dio = Dio(options);
  static Future<T> request<T>(String url,
    {
      String method="get",
      Map<String, dynamic> params,
      Interceptor inter
    }) async {
      // 1. 请求的单独配置 header设置
      Map<String, dynamic> _header = new Map();
      _header["Lang"] = "zh_cn";
      _header["Coin"] = "CNY";
      _header["Token"]= "zzzzzz";

      final options = Options(
        method: method,
        headers: _header,
      )
      // 2. 添加第一个拦截器
      Interceptor dInter = InterceptorsWrapper(
        onRequest: (RequestOptions options){
          // 2.1 在进行任何网络请求时，添加一个leading提示
          // 2.2 在这判断是否有Token
          // 2.3 对参数进行一些处理，比如序列化等
          print("拦截请求");
          return options;
        },
        onResponse: (Response response){
          print("拦截响应");
          return response
        },
        onError: (DioError error){
          print("拦截了错误");
          return error;
        }
      );
      List<Interceptor> inters = [dInter];
      if(inner != null){
        inters.add(inter);
      }
      dio.interceptors.addAll(inters);
      // 3. 发送网络请求
      try {
        Response response = await dio.request<T>(
          url,
          queryParameters: params,
          options: options
          );
        return response.data;
      } on DioError catch(e){
        return Futurn.error(e);
      }
    }
}

```

```dart
// home_request.dart
class HomeRequest {
  static requestMovieList(int start) async{
    final movieUrl = "xxx.com/getapi";
    final result = await HttpRequest.request(movieUrl);
    print("result is $result");
  }
}
// home.dart
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    return RaisedButton(
      child: Text("请求数据"),
      onPressed: (){
        HomeRequest.requestMovieList(0);
      }
    )
  }
}
```

## connectivity 库

可以让 Flutter 应用发现网络连接，并进行相应的配置。它可以区分蜂窝与 WIFI 连接，适用于 IOS 和 Android。【安卓上，若连接的是 VPN 或酒店 WiFi，并不能保证能正常运行】

```yaml
dependencies:
  connectivity: ^2.0.0
```

具体使用

```dart
import "package:connectivity/connectivity.dart";
import "package:flutter/material.dart";
import "dart:async";
void main()=>runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      title: "Flutter Demo",
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: NetWorkPage()
    )
  }
}
class NetWorkPage extends StatefulWidget {
  @override
  _NetWorkPageState createState() => _NetWorkPageState();
}
class _NetWorkPageState extends State<NetWorkPage>{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        title: Text("connectivity test")
      ),
      body:Container(
        child: RaisedButton(
          onPressed: (){
            Navigator.push(context, MaterialPageRoute(builder: (context)=>Pagedemo()))
          },
          text: Text("测试"),
        )
      )
    )
  }
}
class Pagedemo = extends StatefulWidget{
  @override
  _PagedemoState createState()=>_PagedemoState();
}
class _PagedemoState extends State<PageDemo>{
  StreamSubscriptio<ConnectivityResult> subscription;
  String nowNetWork = "";
  @override
  initState(){
    super.initState();
    subscription = Connectivity().onConnectivityChanged.listen((ConnectivityResult result){
      if(result == ConnectivityResult.mobile){
        setState((){
          this.nowNetWork = "当前处于移动网络";
        });
      } else if(result == ConnectivityResult.wifi){
        setState((){
          this.nowNetWork = "当前处于wifi";
        })
      } else {
        setState((){
          this.nowNetWork="网络无连接";
        });
      }
    });
  }
  @override
  dispose(){
    super.dispose();
    subscription.cancel();
  }
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: Text("网络监测页面"),),
      body: Center(
        child: Text(nowNetWork),
      )
    );
  }
}
```
