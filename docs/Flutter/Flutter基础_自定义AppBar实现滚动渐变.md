# 自定义AppBar实现滚动渐变
## NotificationListener
利用NotificationListener监听子Widget滚动时向上发送的notification
~~~
const NotificationListener({
  Key key,
  @required this.child, // 被监听的子widget
  this.onNotification, // 监听到notification后的回调方法
})
~~~
监听返回值详解
~~~
class _MyHomePageState extends State<MyHomePage>{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      body: NotificationListener<ScrollNotification>(
        onNotification: (ScrollNotification notification){
          if(notification is ScrollUpdateNotification && notification.depth == 0){
            // 滚动且是列表滚动的时候[banner忽略] notification.depth  第0个元素滚动的时候
            ScrollMetrics metrics = notification.metrics;
            print(metrics.pixels); // 当前位置
            print(metrics.atEdge); // 是否在顶部或底部
            print(metrics.axis); // 垂直或水平滚动
            print(metrics.axisDirection); // 滚动方向是up还是down
            print(metrics.extentAfter); // 视口底部距离列表底部有多大
            print(metrics.extentBefore); // 视口顶部距离列表顶部有多大
            print(metrics.extentInside); // 视口范围内的列表长度
            print(metrics.maxScrollExtent); // 最大滚动距离， 列表长度-视口长度
            print(metrics.minScrollExtent); // 最小滚动距离
            print(metrics.viewportDimension); // 视口长度
            print(metrics.outOfRange); // 是否越过边界
            print("----------------------------");
            return ture;
          }
        },
        child: ListView.builder(
          itemExtent: 50,
          itemCount: 50,
          itemBuilder: (BuildContext context, int index){
            return ListTile(title: Text(index.toString()));
          }
        )
      )
    );
  }
}
~~~