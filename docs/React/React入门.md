# React 入门

- 技术栈
- 设计思想
- 最佳实践

## 技术栈

- ES2015+
- Babel
- webpack
- React
- Falcor/Relay 【页面数据管理及服务端交互】

### 整体架构

- 工程语言
- 模块管理
- 转换工具
- 语言补丁
- 组件方案
- 工作流
- 本地开发
- 数据管理
- 数据通信

```js
// 合并高阶组件
export function componseComponents(component, wrappers = []) {
  return wrappers.reduce((c, wrapper) => wrapper(c), component);
}

const CheckApp = componseComponents(App, [
  (c) => checkAuther(c, { withValue: false, redirectTo: "/login" }),
  (c) => checkAdmin(c),
]);
```

## 最佳实践

- 用 es6 或 ts
- 用 PropType 和 defaultProps
- UI 和交互分离
- UI 和 IO(服务端请求，本地缓存操作)分离

## 深入

- Flux 架构
- React 性能调优
- Redux 介绍和实战
- GraphQL 和 Relay

```js
var AppDispatcher = require("../dispatcher/AppDispatcher");
var ButtonActions = {
  addNewItem: function(text) {
    AppDispatcher.dispatch({
      actionType: "ADD_NEW_ITEM",
      text: text,
    });
  },
};
module.exports = ButtonActions;
```

```js
var React = require("react");
var MyButton = function(props) {
  var items = props.items;
  var itemHtml = items.map(function(listItem, i) {
    return <li key={i}>{listItem}</li>;
  });
  return (
    <>
      <ul>{itemHtml}</ul>
      <button onClick={props.onClick}>new item</button>
    </>
  );
};
module.exports = MyButton;
```

```js
var React = require("react");
var ListStore = require("../stores/ListStore");
var ButtonActions = require("../actions/ButtonActions");
var MyButton = require("./MyButton");
var MyButtonController = React.createClass({
  getInitialState: function() {
    return {
      items: ListStore.getAll(),
    };
  },
  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      items: ListStore.getAll(),
    });
  },
  creatNewItem: function(event) {
    ButtonActions.addNewItem("new Item");
  },
  render() {
    return <MyButton items={this.state.items} onClick={this.createNewItem} />;
  },
});
module.exports = MyButtonController;
```

```js
var Dispatcher = require("flux").Dispatcher;
var AppDispatcher = new Dispatcher();
var ListStore = require("../stores/ListStore");
AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case "ADD_NEW_ITEM":
      ListStore.addNewItemHandler(action.text);
      ListStore.emitChange();
      break;
    default:
  }
});
module.exports = AppDispatcher;
```

```html
<html>
  <body>
    <div id="example"></div>
    <script src="init.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>
```

### React 性能调优

```js
constructor(props){
  super(props);
  this.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate.bind(this);
}
shouldComponentUpdate: function(nextProps, nextState){
  return nextState.count.data !== this.state.count.data;
}
// 或者  对象的值不行
mixins: [React.addons.PureRenderMixin]
```

`React.addons.Perf.start()`
`React.addons.Perf.stop()`
`React.addons.Perf.printExclusive()`
`React.addons.Perf.printInclusive()`

### `IMMUTABLE`

```js
var Immutable = require("immutable");
var map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
var map2 = map1.set("b", 50);
// map1  map2 是不一样的两个对象
map1.get("b"); // 2
map2.get("b"); // 50
```

```js
const _items = Immutable.fromJS({
  items: [
    {
      id: 0,
      text: "你喜欢吃胡萝卜吗",
      on: "喜欢",
      off: "不喜欢",
      checked: false,
    },
  ],
});
let __stateMap = {
  list: _items,
};
this.state = __stateMap;

onChange(labelId){
  var newState = this.state.list.setIn({
    this.setState({
      list: newState,
    })
  })
}
// 获取
this.state.list.getIn(["items", labelId, "checked"])
```

### Redux

### graphql-relay

#### 主要特性

- 1. 声明式，不再使用一个命令式 API 与数据存储通讯。简单的使用 GraphGL 声明数据所需要的格式，让 Relay 理解如何，什么时候获取你的数据
- 2. 托管，查询在视图后面，Relay 聚合查询成有效的网络请求，只获取你需要的数据
- 3. 转变，Relay 允许你使用 GraphQL mutations 在客户端和服务器端转变数据，提供自动数据一次优化更新和错误处理

```js
var shipMutation = mutationWithClientMutationId({
  name: "IntroduceShip",
  inputFields: {
    shipName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    factionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    faction: {
      type: factionType,
      resolve: (payload) => data["Faction"][payload.factionId],
    },
  },
});
```
