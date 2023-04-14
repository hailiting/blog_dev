# Flutter 事件的源头

Flutter 中无论是`按钮点击`、`页面滑动`，还是`普通的手势监听`，主要和`触点`相关的任何组件，其根源都是`Listener`组件的回调。所以 Listener 作为`组件层`手势最基层的存在。

## Listener 组件

Listener 组件中可以定义六个回调事件，代表触点的不同状态变化

- `onPointerDown` 于触点落下，与屏幕接触时回调
- `onPointerMove` 触点在屏幕上移动时回调
- `onPointerUp` 触点从屏幕上抬起时回调
- `onPointerCancel` 触点取消时回调
- `onPointerHover` 触点在屏幕上悬浮时回调，一般对应鼠标指针
- `onPointerSignal` 监听滚轮滑动

## `RawGestureDetector`

只使用`Listener`组件的`onPointerDown`回调触发`_handlePointerDown`

```dart
void _handlePointerDown(PointerDownEvent event){
  assert(_recognizers!=null);
  for (final GestureRecognizer recognizer in _recognizers!.values)
    recognizer.addPointer(event);
}

@override
Widget build(BuildContext context){
  Widget result = Listener(
    onPointerDown: _handlePointerDown,
    ...
  )
}
```

- 手势检测器在`addPointer`时，当触点满足需求，`手势检测器`会自己通过`pointerRouter`将`handleEvent`方法注入触点路由中，进行`触点追踪`，也就是说`Listener`可以回调诸如移动、抬起、取消等触点组件
