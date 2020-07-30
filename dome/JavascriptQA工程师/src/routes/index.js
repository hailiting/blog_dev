import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import MainLayout from "../layout/MainLayout"
import Home from "../containers/"

export default class BasicRouter extends React.Component {
  render() {
    return (<HashRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </HashRouter>)
  }
};