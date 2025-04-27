# ImageWidget 详解

- Image widget
- 如何加载网络图片
- 如何加载静态图片
- 如何加载本地图片
- 如何设置 Placeholder
- 如何配置图片缓存
- 如何加载 Icon

## Image widget

Flutter 中用 Image 来展示图片的 widget

### Image 支持以下类型的构造函数

- new Image - 用于 ImageProvider 获取图像
- new Image.asset - 使用 key 从 AssetBundle 获得图像
- new Image.network - 从网络 URL 中获取图像
- new Image.file - 从本地文件中获取图片
- new Image.memory - 用于从 Uint8List 获取图像
  > 使用 AssetImage 指定图像，并确保在 widget 树中的 Image widget 上方存在 MaterialAp, WidgetsApp 或 MediaQuery 窗口的 wedget，让 Image 能够根据像素密度自动适配不同分辨率的图片。

#### Image 支持的图片格式

Image 支持以下类型的图片： JPEG, PNG, Gif, Animated GIF, WebP, Animated WebP, BMP 和 WBMP

### demo

#### 加载网络图片

```dart
import 'package:flutter/material.dart';
void main()=>runApp(new MyApp());
class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext context){
        return new MaterialApp(
            title: 'Flutter bottomNavigationBar',
            theme: new ThemeData.fallback(),
            home: Image.network(
                'http://www....'
            )
        )
    }
}
```

#### 加载静态图片，以及处理不同分辨率的图片

##### 1，在`pubspec.yaml`文件中声明图片资源的路径：

```yaml
assets:
  - images/my_icon.png
```

##### 2，使用`AssetImage`访问图片

```dart
Image(
    height: 26,
    width: 26,
    image: AssetImage(my_icon.png),
)
// 或者
Image.asset(
    my_icon.png,
    width: 26,
    height: 26
)
```

#### 如何加载本地图片

存在手机 SD 卡里的图片

##### 1，加载完整路径的本地图片

```dart
import 'dart:io';
Image.file(File('/sdcard/Download/Stack.png')),
```

##### 2，加载相对路径的本地图片

2.1 第一步： 在`pubspec.yaml`中添加 `path_provider` 插件;
2.2 第二步： 导入头文件

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';
// Image.file(File('/sdcard/Download/Stack.png')),
FutureBuilder(
    future: _getLocalFile('Download/Stack.png'),
    builder: (BuildContext context, AsyncSnapshot<File> snapshot){
        return snapshot.data !=null? Image.file(snapshot.data):Container();
    }
)
// getExternalStorageDirectory： 获取外部存储卡的路径
Future<File> _getLocalFile(String filename) async{
    String dir = (await getExternalStorageDirectory()).path;
    File f = newFile('$dir/$filename');
    return f;
}
```

### 如何设置 Placeholder

为设置 Placeholder，我们需要借助 `FadeInImage` Widget, 它能从内存，本地资源中加载 `placeholder`.

#### 从内存中加载 placeholder

##### 1，第一步

安装 `transparent_image` 插件

##### 2，导入并使用插件

```dart
import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';
...
class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext context){
        final title = 'Fade in images';
        return MaterialApp(
            title: title,
            home: Scaffold(
                appBar: AppBar(
                    title: Text(title),
                ),
                body: Stack(
                    children:<Widget>[
                        Center(child: CircularProgressIndicator()),
                        Center(
                            // FadeInImage.memoryNetwork  从内存里加载图片
                            child: FadeInImage.memoryNetwork(
                                placeholder: kTransparentImage, // transparent_image -> kTransparentImage 从完全脱敏到逐渐显示
                                image: 'http://....'
                            ),
                        ),
                    ],
                ),
            ),
        );
    }
}
```

#### 从本地资源中加载 placeholder

##### 第一步：配置本地资源

```yaml
flutter:
  assets:
    - assets/loading.gif
```

##### 第二步：加载本地资源图片作为 placeholder

```dart
FadeInImage.assetNetwork(
    palceholder: 'assets/loading.gif',
    image: 'https://...'
)
```

### 如何配置图片缓存

在 Flutter 中，使用`cached_network_image`插件，来从网络上加载图片，并且将其缓存到本地，以供下次使用

```dart
import ....;
void main(){
    runApp(MyApp());
}
class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext context){
        final title = 'Catched Images';
        return MaterialApp(
            title: title,
            home: Scaffold(
                appBar: AppBar(
                    title: Text(title),
                )
                body: Center(
                    child: CachedNetworkImage(
                        placeholder: (context, url)=> new CircularProgressIndicator(),
                        imageUrl: 'https://oicc....'
                    )
                )
            )
        )
    }
}
```
