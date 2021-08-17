# CSS 核心技巧

## OO CSS

面向对象布局
OO CSS 将页面可重用的元素抽象成一个类，用 Class 加以描述，而与其他应用的 HTML 即可看成是此类的一个实例

### 作用

- 1. 加强代码的复用以方便维护
- 2. 减少 css 体积
- 3. 提高渲染效率
- 4. 组件库思想、栅格布局可共用、减少选择器、方便扩展

### 注意事项

- 1. 不要直接定义子节点，应该把共性声明放到父类

```css
.mod .inner {
  ...;
} // .mod 下面的 inner
.inner {
  ...;
} // 不是很建议的声明
```

- 2. 结构和皮肤相分离

```html
<!-- 不推荐 -->
<div class="container simpleExt"></div>
<style>
  .container {
    ...
      // 控制结构的class;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  }
  .simpleExt {
    ...
      // 控制皮肤的;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  }
</style>

<!-- bad -->
<div class="container">
  <div class="mod"></div>
</div>
<!-- good -->
<div class="container mod"></div>
```

- 3. 容器和内容相分离
- 4. 抽象出可重用的元素，建好组件库，在组件库内寻找可用的元素组装页面
- 5. 往你想要扩展的对象本身追加 class 而不是他的父节点
- 6. 对象应保持独立性
- 7. 避免使用 ID 选择器，权重太高，无法重用
- 8. 避免位置相关的样式
- 9. 保证选择器相同的权重
- 10. 类名简短，清晰，语义化 OO CSS 的名字并不影响 HTML 语义化

`oocss.org`，官方项目参考

`Neat.css` 结合了`normalize.css`和`reset.css`

- 解决了 Bug，特别是低级的浏览器的常见 Bug
- 统一效果，但不盲目追求重置为 0
- 向后兼容
- 考虑响应式
- 考虑移动设备

```css
/* 防止宽度改变破坏布局 */
textarea {
  resize: vertical;
}
```

## CSS 后处理器

- 浏览器前置控制
- css 污染
- Autoprefixer

```js
var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer-core");
var mqpacker = require("css-mqpacker");
var csswring = require("csswring");
var less = require("gulp-less");
var path = require("path");

gulp.task("default", function() {
  var processors = [
    autoprefixer({
      browsers: ["last 2 version"],
    }),
    mqpacker,
    csswring,
  ];
  return gulp
    .src("./src/*.less")
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest("./dest"));
});
```

## CSS 绘制特殊图形

```css
.borders {
  width: 300px;
  height: 300px;
  background-color: red;
  border-radius: 100px;
  border-left: solid 15px yellow;
  border-right: solid 30px yellow;
  border-bottom: solid 30px green;
}
```

### 渐变轴：每个色标的推进已圆心为中心同心圆扩散

## CSS3 绘制 3D

## CSS 双飞翼布局

- position
- float
- 负布局

```css
.left {
  margin: -100%;
}
.right {
  margin: -rightWidth;
}
.midder .inner {
  padding: 0 leftWidth 0 rightWidth;
}
```

- 等高
- 盒子模型
- 清除浮动

## CSS 基本布局

## 圣杯布局

## 双飞翼布局

## 基于移动端的 px 和 rem

```css
/* 10倍数  10/16 */
html,
body {
  font: 0.625rem;
}
```

- 不同的 size, 不同的 DPR

```css
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
```

## 字体

- `font-family: sans-serif;`系统默认

## CSS ICON

`http://cssicon.space/#/`

## CSS HINT

- 浮动会耗性能，timelining
- `font-size`控制变化值在 10 个以内

## 网格布局

现代 Web 布局

- float
- inline-block
- display: table
- position (absolute 或 relative)
- Frameworks
- Flexbox
- CSS Grid Layout
- Box Alignment 【草案】

### CSS Grid System

#### Grid 计算公式

- `scw = (容器宽度-(m*(mc-1)))/mc` 单例宽度
- `cw = (scw*cs)+(m*(cs-1))` 列宽度
- scw: 指的是单例宽度
- m: 指的是列间距
- mc: 最大列数（一般是 12）
- cw: 列宽度
- cs: 列数（1~12）

```less
[class*="m--"]{
  padding-right: $gutter;
  padding-left: $gutter;
  @for $i from 1 through 12 {
    &.m--#{$i}{
      width: (80*$i + 20*($i-1))*1px;
    }
  }
}
```

```css
.cards {
  display: grid;
  /* 01 */
  /* 
  grid-template-columns: 500px 1fr 2fr;
  grid-template-rows: 200px 200px 200px;
   */
  /* 02 */
  /* 每一列多少宽 */
  grid-template-columns: 33.33% 33.33% 33.33%;
  /* 每个高 200 */
  grid-template-rows: 200px 200px 200px;
  /* 03 */
  grid-template-columns: repeat(3, 1fr);
  /* 04 指定fr的大小*/
  grid-auto-rows: 200px;
  /* 05 用200自动填充满 */
  grid-template-columns: repeat(auto-fill, 200px);
  /* 06 两个数比较 */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* 间距 */
  grid-gap: 20px;
}
/* 合并 */
.card:nth-child(1) {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  /* 
  grid-column: 2/4;
  grid-row: 1/3;
   */
  /* 
   grid-area: 1/2/3/4;
   grid-area: grid-row-start/grid-column-start/grid-row-end/grid-column-end
   */
}
```

## 色相

```html
<style>
  .btn {
    background: yellow;
    width: 100px;
    height: 100px;
    filter: hue-rotate(97deg);
  }
</style>
<div class="btn"></div>
```

## 流光字体

```html
<style>
  @keyframes hue {
    from {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(360deg);
    }
  }
  h1 {
    font-size: 120px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      cyan,
      blue,
      purple
    );
    animation: hue 3s linear infinite;
  }
</style>
<h1>sad静安寺快递费静安寺冷冻机房</h1>
```

## 分栏 css

```html
<style>
  .column {
    overflow: hidden;
    border: 1px solid #eee;
  }
  .column-left {
    height: 400px;
    background-color: #fff;
    position: relative;
    float: left;
  }
  .column-right {
    height: 400px;
    padding: 16px;
    background-color: #eee;
    box-sizing: border-box;
    overflow: hidden;
  }
  .resize-save {
    position: absolute;
    top: 0;
    right: 5px;
    bottom: 0;
    left: 0;
    padding: 16px;
    overflow-x: hidden;
  }
  .resize-bar {
    width: 200px;
    height: inherit;
    resize: horizontal;
    cursor: ew-resize;
    opacity: 0;
    overflow: scroll;
  }
  /* 拖拽线 */
  .resize-line {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 2px solid #eee;
    border-left: 1px solid #bbb;
    pointer-events: none;
  }
  .resize-bar:hover ~ .resize-line,
  .resize-bar:active ~ .resize-line {
    border-left: 1px dashed skyblue;
  }
  .resize-bar::-webkit-scrollbar {
    width: 200px;
    height: inherit;
  }
</style>
<div class="column">
  <div class="column-left">
    <div class="resize-bar"></div>
    <div class="resize-line"></div>
    <div class="resize-save">
      左侧的内容，左侧的内容，左侧的内容，左侧的内容
    </div>
  </div>
  <div class="column-right">右侧的内容，右侧的内容，右侧的内容，右侧的内容</div>
</div>
```

## 遮罩

```html
<style>
  .mask-image {
    width: 260px;
    height: 250px;
    -webkit-mask-image: url("./mask.png");
  }
</style>
<img src="./assets/bg.jpeg" width="800px" class="mask-image" />
```

## 遮罩调色

```html
<style>
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  input {
    padding: 0;
    border: none;
    position: absolute;
    width: 100%;
    height: 100%;
    mix-blend-mode: hue;
    cursor: pointer;
  }
</style>
```

```html
<style>
  img {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.6);
    background-blend-mode: darken;
    filter: brightness(80%) grayscale(20%) constrast(1.2);
  }
</style>
```

## banner

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }

  .ul {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    max-width: 200px;
    height: 500px;
    width: 200px;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    scroll-behavior: smooth;
  }

  /* mandatory: 通常在 CSS 代码中我们都会使用这个，mandatory 的英文意思是强制性的，表示滚动结束后，滚动停止点一定会强制停在我们指定的地方
proximity: 英文意思是接近、临近、大约，在这个属性中的意思是滚动结束后，滚动停止点可能就是滚动停止的地方，也可能会再进行额外移动，停在我们指定的地方 */

  .li {
    display: inline-block;
    scroll-snap-align: center;
    /* scroll-snap-align:end;
      scroll-snap-align: start; */
    height: 100%;
    flex-basis: 200px;
    flex-shrink: 0;
  }

  .li:nth-of-type(odd) {
    background-color: snow;
  }

  .li:nth-of-type(even) {
    background-color: skyblue;
  }
</style>
<body>
  <div class="ul">
    <div class="li">test1</div>
    <div class="li">test2</div>
    <div class="li">test3</div>
    <div class="li">test4</div>
    <div class="li">test5</div>
    <div class="li">test6</div>
    <div class="li">test7</div>
    <div class="li">test8</div>
    <div class="li">test9</div>
    <div class="li">test10</div>
  </div>
</body>
```
