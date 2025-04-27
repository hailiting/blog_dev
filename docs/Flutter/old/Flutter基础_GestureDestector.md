# GestureDetetor 类

## GestureDetetor 简介

GestureDetector 是检测手势的 widget。如果 GestureDetector 的 child 属性不空，GestureDetector 的大小设置为 child 的大小。如果 child 属性为空，它将自己的大小设置为父组件的大小。

##### demo

```
GestureDetector(
    onTap: (){
        setState((){_light=true});
    },
    child: Container(
        color: Colors.yellow,
        child: Text('Turn lights on'),
    )
)
```

### GestureDestector 的一些属性

```
/**
    GestureDetector({
    Key key,
    this.child,
    this.onTapDown,//可能导致点击的指针已联系到屏幕的特定位置
    this.onTapUp,//触发点的指针已停止在特定位置与屏幕联系
    this.onTap,//发生了点击。
    this.onTapCancel,//触发onTapDown的指针取消触发
    this.onDoubleTap,//双击
    this.onLongPress,//长按
    this.onLongPressUp,//长按结束
    this.onVerticalDragDown,//
    this.onVerticalDragStart,//指针已经接触到屏幕，而且可能开始垂直移动。
    this.onVerticalDragUpdate,//与屏幕接触并垂直移动的指针沿垂直方向移动
    this.onVerticalDragEnd,//以前与屏幕接触并垂直移动的指针不再与屏幕接触，并且当其停止接触屏幕时以特定速度移动。
    this.onVerticalDragCancel,//
    this.onHorizontalDragDown,//
    this.onHorizontalDragStart,//
    this.onHorizontalDragUpdate,//
    this.onHorizontalDragEnd,//
    this.onHorizontalDragCancel,//

//    onPan可以取代onVerticalDrag或者onHorizontalDrag，三者不能并存
    this.onPanDown,//指针已经接触屏幕并开始移动
    this.onPanStart,//与屏幕接触并移动的指针再次移动
    this.onPanUpdate,//先前与屏幕接触并移动的指针不再与屏幕接触，并且当它停止接触屏幕时以特定速度移动
    this.onPanEnd,//先前触发 onPanDown 的指针未完成
    this.onPanCancel,//

//    onScale可以取代onVerticalDrag或者onHorizontalDrag，三者不能并存，不能与onPan并存
    this.onScaleStart,//
    this.onScaleUpdate,//
    this.onScaleEnd,//
    this.behavior,
    this.excludeFromSemantics = false
    })
 */
```

```dart
GestureDetector(
                //Tap 事件
                onTap: (){print("onTap");},
                onTapDown:  (event){print("onTapDown: ${event.runtimeType}");},
                onTapUp:  (event){print("onTapUp: ${event.runtimeType}");},
                onTapCancel:  (){print("onTapCancel");},
                onDoubleTap:  (){print("onDoubleTap");},

                onScaleStart:  (_) {print("onScaleStart");},
                onScaleUpdate: (details) {print("onScaleUpdate");},
                onScaleEnd:  (_) {print("onScaleEnd");},

                //VerticalDrag 事件
                onVerticalDragStart:  (event){print("onVerticalDragStart: ${event.runtimeType}");},
                onVerticalDragEnd:  (event){print("onVerticalDragEnd: ${event.runtimeType}");},
                onVerticalDragUpdate:  (event){print("onVerticalDragUpdate: ${event.runtimeType}");},
                onVerticalDragDown:  (event){print("onVerticalDragDown: ${event.runtimeType}");},
                onVerticalDragCancel:  (){print("onVerticalDragCancel");},

                // //HorizontalDrag 事件
                // onHorizontalDragStart:  (event){print("onHorizontalDragStart: ${event.runtimeType}");},
                // onHorizontalDragEnd:  (event){print("onHorizontalDragEnd: ${event.runtimeType}");},
                // onHorizontalDragUpdate:  (event){print("onHorizontalDragUpdate: ${event.runtimeType}");},
                // onHorizontalDragDown:  (event){print("onHorizontalDragDown: ${event.runtimeType}");},
                // onHorizontalDragCancel:  (){print("onHorizontalDragCancel");},

                //LongPress 事件
                onLongPressStart: (event){print("onLongPressStart: ${event.runtimeType}");},
                onLongPress: (){print("onLongPress");},
                onLongPressMoveUpdate: (event){print("onLongPressMoveUpdate: ${event.runtimeType}");},
                onLongPressUp: (){print("onLongPressUp");},
                onLongPressEnd: (event){print("onLongPressEnd: ${event.runtimeType}");},

                //ForcePress 事件
                onForcePressStart: (event){print("onForcePressStart: ${event.runtimeType}");},
                onForcePressUpdate: (event){print("onForcePressUpdate: ${event.runtimeType}");},
                onForcePressEnd: (event){print("onForcePressEnd: ${event.runtimeType}");},
                onForcePressPeak: (event){print("onForcePressPeak: ${event.runtimeType}");},


                child:  ElevatedButton(
                  onPressed: (){print("RaisedButton => onPressed");},
                  child: new Container(
                    padding: new EdgeInsets.all(100),
                    child: new Text("drag / click / longPress ..."),
                  ),
                ),

              )
```
