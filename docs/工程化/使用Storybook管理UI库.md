# 使用 Storybook 管理 UI 库

## Storybook 能够做什么

- 能够把零散的组件像工作台一样的展示给内部使用
- 更好的支持原子设计【其实就是零散的组件】

## 自己开发组件和直接用 antd 的区别

1. 可以同时并行开发并修改【私有订制，更加灵活】
2. 更好的解耦拆分和维护【CDD 开发，基于原子设计理念与微前端概念->组件驱动开发】
3. 更强大的代码共享【如果队友写好一个组件，直接拿来用，不用担心风格问题】
4. 更短的学习曲线

## storybook 插件

官网地址[https://github.com/storybookjs/storybook/tree/next/addons]

### 官网插件

#### knobs

使用`storybook-ui`将用户输入的值代替 props 等传入自己的组件
knobs 提供了内置的 text, boolean, number, color, object, array, select, radios, options, files, date, button 类型供选择

```js
import {text} from "@storybook/addon-knobs";
instoriesOf("Icon", module).add("default",()=>{
  const name = text("name", "refresh");
  return <Icon name={name}> // 这样就可以通过storybook内置的text文本输入来控制icon的name属性
})
```

#### actions

用于显示 storybook 中事件处理程序接收到的数据
当事件触发时，可以查看事件接收的参数

#### nodes

为 stories 添加文本或 markdown

#### info

展示组件的各种详细详细，自动将 propsTypes, defaultProps 生成为对应的表格信息。

#### options

storybook 配置项，（storybook v5+直接在配置里）

#### cssresources

为全局或单独的 story 添加样式

#### state 状态

#### centered

居中显示

#### source

#### docs

#### viewport

为 storybook 提供各种机型，更好的进行响应式开发

#### storysource

是否展示 story 源码

#### backgrounds

更改背景

#### accessibility

#### console

#### links

故事间相互跳转
获取故事 url

#### jest

`npm install --save-dev @storybook/addon-jest`
单元测试

#### storyshots

jest 或屏幕快照

## 如何写 Story

### storiesOf

storisOf 接收两个参数，第一个是 story 类的名字，第二个是参数用来模块热替换（不传，则每次更改 story，都需要手动刷新浏览器）

```js
import { storiesOf } from "@storybook/react",
storiesOf("Button", module);
```

### add

add 用来添加 story 类下的子 story,可以链式调用 story 类下写多个 story
参数 1：story 名字
测试 2：story 在中间区域渲染的函数

```js
storiesOf("Button", module)
  .add("111 default", () => 111)
  .add("222 default", () => 222);
```

### addDecorator

story 装饰器方法（装饰器是一种用一组通用组件包装故事的方法）

1. 每个 story 单独使用

```js
import { storiesOf, addDecorator } from "@storybook/react";
storiesOf("Button", module)
  .addDecorator((storyFn) => (
    <div style={{ textAlign: "center" }}>{storyFn()}</div>
  ))
  .add("default", () => 111)
  .add("story2", () => 222);
```

2. 在`.storybook/config.js`全局使用

```js
import { configure, addDecorator } from "@storybook/react";
import center from "./center.js";
addDecorator(center);
const req = require.context("../src/stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().map((fileName) => req(fileName));
}
configure(loadStories, module);
```

### addParameters

给 Storybook 添加参数（和 addDecorator 使用方法类似）

1. 每个 story 单独使用

```js
storiesOf("Button Component", module)
  .addParameters({ jest: ["button.test.tsx"] })
  .add("Button", defaultButton)
  .add("Button show", buttonWithSize);
```

2. 在.storybook/config.js 全局使用

```js
import { addParameters } from "@storybook/react";
addParameters({
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: "right",
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: true,
    theme: create({
      base: "light",
      brandTitlee: "babel-ui",
      brandUrl: "xxx",
    }),
  },
});
```

### 在 stories 文件中写各个组件的 story

```js
import React from "react";
import { Button, SpiritButton } from "Shared";
import { storiesOf } from "@storybook/react";
import { boolean, radios, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-action";
import { enumConstants } from "Utils/common";

// 默认值
const defaultData = {
  type: "无",
  size: "large",
  disabled: false,
  spritDisabled: false,
  loading: false,
  spritType: "primary",
  spritSize: "large",
};
// button type类型
const typeOptions = enumConstants("primary", "gray", "无");
// spiritButton type类型
const spirtButtonType = enumConstants("primary", "ghost", "transparent");
// button大小类型
const typeSizeOptions = enumConstants("small", "large", "biglarge");
// spritbutton 大小类型
const spritSizeOptions = enumContstants("small", "large", "无");

storiesOf("Button", module)
.add("default", () => {
  const type = radios("type", typeOptions, defaultData.type);
  const disabled = boolean("disabled", defaultData.disabled);
  const size = select("disabled", typeSizeOptions, defaultData.size);
  return (
    <Button
      {...(type !== "无" ? { type } : null)}
      size={size}
      disabled={disabled}
      onClick={action("button被打击了")}
    >
      hello button
    </Button>
  );
})
.add("spiritButton", ()=>{
  ...
});
```
