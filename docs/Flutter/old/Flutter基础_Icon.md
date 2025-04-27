### 如何加载 Icon

```dart
const Icon(
    this.icon // IconDate,
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
```

#### 一：从 Flutter 内置的`material_fonts`加载

```dart
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
```

#### 二：使用自定义 Icon

第一步： 在`pubspec.yaml`中配置 icon:

```yaml
fonts:
  - family: devio
    font:
      asset: fonts/devio.ttf
```

第二步：使用

```dart
child: new Icon(
    new IconDate(0xf5566, fontFamily:"devio"),
    size: 100.0,
    color: Colors.blueAccent,
)
```
