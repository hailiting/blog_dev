# main.dart

```js
// 提供异步编程支持，用于处理 Future 和 Stream
import "dart:async"
// 提供文件、网络等IO操作支持
import "dart:io"
// Firebase 分析工具，用于追踪用户行为
import "package:firebase_analytics/firebase_analytics.dart"

// Flutter工具集，提供屏幕适配等功能
import "package:flustars/flustars.dart"
// 提供加载提示框
import "package:flutter_easyloading/flutter_easyloading.dart"
// webview组件，用于显示网络内容
import "package:flutter_inappwebview/flutter_inappwebview.dart"
// GetX框架，提供状态管理、路由管理
import "package:get/get.dart"
// 初始化Firebase分析实例
final FirebaseAnalytics analytics = FirebaseAnalytics.instance
final FirebaseAnalyticsObserver observer = FirebaseAnalyticsObserver(analytics: analytics)

// 应用程序入口函数
void main() async {
  // 初始化日志模块
  LogUtils.init()
  // 初始化钱包功能
  WalletCommon.initWallet()
  // 创建事件总线，用于组件间通信
  Application.eventBus = EventBus()
  // 确保Flutter绑定初始化，这是调用原生平台代码前的必要步骤
  WidgetsFlutterBinding.ensureInitialized()
  // 初始化Firebase
  await Firebase.initializeApp()
  // 初始化 SharedPreferences, 用于本地数据存储
  await SpUtil.getInstance() ?
  // 数据访问对象，用于处理数据层逻辑
  DaoUtil() ?
  // 网络请求工具，基于 Dio 包
  DioUtils()

  // 初始化 SQLite 数据库
  await SqliteLogic().init()
  // 初始化应用程序逻辑
  await AppLogic().initAsync()
  // 设置默认主题
  FTTheme.setDefaultTheme()
  // 初始化 Toast 提示工具
  FTShowToastUtils.init()
  // 设置设计稿尺寸，用于屏幕适配
  setDesignWHD(750, 1334)
  // Android 平台特定配置
  if(Platform.isAndroid){
    // 设置WebView调试模式
    await AndroidInAppWebViewController.setWebContentsDebuggingEnabled(false)

    // 检查并配置 Service Worker 功能
    var swAvailable = await AndroidWebViewFeature.isFeatureSupported(
      AndroidWebViewFeature.SERVICE_WORKER_BASIC_USAGE
    )
    var swInterceptAvailable = await AndroidWebViewFeature.isFeatureSupported(
      AndroidWebViewFeature.SERVICE_WORKER_SHOULD_INTERCEPT_REQUEST
    )
    // 如果支持 Service Worker，则设置相关配置
    if(swAvailable && swInterceptAvailable){
      AndroidServiceWorkerController serviceWorkerController = AndroidServiceWorkerController.instance()
      await serviceWorkerController
      .setServiceWorkerClient(AndroidServiceWorkerClient(shouldInterceptRequest: (request) async {
        return null
      }))
    }
  }
  runApp(MyApp())
}
// 全局导航键，用于在任何地方都能访问导航功能
final GlobalKey<NavigatorState> navigatorKey = new GlobalKey<NavigatorState>()

// 应用程序主组件
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState()=>_MyAppState()
}
// 应用程序状态类
class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  @override
  void initState(){
    // 添加生命周期观察者
    WidgetsBinding.instance.addObserver(this)
    super.initState()
  }
  @override
  void dispose(){
    // 移除生命周期观察者
    WidgetsBinding.instance.removeObserver(this)
    super.dispose()
  }
  // 处理应用程序生命周期变化
  @override
  void didChangeAppLifecycleState(AppLifecycleState state){
    switch(state){
      // 应用程序恢复到前台
      case AppLifecycleState.resumed:
        // 初始化定时器
        AppLogic().timerInit()
        // 检查推送权限
        EngagelabPushUtil.getNotificationPermission()
        // 尝试重置市场代币逻辑的定时器
        try {
          final MarketTokenLogic? logic = Get.find<MarketTokenLogic>()
          logic?.resetTimer()
        } catch(e){
          LogUtils.e('not find MarketTokenLogic');
        }
        break;
      // 应用程序进入后台
      case AppLifecycleState.paused:
        // 取消定时器
        if(AppLogic().apiTimer != null) AppLogic().apiTimer?.cancel()
        AppLogic().apiTimer = null
        try {
        // 取消市场代币逻辑的定时器
          final MarketTokenLogic? logic = Get.find<MarketTokenLogic>();
          logic?.cancelTimer()
        } catch(e){
          LogUtils.e("CancelTimer Failed")
        }
        break
      case AppLifecycleState.inactive:
        break
      case AppLifecycleState.detached:
        break
    }
  }
  // 构建应用程序UI
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      // 路由回调，用于处理页面跳转
      routingCallback: (routing) {
        // 关闭所有 Toast
        FTShowToastUtils.dismiss()
        if (routing?.current == '/TabPage') {
          if(SqliteLogic().curAddress.id != -1 && SqliteLogic().curAddress.active == 0){
            AppLogic().refreshCurAddressTokens()
          }
          SqliteLogic().freshBlockSpeed()
        }
      },
      // 添加导航观察者，用于 firebase 分析
      navigatorObservers: [observer],
      // 设置导航键
      navigatorKey: navigatorKey,
      // 应用名称
      title: "xxx",
      // 设置主题
      theme: FTTheme().themeData(),
      // 首页
      home: Container(color:Colors.themeColor01, child: SplashScreen()),
      unknownRoute: GetPage(name: "/notfound", page: ()=> ErrorPage()),
      // 路由配置
      getPages: RouteConfig.getPages,
      // 初始化加载提示框
      builder: EasyLoading.init(),
      // 多语言支持
      translations: LocalMessages(),
      // 当前语言
      local: LocalMessages.getCurrentLanguage(),
      // 默认语言
      fallbackLocale: Locale("zh", "CN")
    )
  }
}
```

git submodule update --remote

flutter build apk --obfuscate --split-debug-info=./app
