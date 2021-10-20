// PureComponent的自动为我们添加的shouldComponentUpdate函数
import React, { PureComponent } from "react";
export default class PureDemo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count:1
    }
  }
  render() {
    return <button className="btn"
      onClick={()=>{this.setState({count: this.state.count+1})}}
    > 
      Count: {this.state.count}
    </button>
  }
}