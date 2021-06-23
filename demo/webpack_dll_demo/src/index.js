import React, { Component } from "react";
import ReactDom from "react-dom";
import Home from "./Home";
class Demo extends Component {
  render() {
    return <Home />
  }
}
ReactDom.render(<Demo />, document.getElementById("app"));
