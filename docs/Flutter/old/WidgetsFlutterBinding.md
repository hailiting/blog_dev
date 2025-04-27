# WidgetsFlutterBinding 讲解

- 它定义在 Flutter 框架`flutter/src/widgets/binding.dart`文件里，通常通过 `import 'package:flutter/widget.dart'`导入到代码里
- 作用：是 flutter 应用程序的胶水，负责
  - 初始化 Flutter 引擎
  - 连接 Flutter 框架与设备平台
  - 处理平台消息和事件循环
  - 管理渲染管道
  - 协调各种服务（如手势识别、调度等）
- 通常在`main()`函数中看到

```js
void main(){
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp())
}
```
