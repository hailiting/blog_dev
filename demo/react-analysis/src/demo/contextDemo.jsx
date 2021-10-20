// Context 主要解决props向多次嵌套的子组件传递的问题，原理是定义一个全局对象
import React, { Component } from "react";
import PropTypes from "prop-types";
const { Provider, Consumer } = React.createContext("default");
class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "普通字符串🍌",
      newContext: "小明"
    };
  }
  render() {
    return (
      <>
        <div>
          <label for="newContext">newContext</label>
          <input id="newContext" type="text" value={this.state.newContext} onChange={e=>this.setState({newContext: e.target.value})} />
        </div>
        <div>
          <label for="name">name</label>
          <input id="name" type="text" value={this.state.name} onChange={e=>this.setState({name: e.target.value})} />
        </div>
        <Provider value={{ newContext: this.state.newContext, name: "的点点滴滴" }}>
          { this.props.children }
        </Provider>
      </>
    );
  }
}
function Child(props, context) {
  return (<Consumer>
    {value => (
      <p>子节点=> newContext: {value.newContext}</p>
    )}
  </Consumer>)
}

function Child2(props, context) {
  console.log(333333)
  return (<Consumer>
    {value => (
      <p>子节点=> newContext: {value.name}</p>
    )}
  </Consumer>)
}

export default function ContextDemo() {
  return <Parent>
    <Child />
    <Child2 />
  </Parent>
}