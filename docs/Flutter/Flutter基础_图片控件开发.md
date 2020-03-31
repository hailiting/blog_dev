# 图片控件开发详解
- Image widget
- 如何加载网络图片
- 如何加载静态图片
- 如何加载本地图片
- 如何设置Placeholder
- 如何配置图片缓存
- 如何加载Icon
## Image widget
Flutter中用Image来展示图片的widget
### Image支持以下类型的构造函数
* new Image - 用于ImageProvider获取图像
* new Image.asset - 使用key从AssetBundle获得图像
* new Image.network - 从网络URL中获取图像
* new Image.file - 从本地文件中获取图片
* new Image.memory - 用于从Uint8List获取图像
> 使用AssetImage指定图像，并确保在widget树中的Image widget 上方存在 MaterialAp, WidgetsApp 或 MediaQuery窗口的wedget，让Image能够根据像素密度自动适配不同分辨率的图片。
#### Image支持的图片格式
Image支持以下类型的图片： JPEG, PNG, Gif, Animated GIF, WebP, Animated WebP, BMP 和 WBMP
### Doem 
#### 加载网络图片
~~~
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
~~~
#### 加载静态图片，以及处理不同分辨率的图片
##### 1，在``pubspec.yaml``文件中声明图片资源的路径：
~~~
assets: 
    - images/my_icon.png
~~~
##### 2，使用``AssetImage``访问图片
~~~
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
~~~
#### 如何加载本地图片
##### 1，加载完整路径的本地图片
~~~
import 'dart:io';
Image.file(File('/sdcard/Download/Stack.png')),
~~~
##### 2，加载相对路径的本地图片                                    
2.1 第一步： 在``pubspec.yaml``中添加path_provider插件;
2.2 第二步： 导入头文件
~~~
import 'dart:io';
import 'package:path_provider/path_provider.dart';
// Image.file(File('/sdcard/Download/Stack.png')),
FutureBuilder(
    future: _getLocalFile('Download/Stack.png'),
    builder: (BuildContext context, AsyncSnapshot<File> snapshot){
        return snapshot.data !=null? Image.file(snapshot.data):Container();
    }
)
// 获取SDCard的路径
Future<File> _getLocalFile(String filename) async{
    String dir = (await getExternalStorageDirectory()).path;
    File f = newFile('$dir/$filename');
    return f;
}
~~~
### 如何设置Placeholder
为设置Placeholder，我们需要借助FadeInImage,它能从内存，本地资源中加载placeholder.
#### 从内存中加载placeholder
##### 1，第一步
安装transparent_image插件
##### 2，导入并使用插件
~~~
// import 'package:flutter/material.dart';
// import 'package:transparent_image/transparent_image.dart';
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
                            child: FadeInImage.memoryNetwork(
                                placeholder: kTransparentImage,
                                image: 'http://....'
                            ),
                        ),
                    ],
                ),
            ),
        );
    }
}
~~~
#### 从本地资源中加载placeholder
##### 第一步：配置本地资源
~~~
flutter: 
    assets:
        - assets/loading.gif
~~~
##### 第二步：加载本地资源图片作为placeholder
~~~
FadeInImage.assetNetwork(
    palceholder: 'assets/loading.gif',
    image: 'https://...'
)
~~~
### 如何配置图片缓存
在Flutter中，使用``cached_network_image``插件，来从网络上加载图片，并且将其缓存到本地，以供下次使用
~~~
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
~~~
### 如何加载Icon
~~~
const Icon(
    this.icon//IconDate,
    {
        Key key,
        this.size,
        this.color,
        this.semanticLabel, // 标志位
        this.textDirection, // 绘制方向，一般使用不到
    }
)
const IconData(
    this.codePoint // fonticon对应的16进制Unicode,
    {
        this.fontFamily, // 字体库系列
        this.fontPackage, // 字体在那个包中，不填仅在自己的程序中查找
        this.matchTextDirection: false, // 图标是否按照图标绘制方向显示
    }
)
~~~
#### 一：从Flutter内置的``material_fonts``加载
~~~
import 'package:flutter/material.dart';
void main(){
    runApp(new MaterialApp(home: new MyApp()));
}
class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext context){
        return new Scaffold(
            appBar: new AppBar(
                title: new Text("Icons"),
            ),
            body: new Center(
                child: new Icon(Icons.android, size: 100.0),
            )
        )
    }
}
~~~
#### 二：使用自定义Icon
第一步： 在``pubspec.yaml``中配置icon:
~~~
fonts: 
    - family: devio
      font: 
        asset: fonts/devio.ttf
~~~
第二步：使用
~~~
child: new Icon(
    new IconDate(0xf5566, fontFamily:"devio"),
    size: 100.0,
    color: Colors.blueAccent,
)
~~~