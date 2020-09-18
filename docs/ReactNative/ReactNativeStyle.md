# ReactNative 布局

## 样式布局基础

- 声明和使用样式

```
// 声明
var styles= StyleSheet.create({
    base: {
        width: 38,
        height: 38,
    },
    background:{
        backgroundColor: '#222222',
    },
    active: {
        borderWidth: 2,
        borderColor: '#00ff00',
    }
})
// 使用
// 1, 引用styles
<Text style={styles.base}>
// 2, 数组形式引用
<View style={{styles.base, styles.background}}>
// 3, 直接使用
<View style={{width: 100, height: 100}}>
// 4, 混合
<View style={[styles.base, {position:'relative', top: 50, left: 50}]}>
```

- 布局单位(不能使用 px 百分比 只能用 pt-默认是 pt)
  若要使用百分比，用 Dimensions

```
import Dimensions from 'Dimensions';
const {
    width, height
} = Dimensions('window);
```

- 盒子模型
- 定位模式

### Flex 布局相关

`flex: number`  
宽度 = 弹性宽度\*(flex-grow/sum(flex-grows))  
`flexDirection: enum('wrap','nowrap','wrap-reverse')`  
flex-wrap 属性定义：一条轴线排不下的时候，如何换行  
`alignItems: enum('flex-start','flex-end','center','stretch')`  
align-items 属性定义：项目在交叉轴上如何对其  
`alignSelf: enum('auto','flex-start','flex-end','center','stretch')`  
容许单个项目有与其他项目不一样的对齐方式，可覆盖
`justifyContent: enum(flex-start, flex-end, center, space-between, space-around)`
定义项目在主轴上的对齐方式

### 定位

`position: absolute/relative`  
`top:`  
`left:`  
`bottom:`  
`right:`

### 阴影

`shadowColor`  
`shadowOffset`  
`shadowOpacity`  
`shadowRadius`

### 图片相关属性

`resizeMode: enum('cover', 'contain', 'stretch', 'repeat(ios)','center')`

> cover: 等比例缩放，图片完全覆盖甚至超出容器，容器中不留任何空白  
> contain: 等比例缩放，图片完全包裹在容器中，可能会会有空白  
> stretch: 图片会被拉伸，宽高填满容器  
> repeat: 重复平铺图片直到填满容器，仅 iOS  
> center: 居中不拉伸  
> `overflow: enum('visible','hidden')`  
> `tintColor: 着色，rgb字符串类型`  
> `opacity: 透明度`

### 字体相关

`color: 字体颜色`  
`fontFamily: 字体族`  
`fontSize: 字体大小`  
`fontStyle: enum('normal', 'italic(倾斜)') 字体样式`  
`fontWeight: enum(normal,bold, 100, 200...)`  
`letterSpacing 字符间隔`
`lineHeight: 行高`
`textAlign: enum(auto, left, right, center, justify(调整使全行排满)) 字体对其方式`
`textDecorationColor: 修饰线的颜色`
`textDecorationLine: 修饰字体`
`textDecorstionStyle: enum(solid, double, dotted, dashed)线的类型`
`writingDirection: enum('auto', 'ltr', 'rtl')`
`overflow: enum('visible', 'hidden')`
使用`numberOfLines`属性设置文本长度限制

```
<Text numberOfLines={5}>
 ....
</Text>
```

### 边框相关

`borderStyle`
`borderWidth`
`borderTopWidth`
`borderBottomWidth`
`borderLeftWidth`
`borderRightWidth`
`borderColor`
`borderTopColor`
`borderBottomColor`
`borderLeftColor`
`borderRightColor`

### 边框圆角

`borderRadius`
`borderBottomLeftRadius`
`borderBottomRightRadius`
`borderTopLeftRadius`
`borderTopRightRadius`

### 外边距

`marginTop`
`marginBottom`
`marginRight`
`marginLeft`
`margin`
`marginVerical: (相当于marginTop marginBottom)`
`marginHorizontal: (相当于marginLeft 和 marginRight)`

### 外边距

`paddingTop`
`paddingBottom`
`paddingLeft`
`paddingRight`
`padding`
`paddingVertical`
`paddingHorizontal`

### 其他

`backfaceVisibility: visible|hidden; 属性定义当前元素不面向屏幕时是否可见`  
`backgroundColor: 背景色`  
`transform: translate/rotate/skew/scale`  
`transformMatrix // 矩阵`
