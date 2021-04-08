# TabController 监听 index

```dart
class _OrderPageState extends State<OrderPage>{
  void initState() {
    super.initState();
    // 添加监听器
    tabController = TabController(vsync: this, length: titleTabs.length)
      ..addListener(() {
          if(tabController.index.toDouble() == tabController.animation.value){
            switch (tabController.index) {
                case 0:
                  print(1);
                  break;
                case 1:
                  print(2)
                  break;
                case 2:
                  print(3)
                  break;
              }
          }
      });
  }

  final List<Tab> titleTabs = <Tab>[
    Tab(
      text: '全部',
    ),
    Tab(
      text: '待付款',
    ),
    Tab(
      text: '待发货',
    ),
  ];
      child: Scaffold(
        appBar: AppBar(
            ...
          elevation: 0.0,
          backgroundColor: Color.fromRGBO(26, 172, 255, 1),
          title: TabBar(
            isScrollable: true,
            indicator: UnderlineTabIndicator(
                borderSide: BorderSide(style: BorderStyle.none)),
            tabs: titleTabs
          ),
        ),
        body: Container(
          color: Color.fromRGBO(26, 172, 255, 1),
          child: TabBarView(
            //TabBarView 默认支持手势滑动，若要禁止设置 NeverScrollableScrollPhysics
            physics: NeverScrollableScrollPhysics(),
            children: <Widget>[
                Center(child:Text('view1')),
                Center(child:Text('view2')),
                Center(child:Text('view3')),
            ],
          ),
        ),
      )
}
```

```dart
//该动画值表示当前TabBar选中的指示器位置以及TabBar和TabBarView的scrollOffsets
animation → Animation<double>
//当前选中Tab的下标。改变index也会更新 previousIndex、设置animation's的value值、重置indexIsChanging为false并且通知监听器
index ↔ int
//true：当动画从上一个跳到下一个时
indexIsChanging → bool
//tabs的总数，通常大于1
length → int
//不同于animation's的value和index。offset value必须在-1.0和1.0之间
offset ↔ double
//上一个选中tab的index值，最初与index相同
previousIndex → int
```
