# Banner 功能开发

## flutter_swiper

```
// add pubspec.yaml
flutter_swiper: ^lastest_version
// run
flutter packages get
```

- autoplayDisableOnInteraction 左右两边箭头显示隐藏

```
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
void main()=> runApp(new MyApp());
class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Flutter demo Home Page'),
    );
  }
}
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key,this.title}):super(key: key);
  final String title;
  _MyHomePageState createState() => new _MyHomePageState();
}
class _MyHomePageState extends State<MyHomePage>{
  @override
  Widget build(BuildContext context){
    List _imageUrls = [
      'http://via.placeholder.com/350x150',
      'http://ddrv.cn/wp-content/uploads/2019/10/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191023223602.png',
      'http://ddrvcn.oss-cn-hangzhou.aliyuncs.com/2019/7/Unmeqa.png',
    ];
    return new Scaffold(
        appBar: new AppBar(
          title: new Text(widget.title),
        ),
        body: MediaQuery.removePadding(
            removeTop: true,
            context: context,
            child: ListView(
                children: <Widget>[
                  Container(
                      height: 160,
                      child: new Swiper(
                        itemBuilder: (BuildContext context, int index){
                          return GestureDetector(
                              onTap: (){
//                                CommonModel model = _imageUrls[index];
//                                NavigatorUtil.push(
//                                  context,
//                                  WebView(
//                                    url: model.url,
//                                    title: model.title,
//                                    hideAppBar: model.hideAppBar
//                                  )
//                                );
                              },
                              child: new Image.network(
                                  _imageUrls[index],
                                  fit: BoxFit.fill,
                              )
                          );
                        },
                        itemCount: _imageUrls.length,
                        autoplay: true,
                        pagination: new SwiperPagination(),
                        control: new SwiperControl(),
                      )
                  )
                ]
            )
        )
    );
  }
}
```
