# Flutter 问答

## 1. 请列举 Flutter 不同版本(Stable、Beta、Dev、Master)的特点

答：

- Stable: 稳定版，可用于生产环境
- Beta: 公测版，比较稳定，由上个月最佳 Dev 分支推送而来
- Master: 主分支，相对于 Dev 更加稳定
- Dev: 最新的开发分支，包含 Flutter 最新的变更

## 2. 如何创建快速 flutter 项目

- 1. `flutter create (my_app)`项目名
- 2. 项目结构
  - README.md
  - android 安卓宿主工程
  - ios ios 宿主工程
  - my_app.iml
  - pubspec.yaml 依赖包配置文件
  - lib dart 部分代码
  - pubspec.lock
  - test
- 3. 运行`flutter run`
- 4. 用 xcode 打开项目 `open ios/Runner.xcworkspace`
- 5. 打开 ios 模拟器`xcrun instruments -s` || `open -a Simulator`
     flutter device

## 3. Flutter doctor 命令是做什么用的

答：  
查看是否还需要安装依赖，同时第一次使用 flutter 命令也可以检测环境变量是否配置好

## 4. 配置 AndroidStudio 需要额外下载 JDK 吗，为什么

答：  
不需要，安装对应的 Dart 和 Flutter 插件即可

## 5. 如何在 Mac 上配置 Flutter 和 Android 环境变量

答？：  
在`.bash_profile`文件中对 FlutterSDK 以及 androidSDK 路径进行添加配置

## 6. [如何在 Windows 上配置 Flutter 和 Android 的环境变量](https://blog.csdn.net/sunbinkang/article/details/106935636)

## 7. 如何通过命令启动 IOS/Android 模拟器

开启一个 ios 模拟器：`open -a Simulator`
开启一个安卓模拟器 `emulator -avd myavd01`，这里的 avd 名称可以通过 androidstudio 的 AVD manage 设置

## 8. 如果设置图片的`Placeholder`

## 9. 如何加载不同分辨率的项目中图片

## 10. 如何加载手机存储中的图片

## 11. 实现一个动画有哪些方式

## 12. 简述 Hero 动画有哪些应用场景

## 13. 有哪些 Flutter 调试技巧

## 14. 如何调试 Flutter 项目中的 Android 代码

## 15. 如何调试 Flutter 项目中的 iOS 代码

## 16. 如何自定义一个 AppBar

## 17. Scaffold 有哪些常见用法

## 18. Scaffold+PageView 如何跳转到指定 tab

## 19. NotificationListener 除了可以用来监听列表滚动外，还可以用来做什么

## 20. 列表滚动除了实现导航栏的渐变效果外，还能实现哪些有意思的效果

## 21. 如何解决 http 请求中的中文乱码

## 22. Future 与 ES6 的 Promise 有哪些异同

## 23. FutureBuilder 都可以用来做什么

## 24. JSON 解析都有哪些实用的方式

## 25. shared_preferences 在 Android 和 Ios 中分别基于什么实现的

## 26. 在复杂 json 转模型上有哪些心得体会

## Flutter 混合开发都有哪些步骤

## 创建一个 Fluttermodule 都有哪些方式

## 简述为现有 Android 项目集成 Flutter 都需要哪些步骤

## 简述为现有的 Ios 项目集成 Flutter 需要哪些步骤

## 对比纯 Flutter 和混合 flutter 项目在调试上有哪些异同

## 要运行集成了 Flutter 的 Android 项目是应该在 Android Studio 的 Android 模式下运行还是应该在 Flutter 模式下运行

## 如何打包一个集成了 Flutter 的 Android 项目？有哪些步骤

## 简述 Flutter 和 Native 通信都有哪几种方式，并说明每种方式的使用场景

## 描述 channel 是如何工作的

## Flutter 如何调用 Native 代码

## Native 如何调用 Flutter 代码

## 如何将 Flutter 作为页面的一部分集成到现有页面
