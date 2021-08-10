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
    ... // 控制结构的class;;;;;;;;;;;;;;;;;;;;;;;
  }
  .simpleExt {
    ... // 控制皮肤的;;;;;;;;;;;;;;;;;;;;;;;
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
