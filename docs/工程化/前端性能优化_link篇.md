# 前端性能优化_link篇.md
## link标签``rel="alternate"``属性的作用及用法
1. 可用于将PC版页面指向移动版页面，将移动版页面指向PC版页面，这样有利于搜索引擎，对不同设备提供不同类型的页面
~~~
<link rel="alternate" media="only screen and (max-width:640px)" href="http://m.mbile.com">
~~~
移动版页面应添加
~~~
<link rel="canonical" href="https://www.pc.com" />
~~~
2. 用于不同css样式表之间切换控制效果
~~~
<link href="default.css" rel="stylesheet" type="text/css" title="default">
<link href="red.css" rel="stylesheet" type="text/css" title="red">
<link href="green.css" rel="stylesheet" type="text/css" title="green">
~~~
``rel=alternate``页面默认不会渲染，可以作为后备样式，对link使用disabled即可进行切换，无延迟。但会提前下载，浪费宽带，可以在必须的场景下使用。
## Pre
### 什么是Pre技术
- 预加载技术，指在不影响当前页面情况下，浏览器预加载资源的性能优化方案
#### ``dns-prefetch``
这个是用的最广泛的，用于告知浏览器预先获取指定域名的DNS，以便在使用时减少对DNS查找的时间。
~~~
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//dnsXXX.com" />
~~~
#### ``preconnect``
预连接，和``dns-prefetch``相似，但更进一步，不仅要求解析指定域名的DNS，还需要预先与服务器握手及TLS协商【如果使用HTTPS的话】
~~~
<link rel="preconnect" href="//xxx.com" crossorigin="anonymous" />
~~~
因为会与服务器握手，因此要确定"是否跨域"，带``crossorigin``属性，以告知浏览器如何处理跨域及cookie。
#### ``prefetch``
与``preconnect``有同样的参数【rel, href, crossorign】，自己本身还有as，用于告知浏览器资源类型，这个类型和MIME不一样，是统称，如： ``as="image"``, ``as="script"``, ``as="html"``等。
~~~
<link rel="prefetch" href="xxx.como/xx.js" crossorgin as="script" />
~~~
使用prefetch，整个资源会被加载，却不会被浏览器预处理或执行，资源只是被提前加载，并缓存起来，以便将来使用。
#### ``prerender``
下载的是HTML，与prefetch相同的是告诉浏览器下载整个资源，不同的是，prerender会告诉浏览器，下载资源(HTML)并解析、执行它，包括被解析资源的子资源，这意味着会下载该HTML中的图片，样式，脚本等等，prerender没有as属性，只是HTML
~~~
<link rel="preconnect" href="xxx.com" /> 
~~~
预渲染的条件是不容许对当前页面造成影响，浏览器会把预渲染的页面visibilityState属性为hidden。
因为是预渲染，并不是真正的展示页面，所以消耗了不必要的资源，而且chrome58把这个功能去了。
#### ``proload``
prefetch 与preload不同之处：
- 1. prefetch的优先级很低，低到浏览器可以不加载
- 2. prefetch的优先级很高，浏览器一定要加载
- 3. prefetch加载的资源用于``将来``的某个页面，这意味着它可能不会被用到
- 4. Preload加载的资源用于``当前``页面       
~~~
<link rel="preload" href ="xxx.com" crossorigin as="image" />
~~~
### 总结
Pre技术，除了``preload``，其他Pre都可能不被浏览器执行，这不是兼容性问题，而是Pre本身就不是浏览器必须的行为，浏览器会根据一定的策略来决定是否Pre相应的资源或操作，比如：CPU, 内存等的占优率。