# GetX

GetX 是 Flutter 一个轻量级，强大的状态管理和依赖注入库
Getx 通过使用 Controller 类来管理状态，并使用`GetBuilder`, `GetX`等 Widget 来连接 Controller 和 UI。  
GetX 核心原理是使用强大的命名路由和依赖注入机制来实现 Flutter 应用的状态管理、路由管理和依赖注入，从而简化 Flutter 应用程序的开发和维护。

- `Get.lazyPut()` 延迟实例化
- `Get.putAsync()` 异步实例化

```dart
class UserService {
  String username = "guest";
}
void main(){
  Get.put(UserService());
  runApp(MyApp());// 可以在任何地方使用username
}
class HomeController extends GetxContoller {
  final UserService userService = Get.find();
}
```

在 Getx 中，当 Controller 中的变量发生改变时，UI 会接受到通知的原因是因为`GetX使用了一种叫做“响应式编程”的方式来实现状态管理`。
在 Controller 中定义的变量需要继承来自`Rx`类，例如`RxString`, `RxInt`等。Rx 类是 GetX 中使用的响应式编程框架 ReactiveX 的 Flutter 实现。ReactiveX 是一种跨平台的编程模型，通过使用 Observables 和 Operators 来处理步骤和数据流。在 GetX 中，Rx 类继承了 ReactiveX 的实现，对 Flutter 的 UI 和状态进行封装和扩展，以实现响应式编程。
Rx 类的实现原理是使用了 Flutter 框架提供的`InheritedWidget`和`ChangeNotifier`来实现状态变化的通知和更新。

当我们在 Controller 定义一个 Rx 变量时，它会被包装为一个`Observable`对象，并与 Controller 实例绑定。当 Rx 的 value 属性变化时，会自动发出一个事件，通知所有依赖它的 Widget 进行更新。这个事件会被包装成一个 ChangeNotifier, 并通过 InheritedWidget 在 Widget 树中向下传递，以达到通知所有依赖 Widget 进行更新的效果。

- `InheritedWidget` 允许在 Widget 树中向下传递数据，子 Widget 通过`InheritedWidget.of(context)`方法来获取它所依赖的`InheritedWidget`的数据对象
- `ChangeNotifier` 继承自`Listenable`, 如果调用`notifyListeners()`来监听变量的更新
- GetX 会自动调用新页面的 onInit 方法，在页面销毁时会调用 dispose 方法

- `Get.lazyPut()` 延迟实例化依赖项
  - GetX 会自动将依赖项包装成一个`Factory`对象，并在第一次调用它时进行实例化。这样就可以避免在依赖性不需要使用时进行不必要的创建和初始化操作，从而节省系统资源和内存开销
- `Get.putAsync()` 异步实例化依赖性
  - GetX 会自动将依赖项包装成`Future`对象，并在后台线程中进行实例化。这样可以避免在主线程上进行耗时的初始化操作，从而提高了应用程序的响应速度和用户体验

## Controller 状态管理，路由管理，依赖注入

- onInit: 在 Controller 第一次绑定到 GetX 中调用时，初始化状态和依赖项
- onReady: 初始化完成后调用，通常用于执行一个异步操作或启动定时器等
- onClose: 在 Controller 被销毁时调用，通常用于进行资源释放和清理

- InheritedWidget 生命周期中，数据的传递和更新是在 build 方法中进行
