# flutter 最佳实践

## 1. 重建最小化原则

## 2. 在组件前加 const，相当于对此组件进行缓存

```dart
const Text("abc"),
```

## 3. 避免更改组件树的结构和组件的类型

```dart
// bad
Column(
  children: [
    if(_visible) Text("可见"),
    Container(),
  ]
)
// good
Column(
  children: [
    Visibility(
      visible: _visible,
      child: Text("可见"),
    ),
    Container(),
  ]
)
```

## 关于 ListView 的优化

### 如果展示大量数据请使用`ListView.builder`或`ListView.separated`,千万不能使用如下方式

```dart
ListView(
  children: <Widget>[
    item,item1,....
  ],
)
```

### ListView 中 itemExtent 属性对动态性能提升非常大

```dart
class ListViewDemo extends StatefulWidget{
  @override
  _ListViewDemoState createState()=>_ListViewdemoState();
}
class _ListViewDemoState extends State<ListViewDemo> {
  ScrollController _controller;
  @override
  void initState(){
    super.initState();
    _controller = ScrollController();
  }
  @override
  Widget build(BuildContext context){
    return Stack(
      children:[
        ListView.builder(
          controller: _controller,
          itemBuilder: (context, index){
            return Container(
              height: 80,
              alignment: Alignment.center,
              color: Colors.primaries[index % Colors.primaries.length],
              child: Text("$index", style: TextStyle(color: Colors.white,fontSize: 20),),
              itemExtent: 80,
              itemCount: 2000,
            )
          }
        ),
        Positioned(
          child: RaisedButton(
            child: Text("滚动到最后"),
            onPressed: (){
               _controller.jumpTo(_controller.position.maxScrollExtent);
            }
          )
        )
      ]
    );
  }
}
```

## 关于 AnimatedBuilder, TweenAnimationBuilder 的优化

```dart
AnimatedBuilder(
  animation: animation,
  builder: (BuildContext context, Widget child){
    return Transform.rotate(
      angle: animation.value,
      child: child,
    );
  },
  child: FlutterLoge(size: 60), // 把与动画无关的组件单独当做child
)
```

## 谨慎使用一些组件

- `saveLayer()`
  - 调用`saveLayer()`会分配一个屏幕外缓冲区，将内容绘制到屏幕外缓冲区中可能会触发渲染目标切换，这在较早的 GPU 中特别慢

## 需要注意的组件

- Clip 类组件
  - ClipOval、ClipPath、ClipRRect、ClipRect、CustomClipper

### 一些简单的圆角组件可以设置使用`Container`实现

```dart
Container(
  height: 200,
  width: 200,
  decoration: BoxDecoration(
    image: DecorationImage(
      image: NetworkImage("https://flu.."),
      fit: BoxFit.cover,
    ),
    border: Border.all(
      color:Colors.blue,
      width: 2,
    ),
    borderRadius: BorderRadius.circular(12),
  )
)
```

- Opacity
  - 因为它需要将子级绘制到中间缓冲区中，相对昂贵

```dart
// bad
Opacity(opacity: 0.5, child: Container(color: Colors.red)
// good
Container(color: Color.fromRGBO(255, 0, 0, 0.5))
```
