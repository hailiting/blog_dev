# Flutter 基础\_动画 Animation 开发指南

- 在 Flutter 中有哪些类型的动画
- 如何使用动画库中的基础类给 widget 添加动画
- 如何为动画添加监听器
- 什么时候使用 AnimatedWidfget 与 AnimatedBuilder
- 如何使用 Hero 动画

## 在 Flutter 中有哪些类型的动画

- 基于 tween(补间动画)
- 基于物理的动画

## 如何使用动画库中的基础类给 widget 添加动画

先看看怎么为 widget 添加动画

```dart
import 'package:flutter/animation.dart';
import 'package:flutter/material.dart';

void main() => runApp(LogoApp());

class LogoApp extends StatefulWidget{
    _LogoAppState createState() => _LogoAppState();
}

// with SingleTickerProviderStateMixin 实现动画效果
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin{
    Animation<double> animation;
    AnimationController controller;
    AnimationStatus animationState;
    double animationValue;
    @override
    void initState(){
        super.initState();
        controller = AnimationController(duration: const Duration(seconds: 2), vsync: this);
        animation = Tween<double>(begin: 0, end: 300).animate(controller)
            ..addListener((){
                // setState 才会触发页面重新渲染
                setState((){
                    animationValue = animation.value;
                });
            })
            ..addStatusListener((AnimationStatus state){
                setState((){
                    animationState = state;
                });
            });
    }
    @override
    Widget build(BuildContext context){
        return Container(
            margin: EdgeInsets.only(top: 50),
            child: Column(
                childrenL <Widget>[
                    GestureDetector(
                        onTap: (){
                            controller.reset();
                            controller.forward();
                        },
                        child: Text('Start', textDirection: TextDirection.ltr);
                    ),
                    Text('State: '+animationState.toString(), textDirection: TextDirection.ltr),
                    Container(
                        height: animation.value,
                        width: animation.valaue,
                        child: FlutterLogo(),
                    ),
                ],
            ),
        );
    }
    @override
    void dispose(){
        controller.dispose();
        super.dispose();
    }
}
```

- `Animation`: 是 Flutter 动画库中的一个核心类，生成指导动画的值

  - `Animation` 是一个抽象类，拥有当前值和状态（完成或停止），常用的是`Animation<double>`，除 double 之外，还有`Animation<Color>`或`Animation<Size>`;
  - `Animation`对象有状态，可以通过访问其 value 属性获取动画的当前值；
  - `Animation`对象本身和 UI 渲染没有任何关系；

- `CurvedAnimation`: Animation 的子类，将过程抽象为一个非线性的曲线
  Curves 类定义许多常用的曲线，也可以自己创建

```dart
final CurvedAnimation curve = new CurvedAnimation(parent: controller, curve: Curves.easeIn);
// Curves类定义了许多常用曲线，也可以自定义
class ShakeCurve extends Curve{
    @override
    double transform(double t){
        return math.sin(t*math.PI*2);
    }
}
```

- `AnimationController`
  - `AnimationController`是一个特殊的`Animation`对象，在屏幕刷新的每一帧，就会生成一个新的值，默认情况下，`AnimationController`在给定的时间段内会线性的生成从`0.0`到`1.0`的数字。

创建一个`Animation`对象:

```dart
final AnimationController controller = new AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
```

`AnimationController`派生自`Animation<double>`。当创建一个`AnimationController`时，需要传递一个`vsync`参数，存在`vsync`时会防止屏幕外动画消耗不必要的资源，可以将`stateful`对象作为`vsync`的值。

```dart
AnimationController 具有控制动画的其他方法：
> forward() // 启动动画
> reverse({double from}) // 倒放动画
> reset() // 重置动画，将其设置到动画的开始位置
> stop({bool canceled = true}) // 停止动画
```

- `Tween` 正在执行的动画对象所使用的数据范围之间生成的值

```dart
final Tween doubleTween = new Tween<double>(begin: -200.0, end: 0.0);
```

`Tween`是一个无状态(stateless)对象，需要`begin`和`end`值。`Tween`的唯一职责就是定义从输入范围到输出范围的映射。输入范围弹窗为`0.0`到`1.0`，但并不一定。  
`Tween`继承自`Animatable<T>`,而不是`Animation<T>`。`Animataable`和`Animation`相似，不是必须输出 double，例如`ColorTween()`指定两个颜色之间的过渡。

```dart
final Tween colorTween = new ColorTween(begin: Colors.transparent, end: Colors.black54);
```

`Tween`对象不存储如何状态。相反，它提供了`evaluate(Animation<double> animtion)`方法将映射函数应用于动画当前值。`Animation`对象的当前值可以通过`value()`获取到。`evaluate`函数还执行一些其他处理，例如分别确保动画值为`0.0`到`1.0`时返回开始和结束状态。

- `Tween.animate`
  - 要使用`Tween`对象，可调用它的`animate()`方法，传入一个控制器对象，如下：在`500ms`内生成从`0`到`255`的整数

```dart
final AnimationController controller = new AnimationController(
  duration: const Duration(milliseconds: 500), vsync: this
);
Animation<int> alpha = new IntTween(begin:0,  end: 255).animate(controller);
```

##### 以下是构建一个控制器，一条曲线和一个 Tween:

```dart
final AnimationController controller = new AnimationController(
  duration: const Duration(milliseconds: 500),
  vsync: this
);
final Animation curve = new CurvedAnimation(
  parent: controller,
  curve: Curves.easeOut
);
Animation<int> alpha = new IntTween(begin:0, end: 255).animate(curve); // animate 返回的是Animation对象
```

## 为动画添加监听器

- `addListener`: 动画的值发生变化时被调用
- `addStatusListener`: 动画状态发生变化时被调用

```dart
@override
void initState(){
    super.initState();
    controller = AnimationController(duration: const Duration(seconds: 2), vsync: this);
    animation = Tweeen<double>(begin: 0, end: 300).animate(controller)
                ..addStatusListener((status){
                    if(status == AnimationStatus.completed){
                        controller.reverse();
                    } else if(status == AnimationStatus.dismissed){
                        controller.forward();
                    }
                })
                ..addStatusListener((state)=>print('$state'));
                ..addListener(()=>{
                    setState(()=>{

                    });
                });
    controller.forward();
}
```

## AnimatedWidget

AnimatedWidget 可以理解为 Animation 的助手  
下面的实例 LogoApp 继承自 AnimatedWidget,AnimatedWidget 在绘制时，使用动画的当前值。LogoApp 仍然管理着 AnimationController 和 Tween.

```dart
import 'package:flutter/animation.dart';
import 'package:flutter/material.dart';
void main(){
    runApp(new LogoApp());
}
class AnimatedLogo extends AnimatedWidget{
    AnimatedLogo({Key key,Animation<double> animation})
        :super(key: key,listenable: animation);
    Widget build(BuildContext context){
        final Animation<double> animation = listenable;
        return new Center(
            child: new Container(
                margin: new EdgeInsets.symmetric(vertical: 10.0),
                height: animation.value,
                width: animation.value,
                child: new FlutterLogo(),
            ),
        );
    }
}


class LogoApp extends StatefulWidget {
    _LogoAppState createState()=> new _LogoAppState();
})
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin{
    AnimayionController controller;
    Animation<double> animation;
    initState(){
        super.initState();
        controller = new AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
        animation = new Tween(begin: 0.0, end: 300.0).animate(controller);
        controller.forward();
    }
    Widget build(BuildContext context){
        return new AnimatedLogo(animation: animation);
    }
    dispose(){
        controller.dispose();
        super.dispose();
    }
}

```

## AnimatedBuilder

AnimatedBuilder 是拆分动画的工具类，借助它，我们可以更好的将动画和 Widget 分离

- 显示 logo
- 定义 Animation 对象
- 渲染过度效果
  `Container => GrowTransition => AnimatedBuilder => (AnonymousBuilder) => LogoWidget`

```dart
import 'package: flutter/animation.dart';
import 'package: flutter/material.dart';
void main()=> runApp(LogoApp());

class LogoWidget extends StatelessWidget{
  Widget build(BuildContext context)=>Container(
    margin: EdgeInsets.symmetric(vertical: 10),
    child: FlutterLogo(),
  );
}
class GrowTransition extends StatelessWidget{
  GrowTransition({this.child, this.animation});
  final Widget child;
  final Animation<double> animation;
  Widget build(BuildContext context)=>Center(
    child: AnimationdBuilder(
      animation: animation,
      builder: (context, child)=>Container(
        height: animation.value,
        width: animation.value,
        child: child,
      ),
      child: child
    ),
  );
}

class LogoApp extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin{
  Animation<double> animation;
  AnimationController controller;
  @override
  void initState(){
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds:1),
      vsync: this,
    );
    animation = Tween<double>(begin:0,end:300).animate(controller);
    controller.forward();
  }
  @override
  Widget build(BuildContext context)=>GrowTransition(
    child: LogoWidget(),
    animation: animation,
  )
  @override
  void dispose(){
    controller.dispose();
    super.dispose();
  }
}
```

## Hero 动画

- Hero 指的是可以在路由（页面）之间"飞行"的 widget；
- 将`hero`的形状从圆形转换为矩形，同时将其从一个路由飞到另一个路由的过程中进行动画处理；
- Flutter 中的`Hero widget`实现了通常称为`共享元素转换`或`共享元素动画`的动画风格

使用场景： 路由显示代表待售物品的缩略图列表，选择一个产品跳转到新的路由（页面的结构大致不变，新页面包含更多详细信息和"购买"按钮）。【共享元素转换】

### Hero 函数原型

```dart
const Hero({
    Key key,
    @required this.tag,
    this.createRectTween,
    this.flightShuttleBuilder,
    this.placeholderBuilder,
    this.transitionOnUserGestures = false,
    @request this.child,
}) : assert(tag != null),
    assert(transitionOnUserGestures != null),
    assert(child != null),
    super(key: key);
```

- tag: [必须]用于关联两个 Hero 动画的标识
- createRectTween: [可选]定义目标 Hero 的边界，在从起始位置到目标位置的飞行过程如何变化
- child: [必须]定义动画所呈现的 widget
- 在不同路由中使用两个`hero widget`, 但使用匹配的标签来实现动画
- 导航器管理包含应用程序路由的栈
- 从导航器栈中推入或弹出路由会触发动画
- Flutter 框架会计算一个补间矩形，用于定义在从源路由飞行到目标路由时 hero 的边界。在飞行过程中，hero 会移动到应用程序上的一个叠加层，以便它出现在两个页面上

#### Hero 动画代码具有以下结构：

1. 定义一个起始 hero widget，即`源hero`。指定其图像表示【通常是图片】和识别标记，并且位于源路由定义的当前显示的 widget 树中。
2. 定义一个结束 widget，即`目标hero`。此 hero 指定了它的图形表示，以及源 hero 相同的标记。为了获得最佳效果，hero 应该有几乎相同的 widget 树。
3. 创建一个包含目标 hero 的路由，目标路由定义了动画结束时的 widget 数。
4. 通过导航器将目标路由入栈来触发动画。Navigator 推送和弹出操作会为每对 hero 配对，并在源路由和呃呃目标路由中使用匹配的标签触发 hero 动画。

#### 基本类

- Hero
  - 从源路由飞到目标路由的 widget，为源路由定义一个 hero，为目标路由定义另一个 hero，并为每个标签分配相同的标签，Flutter 为具有匹配标签的 hero 配对。
- Inkwell
  - 指定点击 hero 时发生的情况，`InkWell`的`onTap()`方法构建新路由并将其 push 到导航器的栈。
- Navigator
  - 导航器管理一个路由栈，从导航器栈中 push 或 pop 路由会触发动画。
- Route
  - 指定一个路由或页面，除了最基本的应用外，大多数应用都有多条路由。

### 标准的 hero 动画

- `PhotoHero` 类
- `HeroAnimation` 类

> - 使用`MaterialPageRoute`、`CupertinoPageRoute`指定路由，或使用`PageRouteBuilder`构建自定义路由
> - 通过将目标图片包装到 SizedBox 中来过度结束时的图片大小
> - 将目标图片放入布局 Widget 中，更改图片的位置，如：`Container`

```
PhotoHero Widget tree
  |
SizedBox <--- 在动画的开始和结束处指定hero的大小
  |
Hero
  |
Material  <--- 使用透明色定义Material Widget可使图片在飞向目标看背景
  |
InkWell  <---- 包裹图片
  |
Image  <--- 将图片fit属性设置为`BoxFit.contain`，可以确保图片在转换过程中尽可能大而不改变其长度比


HeroAnimation Widget tree
  |
MaterialPageRoute <---- 当用户点击包含源hero的InkWell时，代码将使用`MaterialPageRoute`创建目标路由。将目标路由push到导航栈会触发动画。
  |
Container <--- 该Container将PhotoHero放置在目标路由AppBar下方的左下角
  |
timeDilation <--- 在调试时使用 timeDilation 属性来减缓动画
```

```dart
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;


class PhotoHero extends StatelessWidget{
  const PhotoHero({
      Key key,
      this.photo,
      this.onTap,
      this.width
  }) : super(key: key);
  final String photo;
  final VoidCallback onTap;
  final double width;
  Widget build(BuildContext context){
    return SizedBox(
      width: width,
      child: Hero(
        tag: photo,
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            child: Image.network(
              photo,
              fit: BoxFit.contain,
            ),
          ),
        ),
      ),
    );
  }
}
class HeroAnimation extends StatelessWidget{
  Widget build(BuildContext context){
    timeDilation = 10.0;
    return Scaffold(
        appBar: AppBar(
          title: const Text('Basic Hero Animation'),
        ),
        body: Center(
            child: PhotoHero(
                photo: 'urllinkaddress',
                width: 300.0,
                onTap: (){
                  Navigator.of(context).push(MaterialPageRoute<void>(
                    builder: (BuildContext context){
                      return Scaffold(
                        appBar: AppBar(
                          title: const Text('Flippers Page'),
                        ),
                        body: Container(
                          color: Colors.lightBlueAccent,
                          padding: const EdgeInsets.all(16.0),
                          alignment: Alignment.topLeft,
                          child: PhotoHero(
                            photo: 'https://dss0.baidu.com/73t1bjeh1BF3odCf/it/u=2999256389,972253502&fm=85&s=F0183ED5461737C20CA6C1260300202B',
                            width: 100.0,
                            onTap: (){
                              Navigator.of(context).pop();
                            },
                          ),

                        ),
                      );
                    },
                  ));
                },
            ),
        ),
    );
  }
}
void main()=>runApp(MaterialApp(home: HeroAnimation());
```

### Radial hero 动画

Radial(径向) hero 动画中，在 hero 在页面之间”飞行“的同时，其形状从圆形变为矩形

- `Photo` 类
- `RadialExpansion` 类

```dart
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;
class Photo extends StatelessWidget{
  Photo({Key key,this.photo, this.color, this.onTap}): super(key: key);
  final String photo;
  final Color color;
  final VoidCallback onTap;
  Widget build(BuildContext context){
    return Material(
        color: Theme.of(context).primaryColor.withOpacity(0.25),
        child: InkWell(
            onTap: onTap,
            child: LayoutBuilder(
                builder: (BuildContext context, BoxConstraints size){
                  return Image.network(
                    photo,
                    fit: BoxFit.contain,
                  );
                }
            )
        )
    );
  }
}
class RadialExpansion extends StatelessWidget {
  RadialExpansion({
    Key key,
    this.maxRadius,
    this.child
  }):clipRectSize = 2.0*(maxRadius/math.sqrt2),
        super(key: key);
  final double maxRadius;
  final clipRectSize;
  final Widget child;

  @override
  Widget build(BuildContext context){
    return ClipOval(
        child: SizedBox(
            width: clipRectSize,
            height: clipRectSize,
            child: ClipRect(
              child: child,
            )
        )
    );
  }
}
class RadialExpansionDemo extends StatelessWidget {
  static const double kMinRadius = 32.0;
  static const double kMaxRadius = 128.0;
  static const opacityCurve = const Interval(0.0, 0.75, curve: Curves.fastOutSlowIn);

  static RectTween _createRectTween(Rect begin, Rect end){
    return MaterialRectArcTween(begin: begin, end: end);
  }

  static Widget _buildPage(BuildContext context, String imageName, String description){
    return Container(
        color: Theme.of(context).canvasColor,
        child: Center(
            child: Card(
                elevation: 8.0,
                child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SizedBox(
                          width: kMaxRadius*2.0,
                          height: kMaxRadius*2.0,
                          child: Hero(
                              createRectTween: _createRectTween,
                              tag: imageName,
                              child: RadialExpansion(
                                  maxRadius: kMaxRadius,
                                  child: Photo(
                                      photo: imageName,
                                      onTap: (){
                                        Navigator.of(context).pop();
                                      }
                                  )
                              )
                          )
                      ),
                      Text(
                        description,
                        style: TextStyle(fontWeight: FontWeight.bold),
                        textScaleFactor: 3.0,
                      ),
                      const SizedBox(height: 16.0)
                    ]
                )
            )
        )
    );
  }
  Widget _buildHero(BuildContext context, String imageName, String description) {
    return Container(
        width: kMinRadius*2.0,
        height: kMinRadius*2.0,
        child: Hero(
            createRectTween: _createRectTween,
            tag: imageName,
            child: RadialExpansion(
                maxRadius: kMaxRadius,
                child: Photo(
                    photo: imageName,
                    onTap: (){
                      Navigator.of(context).push(
                          PageRouteBuilder<void>(
                              pageBuilder: (BuildContext context, Animation<double> animation, Animation<double> secondartAnimation){
                                return AnimatedBuilder(
                                  animation: animation,
                                  builder: (BuildContext context, Widget child){
                                    return Opacity(
                                      opacity: opacityCurve.transform(animation.value),
                                      child: _buildPage(context, imageName, description),
                                    );
                                  },
                                  );
                              }
                          )
                      );
                    }
                )
            )
        )
    );
  }
  Widget build(BuildContext context){
    timeDilation = 5.0;
    return Scaffold(
        appBar: AppBar(
          title: const Text('Radial Transition Demo'),
        ),
        body: Container(
            padding: const EdgeInsets.all(32.0),
            alignment: FractionalOffset.bottomLeft,
            child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildHero(context, 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=4102955586,1976763742&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=ff47b1fda420574b50cba8593edae1d7', 'Chair'),
                  _buildHero(context, 'https://ss3.bdstatic.com/yrwDcj7w0QhBkMak8IuT_XF5ehU5bvGh7c50/logopic/fae6c6e279d420cba3a131fdc4bad22a_fullsize.jpg', 'Binoculars'),
                  _buildHero(context, 'http://img5.imgtn.bdimg.com/it/u=3881153525,2719319794&fm=26&gp=0.jpg', 'BeachBall'),
                ]
            )
        )
    );
  }
}
void main(){
  runApp(MaterialApp(home: RadialExpansionDemo()));
}
```

![tero动画.gif](./img/tero动画.gif)
