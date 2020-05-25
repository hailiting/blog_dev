# PWA初探
js13kpwa 为 MDN 例子
## PWA介绍
PWA(Progressive web apps, 渐进式Web应用)：运用现代的WebAPI以及传统的渐进式增强策略来创建跨平台的Web应用程序。（具有与原生应用相同的用户体验）
### 优势
PWA可被发现，易安装，可理解，独立于网络，渐进式，可重用，响应性和安全。
* 减少应用安装后的加载时间：用ServiceWorkers来进行缓存，以此来节省宽带和时间
* 当应用更新时，可以仅仅更新发生改变的那部分内容。
* 外观和使用感受与原生平台更加融为一体——应用可放置在主屏幕，可以全屏运行 等
* 凭借系统通知和推送消息与用户保持连接，对用户产生更多的吸引力，并提高转换效率
### 什么使应用成为PWA

``ServiceWorker``,
``Manifest``,
``Push``,
``Notification``,
``A2HS``

PWA不是使用一种技术创建的，而是代表构建Web应用程序的新理念，涉及一些特定的模式，API和其他功能。
当一个程序满足某些要求的时候就可以视为PWA，或实现给定功能（离线工作，可安装，易于同步，可推送通知等），则可视为PWA.
可以用工具粗略的检测网站指标：``Lighthouse``(谷歌插件)。
在线生成PWA: ``https://www.pwabuilder.com/``;
### 成为PWA应用需要以下关键原则特点：
* Discoverable: 内容可通过搜索引擎发现
* Installable: 可以出现在设备的主屏幕上
* Linkable: 可用URL来分享它
* Network independent: 可在离线状态或网速很差的情况下运行
* Progressive: 在老板浏览器可以使用，在新版浏览器可以使用全部功能
* Re-enageable: 无论何时有新的内容都可发送通知 
* Responsive: 在任何有屏幕和浏览器的设备上都可以使用——包括手机，平板电脑，笔记本，电脑，冰箱等
* Safe: 用户和应用之间的连接是安全的，可以阻止第三方访问你的敏感数据


## PWA结构
### 应用的架构
渲染网站主要有两种方法-》在服务器上 或 在客户端上。
* 服务器端渲染(SSR)：在服务器上渲染网页，因此首次加载会更快，但在不同页面之间导航需要下载新的HTML，能在浏览器中运行良好，但它收到加载速度的制约，因而带来可感知的性能延迟-》加载一个页面需要和服务器之间一次往返。
* 客户端渲染(CSR)：允许在导航到不同页面时几乎立即在浏览器中更新网站，但在开始时需要更多的初始化下载和客户端上的额外渲染。首次访问慢，后续访问快。

将SSR和CSR混合使用可获得最佳的结果-》在服务器上渲染网页，缓存其内容，然后在客户端需要时更新渲染。由于SSR，第一页加载很快。因为客户端可以仅使用已更改的部分重新渲染页面，所以页面之间的导航是平滑的。（app shell）
#### App shell(程序的外壳)
即加载资源（缓存到本地的-未缓存的去请求）以尽快的绘制最小（或最基础）的用户界面。



### ServiceWorker生命这期
install => waiting => acivate => fetch
### ServiceWorker两大禁忌
1， sw.js要使用相同的名字，因为sw.js本身就在html里，html会被缓存到cache，这是一个死循环，永远都不会用到最新的js；
2，不要给sw.js设置缓存，理由同1
### 新的sw需要接管页面的方法
sw不会通过页面刷新或简单的切换页面更新的，可以通过skipWaiting强制更新
#### 一：skipWaiting
~~~
self.addEventListener("install", event=>{
  // 让新的SW插队，强制令他立刻取代老的sw
  self.skipWaiting()
})
~~~
缺点：像断网或网络不顺畅或采用CacheFirst之类的缓存策略的时候，当老的sw在请求了一半资源，突然发现有新的sw，老的被干掉，新的接管，给页面添加了很多不稳定因素。
#### 二：skipWaiting+刷新
在注册sw的地方，通过controllerchange事件来得知控制当前页面的sw是否发生变化
~~~
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/js13kpwa/sw.js", {
    scope: "."
  }).then(function(registration){
    console.log("pwa registered", registration);
  });
  let refreshing = false; // 避免无限刷新
  navigator.seviceWorker.addEventListener("controllerchange", function(event){
    // 或者直接刷新
    // window.location.reload();
    // if(refreshing){
    //   return;
    // }
    // refreshing = true;
    // window.location.reload();
    
    console.log("Controllerchange, ServiceWorker: ", event);
    navigator.serviceWorker.controller.addEventListener("statechange",function(){
      console.log("statechange: ", this.state);
      if(this.state==="activated"){
        document.getElemeentById("offlineNotification").classList.remove("hidden");
      }
    })
  })
}
~~~
#### 三：给用户一个提示
给用户一个提示，由用户点击更新SW，并引发刷新。
大致流程：
1：浏览器检测到存在新的（不同的）sw，安装并让它等待，同时触发updatefound事件
2：监听事件里弹出一个提示信息，询问用户要不要更新sw
3：如果用户确认，则向处在等待的sw发送消息，要求其执行skipWaiting并取得控制权（需要使用postMessage）
4：因为sw变化而触发了controllerchange事件，在这个事件上刷新即可

##### 第二步
~~~
function emitUpdate(){
  var event = document.createEvent("Event");
  // 发送名为"sw.update"的一个事件来通知外部
  event.initEvent("sw.update", true, true);
  window.dispatchEvent(event);
}
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("/service-worker.js").then(function(reg){
    if(reg.waiting){
      emitUpdate();
      return;
    }
    reg.onupdatefound = function(){
      var installingWorker = reg.installing;
      installingWorker.onstatechange=function(){
        switch(installingWorker.state){
          case "installed":
            if(navigator.serviceWorker.controller){
              emitUpdate();
            }
            break;
        }
      }
    }
  })
  .catch(function(e){
    console.error(e)
  })
}
~~~
##### 第三部
~~~
// 用户点击事件
try{
  navigator.serviceWorker.getRegistration().then(reg=>{
    reg.waiting.postMessage("skipWaiting");
  })
} catch(e){
  window.location.reload();
}
~~~
~~~
// sw.js
self.addEventListener("message", event=>{
  if(event.data ==="skipWaiting"){
    self.skipWaiting();
  }
})
// controllerchange 
~~~


## 通过ServiceWorkers让PWA离线工作
## 让PWA易于安装
header
~~~
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta
      content="width=device-width,initial-scale=1,user-scalable=no"
      name="viewport"
    />
    <meta
      name="description"
      content=""
    />
    <meta
      name="keywords"
      content=""
    />
    <link rel="shortcut icon" href="zg.ico" type="image/x-icon" />
    <link rel="manifest" href="manifest.json" />
    <!-- Standard iPhone -->
    <link rel="apple-touch-icon" sizes="57x57" href="static/logo/57.png" />
    <!-- Retina iPhone -->
    <link rel="apple-touch-icon" sizes="114x114" href="static/logo/114.png" />
    <!-- Standard iPad -->
    <link rel="apple-touch-icon" sizes="72x72" href="static/logo/72.png" />
    <!-- Retina iPad -->
    <link rel="apple-touch-icon" sizes="144x144" href="static/logo/144.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="format-detection" content="telephone=no,address=no" />
    <meta name="apple-mobile-web-app-status-bar-style" content="white" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="referrer" content="no-referrer" />
    <title></title>
    <script src="https://file.51meeting.com/sit/services.js"></script>
    <script>
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("./service-wroker.js")
          .then(registration =>
            console.log(
              "ServiceWorker 注册成功！作用域为: ",
              registration.scope
            )
          )
          .catch(err => console.log("ServiceWorker 注册失败: ", err));
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      !(function(x) {
        function w() {
          var v,
            u,
            t,
            tes,
            s = x.document,
            r = s.documentElement,
            a = r.getBoundingClientRect().width;
          if (!v && !u) {
            var n = !!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);
            v = x.devicePixelRatio;
            tes = x.devicePixelRatio;
            (v = n ? v : 1), (u = 1 / v);
          }
          if (a >= 640) {
            r.style.fontSize = "40px";
          } else {
            if (a <= 320) {
              r.style.fontSize = "20px";
            } else {
              r.style.fontSize = (a / 320) * 20 + "px";
            }
          }
        }
        x.addEventListener("resize", function() {
          w();
        });
        w();
      })(window);
    </script>
  </body>
</html>

~~~
### A2HS(Add to Home screen)
例子：
不依赖浏览器，不必每次都弹出A2HS的banner，由用户控制，点击按钮提示安装
~~~
let installPromptEvent;
// 监听beforeinstallprompt事件，浏览器触发A2HS时会执行
window.addEventListener("beforeinstallprompt",(e)=>{
  // 阻止自动提示
  e.preventDefault();
  // 储存事件对象，方便在之后的按钮事件中手动触发
  installPromptEvent = e;
})
// ui 上的按钮点击事件
installBtn.addEventListener("click", (e)=>{
  // 弹出A2HS
  installPromptEvent.prompt();
  installPromptEvent.userChoice.then((choiceResult)=>{
    if(choiceResult.outcome==="accepted"){
      console.log("accepted");
    } else {
      console.log("refuse");
    }
    installPromptEvent = null;
  })
})
~~~


## 推送和通知功能
这是两个api

### 推送的原理
## 渐进式加载