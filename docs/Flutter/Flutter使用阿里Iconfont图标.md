# Flutter 使用阿里 Iconfont 图标

## 1 将下载的 iconfont.ttf 复制到项目 fonts 目录

## 2 配置 pubspec.yaml 文件，将字体文件引入

```
flutter:

  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true

  fonts:
    - family: iconfont
      fonts:
        - asset: fonts/iconfont.ttf
```

## 3 IconData 使用图标

```
// 查看iconfont.css，将\替换为0x即可得到相应的codePoint
// .icon-ai-ios:before{
//      content: "\e631";
// }
IconData(0xe631, fontFamily: 'iconfont')
```

## 4 线上转换工具

`https://www.cnblogs.com/x-man/p/10658084.html`
