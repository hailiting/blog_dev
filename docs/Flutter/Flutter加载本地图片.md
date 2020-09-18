# Flutter 加载本地图片

### 1，在根目录建立一个文件夹，名称叫`images`

### 2，在`images`下建`2.0x`,`3.0x`，分别放 2 倍图和 3 倍图，正常的直接放`images`下

### 3，在`pubspec.yaml`文件中声明本地图片

```
flutter:
  # To add assets to your application, add an assets section, like this:
  # assets:
  #  - images/a_dot_burr.jpeg
  #  - images/a_dot_ham.jpeg
  assets:
      - images/abc.jpg
```

### 4, 在代码中调用

`Image.asset("images/abc.jpg"),` 或 `Image( image: AssetImage("images/abc.jpg"))`
