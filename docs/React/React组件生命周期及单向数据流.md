# React 组件生命周期及单向数据流

## 生命周期

![lifeTime](./img/lifeTime.png)
**在 React15.x 版本或之前的版本，生命周期只有三个阶段**
**在 React16.3 之后新增了一个，有 12 个钩子函数，四个阶段分别为：初始化，运行中，销毁，错误处理**

## 废弃的生命周期

被废弃的三个函数都是在`render`之前，因为`fiber`的出现，很可能因为高优先级任务的出现打断现有任务导致它们被执行多次

### 16.4 版本会警告弃用

`componentWillMount`
`componentWillReceviesProps`
`componentWillUpdate`

#### 新增

`getSnapshotBeforeUpdate`,
`getDerivedStateFromProps`

#### getSnapshotBeforeUpdate

dom 渲染前保存快照，以便后续使用

```js
getSnapshotBeforeUpdate(prevProps, prevState){
  // 保存滚动位置的快照
  if(prevProps.list.length < this.props.list.length){
    const list = this.listRef.current;
    return list.scrollHeight-list.scrollTop;
  }
  return null;
}
componentDidUpdate(prevProps,prevState,snapshot ){
  // 如果有快照值，说明已经增加的新的项
  // 调整滚动位置使得新的项不会挤走老的项
  // 快照是从getSnapshotBeforeUpdate返回出来的
  if(snapshot!==null){
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight-snapshot;
  }
}
```

### 17 版本直接弃用，但保留使用

`UNSAFE_componentWillMount`
`UNSAFE_componentWillReceiveProps()`
`UNSAFE_componentWillUpdate()`

### 具体替代方案

- 1）`componentWillMount`可用`constructor`+`componentDidMount`替代
- 2）`componentWillReceviesProps`会破坏`state`数据的单一数据源，导致组件状态不好预测，还 会增加重绘次数，用`getDerivedStateFromProps`替代
- 3）`getDerivedStateFromProps(nextProps, prevState)`
- 4）`componentWillUpdate`用`getSnapsshotBeforeUpdate(prevProps, prevState)`返回值作为`componentDidUpdate`第三个参数，`componentDidUpdate(prevProps, prevState, snap)`
- 5）`getSnapshotBeforeUpdate`会在最终确定的`render`执行之前执行，能保证到跟`componentDidUpdate`的元素状态相同

```js
componentWillReceviesProps(nextProps){
  if(nextProps.xxx !== this.props.xxx){
    this.setState({
      xxx: nextProps.xxx,
    })
  }
  this.xxx();
}
// 对比
static getDerivedStateFromProps(nextProps, prevState){
  if(nextProps.xxx!==prevState.xxx){
    return {
      xxx: nextProps.xxx,
    }
  }
}
componentDidUpdate(prevProps, prevState){
  this.xxx();
}
```

## 新引入的生命周期函数

- `getDerivedStateFromProps(props, state)`
  - 在组件创建的时候和更新的 render 方法之前调用
  - 他应该返回一个对象来更新状态，或返回 null 来不更新任何内容
- `getSnapshotBeforeUpdate(prevProps, prevState)`
  - 被调用于`render`之后，可以读取但无法使用 DOM 的时候
  - 他使组件可以在更改之前从 DOM 捕获一些信息（例如滚动位置）
  - 返回的任何值都将作为参数传递给 componentDidUpdate

```js
export default class MyApp extends React {
  // Mounting
  constructor(props) {
    super(props);
    this.state = { data: new Date() };
  }
  componentWillMount() {} // 已废弃

  // render
  // (React updates dom and refs)
  componentDidMount() {}
  componentWillReceiveProps() {} // 已废弃
  // 返回一个布尔值。在组件收到新的props或state被调用。常做优化项
  shouldComponentUpdate() {}
  // 在组件接收到新的props或state但没有render时被调用。初始化不会被调用
  componentWillUpdate() {} // 已废弃

  // Updating
  // newProps setState() forceUpdate()
  // 在组件完成更新后立即调用，在初始化时不会调用
  componentDidUpdate() {}
  // 在组件从DOM中移除时调用，常用于clear线程，定时器

  // Unmounting
  componentWillUnmount() {}
}
```

### 挂载阶段

- `constructor`初始化 state 和绑定事件处理方法
- `componentWillMount` 组件即将挂载，只调用一次（已废弃）
- `render` 定义组件，是一个纯函数：
  - 计算`this.props/this.state`返回的对应结果
  - 通过`React.createElement`将 jsx 转换为 VDOM 对象模型
- `componentDidMount`在组件被挂载到 Dom 后调用，只调用一次，这个时候已经可以获取到 dom 结构了

### 更新阶段

- `componentWillReceviesProps(nextProps)`已废弃
- `shouldComponentUpdate(nextProps, nextState)`
- `componentWillUpdate(nextProps, nextState)`已废弃
- `componentDidUpdate(prevProps, prevState)`

### 卸载时

```js
componentWillUnmount;
```

### 错误处理阶段

- `componentDidCatch(err, info)`

## 状态提示和单向数据流

### 修改状态

#### 更改`state`的方法

```js
this.setState((prevState, props) => ({
  counter: prevState + props.incement,
}));
```

#### 状态的更新是异步的

### 单向数据流

任何状态始终由某些特定组件所有。  
该状态导出的任何数据或 UI 只能影响树中下方的组件【状态通常被认为是局部或封装在一个组件。除了拥有他的组件外，其他的不能访问】。  
组件间得知状态，也只能用过父子组件间的通信实现。
