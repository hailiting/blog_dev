# Flutter 通信机制

消息使用 Channel(平台通道)在客户端(UI)和主机(平台)之间传递  
Flutter 定义了三种不同类型的 Channel

- BasicMessageChannel: 用于传递字符和半结构化的信息，持续通信，收到消息后可回复此次消息。如：Native 将遍历到的文件信息陆续传递到 Dart，在比如：Flutter 将从服务端陆续获取到的信息交给 Native 加工，Native 处理完返回等
- MethodChannel: 用于传递方法调用(method invocation)， 一次性通信：如 Flutter 调用 Native 拍照
- EventChannel: 用于数据流(event streams)的通信，持续通信，接受到消息后无法回复此次消息，通长用于 Native 向 Dart 通信，如：手机电量变化，网络连接变化，陀螺仪，传感器等

## BasicMessageChannel

### Native

```java
BasicMessageChannel(BinaryMessager messenger, String name, MessageCodec<T> codec)
```

- `BinaryMessager messenger` - 消息信使，是消息发送和接收的工具
- `String name` - Channel 的名字，也是其唯一标识
- `MessageCodec<T> codec` - 消息的编解码器，有几种不同类型的实现
  - `BinaryCodec` - 一种简单的 Codec，使用 BinaryCodec 可以使传递内存数据块时在编解码阶段免于内存拷贝，在 IOS 中为 NSData,在 Android 中为 ByteBuffer
  - `StringCodec` - 用于字符串与二进制数据之间的编解码，其编码格式为 UTF-8
  - `JSONMessageCodec` - 用于基础数据与二进制数据之间的编解码，其支持基础数据类型及列表、字典。
    - ios 中 使用 NSJSONSerialization 作为序列化工具
    - Android 中使用其自定义的 JSONUtil 与 StringCodec 作为序列化工具
  - `StandardMessageCodec` - 是 BasicMessageChannel 的默认编解码器，其支持基础数据类型、二进制数据、列表、字典

```java
void setMessageHandler(BasicMessageChannel.MessageHandler<T> hanlder);
```

- `BasicMessageChannel.MessageHandler<T> hanlder` 消息处理器，配合`BinaryMessager`完成消息处理

```java
// BasicMessageChannel.MessageHanlder原型
public interface MessageHandler<T> {
  void onMessage(T var1, BasicMessageChannel.Reply<T> var2);
}
```

```java
void send(T message)
void send(T message, BasicMessageChannel.Reply<T> callback)
```

- `T message` - 要传递给 Dart 的具体信息
- `BasicMessageChannel.Reply<T> callback` - 消息发出后，收到 Dart 的回复的回调函数

```java
public class BasicMessageChannelPlugin implements BasicMessageChannel.MessageHandler<String>, BasicMessageChannel.Reply<String> {
  private final Activity activity;
  private final BasicMessageChannel<String> messageChannel;
  static BasicMessageChannelPlugin registerWith(FlutterView flutterView) {
    return new BasicMessageChannelPlugin(flutterView);
  }
  private BasicMessageChannelPlugin(FlutterView flutterView) {
    this.activity = (Activity) flutterView.getContext();
    this.messageChannel = new BasicMessageChannel<>(flutterView, "BasicMessageChannelPlugin", StringCodec.INSTANCE);
    // 设置消息处理器，处理来自dart的消息
    messageChannel.setMessageHandler(this);
  }
  // 处理来自dart的消息
  @override
  public void onMessage(String s, BasicMessagChannel.Reply<String> reply){
    // 可以通过reply进行回复
    reply.reply("BasicMessageChannel收到： "+ s);
    if(activity instanceof IShowMessage) {
      ((IShowMessage) activity).onShowMessage(s);
    }
    Toast.makeText(activity, s, Toast.LENGTH_SHORT).show();
  }
  /**
   * 向Dart发送信息，并接收Dart的反馈
   * @param message 要给Dart发送消息内容
   * @param callback 来自Dart的反馈
   */
  void send(String message, BasicMessageChannel.Reply<String> callback){
    messageChannel.send(message, callback);
  }
  @Overdide
  public void reply(String s){

  }
}
```

### dart

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

### Java

```java
// 会构造一个StandardMethodCodec.INSTANCE类型的MethodCodec
MethodChannel(BinaryMessenger messenger, String name)
// or
MethodChannel(Binarymessenger messenger, String name, MethodCodec codec)
```

- `BinaryMessenger messenger` 消息信使，是消息发送和接收的工具
- `String name` Channel 名字，也就是唯一标识
- `MethodCodec codec` 作为 MethodChannel 的编解码器

```java
setMethodCallHandler(@Nullable MethodChannel.MethodCallHandler handler);
```

- `@Nullable MethodChannel.MethodCallHandler handler` 消息处理器，配合 BinaryMessenger 完成消息的处理

```java
public interface MethodCallHandler {
  void onMethodCall(MethodCall call, MethodChannel.Result result);
}
```

- `MethodCall call` call.method call.arguments
- `MethodChannel.Result result`
  - result.error
  - result.success
  - result.notImplemented

```java
public class MethodChannelPlugin implements MethodCallHandler {
  private final Activity activity;
  // plugin registration
  public static void registerWith(FlutterView flutterView) {
    MethodChannel channel = new MethodChannel(flutterView, "MethodChannelPlugin");
    MethodChannelPlugin instance = new MethodChannelPlugin((Activity) flutterView.getContext());
    channel.setMethodCallHandler(instance);
  }
  private MethodChannelPlugin(Activity activity){
    this.activity = activity;
  }
  @Override
  public void onMethodCall(MethodCall call, Result result) {
    switch (call.method){ // 处理来自Dart的方法调用
      case "showMessage":
        showMessage(call.arguments());
        result.success("MethodChannelPlugin收到：" + call.arguments);//返回结果给Dart
        break;
      default:
        result.notImplemented();
    }
  }
  /**
   * 展示来自Dart的数据
   */
  private void showMessage(String arguments){
    if(activity instanceof IShowMessage){
      ((IShowMessage) activity).onShowMessage(arguments);
    }
    Toast.makeText(activity, arguments, Toast.LENGTH_SHORT).show();
  }
}
```

### dart

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

### java

```java
// 会构造一个StandardMethodCodec.INSTANCE类型的MethodCodec
EventChannel(BinaryMessenger messenger, String name)
// or
EventChannel(BinaryMessenger messenger, String name, MethodCodec codec)
```

- `BinaryMessenger messenger` 消息信使，是消息发送和接收的工具
- `String name` Channel 名字，也就是唯一标识
- `MethodCodec codec` 作为 MethodChannel 的编解码器

```java
void setStreamHandler(EventChannel.StreamHandler handler)
```

```java
public interface StreamHandler {
  void onListen(Object args, EventChannel.EventSink eventSink);
  void onCancel(Object o);
}
```

- `void onListen(Object args, EventChannel.EventSink eventSink)` Flutter Native 监听事件时调用
  - `Object args`是传递参数
  - `EventChannel.EventSink eventSink` 是 Native 回调 Dart 时的回调函数
    - eventSink： success error endOfStream 三个回调方法
  - `void onCancel(Object o)` - Flutter 取消监听时调用

### java

```java
public class EventChannelPlugin implements EventChannel.StreamHandler {
  private List<EventChannel.EventSink> eventSinks = new ArrayList<>();
  static EventChannelPlugin registerWith(FlutterView flutterView) {
    EventChannelPlugin plugin = new EventChannelPlugin();
    new EventChannel(flutterView, "EventChannelPlugin").setStreamHandler(plugin);
    return plugin;
  }
  void sendEvent(Object params){
    for (EventChannel.EventSink eventSink: eventSinks){
      eventSink.success(params);
    }
  }
  @Override
  public void onListen(Object args, EventChannel.EventSink eventSink) {
    eventSinks.add(eventSink);
  }
  @Override
  public void onCancel(Objcet o){

  }
}
```

### dart

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
