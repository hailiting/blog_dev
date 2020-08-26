# CSS面试题
css虽然编写简单，但初期的结构设计，后期的维护都比较麻烦。
## 1. OO CSS及CSS分层理论SMACSS、BEM、SUIT、ACSS、ITCSS的概念
### OOCSS
bootstrap就是OOCSS典型的实践。即面向对象css。【OOSCSS->可伸缩的，面向对象CSS,是OOCSS的变异体，进化体】。
OOCSS将页面可重用元素抽象成一个类，用Class类名加以描述，而与其对应的HTML可以看做这个class的实例
~~~
// css写法
.title-1{
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  fonnt-weight: bold;
  color: #333;
}
// OOCSS写法
.bb-c{
  border-bottom: 1px solid #ccc;
}
.f16{
  font-size: 16px;
}
.bold{
  font-weight: bold;
}
.c333{
  color: #333;
}
// html
<div class="f16 bold c333 bb-c">标题</div>
》》》》为简化html，并用OOCSS方法，引用scss 即OOSCSS
%bb-c{
  border-bottom: 1px solid #ccc;
}
%f16{
  font-size: 16px;
}
%bold{
  font-weight: bold;
}
%c333{
  color: #333;
}
.title-1{
  @extend %bb-c;
  @extend %f16;
  @extend %bold;
  @extend %c333;
}
<div class="title-1">测试OOSCSS</div>
~~~
缺点： 
- 样式和html耦合太紧
- 可能有一堆css，缺没有被用到
- 设置不合理，会难以维护        
优点：
- 强调重用，减少css代码
- 加载器简介
- 可扩展
- 风格和内容分离，内容和容器分离
- 有语义的类明和逻辑性强的层次关系
- 有利于seo
- 可扩展的标记和css样式，有更多的组件可以放到库中，而不影响其他组件
## 2. 双飞翼布局的实现思路
详见[重温双飞翼布局和圣杯布局](./重温双飞翼布局和圣杯布局.md)
### 2.1 实现上下左右居中布局
详见[实现上下左右居中布局](./实现上下左右居中布局.md)

## 3. CSS3绘制特殊图形的技巧
详见[CSS3绘制特殊图形的技巧](./CSS3绘制特殊图形的技巧.md)
## 4. 描述网页渲染阶段的意义，并描述在开发中如何减少或避免网页重排和重绘
详见[网页渲染过程与重绘重排](../工程化/网页渲染过程与重绘重排.md)
## 5. 什么是CSS Houdini，及应用场景
## 6. BFC, IFC, GFC, FFC具体描述和应用场景
详见[CSS格式化上下文](./CSS格式化上下文.md)

## 7. 写出能监测陀螺仪变化的事件
* ``deviceorientation`` 设备的物理方向信息，表示为一系列本地坐标系的旋转。
* ``devicemotion`` 提供设备的加速信息
* `compassneedscalibrion`用于通知web站点使用罗盘信息校准上述事件
## 8. Next Css书写规则
## 9. 解释预处理器和前处理器的作用和实现方式
* 预处理器处理特定格式源文件到目标css的处理程序
* 前处理器是对css进行压缩以及浏览器之间的兼容处理
* Post CSS是当前比较好去css处理器
### webpack
~~~javascript
var path=require("path");
module.exports = {
  context: path.join(__dirname, "app"),
  entry: "./app",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loadeer: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function(){
    return [require("autoprefixer")]
  }
}
~~~
### gulp
~~~javascript
var gulp=require("gulp");
gulp.task("css", function(){
  var postcss = require("gulp-postcss");
  return gulp.src("app/**/*.css")
          .pipe(postcss([require("autoprefixer")]))
          .pipe(gulp.dest("dist/"));
})
~~~
### Grunt
~~~javascript
module.exports = function(grunt){
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require("autoprefixer")()
        ]
      },
      dist: {
        src: "app/**/*.css",
        expand: true,
        dest: "dist"
      }
    }
  });
  grunt.loadNpmTasks("grunp-postcss");
}
~~~
## 10. 写出一个全景图【理清实现思路】