import React from "react";
export default class ABC extends React.Component {
  render() {
    const { children } = this.props;
    return <div>aaaaaaaa{children}</div>
  }
}