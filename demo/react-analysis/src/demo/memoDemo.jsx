// React.memo() 是高阶函数能将函数组件转换为类似于React.PureComponent组件
import React, { memo, Component } from "react";
function Child({ seconds }) {
  console.log("I am rendering")
  return <div>Memo组件 {seconds}-></div>
}
function areEqual(preProps, nextProps) {
  if (preProps.seconds === nextProps.seconds) {
    return true;
  } else {
    return false;
  }
}
const DemoComponet = memo(Child, areEqual);
export default class Greating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }
  render() {
    return [
      <div onClick={()=>this.setState({count: this.state.count+1})}>{this.state.count}</div>,
      <DemoComponet seconds="20"/>
    ]
  }
}
