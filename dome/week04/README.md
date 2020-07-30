# 第四周实战
- 1. 根据雅虎军规将页面CDN预加载等属性配置完备
- 2. 扩展新组件星星点赞组件，首页完成直出并利用Pjax完成SPA
- 3. 完成前端缓存的负载均衡操作，封装统一ORM库并配置离线包manifest
- 4. 使用webpack4对全部静态资源优化，并能根据上线配置动态配置CDN
- 5. lazyLoad.js重新优化静态文件分发器，使静态资源达到并行最大化
- 6. 引入完整的页面监控脚本，完整分析当前页面性能瓶颈


## 雅虎军规
1. 尽量减少HTTP请求数
2. 减少DNS查询
  2.1 域名预解析，提升网页速度
  ~~~
  // content 开启 on  关闭  off
  <meta http-equiv="x-dns-prefetch-control" content="on">
  // 强制的DNS预先获取
  <link rel="dns-prefetch" href="//g.alicdn.com" />
  <link rel="dns-prefetch" href="//gm.mmstat.com" />
  ...
  ~~~
3. 避免重定向
重定向用301和302状态码（301是永久重定向，302是暂时重定向）
~~~
HTTP/1.1 301 Moved Permanently
Location: http://example.com/newUri
Content-Type: text/html
~~~
重定向会拖慢用户体验，在用户和HTML文档之间插入重定向会延迟页面上的所有东西，页面无法渲染，组件无法开始下载，直到HTML文档被送达到浏览器。
替代方案：
  - 如果两个代码路径都在相同的服务器上： 用``Alias``和``mod_rewrite``
  - 不同域名变化而产生的重定向：可以创建一条CNAME（创建一个指向另一个域名的DNS记录作为别名），结合``Alias``或``mod_rewrite``指令
4. 让Ajax可缓存
  - Gzip组件
    ~~~
    Accept-Encoding: gzip, deflate, sdch
    ~~~
  - 减少DNS查询
  - 压缩JavaScript
  - 避免重定向
  - 配置ETags
  设置 Expires、 Cache-Control http请求头
5. 延迟加载组件
6. 预加载组件
~~~
<link rel="prefetch" href="page2.html">
<link rel="prefetch" href="spirst.png">
<link rel="prefetch alternate stylesheet" title="Designed for Mozilla" href="index.css">
<link rel="next" href="2.html">
~~~
7. 减少DOM元素的数量
8. 跨域分离组件
9. 尽量少用iframe
iframe优点： 
  - 引入缓存的第三方内容，比如标志和公告
  - 安全沙箱
  - 并行下载脚本
iframe缺点：
  - 代价高，即使是空的iframe
  - 阻塞页面加载
  - 非语义
10. 杜绝404
11. 避免使用css表达式
12. 选择``<link>``舍弃@import
13. 避免使用滤镜
  filter
14. 把样式表放到顶部
15. 去除重复脚本
16. 尽量减少DOM访问
17. 用智能的事件处理器
代理 用父级找下面的元素
window.onready 代替 window.onload
18. 把脚本放底部
19. 把JavaScript和css放到外面
20. 压缩JavaScript和css
21. 优化图片
22. 优化css sprite
23. 不要用HTML缩放图片
24. 用小的可缓存的favicon.ico (P.S. 收藏夹图标)
25. 给Cookie减肥
26. 把组件放在不包含cookie的域下
27. 保证所有组件都小于25k
28. 把组件打包到一个复合文档里
29. Gzip组件
30. 避免图片src属性为空
31. 配置ETags
32. 对Ajax用GET请求
33. 尽早清空缓冲区(Bigpipe)
34. 使用CDN(内容分发网络)
35. 添加Expires或 Cache-Control HTTP头


