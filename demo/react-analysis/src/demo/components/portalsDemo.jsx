// Portals 提供一个顶级方法，使我们有能力把一个子组件渲染到父组件DOM层以外的DOM节点上
import React from 'react';
import ReactDom from "react-dom";
// 组件插槽
const portalEle = document.createElement("div");
portalEle.className = "textCenter";
// portalEle.innerHTML = "hello world"
document.body.appendChild(portalEle);

export default class App extends React.Component {
  state = {
    show: false,
  }
  handleClick = () => {
    this.setState({
      show: !this.state.show
    })
  }
  render() {
    console.log(this.state.show)
    return <>
      <button onClick={this.handleClick}>click</button>
      {this.state.show ? (
        <div>{ ReactDom.createPortal(<span>Portal组件</span>, portalEle)}</div>
      ): null}
    </>
  }
}