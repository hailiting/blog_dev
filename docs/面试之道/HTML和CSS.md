# HTML和CSS
## 1 浏览器内核
* IE: trident 内核  [ˈtraɪdnt]
* Firefox: gecko 内核 [ˈɡekəʊ]
* Safari: webkit
* Opera: 以前是 presto，现在用GoogleChrome的Blink内核
* Chrome: Blink(基于webkit,Google和operaSoftware共同开发)
## 2 ``<!DOCTYPE html>`` 
告诉浏览器用XHtml还是html规范
## 3 Quirks(怪异盒模型) and  Standards(标准盒模型)
### 区别
a 在W3C标准里，元素的宽高不包含padding和border,而怪异盒模型是包含的。
b 在Standards下，span是设置不了宽高的，而怪异模式下是可以设置的
c 在标准模式下，一个元素的宽高是由父级决定的，如果父级没有百分比高度，则子元素设置的百分比会失效
d ``margin: 0 auto;``在标准模式下会生效，在quirks下会失效
...
## 4 div + css 布局与table布局有什么优点
a 改变（UI）方便，只需改css
b 页面加载速度更快，结构化清晰，页面显示简洁
c 表现与结构分离
s 易于seo
## 5 img的alttitle异同？strong与em的异同
a alt(alt text):不能显示图片的时候用文字替换（ie在没有title下把alt当成tool tip）
b title(tool tip):为设置该属性元素提供建议性信息

a strong: 粗体强调标签，表示内容的重要性
b em: 斜体强调标签，更强烈的强调，表示内容的强调点

## 6 渐进增强与优雅降级
一个是从满足基本需求，针对低版本浏览器进行构建页面，减少交互等，然后针对高级浏览器进行效果、交互等功能的更好体验
一个是构建完美的功能，在针对低版本浏览器兼容

## 7 为什么利用多个域名来存储网站资源会更有效？
a CDN缓存更方便
b 突破浏览器并发限制
c 节约cookie宽带
d 节约主域名的连接数，优化页面的响应速度
e 防止不必要的安全问题
## 8 网页标准和标准制定机构的重要性
a 让web发展的更健康
b 开发者按照标准开发，降低开发难度及开发成本
...
## 9 cookie, sessionStorage和loacalStorage的区别
sessionStorage 会话级别的储存
localStorage 持久化的本地储存
cookie 多用于和服务器之间的交互（做为HTTP规范而存在的）
## 10 src与href的区别
a src用于替换当前元素，将指向内容嵌到文档中即当前标签的所在位置
  当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到该资源加载、编译、执行完毕。（这也是为什么将js脚本放底部而不是头部的原因）
b href用于当前文档和引用资源之间确立联系（浏览器在下载资源时不会停止当前文档的处理）
## 11 网页制作会用到哪些图片格式
png-8, png-24, jpeg, gif, svg, Webp
Webp: 减少文件大小，加快传输速度，是所有格式里最快的（目前为止）
## 12 微格式（microformats）
建立在已有的、被广泛采用的标准基础之上的一组简单的、开放的数据格式。是把语义嵌入到HTML以便分离式开发而制定的简单约定，是兼顾人机可读性的数据表达方式，对web网页进行语义化注解的方法。
其实就是在现有的(x)html元素添加元数据和其他属性，增强语义化
~~~
<a href="xxx" rel="homepage">this is homepage</a>
class = "fn"  // 正式名称
class ="org" // 组织
class ="tel"  // 电话
classs ="url"  // 链接
~~~
## 13 一次js请求通常情况下有哪些地方会有缓存处理
DNS缓存， CDN缓存，浏览器缓存，服务器缓存
(DNS=>域名解析， CDN=>内容分发网络)
## 14 多图片网站优化有哪些解决方法
a 图片懒加载，即在页面可视区域增加滚动事件，判断图片位置与浏览器顶端的距离和页面的距离，前者小于后者，优先加载
b 如果是banner幻灯片或相册等，使用预加载，优先加载当前图片的前一张和后一张
c css图片优先使用CSSsprite, SVGsprite, Iconfont, Base64等
d 加载大图时，用最小尺寸缩略图站位（提高用户体验）
e 压缩图片大小（服务端根据参数压缩到特定大小）
## 15 语义化
去掉或样式丢失的时候，能让页面呈现清晰的结构
## 16 做好SEO前端能做什么
a 了解搜索引擎如何抓取网页和如何搜索网页的
b Meta标签优化：主要包括(Title, Description, Keywords)，还有其他的隐藏文字比如Author(作者)， Category(目录), Language(编码语种)等
c Meta中关键字应用 一般在5个上下，关键词本身的密度(Density)，相关度(Relavancy)，突出度(Prominency)等等
d 了解主要的搜索引擎，比如：AOL网页搜索用的是Google技术，MSN用的是Bing技术。
c 合理的标签使用 
...
## 17 对DOM设置他的css
a 外部样式引用
b 内部样式 放``<style>``标签里
c 直接写在dom元素内部
## 18 css有哪些选择器
a 派生选择器（html标签申明）
b id选择器
c 类选择器
d 属性选择器（css2, ie6不支持）
e 后代选择器
f 群组选择器
## 19 使一个Dom元素不显示有哪些方法
a display: none
b visibility: hidden;
c width: 0; height: 0;
d z-index: -1000
## 20 超链接访问后hover样式不出现是为什么，怎么解决
a 被打击访问过的超链接样式不具有hover和active了
b 改变css属性的排列顺序: L-V-H-A(link, visited, hover, active)