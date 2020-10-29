# Flutter 基础\_Scaffold 导航框架

```dart
const Scaffold({
  Key key,
  this.appBar,  // 横向水平布局，通常显示在顶部（*）
  this.body,  // 内容（*）
  this.floatingActionButton,  //  悬浮按钮，就是上图右下角按钮
  this.floatingActionButtonLocation,  // 悬浮按钮位置
  this.floatingActionButtonAnimator,  //  悬浮按钮在[floatingActionButtonLocation]出现/消失动画
  this.persistentFooterButtons, // 在底部呈现一组button，显示于[bottomNavigationBar]之上，[body]之下
  this.drawer, // 一个垂直面板，显示于左侧，初始处于隐藏状态
  this.endDrawer,
  this.bottomNavigationBar,  //  出现于底部的一系列水平按钮
  this.bottomSheet, // 底部持久化提示框
  this.backgroundColor,  // 内容背景颜色
  this.resizeToAvoidBottomPadding,  // 弃用，使用[resizeToAvoidBottomInset]
  this.resizeToAvoidBottomInset,  // 重新计算布局空间大小
  this.primary = true,   //  是否显示到底部，默认为true将显示到顶部状态栏
  this.drawerDragStartBehavior = DragStartBehavior.start,
  this.extendBody = false, // 控制body底部的可显示范围是否在bottomNavigationBar和persistentFooterButtons之上，如果设置为True则会直接显示到屏幕的底部，而不是bottomNavigationBar和persistentFooterButtons的上面。
  this.extendBodyBehindAppBar = false, // 这个是控制是否是从屏幕顶部开始显示，而不是从AppBar下面开始显示。
  this.drawerScrimColor, // 侧滑布局滑出去之后剩余部分的颜色
  this.drawerEdgeDragWidth,  // 水平滑动将打开抽屉的区域的宽度,默认值20，除了0之外其他都不起作用
  this.drawerEnableOpenDragGesture = true,//通过手势滑动打开左侧侧滑栏
  this.endDrawerEnableOpenDragGesture = true,// 通过手势滑动打开右侧侧滑栏
})
```

## 实现首页导航需要哪些材料

Scaffold

- BottomNavigationBar
  PageView
- PageController

## 什么是 Scaffold widget

Scaffold 是一个实现了基本的 materialDesign 的布局结构

```dart
import 'package:flutter/material.dart';
class TabbedAppBarSample extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return MaterialApp(
        home: DefaultTabController(
            length: choices.length,
            child: Scaffold(
                appBar: AppBar(
                  title: const Text('Tabbed AppBar'),
                  bottom: TabBar(
                    isScrollable: true,
                    tabs: choices.map((Choice choice){
                      return Tab(
                        text: choice.title,
                        icon: Icon(choice.icon),
                      );
                    }).toList(),
                  ),
                ),
                body: TabBarView(
                  children: choices.map((Choice choice){
                    return Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: ChoiceCard(choice: choice),
                    );
                  }).toList(),
                )
            )
        )
    );
  }
}
class Choice{
  const Choice({this.title, this.icon});
  final String title;
  final IconData icon;
}
const List<Choice> choices = const <Choice>[
  const Choice(title: 'CAR', icon: Icons.directions_car),
  const Choice(title: 'BICYCLE', icon: Icons.directions_bike),
  const Choice(title: 'BOAT', icon: Icons.directions_boat),
  const Choice(title: 'BUS', icon: Icons.directions_bus),
  const Choice(title: 'TRAIN', icon: Icons.directions_railway),
  const Choice(title: 'WALK', icon: Icons.directions_walk),
];
class ChoiceCard extends StatelessWidget{
  const ChoiceCard({Key key, this.choice}): super(key: key);
  final Choice choice;
  @override
  Widget build(BuildContext context){
    final TextStyle textStyle = Theme.of(context).textTheme.display1;
    return Card(
        color: Colors.white,
        child: Center(
            child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Icon(choice.icon, size: 128.0, color: textStyle.color),
                  Text(choice.title, style: textStyle),
                ]
            )
        )
    );
  }
}
void main(){
  runApp(TabbedAppBarSample());
}
```

### 底部导航

```dart
// navigator/tab_navigator.dart
import 'package:flutter/material.dart';
import 'package:flutter_dome/pages/home_page.dart';
import 'package:flutter_dome/pages/my_page.dart';
import 'package:flutter_dome/pages/search_page.dart';
import 'package:flutter_dome/pages/travel_page.dart';

class TabNavigator extends StatefulWidget{
  @override
  _TabNavigatorState createState() => _TabNavigatorState();
}
class _TabNavigatorState extends State<TabNavigator> with SingleTickerProviderStateMixin{
  final _defaultColor = Colors.grey;
  final _activeColor = Colors.blue;
  int _currentIndex = 0;
  var _controller = PageController(
    initialPage: 0,
  );
  @override
  void dispose(){
    super.dispose();
    _controller.dispose();
  }
  @override
  Widget build(BuildContext context){
    return Scaffold(
        body: PageView(
          controller: _controller,
          children: <Widget>[HomePage(), SearchPage(),TravelPage(),MyPage()],
          physics: NeverScrollableScrollPhysics(),
        ),
        bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (index){
              _controller.jumpToPage(index);
              setState((){
                _currentIndex=index;
              });
            },
            type: BottomNavigationBarType.fixed,
            items: [
              BottomNavigationBarItem(
                  icon: Icon(
                    Icons.home,
                    color: _defaultColor,
                  ),
                  activeIcon: Icon(
                    Icons.home,
                    color: _activeColor,
                  ),
                  title: Text(
                    '首页',
                    style: TextStyle(color: _currentIndex!=0? _defaultColor:_activeColor),
                  )
              ),
              BottomNavigationBarItem(
                  icon: Icon(
                    Icons.search,
                    color: _defaultColor,
                  ),
                  activeIcon: Icon(
                    Icons.search,
                    color: _activeColor,
                  ),
                  title: Text(
                    '搜索',
                    style: TextStyle(color: _currentIndex!=1? _defaultColor:_activeColor),
                  )
              ),
              BottomNavigationBarItem(
                  icon: Icon(
                    Icons.camera_alt,
                    color: _defaultColor,
                  ),
                  activeIcon: Icon(
                    Icons.camera_alt,
                    color: _activeColor,
                  ),
                  title: Text(
                    '旅拍',
                    style: TextStyle(color: _currentIndex!=2? _defaultColor:_activeColor),
                  )
              ),
              BottomNavigationBarItem(
                  icon: Icon(
                    Icons.account_circle,
                    color: _defaultColor,
                  ),
                  activeIcon: Icon(
                    Icons.account_circle,
                    color: _activeColor,
                  ),
                  title: Text(
                    '首页',
                    style: TextStyle(color: _currentIndex!=3? _defaultColor:_activeColor),
                  )
              )
            ]
        )
    );
  }
}
// main.dart
import 'package:flutter/material.dart';
import 'package:flutter_dome/navigator/tab_navigator.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter之旅',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: TabNavigator(),
    );
  }
}
```

### 侧拉菜单导航

```
import 'package:flutter/material.dart';
void main() => runApp(MyApp());
class MyApp extends StatelessWidget{
    final appTitle = 'Drawer Dome';
    @override
    Widget build(BuildContext context){
        return MaterialApp(
            title: appTitle,
            home: MyHomePage(title: appTitle),
        );
    }
}
class MyHomePage extends StatelessWidget {
    final String title;
    MyHomePage({Key key, this.title}): super(key: key);
    @override
    Widget build(BuildContext context){
        return Scaffold(
            appBar: AppBar(title: Text(title)),
            body: Center(child: Text('MyPafe')),
            drawer: Drawer(
                child: ListView(
                    padding: EdgeInsets.zero,
                    children: <Widget>[
                        DrawerHeader(
                            child: Text('Drawer Header'),
                            decoration: BoxDecoration(
                                color: Colors.blue,
                            ),
                        ),
                        ListTile(
                            title: Text('Item1'),
                            onTap:(){
                                Navigator.pop(context);
                            }
                        ),
                        ListTile(
                            title: Text('Item2'),
                            onTap:(){
                                Navigator.pop(context);
                            }
                        ),
                    ]
                )
            )
        );
    }
}
```

- 什么是 PageView
  `PageView`是一个可以完成页面之间滚动的 widget

```
class PageView extends StatefulWidget{
    PageView({
        Key key,
        this.scrollDirection = Axis.horizontal, // 滚动的方向 - 水平和垂直
        this.reverse = false, // 是否反向滚动
        PageController controller, // PageView的控制类
        this.physics, //手势滚动逻辑，支持不滚动，总是滚动，与滚动到边缘时是否有bounce
        this.pageSnapping = true, // 设置为false以禁用页面捕捉，对自定义滚动行为很好用
        this.onPageChanged, // 页面切换时调用
        List<Widget> children = const <Widget>[],
    }) : controller = controller? _defaultPageController,
        childrenDelegate = SliverChildListDelegate(children),
        super(key: key);
    ...
}
```

- 实现首页导航
