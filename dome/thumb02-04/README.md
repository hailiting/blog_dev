# 知识点

## 需求

阶段一：

1. 使用 ES6 完成点赞+1 功能的父类 PraiseButton;
2. 开发子类 Thumb 实现大拇指方式点赞
3. 使用 Babel 编译 ES6 代码，并使用 System.js 可加载对应编译后的文件
4. 将编译后的文件挂载为 JQuery 组件
5. 实现 Karma 完成对点赞+1 组件的单元测试

阶段二：

1. 使用 PHP+MySQL 完成点赞接口，实用户点击一次更新数据库点赞总数+1
2. 使用 Koa2+ES6 封装 PHP 点赞接口，并建立路由
3. 将原项目迁移进入 KOA2，并顺利通过 index/index 路由进行访问
4. 将用户点击事件通过 axis 链接到 KOA2 点赞接口
5. 对用户连续点击事件进行稀释（使用函数式编程）
6. 完成点赞接口自动化测试，点赞+功能的自动化测试，真实页面点击自动化测试

阶段三：

1. 使用`X-Tag`封装点赞插件`<x-praise></x-praise>`;
2. 使用 Gulp 编译 koa2 源代码并能监控源代码变化自动编译；
3. 使用 webpack 配置上线版本、开发版本配置文件，并能监控文件的变化自动刷新浏览器；
4. 使用 webpack 能够对 css、js 进行编译压缩打包合并并生成 MD5;
5. 去掉 System.js，利用 webpack 进行文件引用（同时提取公共文件成独立 JS 包）
6. 将编译后的文件能按照 Chunk 规律分发静态文件并编译进 Swig;

阶段四：

1. 根据雅虎军规将页面 CDN 预加载等属性配置完备
2. 扩展新组件星星点赞组件，首页完成直出并利用 Pjax 完成 SPA
3. 完成前端缓存的负载均衡操作，封装统一 ORM 库并配置离线包 manifest
4. 使用 webpack4 对全部静态文件优化，并能根据上线配置动态配置 CDN
5. lazyload.js 重新优化静态文件分发器，使静态资源达到并行最大化
6. 引入完整的页面监控脚本，完整分析当前页面性能瓶颈

### 根据雅虎军规将页面 CDN 预加载等属性配置完备

#### DNS Prefetching

##### 什么是 DNS Prefetching

1. DNS-Domain Name System【域名系统】，作为域名和 Ip 地址相互映射的一个分布式数据库
2. 定义：浏览器根据自定义的规则，提前去解析后面可能用到的域名，来加速网站的服务速度

##### 如何使用 DNS Prefetching

1. a 标签会自动启用 DNS Prefetching【在 https 下是不起作用的】

```
// on 开  off 关
a标签 + <meta http-equiv="x-dns-prefetch-control" content="on">
```

2.

```
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//g.tbcdn.cn">
...
```

##### 功能的有效性

如果本地有缓存，大约 0-1ms,如果去路由器找，大约 15ms，如果去当地服务器找，常见的大约 150ms，如果不常见的，可能在 1s 以上

### 扩展新组件星星点赞组件，首页完成直出并利用 Pjax 完成 SPA

#### pjax

pjax 是 JQuery 插件，结合了 pushState 和 ajax 技术，不需要重新加载整个页面就能从服务器加载 HTML 到当前页面，这个 ajax 请求会有永久链接、title 并支持浏览器的回退/前进按钮

```
npm i jquery-pjax
or
https://cdn.bootcdn.net/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.js
or
curl -LO https://raw.github.com/defunkt/jquery-pjax/master/jquery.pjax.js
```

##### 用法

1. 引入 jquery 和 jquery.pjax.js
2. 注册事件

```
/**
* 方式一： 按钮父节点监听事件
* @param selector 触发点击事件的按钮
* @param container 展示刷新内容的容器，也就是被替换部分
* @param options 参数
*/
$(document).pjax(selector, container, options);
$(document).pjax("[data-pjax] a, a[data-pjax]", "#pjax-container");

/**
* 方法二： 直接对按钮监听，可以不用指定容器，使用按钮的data-pjax属性值查找容器
*/
$("a[data-pjax]").pjax();

/**
* 方法三： 常规的点击事件监听方法
*/
$(document).on("click", "a", $.pjax.click);
$(document).on("click", "a", function(event){
  // 通过closest完成事件委托
  var container = $(this).closest("[data-pjax-container]");
  $.pjax.click(event, container);
})
/**
* 表单提交
*/
$(document).on("submit", "form", function(event){
  var container = $(this).closest("[data-pjax-container]");
  $.pjax.submit(event, container);
})

// 加载内容到指定容器
$.pjax({url: this.href, container: "#main"});
// 刷新当前页面容器的内容
$.pjax.reload("#container");
```

options 默认参数说明

```
timeout  650    ajax超时事件(ms), 超时会执行默认的页面跳转，所以超时时间不应过短，一般不需要设置
push     true   使用window.history.pushState改变地址栏url(会添加新的历史记录)
replace  false  使用window.history.replaceState改变地址栏url(不会添加历史记录)
maxCache Length  20  缓存的历史页面个数（pjax加载前会缓存原来的页面内容，缓存加载后，其中的脚本会再次执行）
versionn          是一个函数，返回当前页面的pjax-version,即<meta http-equiv="x-pjax-version">标签内容。使用response.setHeader("X-PJAX-Version","")设置当前页面的不同版本号，可强制页面跳转而不是局部刷新。
scrollTo    0      页面加载后垂直滚动距离（与原页面保持一致可使过度更平滑）
type      "GET"    ajax的参数，http请求方式
dataType   "html"    ajax的参数，响应内容的Content-Type
container           用于查找容器的css选择器，[container]参数没有指定时使用
url      link.href    要跳转的连接 默认a标签的href属性
target   link         pjax事件参数e的relatedTarget属性，默认为点击a标签
fragment              使用响应内容的指定部分 （css选择器）
```

##### pjax 生效的情况

```
function handleClick(event,container, options){
  ...
  // 1. 点击事件的事件源不是a标签，使用a标签可以做到对旧版本浏览器的兼容，所以不建议使用其他标签注册事件
  if(link.tagName.toUpperCase() !== "A")
    throw "$.fn.pjax or $.pjax.click requires an anchor element";
  // 2. 使用鼠标滚轮点击（新标签页打开）
  // 点击超链接的同时按下 Shift | Ctrl|Alt|Meta(Windows[Windows键]， Mac(Cmd键))
  // 作用分别代表新窗口打开|新标签打开（不切换标签）|下载|新标签打开（切换标签）
  if(event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return
  // 3. 跨域（网络通讯协议，域名不一致）
  if(location.protocol!==link.protocol || location.hostname !== link.hostname)
    return
  // 4. 当前页面的锚点定位
  (link.href.indexOf("#")>-1 && stripHash(link)==stripHash(location))
    return
  // 5. 已经阻止元素发生默认行为（url跳转）
  if (event.isDefaultPrevented())
    return
  ...
  var clickEvent = $.Event("pjax:click");
  $(link).trigger(clickEvent, [opts]);
  // 6. pjax:click事件回调中已经阻止元素发生默认行为（url跳转）
  if(!clickEvent.isDefaultPrevented()){
    pjax(opts);
    event.preventDefault();
    $(link).trigger("pjax:clicked", [opts]);
  }
}
```

### 完成前端缓存的负载均衡操作，封装统一 ORM 库并配置离线包 manifest

#### ORM 对象关系映射（Object Relational Mapping）

是通过使用对象和数据库之间映射的元数据，将面向对象语言程序中的对象自动持久化到关系数据库中。

#### web 前端本地持久化的一个方案 - localforage

localforage 主要作为一个本地离线持久化工具，对本地一些图片或数据进行缓存，而不是每次刷新都要请求服务器。
localStorage 缺点，

1. 存储容量限制，大部分浏览器应该最多 5M
2. 仅支持字符串，如果是存储对象，还需`JSON.stringify`和`JSON.parse`方法相互转换
3. 读取是同步的，如果存储数据较大，例如一张重要图片 base64 格式存储，再读可能会有可感知的延迟时间
   localforage 的作用就是用来规避上面 localstorage 的缺点，同时保留 localstorage 的优点而设计的。
   至于如何规避：
   - IndexedDB
   - WebSQL
     优先使用`IndexedDB`存储数据，如果浏览器不支持，使用`WebSQL`，如果浏览器再不支持，则使用`localStorage`.
     API 和 localStorage 一样： get | set | remove | clear | length...
     ep:

```HTML
<label class="ui-button ui-button-warning" for="fileImg">上传图片</label>
<input type="file" id="fileImg" accept="image/gif, image/jpeg, image/png" hidden>
<p id="result"></p>
```

```JS
var eleResult = document.getElementById("result");
// 新建图片资源标签
var eleImg = document.createElement("img");

// 获取本地存储数据   异步执行
localforage.getItem("zxxImg", function(err, value){
  if(err==null && value){
    eleImg.src = value;
    eleResult.appendChild(eleImg);
  }
});
// 选择本地文件
var reader = new FileReader();
// 文件base64化，以便获知图片原始尺寸
reader.onload = function(event){
  if(!eleImg.src){
    eleResult.appendChild(eleImg);
  }
  var blob = URL.createObjectURL(new Blob([event.target.result]));
  eleImg.src = blob;
  localforage.setItem("zxxImg", blob);
}
// 选择文件对象
var file = null;
document.getElementById("fileImg").addEventListener("change", function(event){
  file= event.target.files[0];
  if(file.type.indexOf("image") == 0){
    reader.readAsArrayBuffer(file);
  }
})


// 常用方法
const getStorage = function(storkey, callback){
  callback = callback || function(){};
  localforage.getItem(storkey, function(err, value){
    if(err === null && value){
      callback(value);
    }
  })
}
const setStorage = function(storkey,storvalue,callback){
  callback = callback || function(){};
  // 存储
  localforage.setItem(storkey, storvalue, function(err){
    err && console.error(err);
    callback();
  })
}
```

### webpack-manifest

### lazyload
