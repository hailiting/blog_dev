# CSS与数学
> css 使用translate 3d 开启  硬件加速
## 矩阵
指纵横排列的二维数据表格。
在数学中，矩阵(Matrix)是一个按照长方阵列排序的复数或实数集合。最早来自方程组的系数及常数所构成的方阵。这一概念是由19世纪英国数学家凯利首先提出。
由mxn个数$a_{ij}$
~~~
A=[
  a_{11} a_{12} a_{13} ... a_{1n} 
  a_{21} a_{22} a_{23} ... a_{2n}
  ...
  a_{m1} a_{m2} a_{m3} ... a_{mn}
  ]
~~~
这个m*n个数称为矩阵A的元素，简称元，数$a_{ij}$位于矩阵A的第i行第j列，称为矩阵A的(i,j)元，以数$a_{ij}$元的矩阵可纪为($a_{ij}$)或$(a_{ij})_{mxn}$，m x n矩阵A也纪做 $A_{mn}$

### CSS在矩阵中的应用
``matrix()``和``matrix3d()``
#### ``transfom``原理 - 矩阵
* ``skew`` 斜拉
* ``scale`` 缩放
* ``rotate`` 旋转
* ``translate`` 位移

##### 直接使用matrix，省去浏览器翻译过程
``transform: matrix(a,b,c,d,e,f);`` 改变值，实现上面一样的效果。
``transform-origin``: 改变矩阵变化的中心位置。
~~~
[
  a c e
  b d f
  0 0 1
]
~~~
### CSS transform matrix使用
#### 2D变换
1. 平移 translate
~~~
transform: translate(x,y);
transform: matrix(1,0,0,1,x,y);
~~~
2. 缩放scale
~~~
transform: scale(x, y);
transform: matrix(x, 0,0,y,0,0);
~~~
3. 旋转 rotate
~~~
transform: rotate(x);
transform: matrix(cos(x),-sin(x),sin(x),cos(x),0,0);
~~~
4. 拉伸 skew
~~~
transform: skew(x,y);
transform: matrix(1, tan(y), tan(x), 1, 0, 0);
~~~
#### 3D变换
1. 平移 translate
~~~
transform: translate(x,y,z);
transform: matrix(1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1)
~~~
2. 缩放scale
~~~
transform: scale(x,y,z);
transform: matrix(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
~~~
3. 旋转 rotate
~~~
transform:rotate(x,y,z,a)
transform:matrix(a,b,c,0,d,e,f,0,g,h,i,0,0,0,0,1)
| a d g 0 |
| b e h 0 |
| c f i 0 |
| 0 0 0 1 |

a=1-2.(y²+z²).sin²(a/2)
b=2.(x.y.sin²(a/2)+z.sin(a/2).cos(a/2))
c=2.(x.z.sin²(a/2)-y.sin(a/2).cos(a/2))

d=2.(x.y.sin²(a/2)-z.sin(a/2).cos(a/2))
e=1-2.(x²+z²).sin²(a/2)
f=2.(y.z.sin²(a/2)+x.sin(a/2).cos(a/2))

g=2.(x.z.sin²(a/2)+y.sin(a/2).cos(a/2))
h=2.(y.z.sin²(a/2)-x.sin(a/2).cos(a/2))
i=1-2.(x²+y²).sin²(a/2)
~~~
## CSS分层与面向对象
### 何为分层
常见的分层有：
* SMACSS
* BEM +
* SUIT
* ACSS +
* ITCSS
#### SMACSS(Scalable and Modular Architecture for CSS - 可扩展的模块化架构css)
把项目分为5个层次来划分css
* Base设定标签元素的预设值 eg: html{} input[type=text]{}
* Layout这个网站的"大架构"的外观 eg: #header{margin: 30px 0;}
* Module 应用在不同页面公共模块 eg: .button{}
* State 定义元素不同的状态 eg: .nav-main{}
* Theme 画面上所有 主视觉 的定义 eg: border-color, background-image
#### BEM
~~~
<ul class="menu">
  <li class="menu_item">...</li>
  <li class="menu_item menu_item_current">...</li>
  <li class="menu_item">...</li>
</ul>
~~~
#### ACSS (A-> Atoms)
~~~
.m-10{ 
  margin: 10px;
}
.w-50{
  width: 50%;
}
~~~
### 为什么要分层
* CSS有语义化的命令约定和CSS层的分离，将有助于它的可扩展性，性能的提高和代码的组织管理
* 大量的样式，覆盖、权重和很多``!important``，分好层可以让团队命名统一规范，方便维护。
* 有责任感的去命名你的选择器。

