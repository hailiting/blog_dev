# CSS格式化上下文 - Formatting Context
``Formatting Context``: 指页面中的一个渲染区域，并拥有一套渲染规则，他决定了子元素如何定位，以及与其他元素的相互关系和作用。他是W3C CSS2.1规范中的一个概念。
常见的Formatting Context有BFC、IFC、GFC和FFC.
## BFC 
BFC 全称为 ``块格式化上下文``（Block Formatting Context），是web页面的可视化CSS渲染出的一部分。
它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。
一个BFC由以下之一创建：
* 根元素或其他包含元素
* 浮动元素（元素float不是none）
* 绝对地位元素（position为absolute或fixed）
* 内联块（元素具有 display: inline-block）
* 表格单元格（display: table-cell, HTML表格单元格默认属性）
* 表格标题（display: table-caption, HTML表格标题默认属性）
* display: flow-root
* 具有overflow且值不是visible的块元素
* column-span: all 应当总是会创建一个新的格式化上下文，即便具有 column-span:all的元素并不被包裹在一个多列容器中。
* 一个块格式化上下文包括创建它的元素内部所有内容，除了被包含于创建新的块级格式化上下文的后代元素内的元素。
### BFC特性（解决的问题）
1. 使BFC内部浮动元素不会到处乱跑，解决父元素塌陷问题
2. 和浮动元素产生边界，两个相邻的块级盒子之间垂直向上的外边距会塌陷
  margin或只改问题【overflow:hidden】
#### 使BFC内部浮动元素不会到处乱跑
正常的文档流
![bfc01](./img/bfc01.png)
~~~html
<style>
* {margin: 0;padding: 0;}
body {padding: 20px;}
.out {padding: 10px;border: 2px solid #f00;background-color: #000;min-height: 20px;}
.in {height: 50px;background-color: #eeee;}
</style>
<div class="out">
<div class="in"></div>
</div>
~~~
加float或position 脱离普通文档流
![bfc02](./img/bfc02.png)
此时如果还希望让外层元素包裹住内层元素，就要让外层元素产生一个BFC.
![bfc03](./img/bfc03.png)
~~~html
<style>
* {margin: 0;padding: 0;}
body {padding: 20px;}
.out {padding: 10px;border: 2px solid #f00;background-color: #000;min-height: 20px;overflow: hidden;}
.in {width: 100%;height: 50px;background-color: #eeee;float: left;}
</style>
<div class="out">
<div class="in"></div>
</div>
~~~
#### 和浮动元素产生边界
![bfc04](./img/bfc04.gif)
~~~html
<style>
* {margin: 0;padding: 0;}
body {padding: 20px;}
div {border: 3px solid red;height: 100px;}
.left {min-width: 200px;margin-right: 20px;float: left;}
.right {border-color: blue;display: flow-root;}
</style>
<div class="left"></div>
<div class="right"></div>
~~~
## IFC
行内格式化上下文
一般用来解决: 元素垂直居中、多个文本元素行高不一致排列混乱
### IFC布局规则
* 子元素水平方向横向排列，并垂直方向起点为元素顶部
* 子元素只会计算横向样式空间，``padding, border, margin``，垂直方向的样式空间不会被计算->``padding, border, margin``；
* 在垂直方向上，子元素会以不同形式来对齐``vertical-align``;
* 能把一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框宽度是由包含块（containing box）和与其中的浮动来决定的。
* IFC中的``line box``一般左右贴紧其包含块，但float元素会优先排列。
* IFC中的``line box``高度由CSS行高计算规则来确定，同时IFC下的多个linebox高度可能会不同。
* 当一个line box超过父元素高度时，它会被分割成多个boxes，这些oxes分布在多个linebox中，如果子元素未设置强换行的情况下，inlinebox将不可分割，将会溢出父元素
#### 上下间距不生效，可以用IFC来解释
![ifc01](./img/ifc01.png)
~~~html
<style>
* {margin: 0;padding: 0;}
body {padding: 20px;}
.warp {border: 1px solid red;display: inline-block;}
.text {margin: 20px;border: #333;}
</style>
<div class="warp">
  <span class="text">text1</span>
  <span class="text">text2</span>
</div>
~~~
#### float元素优先排列
![ifc02](./img/ifc02.png)
~~~html
<style>
* {margin: 0;padding: 0;}
body {padding: 20px;}
.warp {border: 1px solid red;display: inline-block}
.text {margin: 20px;border: #333;}
.fl{float: left}
</style>
<div class="warp">
  <span class="text">text1</span>
  <span class="text">text2</span>
  <span class="text fr">text3</span>
  <span class="text">text4</span>
</div>
~~~
## GFC
GFC(``GridLayout Formatting Contexts``): 网格布局式上下文   
### GFC产生条件    
* display属性值设置为``grid``或``inline-grid``的容器
![gfc01](./img/gfc01.gif)
~~~html
<style>
* {margin: 0;padding: 0;}
body {padding: 20px;}
.warp {display: grid;grid-template-columns: 1fr 1fr 1fr;border: 2px solid #eee;background-color: #999;}
.warp>div {border: 2px solid #f00;background-color: #444;color: #fff;}
</style>
<div class="warp">
<div>div1</div>
<div>div2</div>
<div>div3</div>
<div>div4</div>
</div>
~~~
grid默认为4等分
![gfc02](./img/gfc02.gif)
~~~html
<style>
* {margin: 0;padding: 0;}
body {padding: 20px;}
.cube {display: grid;grid-gap: 2px;width: 300px;height: 300px;}
.cube div {border: 1px solid grey;}
.cube .g-1 {grid-column-start: 1;grid-column-end: 3;}
.cube .g-3 {grid-column-start: 2;grid-column-end: 4;grid-row-start: 2;grid-row-end: 3;}
</style>
<div class="cube">
  <div class="g-1"></div>
  <div class="g-2"></div>
  <div class="g-3"></div>
  <div class="g-4"></div>
  <div class="g-5"></div>
  <div class="g-6"></div>
  <div class="g-7"></div>
</div>
~~~
## FFC
FFC(``Flex Formatting Contexts``): 自适应格式化上下文 || 弹性格式化上下文
### FFC产生的条件
* ``display``属性值设置为``flex``或``inline-flex``容器
### FFC布局中，float, clear, vertical-align属性不会生效。

## 总结：
实现思路千千万，选择自己喜欢的。
通常弹性布局使用FFC，二维网格布局使用GFC