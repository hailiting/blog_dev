# PHP 路由

## 一：基于原生 PHP 的路由分配实现

```
<?php
  // 权限控制
  include_once "./auth.php";
  // 应用入口文件
  date_default_timezone_set("Asia/Shanghai");
  header("Content-type: text/html;charset=utf-8");
  // 项目根路径
  define("BASEPATH", dirname(__FILE__));
  // 调试模式
  define("APP_DEBUG", True);

  // 引入配置文件
  include_once BASEPATH . "/config/config.php";

  // 路由设置
  $router = include_once BASEPATH . "/config/router.php";
  if($_SERVER["HTTP_HOST"]!=="xxx.com"){
    var_dump("当前host不被允许");
  } else {
    $request_path = str_replace("/index.php", "", $_SERVER["PHP_SELF"]);
    $request_query = getCurrentQuery();
    if(array_key_exists($request_path, $router)){
      $module_file = BASEPATH . $router[$request_path]["file_name"];
      $class_name = $router[$request_path]["class_name"];
      $method_name = $router[$request_path]["method_name"];
      if(file_exists($module_file)){
        include $module_file;
        $obj_module = new $class_name();
        if(!method_exists($obj_module, $method_name)){
          die("要调用的方法不存在");
        } else {
          if(is_callable(array($obj_module, $method_name))){
            $obj_module->$method_name($request_query, $_POST);
          }
        }
      } else{
        die("定义的模块不存在");
      }
    } else {
      echo "页面不存在";
    }
  }
```

## ThinkPHP5 之 route

有三种模式

- PATH_INFO
- 混合
- 强制使用路由模式(推荐)
  模式的配置在`application`的`config.php`里

```
// 混合模式
url_route_on => true,
// 强制启用路由模式
url_route_must => true,
```

### PATH_INFO

```
<?php
  return [
      '__pattern__' => [
          'name' => '\w+',
      ],
      '[hello]'     => [
          ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
          ':name' => ['index/hello', ['method' => 'post']],
      ],
  ];
```

### 使用路由模式

```
use think\Route;
// Route::rule("路由表达式", "路由地址", "请求类型", "路由参数(数组)", "变量规则(数组)");
// GET POST DELETE PUT * (默认为*)
// 简写
// Route::get(...);
// 路由参数["https"=>true]
Route::get("hello", "sample/Test/hello");
```
