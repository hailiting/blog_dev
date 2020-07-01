# 知识点
1. 使用``X-Tag``封装点赞插件``<x-praise></x-praise>``;
2. 使用Glup编译koa2源代码并能监控源代码变化自动编译；
3. 使用webpack配置上线版本、开发版本配置文件，并能监控文件的变化自动刷新浏览器；
4. 使用webpack能够对css、js进行编译压缩打包合并并生成MD5;
5. 去掉System.js，利用webpack进行文件引用（同时提取公共文件成独立JS包）
6. 将编译后的文件能按照Chunk规律分发静态文件并编译进Swig;

## ``X-Tag``是什么
他是一个JavaScript库，具体用法：
~~~
// html
<body>
  <x-clock></x-clock>
</body>
<script src="./x-tag-raw.js"></script>
<script src="index.js"></script>
// index.js
xtag.create("x-clock", class extends XTagElement{
  connectedCallback(){
    this.start();
  }
  start(){
    this.update();
    this._interval = setInterval(()=>this.update(), 1000);
  }
  stop(){
    this._interval = clearInterval(this._data.interval);
  }
  update(){
    this.textContent = new Date().toLocaleTimeString();
  }
  "tap::event"(){
    if(this._interval) this.stop();
    else this.start();
  }
})
~~~