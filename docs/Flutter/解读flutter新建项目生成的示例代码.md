# 解读 flutter 新建项目生成的示例代码

当 `flutter create my_app`时，本地会多了一个项目， `cd`到`my_app`在`Android Studio`运行，会发现有一个简单的累计数字的 app 已经在模拟器上了，那作为 flutter 小白，来看看文件夹`lib`里的`main.dart`到底做了什么。

## 框架浅析

| Framework【框架】Dart |           |          |
| --------------------- | --------- | -------- |
| Material              | Cupertino |
| Widgets               |
| Rendering             |
| Animation             | Painting  | Gestures |
| Foundation            |

| Engine【编译引擎】C/C++ |                  |                  |
| ----------------------- | ---------------- | ---------------- |
| Service Protocol        | Composition      | Platform Channel |
| Dart lsolate Setup      | Rendering        | System Evens     |
| Dart VM Management      | Frame Scheduling | Asset Resolution |
|                         | Frame Pipelining | Text Layout      |

| Embedder【嵌入器】Platform Specific |                   |           |
| ----------------------------------- | ----------------- | --------- |
| Render Surface setup                | Native Plugins    | Packaging |
| Thread Setup                        | EventLoop Interop |           |

## 具体分析

在删除了注释后，得到下面的代码：

```dart
// 模块1
import 'package:flutter/material.dart';
// 模块2
void main() {
  runApp(MyApp());
}
// 模块3
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
// 模块4
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyHomePageState createState() => _MyHomePageState();
}
// 模块5
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  void _incrementCounter() {
    setState(() {
     _counter++;
    });
  }
  @override
  Widget build(BuildContext context) {
     return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            BaseStyles(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

根据区块，大致分为 5 个模块

## 模块 1：import

这里的 import 和 Java 里的 import 没什么区别，都是导入其他文件的引用

```dart
import 'package:flutter/material.dart';
import 'package:flutter_app/baseStyles.dart';
```

### material.dart

1. 首先确定的是`material.dart`是 flutter 工具包里的一个文件

```shell
# 这是我的地址  /Users/xxx/flutter/packages/flutter/lib/material.dart
cd /Users/xxx/flutter/packages/flutter/lib/

analysis_options_user.yaml
animation.dart # flutter提供封装好的动画资源
cupertino.dart  # cupertino风格组件，即IOS风格组件，material包含cupertino
foundation.dart # 底层工具模块
gestures.dart  # 手势识别模块
material.dart # android material design 风格模块
painting.dart  # flutter绘制引擎模块，包含各种绘制api，比如缩放图片，阴影插值，绘制边框等
physics.dart   # 简单的一维物理模拟模块，比如弹簧，摩擦，重力等，用于用户界面动画
rendering.dart  # flutter RenderObject 渲染树模块，提供给widget模块使用，实现其后端的绘制和布局
scheduler.dart  # 调度模块，负责程序框架回调以及特定优先级任务的调度
semantics.dart  # 语意模块，SemanticsEvent类定义了平台的语意事件的发送协议
services.dart  # 平台能力服务，整个模块只引用了core dart库以及foundation模块
widgets.dart  # flutter的widgets框架
src
```

## 模块 2 main 函数

程序运行的入口得有一个 main 函数

```dart
void main(){
  runApp(Myapp());
}
// 写法2
void main()=> runApp(Myapp());
```

这里的`runApp([Widget])`是 flutter 中的方法，接收一个 Widget 对象。绘制的画面就是 Widget，`runApp`可以当做一个引擎
[runApp 详情](https://www.jianshu.com/p/5ecb24dfc44a)

## 模块 3 MyApp 实现逻辑

```dart
// 这是一个无状态组件
class MyApp extends StatelessWidget{
  @override
  // Widget build方法
  // 当前build函数中使用的context，是当前widget所创建的Element对象
  Widget build(BuildContext context){
    return MaterialApp(
      title: "Flutter Dome",
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: "Flutter Demo Home Page")
    )
  }
}
```

`MyApp`是继承自`StatelessWidget`的一个类，而`StatelessWidget`是一个 widget，和`StatefulWidget`一样不会显示任何东西，只有 RenderObject 类才会真正的去绘制控件。

### StatelessWidget

- StatelessWidget 是`无状态`Widget
- StatelessWidget 渲染过程
  - 调用 StatelessWidget 的`createElement`方法，根据这个 widget 生成`StatelessElement`对象
  - 将`StatelessElement`对象挂载到 element 树上
  - `StatelessElement`对象调用 widget 的 build 方法，将 element 自身作为`BuildContext`传入

### StatefulWidget

- StatefulWidget 是`有状态`widget，如果 widget 内部需要更新一些值，如改文字，改图片等，则使用`StatefulWidget`
- `StatefulWidget`需要实现`createState`方法，去创建一个`State`类，而`State`类和`StatelessWidget`一样，存在`Widget build(BuildContext context)`方法。
- 实现过程
  - 调用`StatefulWidget` 的`createElement`方法，根据这个 widget 生成`StatefulElement`对象
  - 将`StatefulElement`对象挂载到`Element`树上
  - 根据`widget`的`createState`方法创建 State 类
  - `StatefulElement`对象调用 state 的 build 方法，并将 element 自身作为 BuildContext 传入

### `MaterialApp` 和 `Scaffold`

`MaterialApp` 和 `Scaffold`是 Flutter 提供的两个 Widget

- MaterialApp 是一个封装了应用程序实现`Material Design`所需的一些 Widget
- Scaffold 组件是 Material Design 布局结构的基本实现，此类提供了用于显示`drawer`,`snackbar`和底部 sheet 的 API, MaterialApp 的 child 是`Scaffold Widget`

#### 以下是 Widget 的构造函数中含有的参数：

```dart
/// The boolean arguments, [routes], and [navigatorObservers], must not be null.
 const MaterialApp({
    Key key,
    this.navigatorKey, // 在构建导航器时使用的键
    this.home, // 应用程序默认路由的widget，用于定义当前应用打开后显示的界面
    this.routes = const <String, WidgetBuilder>{}, // 应用程序的顶级路由表
    this.initialRoute, // 如果构建导航器，则显示第一个路由的名称
    this.onGenerateRoute, // 应用程序导航到指定路由时使用的路由生成器回调
    this.onGenerateInitialRoutes,  // 类似home,不能和home一起使用，接收多个Route,依次push,作为本页面的初始化页面
    this.onUnknownRoute, // 路由不存在时跳转的页面
    this.navigatorObservers = const <NavigatorObserver>[], // 为该应用程序创建导航器的观察者列表
    this.builder, // 用于在导航器上插入小部件，但在由WidgetsApp小部件创建的其他小部件下面插入小部件，或用于完全替换导航器
    this.title = '', // 设备用于为用户识别应用程序的单行描述
    this.onGenerateTitle, // 如非空，则调用此回调函数来生成应用程序的标题字符串，否则使用标题
    this.color, // 在操作系统界面中应用程序使用的主色
    this.theme, // 应用程序小部件使用的颜色
    this.darkTheme, // 适配跟随系统的DarkMode,这种方式是自动跟随iOS/Android的系统设置来切换的，无需用户再单独设置  darkTheme: ThemeData(brightness: Brightness.dark)
    this.highContrastTheme, // 设置对比度
    this.highContrastDarkTheme, // 系统请求“暗模式”和“高对比度”时要使用的ThemeData。
    this.themeMode = ThemeMode.system, // 主题设置[https://dev.to/arthurdenner/light-and-dark-theme-in-flutter-with-thememode-312#:~:text=Flutter%20has%20built-in%20support%20to%20light%20and%20dark,the%20correct%20theme%20based%20on%20the%20device%27s%20settings.]
    this.locale, // 此应用程序本地化小部件的初始区域设置基于此值
    this.localizationsDelegates, // 这个应用程序本地化小部件的委托
    this.localeListResolutionCallback, // 上次尝试 这个回调负责在应用程序启动时，或用户更改设备区域设置时，选择应用程序的区域设置
    this.localeResolutionCallback, // 第二次尝试回调 区域设置
    this.supportedLocales = const <Locale>[Locale('en', 'US')], // 此应用程序已本地化的地区列表
    this.debugShowMaterialGrid = false, // 打开绘制基线网络材质应用程序的网格纸覆盖
    this.showPerformanceOverlay = false, // 打开性能叠加
    this.checkerboardRasterCacheImages = false, // 打开栅格缓存图的图层的棋盘格
    this.checkerboardOffscreenLayers = false, // 打开渲染到屏幕外位图的图层的棋盘格
    this.showSemanticsDebugger = false, // 打开显示框架报告可访问性信息的覆盖
    this.debugShowCheckedModeBanner = true, // 在选中模式下打开一个小的Debug横幅，表示应用程序处于选中模式
    this.shortcuts,  // 键盘快捷方式到应用程序的默认映射  默认情况下  值为 WidgetsApp.defaultShortcuts
    this.actions, // 可修改应用程序操作时的默认动作映射
  })
```

`home`,`routes`,`onGenerateRoute`这三个参数至少填写一个，如果只有 route，则必须包含`Navigator.defaultRouteName(/)`条目。

## 模块 4 MyHomePage

```dart
class MyHomePage extends StatefulState {
  // 实现方法
  MyHomePage({Key key, this.title}): super(key: key);
  final String title;
  @override
  // 实现createState()
  _MyHomePageState createState()=> _MyHomePageState()
}
```

## 模块 5 \_MyHomePageState

- 1. 变量声明 `int _counter = 0`;
- 2. 实现`_incrementCounter()`方法
     用 setState 方法改变`_counter`的值，setState 是 State 类中特有的，这里就体现出 StatefulWidget 了
- 3. 实现 build 返回 Scaffold 布局

### [Scaffold](./Flutter基础_Scaffold.md)
