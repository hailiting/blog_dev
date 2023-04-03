# Flutter 通信机制

消息使用 Channel(平台通道)在客户端(UI)和主机(平台)之间传递  
Flutter 定义了三种不同类型的 Channel

- BasicMessageChannel: 用于传递字符和半结构化的信息，持续通信，收到消息后可回复此次消息。如：Native 将遍历到的文件信息陆续传递到 Dart，在比如：Flutter 将从服务端陆续获取到的信息交给 Native 加工，Native 处理完返回等
- MethodChannel: 用于传递方法调用(method invocation)， 一次性通信：如 Flutter 调用 Native 拍照
- EventChannel: 用于数据流(event streams)的通信，持续通信，接受到消息后无法回复此次消息，通长用于 Native 向 Dart 通信，如：手机电量变化，网络连接变化，陀螺仪，传感器等

## BasicMessageChannel

```dart
const BasicMessageChannel(this.neme, this.codec);
```

- `String name` - Channel 的名字，要和 Native 端保持一致
- `MessageCode<T> codec` - 消息的编解码器，要和 Native 端保存一致

创建好`BasicMessageChannel`后，如果让其接收 Native 发来的消息，则需要调用`setMessageHandle`来为其设置一个消息处理器

```dart
void setMessageHandler(Future<T> handler(T message))
```

- `Future<T> handler(T message)` - 消息处理器，配合`BinaryMessager`完成消息的处理

创建好`BasicMessageChannel`后，如果要向 Native 发生消息，可以调用它的`send`方法向 Native 传递数据

```
Future<T> send(T message)
```

- `T message` - 要传递给 Native 的具体信息
- `Future<T>` - 消息发出后，收到 Native 回复的回调函数

```dart
import 'package:flutter/services.dart';
...
static const BasicMessageChannel _basicMessageChannel = const BasicMessageChannel('BasicMessageChannelPlugin', StringCodec());
...
// 使用BasicMessageChannel接受来自Native的信息，并向Native回复
_basicMessageChannel
  .setMessageHandler((String message)=>Future<String>((){
    showMessage = message;
    setState((){});
    return "收到Native消息：" + message;
  }));

// 使用BasicMessageChannel向Native发送消息，并接受Native的回复  主动的
String response;
try {
  response = await _basicMessageChannel.send(value);
} on PlatformException catch (e){
  print(e)
}
```

## MethodChannel

```dart
const MethodChannel(this.name, [this.codec = const StandardMethodCodec()])
```

- `String name` - Channel 的名字，要与 Native 保持一致
- `MethodCodec codec` - 消息的编解码器，默认是 StandardMethodCodec，要与 Native 保持一致

```dart
Future<T> invokeMethod<T>(String method, [dynamic arguments])
```

- `String method` - 要调用 Native 的方法名
- `[dynamic arguments]` - 调用 Native 方法传递的参数，可不传

```dart
import 'package:flutter/services.dart';
...
static const MethodChannel _methodChannelPlugin = const MethodChannel("MethodChannelPlugin");
...
String response;
try {
  response = await _methodChannelPlugin.invokeMethod('send', value);
} on PlatformException catch(e){
  print(e);
}
...
```

## EventChannel

```dart
const EventChannel(this.name, [this.codec = const StandardMethodCodec()]);
```

- `String name` - Channel 的名字，要和 Native 端保存一致
- `MethodCodec codec` - 消息的编解码器，默认是 StandardMethodCodec, 要和 Native 端保持一致

```dart
Stream<dynamic> receiveBroadcastStream([dynamic arguments])
```

- `dynamic arguments` - 监听事件时向 Native 传递数据
- 初始化一个广播流用于从 channel 中接收数据，它返回一个 Stream 接下来需要调用 Stream 的 listen 方法来完成注册，另外需要在页面销毁时调用 Stream 的 cancel 方法来取消监听

```dart
import 'package:flutter/services.dart';
...
static const EventChannel _eventChannelPlugin EventChannel("eventChannelPlugin");
StreamSubscription _streamSubscription;
String showMessage = '';
@override
void initState(){
  _streamSubscription = _eventChannelPlugin
    .receiveBroadcastStream()
    .listen(_onToDart, onError: _onToDartError);
  super.initState();
}
@override
void dispose(){
  if(_streamSubscription!=null){
    _streamSubscription.cancel();
    _streamSubscription = null;
  }
  super.dispose();
}
void _onToDart(message){
  showMessage=message;
  setState((){});
}
void _onToDartError(error){
  print(error);
}
...
```
