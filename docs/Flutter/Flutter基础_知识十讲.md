# Flutter 基础知识十讲

## 1，学习 Flutter 该具备的基础

### 1.1 Dart 基础

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
> https://www.dartlang.org > http://dart.goodev.org

### 1.2 Android Studio/ VS Code

### 1.3 一定的 Android/ios 基础

## 2，如何快速搭建和运行一个 Flutter 项目

### 2.1 搭建一个项目

方式一  
1，给 android studio 安装好 flutter 和 Dart 工具  
2，Start a new Flutter project(一路 next)  
方式二
1，flutter create fluttername
2，cd fluttername  
3，flutter run （运行到指定的模拟器 flutter run -d 'iPhone X'）

## 3，如何使用 Flutter 包和插件

`https://pub.dartlang.org`  
1，在上面的网站找到所要的插件  
2，在文件夹 `pubspec.yaml`文件添加

```
dependencies:
    flutter_color_plugin: ^0.0.2
```

3，`flutter packages get`安装  
4，`import 'package:flutter_color_plugin/flutter_color_plugin.dart'`来使用

## 4，StatelessWidget 与基础组件

### 不需要可变状态的小部件

当描述用户界面部分不依赖于对象本身中的配置信息以及 widget 的 BuildContext 时，无状态 widget 非常有用

### Container/Text/Icon/CloseButton/BackButton/Chip/Divider/Card/AlertDialog

Container 容器组件
`this.alignment`
`this.padding`
`this.foregroundDecoration`
`this.margin`,
`this.transform`
`this.child`
`color`
`decoration`装饰器
`width`
`height`
`constrains`
Text 文本组件
Icon 图标组件
Chip
Divider 分割线组件
Card 卡片格式组件
AlertDialog 弹窗

```
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
```

## 5，StatefulWidget 与基础组件

### MaterialApp/Scaffold/AppBar/BottomNavigationBar/RefreshIndicator/Image/TextField/PageView

MaterialApp 材料设计的 app 组件（通常在 app 的根节点）
Scaffold flutter 封装的，带有导航栏，appbar，侧边栏等的组件
AppBar app 顶部导航栏
BottomNavigationBar app 底部的导航栏
RefreshIndicator 刷新的指示器
Image 图片组件
TextField 输入框组件
PageView 滑动视图列表

### 底部导航实现

```
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
              // ListView兼容了苹果的刘海
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
```

## 6，如何进行 Flutter 布局开发

### 布局相关的组件`Container`,`RenderObjectWidget`,`ParentDataWidget`

### `RenderObjectWidget`

#### SingleChildRenderObjectWidget （单节点）

Opacity
ClipOval(裁剪为圆形)
ClipRRect
PhysicalModal (实体模型)
Align => Center
Padding
SizedBox
FractionallySizedBox（水平或垂直占满）

```
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

```

#### MultiChildRenderObjectWidget（多节点布局组件）

Stack
Flex=>Column, Row
Wrap
Flow

### ParentDataWidget

#### Positioned 绝对布局

#### Flexible => Expanded

```
children: <Widget>[
    //元素叠加 前面的会被后面的盖住
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
```

## 7，如何创建和使用 Flutter 的路由与导航

```
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
```

#### 已命名的路由跳转

```
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
```

## 8，如何检测用户手势以及处理点击事件

```
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
```

## 9，如何导入和使用 Flutter 的资源文件

1，在`pubspec.yaml`里配置
2，在 dark 文件使用

```
Image(
    width: 100,
    height: 100,
    image: AssetImage('images/avatar.png'),
)
```

## 10，如何打开第三方应用

```
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
```

## 11, Flutter 页面生命周期实战指南

### StatelessWidget 只有 createElement, build 两个生命周期方法

### StatefullWidget 生命周期

#### 1，初始化时期

createState, initState

#### 2，更新期间

didChangeDependencies, build, didUpdateWidget

#### 3，销毁期

deactivate, dispose

```
// stful + enter 快速搭建一个dart结构文件
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
  // 很少使用，当父组件需要重新绘制的时候才调用
  void didUpdateWidget(WidgetLifecycle oldWidget){
      print('--------didUpdateWidget------');
      super.didiUpdateWidget(oldWidget);
      // if(oldWidget.xxx != widget.xxx) ....
  }
  // 很少使用，当组件被移除时调用在dispose之前调用
  @override
  void deactivate(){
      print('----------deactivate---------');
      super.deactivate();
  }
  // 常用，组件被销毁时调用
  // 通常在该方法中执行一些资源的释放：监听器的卸载，channel的销毁等
  @override
  void dispose(){
    print('----dispose----');
    super.dispose();
  }
}
```

## 12, Flutter 应用的生命周期

```
// 用WidgetsBindingObserver来获取Flutter应用维度的生命周期
import 'package:flutter/material.dart';
class AppLifeCycle extends StatefulWidget{
    @override
    _AppLifeCycleState createState()=>_AppLifeCycleState();
}
class _AppLifeCycleState extends State<AppLifeCycle> with WidgetsBindingObserver{
    @override
    void initState(){
        WidgetsBinding.instance.addObserver(this);
        super.initState();
    }
    @override
    Widget build(BuildContext context){
        return Scaffold(
            appBar: AppBar(
                title: Text('Flutter应用生命周期'),
                leading: BackButton(),
            ),
            body: Container(
                child: Text('Flutter应用生命周期'),
            )
        );
    }
    @override
    void didChangeAppLifecycleState(AppLifecycleState state){
        super.didChangeAppLifecyclesState(state);
        print('state = $state');
        if(state == AppLifecycleState.paused){
          print('App进入后台');
        } else if(state ==AppLifecycleState.resumed){
          print('App进入前台');
        } else if(state == AppLifecycleState.inactive){
          // 不常用：应用处于非活动状态，并且未接收到用户输入时调用，比如： 打电话
        } else if(state == AppLifecycleState.suspending){
          // 不常用，ios不会触发，应用被挂起的时候触发
        }
    }
    @override
    void dispose(){
        WidgetsBinding.instance.removeObserver(this);
        super.dispose();
    }
}
```

## 13, 修改 Flutter 应用的主题

```
// 用 StatefullWidget, 而不是StatelessWidget
// 申请一个所有主题变量
Brightness _brightness = Brightness.light;  // Brightness.dark
@overrider
Widget build(BuildContext context){
    return MaterialApp(
        title: 'Flutter Dome',
        theme: ThemeDate(
            brightness: _brightness,
            primarySwatch: Colors.blue,
        ),
        home: Scaffold(
            appBar: AppBar(
                title: Text('...'),
            )
            body: Column(...)
        )
    )
}
```

## 14, 自定义字体

### 1，下载字体

### 2，在根目录创建 fonts 文件，并把.ttf 文件放进去

### 3，修改`pubspec.yaml`文件，注册字体

```
font:
    family: RubikMonoOne
    fonts:
        asset: fonts/RubikMonoOne-Regular.ttf
```

### 4.1，全局应用

```
// main.dart
...
Widget build(BuildContext context){
    return MaterialApp(
        title: ...,
        theme: ThemeData(
            fontFamily: 'RubikMonoOne',
            ...
        )
    )
}
...
```

### 4.2，部分页面应用

```
...
child: Text("切换主题abc", style: TextStyle(fontFamily: 'RubikMonoOne'),),
...
```

### 5，pubspec.yaml 下 有一个`Packages get`,点击运行

## 15，修改应用名称

android

```
- flutterdome
  - android
    - app
      - src
       - main
        -AndroidManifest.xml
          <application
            ...
            android:label="ABCdome"
            ...
          >
```

ios

```
- flutterdome
  - ios
    - Runner
      - info.plist
        ...
        <string>6.0</string>
	      <key>CFBundleName</key>
        <string>ABCdome</string>
        ...
```

## 16，修改应用图标

android

```
// 放icon图标的文件地址
domename/android/app/src/main/res/mipmap-hdpi
// domename/android/app/src/main AndroidManifest.xml
...
android:icon="@mipmap/icon_logo"
...
```

ios

```
// 放icon图标的文件地址
domename/ios/Runner/Assets.xcassets/AppIcon.appiconset
Icon-App-20*20@1x.png
```

## 17，Flutter 打包

### android

#### 17.1 生成 key

17.1.1 通过命令
`keytool -genkey -v -keystore D:/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`
17.1.2 AndroidStudio 自带功能生成
`Generate signed bundle/APK...`

#### 17.2, 配置 key

在 android 目录下新建文件“key.properties”，填写内容如下

```
storePassword=密匙库口令
keyPassword=key密匙口令
keyAlias=key别名
storeFile=路径
```

#### 17.3, 配置 build.gradle

1，在 app 目录里的 build.gradle 里

```
...
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
android{
  ...
}
```

2, 在 android 里加入 signingConfigs 和替换 buildTypes

```
signingConfigs {
  release{
    keyAlias keystoreProperties['keyAlias']
    keyPassword keystoreProperties['keyPassword']
    storeFile file(keystoreProperties['storeFile'])
    storePassword keystoreProperties['storePassword']
  }
}
buildTypes {
  release {
    // 替换成 release
    signingConfig signingConfigs.release
  }
}
```

#### 17.4, 生成 apk

在项目跟目录`flutter build apk`;
最后生成的 apk 在项目目录的`build/app/outputs/apk`里

### ios

1，申请钥匙串、申请证书
2，注册 Bundle ID
3，添加测试设备
4，配置证书
5，打包 ipa，
6，应用发布

```
1，配置的bundle id应该与应用的bundle id一致
2，证书分为开发证书和发布证书，发布证书配置时，发布到app store的选择 "App Store"，发布到fir.im或蒲公英等三方分发网站的选择'Ad hoc'
```

## 【实战】拍照 App 开发

### 1，新建 dart 文件`photo_app_page.dart`

```
// stf
import 'package:flutter/material.dart';

class PhotoApp extends StatefulWidget {
  @override
  _PhotoAppState createState() => _PhotoAppState();
}

class _PhotoAppState extends State<PhotoApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('photo app'),
        leading: GestureDetector(
          onTap: (){
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Container(
        child: Text("三生三世"),
      ),
    );
  }
}
```

### 2，`flutter`图片插件 `image_picker`

flutter 插件官网地址 `https://pub.dartlang.org/packages/`

#### 2.1 添加依赖到`pubspec.yaml`

```
dependncies:
    image_picker: ^0.5.2
```

#### 2.2 下载 `flutter pub get`

#### 2.3 导入

```
import 'package:image_picker/image_picker.dart';
```

### 3，兼容 androidX

#### 3.1 `android/gradle/wrapper/gradle-wrapper.properties`里 distributionUrl 配置

```
distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.2-all.zip:
```

#### 3.2 `android/build.gradle`

```
dependencies{
    // 原来的
    classpath 'com.android.tools.build:gradle:3.2.1'
    // 改为
    classpath 'com.android.tools.build.gradle:3.3.0'
}
```

#### 3.3 `android/gradle.properties`

```
// 添加
android.enableJetifier=true
android.useAndroidX=true
```

#### 3.4 `android/app/build.gradle`

`compileSdkVersion` >=28  
`targetSdkVersion` >=28

#### 3.5 `android/app/build.gradle`

```
// 原来的
testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
// 替换为
testInstrumentationRunner "androidx.text.runner.AndroidJUnitRunner"



// 原来的 在 dependencies {下
androidTestImplementation 'com.android.support.test:runner:1.0.2'
androidTestImplementation 'com.android.support.test.espresso.espresso-core:3.0.2'
// 改为
androidTestImplementation 'androidx.test:runner:1.1.1'
androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.1'
```

### 4，配置 ios 项

```
// ios/Runner/info.plist
<true/>
<key>NSCameraUsageDescription</key>
<string>在这里配置相机的使用</string>
<key>NSMicrophoneUsageDescription</key>
<string>在这里配置录音的使用</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>在这里配置相册的使用</string>
```

### 5，测试是否 OK

```
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class PhotoApp extends StatefulWidget {
  @override
  _PhotoAppState createState() => _PhotoAppState();
}

class _PhotoAppState extends State<PhotoApp> {
  File _image;

  Future getImage() async {
    print('12333');
    var image = await ImagePicker.pickImage(source: ImageSource.camera);

    setState(() {
      _image = image;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('photo app'),
        leading: GestureDetector(
          onTap: (){
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Center(
        child: _image == null
            ? Text('No image selected.')
            : Image.file(_image),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: getImage,
        tooltip: 'Pick Image',
        child: Icon(Icons.add_a_photo),
      ),
    );
  }
}
```

### 6，最终实现

```
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class PhotoApp extends StatefulWidget {
  @override
  _PhotoAppState createState() => _PhotoAppState();
}

class _PhotoAppState extends State<PhotoApp> {
  List<File> _images = [];

  Future getImage(bool isTokenPhonto) async {
    print("1111");
    Navigator.pop(context);
    var image = await ImagePicker.pickImage(source: isTokenPhonto? ImageSource.camera:ImageSource.gallery);
    if(image != null){
      setState(() {
        _images.add(image);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('photo app'),
        leading: GestureDetector(
          onTap: (){
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Center(
        child: Wrap(
          spacing: 5,
          runSpacing: 5,
          children: _genImages(),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _pickImage,
        tooltip: '选择图片',
        child: Icon(Icons.add_a_photo),
      ),
    );
  }
  _pickImage(){
    showModalBottomSheet(context: context,  builder: (context)=>Container(
      height: 160,
      child: Column(
        children: <Widget>[
          _item('拍照', true),
          _item('从相册选择', false),
        ],
      )
    ));
  }

  _item(String title, bool isTokenPhonto) {
    return GestureDetector(
      child: ListTile(
        leading: Icon(isTokenPhonto?Icons.camera_alt: Icons.photo_library),
        title: Text(title),
        onTap: ()=>getImage(isTokenPhonto),
      ),
    );
  }

  _genImages() {
    return _images.map((file){
      return Stack(
        children: <Widget>[
          ClipRRect(
            borderRadius: BorderRadius.circular(5),
            child: Image.file(file,width: 120,height: 90,fit: BoxFit.fill,),
          ),
          Positioned(
            right: 5, top: 5,
            child: GestureDetector(
              onTap: () {
                setState(() {
                  _images.remove(file);
                });
              },
              child:  ClipOval(
                child: Container(
                  padding: EdgeInsets.all(3),
                  decoration: BoxDecoration(color: Colors.black54),
                  child: Icon(Icons.close, size: 18,color: Colors.white,),
                ),
              ),
            ),
          )
        ],
      );
    }).toList();
  }
}
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class PhotoApp extends StatefulWidget {
  @override
  _PhotoAppState createState() => _PhotoAppState();
}

class _PhotoAppState extends State<PhotoApp> {
  List<File> _images = [];

  Future getImage(bool isTokenPhonto) async {
    print("1111");
    Navigator.pop(context);
    var image = await ImagePicker.pickImage(source: isTokenPhonto? ImageSource.camera:ImageSource.gallery);
    if(image != null){
      setState(() {
        _images.add(image);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('photo app'),
        leading: GestureDetector(
          onTap: (){
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Center(
        child: Wrap(
          spacing: 5,
          runSpacing: 5,
          children: _genImages(),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _pickImage,
        tooltip: '选择图片',
        child: Icon(Icons.add_a_photo),
      ),
    );
  }
  _pickImage(){
    showModalBottomSheet(context: context,  builder: (context)=>Container(
      height: 160,
      child: Column(
        children: <Widget>[
          _item('拍照', true),
          _item('从相册选择', false),
        ],
      )
    ));
  }

  _item(String title, bool isTokenPhonto) {
    return GestureDetector(
      child: ListTile(
        leading: Icon(isTokenPhonto?Icons.camera_alt: Icons.photo_library),
        title: Text(title),
        onTap: ()=>getImage(isTokenPhonto),
      ),
    );
  }

  _genImages() {
    return _images.map((file){
      return Stack(
        children: <Widget>[
          ClipRRect(
            borderRadius: BorderRadius.circular(5),
            child: Image.file(file,width: 120,height: 90,fit: BoxFit.fill,),
          ),
          Positioned(
            right: 5, top: 5,
            child: GestureDetector(
              onTap: () {
                setState(() {
                  _images.remove(file);
                });
              },
              child:  ClipOval(
                child: Container(
                  padding: EdgeInsets.all(3),
                  decoration: BoxDecoration(color: Colors.black54),
                  child: Icon(Icons.close, size: 18,color: Colors.white,),
                ),
              ),
            ),
          )
        ],
      );
    }).toList();
  }
}
```
