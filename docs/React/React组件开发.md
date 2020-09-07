# React 组件开发

## 完成一个组件库需要考虑的问题

- 代码结构
- 组件需求分析和编码
- 样式解决方案
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD，文档生成等

### 由简入繁，化繁为简

### 代码结构

```file
viking/
  README.md
  node_modules/
  package.json
  tsconfig.json
  src/
    components/
      Button/ 【帕斯卡命名方式】
        button.tsx
        button.test.tsx
        styles.scss (组件单独样式)
    styles/
      _variables.scss(各种变量以及可配置设置)
      _mixins.scss(全局mixins)
      _functions.scss(全局function) [_xxx.scss=> 作为模块，不能被编译]
    ...
    index.tsx
```

### 启动`eslink`配置文件

```json
// .vscode/settings.json
{
  "window.zoomLevel": 1,
  "editor.tabSize": 2,
  "javascript.updateImportsOnFileMove.enabled": "never",
  "typescript.updateImportsOnFileMove.enabled": "never",
  "workbench.iconTheme": "vscode-icons",
  "material-icon-theme.folders.theme": "classic",
  "gitlens.advanced.fileHistoryFollowsRenames": false,
  "javascript.validate.enable": false,
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "gitlens.advanced.messages": {
    "suppressFileNotUnderSourceControlWarning": true,
    "suppressGitDisabledWarning": true
  },
  "search.followSymlinks": false,
  "git.enabled": false,
  "git.autorefresh": false,
  "search.exclude": {
    "**/.history": true,
    "**/bower_components": false
  },
  "search.useIgnoreFiles": false,
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "markdown-table-formatter.markdownGrammarScopes": [
    "markdown",
    "typescriptreact"
  ],
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {},
  "eslint.enable": true,
  "eslint.alwaysShowStatus": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.tslint": true,
    "source.fixAll.eslint": true
  },
  "dart.openDevTools": "flutter",
  "workbench.editorAssociations": [],
  "breadcrumbs.enabled": true,
  "java.semanticHighlighting.enabled": false,
  "java.configuration.checkProjectSettingsExclusions": false,
  "java.requirements.JDK11Warning": false,
  "explorer.confirmDragAndDrop": false
}
```

### 样式解决方案

- Inline CSS
- CSS in JS
- Styled Component
- Sass/Less
  采用`Sass/Less`

```shell
npm install sass-loader node-sass --save-dev
npm install --save @types/node-sass
npm install @types/node
```

#### Styled Component

```js
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #f00;
  border-radius: 3px;
  /* Adapt the colors based on primary prop */
  background: ${props=>props.primary && '#999'};
  color: ${props=>props.primary ? "white"&& '#eee'};
`
<Button primary>primary</Button>
<Button>default</Button>
```

#### 创建自己组件库的色彩体系

- 系统色板 -> 基础色板+中性色板
- 产品色板 -> 品牌色+功能色板

##### 一个页面需要哪些样式变量分类

- 基础色彩系统
- 字体系统
- 表单
  - input button
- 边框和阴影
- 可配置的开关

##### normalize.css 【提供跨浏览器的高度一致性】

## Button 组件

### 需求分析

- 不同的 ButtonType
  `Primary`, `Default`, `Danger`, `LinkButton`
- 不同的 ButtonSize
  `Normal`, `Small`, `Large`
- Disabled 状态
  `Default`, `LinkButton`

```jsx
<Button
  size="lg"
  type="primary"
  disabled
  href=""?
  className=""?
  autofocus=""?
  ...
>
  {children} Viking Button
</Button>
```

### 编写

```shell
npm install classnames --save
npm install @types/classnames --save
```

### 组件测试

- 编写高质量代码
- 更早的发现 bug,减少成本
- 让重构和升级更加容易和可靠
- 让开发流程更加敏捷

### 测试金字塔

- jestjs[jestjs.io]
- @testinig/library[https://testing-library.com/docs/intro]

```shell
npm install --save-dev @testing-library/react

"@testing-library/jest-dom": "^4.2.4",
"@testing-library/react": "^9.3.2",
"@testing-library/user-event": "^7.1.2",
```

` __tests__``.test.``.spec. `  
`flex`布局，

#### 理想状态

![testJizita](./img/testJizita.png)

#### 实际状态

![nowTeamWork](./img/nowTeamWork.png)

####

`npx jest ./jest.test.js --watch`
断言

```js
// Common Matchers
test("1+2", () => {
  expect(1 + 2).toBe(4);
});
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
// Truthiness
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUnndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

// numbers
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // tobe and toequal are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
// strings
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});
text("but there is a 'stop' in Christoph", () => {
  expect("Christoph").toMatch(/stop/);
});
// Arrays and iterables
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "beer",
];
test("the shopping list has beer on it", () => {
  expect(shoppingList).toContain("beer");
  expect(new Set(shoppingList)).toContain("beer");
});

// Exceptions
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK");
}
test("compiling android goes as expected", () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);
  expect(compileAndroidCode).toThrow(/JDK/);
});
```
