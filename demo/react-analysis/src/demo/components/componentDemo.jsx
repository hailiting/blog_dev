import React, { Component } from "react";
export default class ComponentDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
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
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <p className="app-intro">
          React SetState 源码探究<code>src/app.js</code>
        </p>
        <hr />
        <h1>{this.state.count}</h1>
      </div>
    );
  }
}
