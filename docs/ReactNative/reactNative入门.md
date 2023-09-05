# React Native 入门

- 3. 开发环境搭建
  - 安装 node
  - 安装 watchman
  - 安装 VSCode
  - 安装 AndroidStudio
  - 安装 sdk platform 和 sdk tools
  - 基于 AndroidStudio 创建安卓模拟器
  - 以及针对 ml 平台创建安卓模拟器的解决方法
  - 使用 cli 命令创建 ReactNativ 工程，并启动运行
- 4. 前端知识
  - CSS-flex 布局基础
- 5. 原生知识
  - 开发中常用的 adb 命令
  - 了解移动端应用的 UI 结构
  - RN 开发中经常会涉及的原生文件
  - RN 组件和原生组件的对应关系
  - 原生语言的选择：Android: Java/Kotlin, IOS： OC/Swift
  - 版本发布与直流的应用场景
  - 移动设置的版本兼容选择
- 6. React 基础知识和工程结构
  - 目录结构介绍
  - 入口函数，export 和 import
  - class 组件与函数式组件：RN 两大开发规范
  - class 组件的生命周期和常规写法
  - 函数式组件的优势和常用 hook
  - JSX 语法和常见写法
  - Style Flexbox 布局
- 7. 18 个组件
  - View: ui 构建的基石
  - Text
  - Image: 加载本地和网络图片
  - ImageBackground: View 和 Image 的合体
  - 唯一的输入组件：TextInput
  - TouchableOpacity: 点击组件
  - TouchableHighlight: 点击组件
  - TouchableWithoutFeedback: 没有效果的按钮组件，特殊场景下使用的点击组件
  - Button: 固定样式的按钮组件
  - Pressable 实现复杂的交互效果
  - ScrollView: 基础滚动组件，列表渲染
  - FlatList: 一个高性能的列表组件
  - SectionList: 实现复杂的多分组列表
  - RefreshControl: 下拉刷新，上拉加载
  - Modal 实现不同样式的弹窗
  - StatusBar: 状态栏适配
  - Switch: 开关切换
- 8. 10 个常用 api 精讲
  - Alert/console: 开发周期的调试工具
  - Dimensions/useWindowDimensions: 适配屏幕宽高
  - 使用 Platform 类，获取平台属性
  - 通过 StyleSheet 灵活构建组件的样式
  - Linking
  - PixelRatio
  - BackHandler: 针对安卓返回键的适配
  - PermissionAndroid: 原生动态权限
  - LayoutAnimation: 简单动画
- 9. RN 动画系统
  - `Animated/Animated.Value`的构建方法
  - `Animated/Animated.Value`创建平移、缩放、旋转、渐变
  - 跟随动画问题
- 11. TypeScript
  - 联合类型
- 12. Context 上下文的解耦
- 13. 高阶组件 HOC
  - 什么是高阶组件
  - 高阶组件解决的应用场景，即解决的核心问题
    - hack 组件的渲染函数
    - hack 组件的生命周期
- 14. memo 与性能优化
  - 使用`React.memo`拦截渲染，提升组件性能
  - 使用`useMemo`对局部组件进行缓存，提升页面渲染性能
  - hermes 引擎的开启，提升启动速度、压缩包体积
- 15. ref 转发，自定义组件
  - ref 的应用场景，即解决的核心问题
  - 和 ref 转发相关的 hook，函数式组件的公开 api 定义
- 16. RN 桥接原生
  - 使用原生桥实现 js 层调用原生方法
  - 使用原生桥实现 js 层获取原生常量(同步获取)
  - 使用原生桥接，创建一个原生组件，js 层调用渲染
  - 使用原生桥接，创建一个原生容器组件，js 层调用并设置子组件
  - 使用原生打包脚本配置，并在 package.json 中调用原生脚本
- 17. 路由管理
  - 集成`ReactNavigation`, 并构建常见的主页 Tab
  - 路由跳转的两种方式: `navigation.push`和`navigation.navigate`
  - 学习路由返回两种方式: `navigation.pop`和`navigation.goBack`

## 开发环境搭建

- React => node watchman vscode
- Native => jdk AndroidStudio SDK 模拟器

```sh
brew install node
brew install watchman
# jDK
brew install adoptopenjdk/openjdk/adoptopenjdk8
# 官网下载
https://www.oracle.com/java/technologies/downloads/#java11
```

```sh
# 配置sdk环境变量
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

source ~/.zshrc
```

M1 芯片创建模拟器

- SDK Platform 勾选 Sv2 选项并下载
- 下载对应 SDK Tools
  - SDK Tools 勾选 Android Emulator、Android SDK Platform-Tools、底部三个 Layout Inspector 选项

### watchman

Watchman 同时检测 JavaScript 代码和原生代码的变化，在代码变化时重新编译和更新应用

```sh
# - 配置监视规则
watchman watch /path/to/directory
watchman -- trigger /path/to/directory my-trigger '*.js' -- echo 'JS files modified'
# - 启动Watchman
watchman daemon

echo 'export PATH="/opt/homebrew/opt/node@16/bin:$PATH"' >> ~/.zshrc

export LDFLAGS="-L/opt/homebrew/opt/node@16/lib"
export CPPFLAGS="-I/opt/homebrew/opt/node@16/include"
```

### 创建新项目

- java 版本得要 11+
- `npx react-native info`
- `npx react-native init AwesomeProject` 用最新的 RN 版本
- `npx react-native init AwesomeProject --version x.xx.x` 指定 RN 版本
- `yarn global add react-native-cli react-native init AwesomeProject`
- `npm i` 安装 js 依赖
- `gradle sync` 安装原生依赖 `Sync Project with Gradle Files`
- `npx react-native start`
- `npx react-native run-ios`
- `npx react-native run-android`
- `yarn android`

## 应用打包

用命令行或使用原生平台打包

```sh
1、生成JavaScript代码和资源文件
# platform 指定目标平台 ios 或 android
# dev 是否启用开发模式，可以是true或false
# entry-file 指定应用程序入口文件
# bundle-output 指定打包后的JavaScript代码文件路径
# assets-dest 指定资源文件的输出目录
react-native bundle
  --platform [platform]
  --dev [dev]
  --entry-file [entry-file]
  --bundle-output [bundle-output]
  --assets-dest [assets-dest]

react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ./build/main.jsbundle --assets-dest ./build/

2、使用原生平台打包工具将应用程序打包成可执行的二进制文件

cd android && ENVFILE=../.env.production ./gradlew assembleProdRelease && cd ..
cd android && ENVFILE=../.env.development ./gradlew assembleDevRelease && cd ..
```

## `css-flex`

- 横向和纵向布局: direction
  - flexDirection
    - row
    - row-reverse
    - column
    - column-reverse
- 主轴和交叉轴对齐: justifyContent, alignItems
  - justifyContent 主轴
    - flex-start
    - flex-end
    - center
    - space-between
    - space-around
    - space-evenly
  - alignItems 交叉轴
    - flex-start
    - flex-end
    - center
    - stretch
    - baseline
- 元素的放大和缩小: flexGrow, flexShrink
  - flexGrow: 分布大小 默认为 0
    - flexGrow 与 flex 的区别
      - flexGrow 剩余的宽度按等分分，最后在原宽度的基础上加上按等分分的宽度
      - flex 和原始宽度没有关系，按 flex 值分配
  - flexShrink: 设置子元素的缩放比例，以适应容器框架不足的情况
- RN 中 borderWidth 一定是固定的值
- RN 中所有元素默认具有 Flex 布局能力

## 使用 nrm 管理 npm 源

```sh
npm i -g nrm
nrm ls
nrm add taobao https://registry.npmmirror.com/
nrm use taobao
nrm test taobao
# 默认源 https://registry.npmjs.org/

npm i -g cnpm


npm cnpm nrm yarn pnpm
npm i -g yarn@1.22.19 pnpm@7.9.0
```

## 安卓连接设备及常用的 adb 命令

- USB 连接
  - 安卓: `开发者模式`打开，`USB 调试` 打开
- wifi 局域网连接设备

```sh
adb devices # 查看
# ip+端口
adb connect 10.10.40.8:5555
adb disconnect 10.10.40.8:5555
# adb 启动、停止、查看设备、端口映射、进入沙盒
adb kill-server # 停止
adb start-server # 停止后启动
adb reverse tcp:8081 tcp:8081 # 端口映射
adb shell # 进入沙盒
# sdcard sd卡  exit 推出
adb push xxx /sdcard/ 把什么文件推送到sdcard
adb pull /sdcard/1.png ./ 把sdcard 里的文件复制到电脑端
```

## 移动端 UI 结构和设备特征

```
StatusBar  状态栏
ActionBact 标题栏
ContentView 内容
Navigation 导航
```

- RN 中只有一个 Activty
- 弹窗：
  - 原生 `Dialog`
  - RN ` Modal`(底层对应`Window `)

## RN 开发中常见的原生文件

- 配置: manifest, gradle
  - `AndroidManifest.xml` 全局的清单文件
    - 应用新增系统权限 (如 相机, 蓝牙)
    - 第三方的库或包需要再文件里注册数据`<meta-data`
  - 根目录的`build.gradle`
    - 版本的迭代
      - minSdkVersion 安卓最低版本
    - 集成第三方应用 `repositories`
  - `app/build.gradle`
    - 打包构建
      - 签名
      - buildTypes
      - 依赖
- 应用: Application, String, mipmap
  - `MainApplication.java` 管理整个应用
    - 需要增加原生桥接模块的 ReactPackage
    - 原生的库，需要初始化的时候初始化
  - `res/values/strings.xml`
    - 当前应用安装到手机是的名称
- 桥接: ReactPackage, ReactModule, ViewManager

```java
// 添加新的 RN package
// MainApplication.java
protected List<ReactPackage> getPackages(){
  List<ReactPackage> packages = new PackageList(this).getPackages();
  packages.add(new DemoReactPackage());
  return packages;
}

// DemoReactPackage.java
public class DemoReactPackage implements ReactPackage {
  // 桥接的模块
  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
    List<NativeModule> list = new ArrayList<>();
    list.add(new DemoNativeModule());
    return list;
  }
  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
    return null;
  }
}

// DemoNativeModule.java
public class DemoNativeModule extends ReactContextBaseJavaModule {
  @NonNull
  @Override
  public String getName(){
    return "A";
  }
}
```

## RN 和原生组件的对应关系

| RN             | Flutter              | Android        | Ios              | web                   |
| -------------- | -------------------- | -------------- | ---------------- | --------------------- |
| `<View>`       | `Container()`        | `<ViewGroup>`  | `<UIView>`       | `<div>`               |
| `<Text>`       | `Text()`             | `<TextView>`   | `<UITextView>`   | `<p>`                 |
| `<Image>`      | `Image.asset()`      | `<ImageView>`  | `<UIImageView>`  | `<img>`               |
| `<ScrollView>` | `CustomScrollView()` | `<ScrollView>` | `<UIScrollView>` | `<div>`               |
| `<TextInput>`  | `TextField()`        | `<EditText>`   | `<UITextFiled>`  | `<input type="text">` |

## 移动端的应用发布

- debug 与 release
- 签名
  - `Project Structure`项目结构对话框
    - 对项目的模块，依赖，构建选项等进行设置
    - `File- Project Structure` 或 `Command`+ `;`
- AppStore + 华 米 O V

## 移动端特有的生成热修复机制

- 热修复机制
  - pushy
  - vs code push(服务器在国外)
- 应用场景
  - 小功能改变
  - 线上问题修改

## 移动端设备版本兼容选择

- Android
  - 尺寸: `1080*1920` 以上
  - 系统版本: 安卓 5.0 以上
- IOS
  - 尺寸: `375*667` 以上
  - 系统版本: IOS10

## 目录结构介绍

- `index.js`
  - `AppRegistry.registerComponent(appName, ()=>App)`

### AppRegistry 用于注册和启动应用程序的模块

```js
// 注册应用程序组件
// 应用程序名称，应用程序组件，可选的回调函数
AppRegistry.registerComponent(
  "MyApp",
  () => App,
  () => {}
);
/**
 * AppRegistry.runApplication() 和 AppRegistry.registerRunnable()
 * 通常用于高级场景，如：在多个应用程序之间共享代码或实现动态加载组件
 */

// 注册原生模块
AppRegistry.registerRunnable("MyModule", () => {
  // 这里执行原生模块的初始化操作
  MyModule.init();
});
// MyModule.js
import { NativeModules } from "react-native";
export default NativeModules.MyModule;
// 启动应用
AppRegistry.runApplication("MyApp", {
  initialProps: {
    // 初始化属性
  },
});
```

## 自定义 script

```json
{
  "scripts": {
    "android_devDebug": "react-native run-android --variant=devDebug",
    "android_preDebug": "react-native run-android --variant=preDebug"
  }
}
```

```gradle
<!-- 覆盖了strings下的 app_name -->
<!-- app/build.gradle -->
productFlavors 与 buildTypes组合成 devDebug

productFlavors {
  dev {
    resValue("string", "app_name", "测试包")
  }
  prd {
    resValue("string", "app_name", "生产包")
  }
}
```

## class 组件的标准写法和生命周期

- class 组件
  - 有状态(state), 每次都会修改同一个状态
  - 基于生命周期的管理
  - 面向对象的好处：易于理解，适合新手
- 函数式组件
  - 无状态，每次刷新都是生成一个新的状态
  - 基于状态变化的管理
  - 函数式编程的好处：简洁，模板代码少，易于复用

```js
// App.js
function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"} backgroundColor="#fff" />
      <ClassView />
      <FunctionView />
    </SafeAreaView>
  );
}
```

```jsx
import { View } from "react-native";
class ClassView extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    const { name, age } = props;
    this.state = {
      address: "xxxxx",
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        address: "这家面真好吃",
      });
    }, 2000);
  }
  render() {
    const { name, age } = this.props;
    const { address } = this.state;
    return (
      <View>
        <Text>
          {name} {age} {address}
        </Text>
      </View>
    );
  }
}
export default ClassView;
```

useWindowDimensions 是 ReactNative 中的一个 Hook，可以用来获取当前窗口的尺寸

```js
// web端的实现
import { useEffect, useState } from "react";
function useWindowDimensions() {
  const [dimensions, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return dimensions;
}
```

useColorScheme 用来获取设备颜色方案(light 或 dark)

```js
// web端的实现
import { useEffect, useState } from "react";
function useColorScheme() {
  const [colorScheme, setColorScheme] = useState(getInitialColorScheme());
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setColorScheme(getInitialColorScheme());
    };
    mediaQuery.addEventListener("change", hanldeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return colorScheme;
}
function getInitalColorScheme() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
}
```

```js
import { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
// 函数式组件
function FunctionView(props) {
  console.log(this); // error 或 undefined
  const { name, age } = props;
  const scrollViewRef = useRef(null);
  // width, height 不是物理单位，是编程的逻辑单位 dp dip
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    setTimeout(() => {
      setAddress("浙江省杭州市");
      scrollViewRef.current.scrollToEnd({
        animted: true,
      });
    }, 2000);
  }, []);
  useEffect(() => {
    console.log(`address: ${address}`);
  }, [address]);
  const items = useMemo(() => {
    return new Array(10000).fill(0).map((_, index) => `Item ${index}`);
  }, []);
  return (
    <View>
      <ScrollView ref={scrollViewRef}>
        {items.map((item) => (
          <Text>
            {item} {name}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

export default () => {
  // 匿名写法...
};
```

```js
// RN计数器
function NumberUp() {
  const [num, setNum] = useState(0);
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setInterval(() => {
      setNum((preNum) => preNum + 1); // 小心闭包问题
    }, 1000);
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);
  return <Text>{num}</Text>;
}
```

## 组件

### View

- position: absolute 绝对定位下仍然受父级属性影响
- onLayout: 布局信息的回调
- setNativeProps: 性能瓶颈下的选择余地

```js
function AA() {
  const viewRef = (useRef < View) | (null > null);
  useEffect(() => {
    setTimeout(() => {
      viewRef.current?.setNativeProps({
        style: { backgroundColor: "blue" },
      });
    }, 2000);
  }, []);
  return (
    <View
      ref={viewRef}
      style={(styles.subView, { height: 100 })}
      onLayout={(event) => {
        console.log(event.nativeEvent);
      }}
    >
      <Text>sasdda</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  subView: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginRight: 50,
  },
});
```

### Text

- 行数以及修饰模式: numberOfLines,ellipsizeMode
  - ellipsizeMode: 'head' | 'middle' | 'tail' | 'clip' |
    - "...xxx"
    - "xxx...xxx"
- 可否选中以及选中色号: selectable, selectionColor
- 跟随系统字号: allowFontScaling
- 文字嵌套
  - 没办法加 margin padding
  - 在 Text 嵌套 的情况下，要在单行内，让所有文本垂直居中，没找到方法实现……目前看来，如果要在 Text 嵌套的情况下，实现垂直居中，需要拆成上面的多个相邻 Text 元素来实现居中对齐了
- 文本对齐
  - textAlign: 水平居中
  - textAlignVerical: 垂直居中
- 文本装饰
  - textDecorationStyle
  - textDecorationLine
- 文字阴影
  - textShadowColor
  - textShadowOffset
  - textShadowRadius

### Image

- resizeMode
  - "contain": 等比例拉伸，拉伸到刚好有一边撑满
  - "center"
  - "cover"
  - "stretch": 不保证比例
  - "repeat": 重复
- blurRadius: 镜像模糊
- defaultSource: 站位图
- fadeDuration: 毫秒 加载渐进动画时间
- onLoad, onError: 加载成功与加载失败
- onLoadStart, onLoadEnd: 加载开始和加载结束
- tintColor: 着色
  - 修改的是图片中不透明的部分
  - 只能在 resizeMode 是`contain`或`cover`才能使用
  - 将 tintColor 样式单独设置，多个组件复用
- api: `Image.getSize()`, `Image.prefetch()`
  - 清除缓存`Image.clearCache()`
  - 查看是否被缓存 `Image.resolveAssetSource({uri: imageUrl})`

```js
const imageUrl = "https://example.com/image.png";

const source = Image.resolveAssetSource({ uri: imageUrl });
if (source && source.uri.startsWith("file://")) {
  console.log("Image is cached");
} else {
  console.log("Image is not cached");
}
```

### TextInput

- 自动聚焦: `autoFucus` 和 `focus()`
- 自动失焦: `blurOnSubmit` 和 `blur()`
- 隐藏光标: `careHidden`
- 默认输入: `defaultValue`
- 可编辑性: `editable`
- 键盘类型: keyboardType
  - default: 默认键盘，支持普通文本输入
  - number-pad: 数字键盘，只支持数字输入
  - decimal-pad: 带小数点的数字键盘，只支持数字和小数点输入
  - numeric: 带符号的数字键盘，支持数字和特定符号输入
  - email-address: 电子邮件地址键盘，支持输入电子邮件地址的特殊字符
  - phone-pad: 电话号码键盘，支持电话号码输入的特殊字符
  - ascii-capable：ASCII 码键盘，支持 ASCII 码输入，有兼容性问题
  - url：网址键盘，支持网址输入的特殊字符，有兼容性问题
  - visible-password：可见密码键盘，支持输入密码的特殊字符，且输入的字符会显示在文本框中，有兼容性问题
- 确定键配置: returnKeyType
  - done
  - go
  - next
  - search 搜索
  - send
- 最大长度: maxLength
- 多行输入: multiline 和 numberOfLines
  - 默认 text 从上面输入 `textAlignVerical: 'top'`
  - multiline 可不可以多行输入
  - numberOfLines 显示几行
  - 焦点回调事件: onBlur 和 onFocus
  - onChange 与 onChangeText
  - 选中相关的: selection, selectionColor, selectTextOnFocus
  - 安全模式: secureTextEntry

```js
export default () => {
  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.blur();
    }, 2000);
  }, []);
  return (
    <View>
      <TextInput ref={inputRef} auto />
    </View>
  );
};
```

### TouchableOpacity 点击组件

支持点击事件的 View

- 透明度渐变阀值: activeOpacity
- 点击事件: onPress, onLongPress, delayLongPress
- 点击事件起止: onPressIn, onPressOut
  - onPress 的顺序 onPressIn -> onPressOut->onPress
  - onLongPress 的顺序 onPressIn -> onLongPress -> onPressOut

### TouchableHighlight 点击组件

有高亮效果的点击事件

- 所有点击事件和`TouchableOpacity`一样
- 只支持一个子节点，而且必须要有
- 必须要有`onPress`
- activeOpacity 是里面子 View 的透明度
- underlayColor 按下去的颜色

### TouchableWithoutFeedback

- 点击没有任何反馈
- 只支持一个子节点，且自身不支持样式

### Button

- title: 设置按钮显示文字
- color: 设置按钮颜色，交互效果是水波纹
- disabled: 设置按钮不可点击
- onPress: 设置按钮点击事件

### Pressable

- 点击类事件和其他点击组件一致
- 带状态样式
  - `style={({pressed})=>xxxx}`
- 带状态子节点
  - `{({pressed}) => <Text>{pressed ? 'pressed' : 'Click'}</Text>}`

```js
const PressableDemo = () => {
  return (
    <View style={rootStyles.root}>
      <Pressable style={({ pressed }) => [styles.btn, pressed && styles.press]}>
        {({ pressed }) => <Text>{pressed ? "pressed" : "Click"}</Text>}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: 200,
    height: 65,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  press: {
    backgroundColor: "#fff",
  },
});
```

### ScrollView 基础滚动组件

- 添加子节点：固定子元素、列表渲染、数组渲染
- 内容包裹样式：`contentContainerStyle`
- 滚动键盘消失：`keyboardDismissMode` 如果是有 input,keyboardDismissMode 设为 none 则键盘不会消失
  - none: 不自动隐藏虚拟键盘
  - on-drag: 当用户滑动 ScrollView 或 FlatList 时自动隐藏虚拟键盘
  - interactive: 当用户触摸 ScrollView 或 FlatList 的任何区域时，自动隐藏虚拟键盘
  - on-drag-overview: 在 IOS 上，与 on-drag 相同，在 Android 上，当用户滑动 ScrollView 或 FlatList 时自动隐藏虚拟键盘并显示屏幕缩略图，以便用户查看滚动到哪
- 点击收起键盘：`keyboardShouldPersistTaps`
  - always: 虚拟键盘出现时，点击 ScrollView 或 FlatList 上的任何区域都不会隐藏虚拟键盘
  - never: 虚拟键盘出现时，点击 ScrollView 或 FlatList 上的任何区域都会隐藏虚拟键盘
  - handled: 虚拟键盘出现时，点击 ScrollView 或 FlatList 上的任何区域都会隐藏虚拟键盘，除非点击区域有对应的响应处理函数
- 滚动开始与结束: `onMomentumScrollBegin/End`，在松手的时候回调
- 滚动距离监听: `onScroll` (IOS: scrollEventThrottle 需要加，要不然只拿到结果，没过程)
  - scrollEventThrottle={1|16|32} 希望多少毫秒回调一次
- 超出滚动: `overScrollMode`
  - always
  - auto
  - never
- 分页滚动
  - pagingEnabled
- 滚动方向
  - horizontal
- 滚动开关
  - scrollEnabled
- 初始滚动
  - `contentOffset={{x: 0, y: 100}}`
- 是否显示滚动条
  - `showsVerticalScrollIndicator/Horizontal`
- 吸顶元素: `stickyHeaderIndices`
- api: `scrollTo()`, `scrollToEnd()`

### FlatList 高性能列表组件

- 基础使用: data, renderItem, keyExtractor
- ScrollView 属性：内容容器、滚动条、滚动监听、键盘模式等
- ListHeaderComponent: 表头
- ListFooterComponent: 表尾
- ListEmptyComponet: 空元素
- ItemSeparatorComponent: 分割线元素
- initialNumToRender: 初始渲染元素，提前渲染多少个，更快的渲染第一屏
- inverted: 反向渲染
- numColumns: 多列排布
- onViewableItemsChanged: 可见元素回调
- 滚动到指定元素: scrollToIndex(), scrollToItem()不推荐
- 滚动指定距离: scrollToOffset()
- 滚动到底: scollToEnd()

### SectionList: 多类型分组列表

- 基础使用: sections, renderItem, keyExtractor
- ScrollView 属性: 内容容器、滚动条、滚动监听、键盘模式等
- 表头: ListHeaderComponent
- 表尾: ListFooterComponent
- 分组头部: renderSectionHeader
- 分组吸顶: stickySectionHeadersEnabled
- 滚动 api: scrollToLocation()

### RefreshControl: 下拉刷新

- 下拉刷新: refreshing, onRefresh
- 上拉加载: onEndReached, onEndReachedThreshold

### Modal: 自定义弹窗

- 控制显示: visible
- 渲染内容: children
- 安卓返回关闭: onRequestClose 物理返回键
- 背景色: transparent
- 状态栏透明: statusBarTranslucent
- 动画方式: animationType
  - none
  - fade
  - slide 底部弹窗

### StatusBar: 适配状态栏

- barStyle 状态栏上显示的内容是黑色还是白色
  - dark-content
  - light-content
- 背景颜色: backgroundColor
- 动画切换: animated
- 透明悬浮: translucent
  - 为 true 时， UI 从整个屏幕最顶端开始，而不是从状态栏下面开始
  - `backgroundColor={'transparent'}` 沉浸式
- 显示隐藏: hidden
- api
  - `setBakgroundColor()`
  - `setBarStyle()`
  - `setHidden()`
  - `setTranslucent()`

### Switch 开关切换

- 指定开关: value
- 状态回调: onValueChange
- 设置不可用: disabled
- 背景颜色: trackColor

## 常用 api 精讲

- `alert/console`: 开发周期的调试工具
- `Dimensions/useWindowDimensions`: 适配屏幕宽度
- `Platform`: 轻松获取平台属性
- `StyleSheet`: 灵活构建样式表
- `Linking`: 少写代码
- `PixelRatio`: 像素比例工具
- `BackHandler`: 针对安卓返回键的适配
- `PermissionAndroid`: 一个 api，解决原生动态权限问题
- `Vibration`: 简单好用的震动交互
- `ToastAndroid`: 安卓平台的提示
- `transform`: 矩阵变换的伪 3D 效果
- `Keyboard`: 键盘操作

### `alert/console`

- console 日志输出分级: log debug info warn error
- console.log 字符串和占位符:
  - `%o`obj, `%s`字符串占位符, `%d`数值占位符
- console.log 添加样式: `%c`颜色和字号 (RN 用不了)
  - `console.log('%c这行日志是红色', 'color: red;font-size: x-large');`
    - font size: `x-large`,`x-medium`,`x-small`
- console.log 输出组件树
- console.table 输出表格日志 (RN 用不了)
- ` console.group()``console.grounpEnd() `

### `Dimensions/useWindowDimensions`

- 获取屏幕宽度，缩放，文字缩放的方法
- `Dimension.get` 参数`screen`和`window`的区别
  - window 是不包含高度, screen 包含状态栏高度, 如果设置为沉浸式, 则相等的
- addEventListener 监听屏幕

### `Platform`

- 平台属性: `OS`,`Version`,`constants`
- 判断: `isTV`
- 平台选择: `Platform.select()`

### `StyleSheet`样式表

- 样式合并: `StyleSheet.compose`和`[]`写法的区别
  - 底层数组 diff 的时候，`[]`会被认为是两个组件，UI 变了, 页面重绘
  - `StyleSheet.compose` 对象不会变，不会导致重绘
- 样式平铺: `StyleSheet.flatten`
- 绝对填充: `StyleSheet.absoluteFill`, 绝对布局, 铺满全屏的 absolute UI
  - `{"bottom": 0,"left":0,"position":"absolute","right":0,"top":0}`
- 头发丝尺寸: `StyleSheet.hairlineWidth` 1 像素

### `Linking` 链接，跳转

- 打开链接`openURL()`, `canOpenURL()`
- 跳转到应用设置: `Linking.openSettings()`
- 安卓隐式跳转: `Linking.sendIntent()`
- 如果是通过 url 打开的，可以获取到 url: `Linking.getInitialURL()`

### `PixelRatio` 像素比例工具

- 获取屏幕像素密度: `PixelRatio.get()` 和 Dimensions scale 一样
- 获取字体缩放比例(仅安卓): `PixelRatio.getFontScale()` 和 Dimensions fontScale 一样
- 获取布局大小: `PixelRatia.getPixelSizeForLayoutSize(200)` 获取 200 大小对应像素的大小
- `PixelRatio.roundToNearestPixel(xxx)` 保证布局不会被丢失像素问题

### `BackHandler`: 针对安卓返回链的适配

- 添加监听：`BackHandler.addEventListener()`
- 移除监听：`BackHandler.removeEventListener()`

```sh
npm i @react-native-community/hooks
```

### `PermissionAndroid` 权限

- 检查权限：`PermissionsAndroid.check()`
- 查看所有权限：`PermissionsAndroid.PERMISSIONS`
- 申请权限：`PermissionsAndroid.request()`
  - 需要再`AndroidManifest.xml` 先申请 `uses-permission`
- 申请多个权限：`PermissionsAndroid.requestMultiple()`

### `Vibration`: 震动交互

- 原生申明(静态)权限
  - `<uses-permission android:name="android.permission.VIBRATE" />`
- 发起震动
  - `Vibration.vibrate()`
- 取消：`Vibration.cancel()`

### `ToastAndroid`

- 弹出提示：`ToastAndroid.show()`
- 弹出提示：`ToastAndroid.showWithGravity()`
- 偏移量：`ToastAndroid.showWithGravityAndOffset()`

### transform: 矩阵变换的伪 3D 效果

### Keyboard: 键盘操作

- 注册键盘监听：`Keyboard.addListener()`
- 注销键盘监听：`EmitterSubscription.remove()`
- 隐藏键盘：`Keyboard.dismiss()`

## 动画系统

- 支持的动画组件
  - `Animated.View`
  - `Animated.Image`
  - `Animated.ScrollView`
  - `Animated.FlatList`
  - `Animated.Text`
  - `Animated.SectionList`
- `Animated.Value`
- `Animated.timing()` 时间动画
- `Animated.spring()` 弹性动画
  - `toValue`: 目标值
  - `delay`: 延迟 默认 0
  - `restspeedthreshold`: 弹簧静止速度
    - 单位为像素/秒，默认为 0.001
  - `velocity`: 速度
    - 附着在弹簧上物体的初始速度，默认值 0
  - `overshootClamping`: 过冲
    - 弹簧是否应该夹紧而不应弹跳，默认为 false
  - 三套物理公式
    - bounciness speed
      - bounciness(弹性): 控制弹性，越大越弹，默认值 8
      - speed(速度): 控制”弹“的速度，默认值 12
    - tension friction
      - tension(张力): 控制速度，越大速度越快，默认值 40
      - friction(摩擦): 控制弹性与过冲，越小越弹，默认值 7
    - stiffness damping mass
      - stiffness(刚度): 弹簧刚度系数，越大越弹，默认 100
      - damping(阻尼): 弹簧运动因摩擦而受阻，越小越弹，默认值 10
      - mass(质量): 附着在弹簧末端的物体质量，越大惯性越大，动画越难停下，越小惯性越小，动画很快停下，默认值 1
- `Animated.decay()` 衰减动画 没办法明确目的点在哪
  - `velocity`: 初始速度
  - `deceleration`: 衰减系数

### Animated.timing

四种内置动画

- `Easing.back(3)` 回拉
- `Easing.ease` 平缓
- `Easing.bounce` 弹跳
- `Easing.elastic` 弹性
- linear: 一次方函数
- quad: 二次方函数
- cubic: 三次方函数
- `Easing.bezier(0, 0, 1, 1)` 贝塞尔
  - `https://cubic-bezier.com/`
  - `https://easings.net/#`
- `Easing.circle` 环形
- `Easing.sin` 正弦
- `Easing.exp` 指数

### 矢量动画`Animated.valueXY`

- 设置两个值

### 组合动画

- `Animated.parallel()` 并发
- `Animated.stagger()` 有序/交错
- `Animated.sequence()` 序列
- `Animated.delay()` 延迟

### LayoutAnimation 超级简单的布局动画

- 安卓动画启动入口

```js
// index.js
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    console.log("enable....");
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// 使用
<Button
  title="click"
  onPress={() => {
    LayoutAnimation.configureNext(
      // LayoutAnimation.Presets.linear,
      // LayoutAnimation.Presets.spring,
      LayoutAnimation.Presets.easeInEaseOut,
      () => {
        console.log("动画结束");
      },
      () => {
        console.log("动画异常");
      }
    );
    setShowView(!showView);
  }}
/>;
```

## typescript

```sh
npm i --save-dev typescript
tsc --init
npm i --save-dev @types/react @types/react-native
```

### 数组，元祖，枚举

```js
const a1: number[] = [123, 1];
const a2: Array<number> = [123, 1];

// 元祖
const a3: [string, number, boolean] = ["张三", 12, true];

// 枚举
// 枚举是基于JavaScript对象的实现，它为每个枚举成员分配一个数字值，并支持手动赋值和反向映射等特性
enum job {
  Teacher = "Teacher",
}

var job={
  Teacher: "Teacher",
  valueOf: function(){
    return this;
  },
  toString: function(){
    return Object.keys(this)[this.valueOf()]
  }
}
```

### 联合类型

```js
type User = {
  speak?: () => {},
};
const u: User | undefined = {};
u?.speak?.();
```

### 命名空间

```js
// @types/index.d.ts
declare namespace Info {
  type Dog = {
    name: string,
    age: number,
    weight: number,
  }
}
const dog:Info.Dog = {};
```

## Context 上下文

```js
const ThemeContext = react.createContext("dark");
const Provider = () => {
  return (
    <ThemeContext.Provider value={theme}>
      <Button
        title="切换"
        onPress={() => {
          setTheme((state) => {
            if (state === "dark") {
              return "light";
            } else {
              return "dark";
            }
          });
        }}
      />
    </ThemeContext.Provider>
  );
};
<Provider>
  <Child1>
    <Child2 />
  </Child1>
</Provider>;

const Child2 = ()=>{
  const theme = useContext(ThemeContext);
  return <Text style={{color:theme==dark"#fff":"#000"}}>tttttttt</Text>
}
```

- Context 本质上是全局变量，大量使用 Context 会导致组件失去独立性，使用组件复用性变差
- 对于常规的组件间传值，可优先考虑组件组合、状态管理、单例导出等方式，不要过度使用 Context

## HOC 高阶组件

- 高阶函数
  - 如果一个函数接受的参数为函数，或返回值是一个新函数，则该函数就是高阶函数
    - `setTimeout(()=>{}, 1000)`
    - `array.filter((item, index)=>item===target)`
    - `Promise...`
- 高阶组件
  - 如果一个组件的参数是组件，返回值是一个新组件，则该组件就是高阶组件
- 高阶组件应用场景

```js
export const withHOCView = (OrginView)=>{
  const HOCView = (props)=>{
     return ( <>
        <View></View>
     <>)
  }
  return HOCView;
}
```

## memo

### 函数式组件和 class 组件拦截多余渲染

- 避免多余渲染
- 避免重复计算、重复创建对象

```js
// memo
type Props = {
  info: UserInfo,
};
React.memo(
  (props: Props) => {
    const { info } = props;
    return <View></View>;
  },
  (preProps: Props, nextProps: Props) => {
    return JSON.stringify(preProps.info) === JSON.stringify(nextProps.info);
  }
);
// class 组件拦截
class InfoView extends React.Component<Props, any> {
  constructor(props: Props){
    super(props);
  }
  shouldComponentUpdate(nextProps: Readonly<Props>:bool){
    return JSON.stringify(nextProps.info) === JSON.stringify(this.props.info);
  }
  render(): React.ReactNode {
    return <View></View>
  }
}
```

### 避免重复创建对象

- `useMemo` 缓存数据 | 缓存 UI 渲染
- `useCallback` 缓存回调函数

## Hermes 引擎

- 提升启动速度
- 压缩包体积

```gradle
// app/build.gradle
project.ext.react = [
  enableHermes: true
]
apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
```
