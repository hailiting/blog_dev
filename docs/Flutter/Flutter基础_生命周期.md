# Flutter基础_生命周期
~~~
create widget
构造函数
initState
didChangeDependencies
build
|-render tree  -> remove widget ->deactive -> dispose -> over
| didUpdateWidget
|-build

// app切都后台再切回前台
inactive
paused
inactive
resumed
~~~
### 1, 创建wedget到显示，打印结果
~~~
: initState
: didChangeDependencies
: build
~~~
### 2, 退出这个页面执行
~~~
: deactivate
: dispose
~~~
### 3, 点击热重载按钮
~~~
: reassemble
: didUpdateWidget
: build
~~~
### 4, app由显示到切换后台（home状态）
~~~
: AppLifecycleState.inactive
: AppLifecycleState.paused
~~~
### 5, App由后台切回到前台
~~~
: AppLifecycleState.inactive
: AppLifecycleState.resumed
~~~

