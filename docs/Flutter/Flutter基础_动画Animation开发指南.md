# 动画Animation开发指南
* 在Flutter中有哪些类型的动画
* 如何使用动画库中的基础类给widget添加动画
* 如何为动画添加监听器
* 什么时候使用AnimatedWidfget与AnimatedBuilder
* 如何使用Hero动画
## 在Flutter中有哪些类型的动画
 基于tween(补间动画)       
 基于物理的动画
## 如何使用动画库中的基础类给widget添加动画
先看看怎么为widget添加动画
~~~
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
~~~
* Animation: 是Flutter动画库中的一个核心类，生成指导动画的值
Animation是一个抽象类，拥有当前值和状态（完成或停止），常用的是``Animation<double>``
* CurvedAnimation Animation的子类，将过程抽象为一个非线性的曲线
Curves类定义许多常用的曲线，也可以自己创建
~~~
final CuredAnimation curve = new CurvedAnimation(parent: controller, curve: Curves.easeIn);
// 自定义
class ShakeCurve extends Curve{
    @override
    double transform(double t){
        return math.sin(t*math.PI*2);
    }
}
~~~
* AnimationController  Animation的子类，用于管理Animation
``AnimationController``是特殊的Animation对象，在屏幕刷新的每一帧，都会生成一个新的值。
~~~
final AnimationController controller = new AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
AnimationController 具有控制动画的其他方法：
> forward() // 启动动画
> reverse({double from}) // 倒放动画
> reset() // 重置动画，将其设置到动画的开始位置
> stop({bool canceled = true}) // 停止动画
~~~
* Tween  正在执行的动画对象所使用的数据范围之间生成的值
~~~
final AnimationController controller = new AnimationController(duration: const Duration(milliseconds: 500), vsync: this);
final Animation curve = new CurvedAnimation(parent: controller, curve: Curves.easeOut);
Animation<int> alpha = new IntTween(begin: 0, end: 255).animate(curve);
~~~
## ``addListener``和``addStatusListener`` 动画添加监听器'
* addListener: 动画的值发生变化时被调用
* addStatusListener: 动画状态发生变化时被调用
~~~
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
~~~
## AnimatedWidget
AnimatedWidget可以理解为Animation的助手
下面的实例  LogoApp继承自 AnimatedWidget,AnimatedWidget在绘制时，使用动画的当前值。LogoApp仍然管理着AnimationController 和 Tween.
~~~
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

~~~
## AnimatedBuilder
AnimatedBuilder是拆分动画的工具类，借助它，我们可以更好的将动画和Widget分离
* 显示logo
* 定义Animation对象
* 渲染过度效果
``Container => GrowTransition => AnimatedBuilder => (AnonymousBuilder) => LogoWidget``
~~~
import 'package: flutter/animation.dart';
import 'package: flutter/material.dart';
void main()=> runApp(LogoApp());

class LogoApp extends StatefulWidget{
    _LogoAppState createState()=> _LogoApppState();
}


class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin{
    Animation<double> animation;
    AnimationController controller;
    @override
    void initState(){
        super.initState();
        controller = new AnimationController(duration: const Duration(seconds: 2), vsync: this);
        animation = Tween<double>(begin: 0, end: 300).animate(controller);
        controller.forward();
    }
    @override
    Widget build(BuildContext context)=>GrowTransition(
        child: LogoWidget();
        animation: animation,
    );
    @override
    void dispose(){
        controller.dispose();
        super.dispose();
    }
}


class LogoWidget extends StatelessWidget {
    Widget build(BuildContext context) => Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        child: FlutterLogo(),
    )
}
~~~
## Hero动画
效果：hero通过动画从原页面飞到目标页面  ，目标页面逐渐淡入视野。
~~~
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' show timeDilation;


class PhotoHero extends StatelessWidget{
  const PhotoHero({Key key, this.photo, this.onTap, this.width}) : super(key: key);
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
~~~
#### Hero函数原型
~~~
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
~~~
* tag: [必须]用于关联两个Hero动画的标识
* createRectTween: [可选]定义目标Hero的边界，在从起始位置到目标位置的飞行过程如何变化
* child: [必须]定义动画所呈现的widget
### 径向hero动画
~~~
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
~~~
