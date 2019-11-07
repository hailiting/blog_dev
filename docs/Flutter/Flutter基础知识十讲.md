# Flutter基础知识十讲
## 1，学习Flutter该具备的基础
### 1.1 Dart基础
#### 1.1.1 类
##### 封装、继承、多态
##### 抽象
##### 构造方法
#### 1.1.2 函数/方法
##### 入口方法
##### 匿名方法
##### 静态方法
##### 返回值
##### 参数（可选参数，默认参数）
#### 1.1.3 泛型
##### 泛型类（限制泛型类型）
##### 在构造方法中使用泛型
##### 泛型方法
#### 1.1.4 异步
##### async await
##### Future
##### Stream
> 学习资料
> https://www.dartlang.org
> http://dart.goodev.org
### 1.2 Android Studio/ VS Code
### 1.3 一定的Android/ios基础
## 2，如何快速搭建和运行一个Flutter项目
### 2.1 搭建一个项目
方式一                               
1，给android studio安装好flutter和Dart工具                                
2，Start a new Flutter project(一路next)                               
方式二
1，flutter create fluttername
2，cd fluttername                               
3，flutter run （运行到指定的模拟器      flutter  run -d 'iPhone X'）                               
## 3，如何使用Flutter包和插件
``https://pub.dartlang.org``                             
1，在上面的网站找到所要的插件                             
2，在文件夹 ``pubspec.yaml``文件添加                             
~~~
dependencies:
    flutter_color_plugin: ^0.0.2
~~~
3，``flutter packages get``安装                             
4，``import 'package:flutter_color_plugin/flutter_color_plugin.dart'``来使用                             
## 4，StatelessWidget与基础组件
### 不需要可变状态的小部件
当描述用户界面部分不依赖于对象本身中的配置信息以及widget的BuildContext时，无状态widget非常有用

### Container/Text/Icon/CloseButton/BackButton/Chip/Divider/Card/AlertDialog
Container 容器组件
``this.alignment``
``this.padding``
``this.foregroundDecoration``
``this.margin``,
``this.transform``
``this.child``
``color``
``decoration``装饰器
``width``
``height``
``constrains``
Text 文本组件
Icon 图标组件
Chip
Divider  分割线组件
Card  卡片格式组件
AlertDialog  弹窗
~~~
return MaterialApp(
    title: 'StatelessWidget与基础组件',
    theme: ThemeData(
    primarySwatch: Colors.blue,
    ),
    home: Scaffold(
    appBar: AppBar(title: Text('StatelessWidget11与基础组件')),
    body: Container(
        decoration: BoxDecoration(color: Colors.white),
        alignment: Alignment.center,
        child: Column(
        children: <Widget>[
            Text("I am Text",style:textStyle),
            Icon(
            Icons.android,
            size: 50,
            color: Colors.red,
            ),
            CloseButton(),
            BackButton(),
            Chip(
            avatar: Icon(Icons.people),
            label: Text('StatelessWidget'),
            deleteIcon: Icon(Icons.delete),
            ),
            Divider(
            height: 10,
            indent: 10,
            color: Colors.red,
            ),
            Card(
            color: Colors.amber,
            elevation: 5,
            margin: EdgeInsets.all(20),
            child: Container(
                padding: EdgeInsets.all(10),
                child: Text(
                    'adfsadf',
                    style: textStyle,
                ),
            ),
            ),
            AlertDialog(
            title: Text('acbc'),
            content: Text('asdfsadfsad'),
            )
        ],
        ),
    )
    ),
);
~~~

## 5，StatefulWidget与基础组件
### MaterialApp/Scaffold/AppBar/BottomNavigationBar/RefreshIndicator/Image/TextField/PageView
MaterialApp  材料设计的app组件（通常在app的根节点）
Scaffold   flutter封装的，带有导航栏，appbar，侧边栏等的组件
AppBar   app顶部导航栏
BottomNavigationBar  app底部的导航栏
RefreshIndicator 刷新的指示器
Image   图片组件
TextField   输入框组件
PageView  滑动视图列表
### 底部导航实现
~~~
import 'package:flutter/material.dart';

class StatefullGroup extends StatefulWidget {
  @override
  _StatefulGroupState createState() => _StatefulGroupState();
}

class _StatefulGroupState extends State<StatefullGroup> {
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StatefulWidget与基础组件',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
          appBar: AppBar(title: Text('StatefulWidget与基础组件')),
          bottomNavigationBar: BottomNavigationBar(
              currentIndex: _currentIndex,
              onTap: (index){
                setState(() {
                  _currentIndex = index;
                });
              },
              items: [
                BottomNavigationBarItem(
                    icon: Icon(Icons.home, color: Colors.grey),
                    activeIcon: Icon(
                      Icons.home,
                      color: Colors.blue,
                    ),
                    title: Text("首页")),
                BottomNavigationBarItem(
                    icon: Icon(Icons.list, color: Colors.grey),
                    activeIcon: Icon(
                      Icons.list,
                      color: Colors.blue,
                    ),
                    title: Text("列表"))
              ]
          ),
          floatingActionButton: FloatingActionButton(
            onPressed: null,
            child: Text("点我"),
          ),
          body: _currentIndex==0?
            // 下拉刷新组件
            RefreshIndicator(
              child: ListView(
                children: <Widget>[
                  Text("list"),
                  Image.network(
                      'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=3110424233,2189857990&fm=85&s=F0183ED5461737C20CA6C1260300202B',
                      width: 200,
                      height: 200,
                  ),
                  TextField(
                    decoration: InputDecoration(
                      contentPadding: EdgeInsets.fromLTRB(5, 0, 0, 0),
                      hintText: '请输入',
                      hintStyle: TextStyle(fontSize: 15)
                    ),
                  ),
                  Container(
                    height: 100,
                    margin: EdgeInsets.only(top: 10),
                    decoration: BoxDecoration(color: Colors.lightBlueAccent),
                    child: PageView(
                      children: <Widget>[
                        _item('Page1', Colors.deepOrange),
                        _item('Page2', Colors.deepOrangeAccent),
                        _item('Page3', Colors.deepPurple),
                        _item('Page4', Colors.deepPurpleAccent),
                        _item('Page5', Colors.orange),
                      ],
                    ),
                  )
                ],
              ),
              onRefresh: _handleRefresh,
            ):Text("列表"),
      ),
    );
  }
  Future<Null> _handleRefresh() async{
    await Future.delayed(Duration(milliseconds: 200));
    return null;
  }

  _item(String title, Color color) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(color: color),
      child: Text(
        title,
        style: TextStyle(fontSize: 22,color: Colors.white),
      ),
    );
  }
}
~~~
## 6，如何进行Flutter布局开发
### 布局相关的组件``Container``,``RenderObjectWidget``,``ParentDataWidget``
### ``RenderObjectWidget``
#### SingleChildRenderObjectWidget （单节点）
Opacity
ClipOval(裁剪为圆形)
ClipRRect
PhysicalModal (实体模型)
Align => Center
Padding
SizedBox
FractionallySizedBox（水平或垂直占满）
~~~
children: <Widget>[
    ClipOval(
        child: SizedBox(
            width: 100,
            height: 100,
            child: Image.network(...)
        )
    ),
    Padding(
        padding: EdgeInsets.all(10),
        child: ClipRRect(
            // 圆角
            // BorderRadius.circular(6),
            // clipBehavior: Clip.antiAlias // 抗锯齿
            borderRadius: BorderRadius.all(Radius.circular(10)),
            child: Opacity(
                opacity: 0.6,
                child: Image.network(
                    "...",
                    width:100,
                    height: 100,
                )
            )
        )
    ),
    Container(
        height: 100,
        margin: EdgeInsets.all(10),
        child: PhysicalModal(
            color: Colors.transparent,
            borderRedius: BorderRadius.circular(6),
            clipBehavior: Clip.antiAlias,
            child: PageView(
                children: <Widget>[
                    _item('Page1', Colors.red),
                    ...
                ]
            )
        )
    ),
    // 撑满一行
    Column(
        children: <Widget>[
            FractionallySizedBox(
                widthFactor: 1,
                child: Container(
                   decoration: BoxDecoration(color: Colors.greenAccent),
                   child: Text('宽度撑满'), 
                )
            )
        ]
    ),
]

~~~
#### MultiChildRenderObjectWidget（多节点布局组件）
Stack
Flex=>Column, Row
Wrap
Flow
### ParentDataWidget
#### Positioned 绝对布局
#### Flexible => Expanded
~~~
children: <Widget>[
    //元素叠加
    Stack(
        children: <Widget>[
            Image.network(
                '...',
                width: 100,
                height: 100,
            ),
            Positioned(
                left: 0,
                bottom: 0,
                child: Image.network(
                    '...',
                    width: 36,
                    height: 36,
                )
            )
        ]
    ),
    // 创建一个wrap布局，从左向右
    Wrap(
        spacing: 8, // 水平边距
        runSpacing: 6, // 垂直间距
        children: <Widget>[
            _chip('Flutter'),
            _chip('123'),
            _chip('qweqw'),
            _chip('asdas'),
        ]
    ),
    // 向下排序
    Column(
        children: <Widget>[
            Text('列表'),
            Expanded(
                child: Container(
                    decoration: BoxDecoration(
                        color: Colors.red,
                    ),
                    child: Text('拉伸填满高度'),
                )
            )
        ]
    )
]

_chip(String label){
    return Chip(
        label: Text(label),
        avatar: CircleAvatar(
            backgroundColor: Colors.blue.shade900,
            child: Text(
                label.substring(0,1),
                style: TextStyle(fontSize: 10)
            )
        )
    );
}
~~~
## 7，如何创建和使用Flutter的路由与导航
~~~
// Navigator.push(打开页面)
void _navigateSecondPage(BuildContext context, page){
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context)=>page
        )
    );
}
// 打开命名的路由
Navigator.pushNamed(context, routeName);
// Navigator.pop(context)  // 退出当前页面，返回上一级页面
void _backCurrentPage(BuoldContext context){
    Navigator.pop(context);
}
~~~
#### 已命名的路由跳转
~~~
void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter必备D111art基础',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text("adsfsadf"),
        ),
        body: RouteNavigator(),
      ),
      routes: <String,WidgetBuilder>{
        // 定义路由
        "plugin": (BuildContext context)=>PluginUse(),
        "less": (BuildContext context)=>LesGroupPage(),
        "ful": (BuildContext context)=>StatefullGroup(),
        "layout": (BuildContext context)=>FlutterLayoutPage(),
      },
    );
  }
}
// 子页面返回上一级路由
...
appBar: AppBar(
    title: Text('titlename'),
    leading: GestureDetector(
        onTap: (){
            Navigator.pop(context);
        },
        child: Icon(Icons.arrow_back),
    )
)
...
~~~
## 8，如何检测用户手势以及处理点击事件
~~~
children: <Widget>[
    GestureDetector(
    onTap: ()=>_printMsg("点击"),
    onDoubleTap: ()=>_printMsg("双击"),
    onLongPress: ()=>_printMsg("长按"),
    onTapCancel: ()=>_printMsg("点击取消"),
    onTapUp: (e)=>_printMsg("松开"),
    onTapDown: (e)=>_printMsg("按下"),
    onPanUpdata: (e)=>{
        e.delta.dx; // X轴位置
        e.delta.dy; // Y轴位置
    }
    child: Container(
        padding: EdgeInsets.all(60),
        decoration: BoxDecoration(color: Colors.blueAccent),
        child: Text(
            "点我",
            style: TextStyle(fontSize: 36,color: Colors.white),
        ),
    )
    ),
    Text(printString)
],
~~~
## 9，如何导入和使用Flutter的资源文件
1，在``pubspec.yaml``里配置
2，在dark文件使用
~~~
Image(
    width: 100,
    height: 100,
    image: AssetImage('images/avatar.png'),
)
~~~

## 10，如何打开第三方应用
~~~
// pubspec.yaml
dependencies:
    url_launcher: ^5.0.2
// 安装
flutter packages get
// 引用
import "package:url_launncher/url_launcher.dart";
_launchURL() async {
    // url 或 url schemes
    const url = "https://flutter.io";
    if(await canLaunch(url)){
        await launch(url);
    } else{
        throw "could not launch $url";
    }
} 
_openMap() async{
    const url = "geo:52.32,4.917"; // app提供者提供的schema
    if(await canLaunch(url)){
        await launch(url)
    } else {
        const url="http://maps.apple.com/?ll=52.32,4.917";
        if(await cannLaunch(url)){
            await launch(url);
        } else{
            throw "Could not launch $url";
        }
    }
}
~~~
## 11, Flutter页面生命周期实战指南
### StatelessWidget只有createElement, build两个生命周期方法
### StatefullWidget生命周期
#### 1，初始化时期
createState, initState
#### 2，更新期间
didChangeDependencies, build, didUpdateWidget
#### 3，销毁期
deactivate, dispose
~~~
// staful + enter 快速搭建一个dart结构文件
// 引入依赖  option+enter
import 'package:flutter/material.dart';
class WidgetLifecycle extends StatefulWidget {
    @override
    _WidgetLifecycleState createState()=> _WidgetLifecycleState();
}
class _WidgetLifecycleStateState extends State<WidgetLifecycleState> {
  int _count = 0;
  @override
  // 做初始化工作(channel初始化，监听器的初始化等)
  void initState(){
    print('-----initState----');
    super.initState();
  }
  // 当依赖的state对象改变时会调用
  // 1, 在initState()之后立即调用
  // 2, 如果StatefullWidgets依赖于InheritedWidget，那么当前State所依赖的InheritedWidget中的变量改变时会再次调用
  @override
  void didChangeDependencies(){
    print('----didChangeDependencies----');
    super.didChangeDependencies();
  }
  // 在didChangeDependencies()之后立即调用；
  // 另外在调用setState后也会再次调用该方法；
  @override
  Widget build(BuildContext context){
    print('----build----');
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter页面生命周期'),
        leading: BackButton(),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            RaisedButton(
              onPressed: (){
                setState((){
                  _count += 1;
                });
              },
              child: Text(
                "点我",
                style: TextStyle(fontSize: 26),
              ),
            ),
            Text(_count.toString()),
          ],
        ),
      ),
    );
  }
  // command + n  重写方法  搜索到想重写的方法

}
~~~
## 12, Flutter应用的生命周期
## 13, 修改Flutter应用的主题
## 14, 自定义字体
## 【实战】拍照App开发
