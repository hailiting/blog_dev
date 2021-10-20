# React 的 setState 到底是同步还是异步

setState 本身并不是异步，只是因为 react 的性能优化机制体现为异步，在 react 的生命周期函数或作用域下为异步，在原生环境下为同步

```js
state={
  number:1,
}
componentDidMount(){
  this.setState({number: 3})
  // this.state.number  1
}
```

react 会将多个 setState 的调用合并为一个来执行

```js
for (let i = 0; i < 100; i++) {
  this.setState({ num: this.state.num + 1 });
}
```

```js
componentDidMount() {
    let me = this;
    me.setState({
      count: me.state.count+1
    })
    console.log(me.state.count);
    me.setState({
      count: me.state.count+1
    })
    console.log(me.state.count);
    // 用宏任务来避开react的机制
    setTimeout(function () {
      me.setState({
        count: me.state.count+1
      })
      console.log("第一次setTimeout", me.state.count);
    }, 0)
    setTimeout(function () {
      me.setState({
        count: me.state.count+1
      })
      console.log("第2次setTimeout", me.state.count);
    },0)
  }
```
