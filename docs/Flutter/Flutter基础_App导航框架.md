# App 导航框架

- 如何自定义一个 AppBar
- Scaffold 都有哪些常见用法
- Scaffold+PageView 如何跳转指定 Tab
- NotificationListener 除了可以监听滚动之外，还能做什么
- 列表滚动除了实现导航栏的渐变效果，还可以实现哪些有意思的效果

## 实现首页导航需要哪些材料

Scaffold

- BottomNavigationBar
  PageView
- PageController

## 什么是 Scaffold widget

Scaffold 是一个实现了基本的 materialDesign 的布局结构

```
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

```
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
