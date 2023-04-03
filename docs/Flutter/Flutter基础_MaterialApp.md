# Flutter 基础 MaterialApp

## Flutter 架构

- Flutter Framework（框架）
  - Foundation, Animation, Painting, Gestures 合成了 Dart UI 层，对应 flutter 中的 dart:ui 包，对应的含义是动画、手势、绘制能力
  - Rending 层是一个抽象布局层，依赖于 dart ui 层，rendering 层会构建一个 UI 树、当 UI 树变化时，会计算出有变化的部分，然后更新 UI 树，最终绘制在屏幕上
  - Widgets 层上 Flutter 提供的一套基础组件库
  - Material、Cuperino 是 Flutter 提供了两种视觉风格的组件库(Android、iOS)
- Flutter Engine（引擎）
  - 纯 C++实现的 SDK，主要执行相关的渲染、线程管理、平台事件等操作。其中包括了 Skia 引擎、Dart 运行时、文字排版引擎等，在调用 dart:ui 库时，其实最终会走到 Engine 层，实现真正的绘制
- Flutter Embedder (嵌入器)
  - 提供 4 给 TaskRunner，将引擎一直到平台中间层代码的渲染设置、原生插件、打包、线程管理、时间循环、交互操作等

## MaterialApp

- navigatorKey 导航键
- scaffoldMessengerKey 脚手架键
- home 主页，应用打开时显示的页面
- routes 应用程序顶级路由表
- initialRoute 如果构建了导航器，则会显示第一个理由的名称
- onGenerateRoute 路由管理拦截器
- onGenerateInitialRoutes 生成初始化路由
- onUnknownRoute 当 onGenerateRoute 无法生成路由时调用
- navigatorObservers 创建导航器的观察者列表
- builder：在导航器上插入的小部件
- title 程序切换时显示的标题
- onGenerateTitle 程序切换时生成标题字符串
- color 程序切换时应用图标背景颜色（仅安卓有效）
- theme 主题颜色
- darkTheme 暗黑模式主题颜色
- highContrastTheme 系统请求“高对比度”使用的主题
- highContrastDarkTheme 系统请求高对比度暗黑模式下使用的主题颜色
- themeMode 使用哪种模式的主题（默认跟随系统）
- locale 初始区域设置
- localeListResolutionCallback 失败或未提供设备的语言环境
- localeResolutionCallback 负责计算语言环境
- supportedLocals 本地化地区列表
- debugShowMaterialGrid 绘制基线网络叠加层（仅 debug 模式）
- showPerformanceOverlay 显示性能叠加
- checkerboardOffscreenLayers 打开渲染到屏幕外位图的层的棋盘格
- showSemanticsDebugger 打开显示可访问性信息的叠加层
- debugShowCheckedModeBanner 调试显示检测模式横幅
- shortcuts 应用程序意图的键盘快捷键的默认映射
- actions 包含和定义用户操作的映射
- restorationScopeld 应用程序状态恢复的标识符
- scrollBehavior 可滚动小部件的行为方式
