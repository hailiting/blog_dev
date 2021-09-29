# Angular1.0 基本认识

## 简介

AngularJS 诞生于 2009 年，由 Misko Hevery 等人创建，后为 Google 所收购。是一款优秀的前端 JS 框架，已经被用于 Google 的多款产品中。
AngularJS 有着许多特性，最为核心的是：MVC、模块化、自动化双向数据绑定、依赖注入等

- MVC
- 模块化
- 自动化双向数据绑定
- 依赖注入（dependency injection）

## 四大特征

### 1. MVC 模式

```
      通过数据、视图双向绑定解耦    通过依赖注入解耦
视图 <-----           ------>控制器<-------     服务A   服务B....
```

- M - Model 数据，`$scope.xx`
- V - View 数据的呈现，HTML+Directive(指令)
- C - Controller 操作数据，就是 function, 数据的增删改查

### 2. 双向绑定

AngularJS：声明式编程应该用于构建用户界面以及编写软件的构建，而指令式编程适合表示业务逻辑

### 3. 依赖注入

DI 是一种设计模式，指某个对象依赖的其他对象无需手工创建，只需一个命令，其依赖的对象由框架来自动创建并注入，模块中所有的 service 和 provider 两类对象，都可以根据形参名称实现 DI

### 4. 模块化 高内聚低耦合

- 1. 官方提供模块 ng ngRoute ngAnimate
- 2. 自定义模块 angular.module("模块名",[])

```html
<body ng-app="myApp" ng-init="username = '张三'" ng-controller="myController">
  请输入用户名：<input ng-model="username" /><br />
  请输入密码：<input ng-model="pass" /><br />
  <button ng-click="add()">提交</button><br />
  {{z}}
  <div ng-repeat="item in items">
    {{$index}}: {{item}}
  </div>
</body>
<script src="https://cdn.staticfile.org/angular.js/1.0.0/angular.min.js"></script>
<script>
  var app = angular.module("myApp", []);
  console.log(app.controller);
  app.controller("myController", function($scope) {
    $scope.items = ["a", "v", "d"];
    $scope.add = function() {
      // $scope.z = parseInt($scope.x) + parseInt($scope.y);
      $scope.z = $scope.username + $scope.pass;
    };
  });
</script>
```

- `ng-app`: 在 body 标签加上`ng-app`, angular 的表达式就可以正常执行
- `ng-model`: 双向绑定指令
- `ng-init`: 初始化指令
- `ng-controller`: 用于指定所使用的控制器
- `ng-click`
- `ng-repeat` 循环集合：`ng-repeat="item in items"` `ng-repeat="(key, value) in objs"`
  - `$index`索引
- `ng-if=条件`
- `ng-options = "变量.属性1 as 变量.属性2 for 变量 in 数据集合"`
  - 注意：变量是一个实体类，是数据库中的一条记录，as 前面的部分是值 value，as 后面的部分是显示的文本。其中属性 1 和属性 2 分别表示实体中的两个字段属性
    ...
