import React from "react";
import { Route } from "react-router-dom";
//  普通组件
import ComponentDemo from "./demo/components/componentDemo";
//  纯组件
import PureDemo from "./demo/components/pureDemo";
//  纯函数组件
import FunctionalDemo from "./demo/components/functionalDemo";
//  高阶组件
import HocDemo from "./demo/components/hocDemo";
//  组件插槽
import PortalsDemo from "./demo/components/portalsDemo";
//  Suspense组件
import SuspenseDemo from "./demo/suspenseDemo";
//  Memo组件
import MemoDemo from "./demo/memoDemo";
//  Comtext组件
import ContextDemo from "./demo/contextDemo";
//  Ref组件
import RefDemo from "./demo/refDemo";
//  Error 组件
import ErrDemo from "./demo/errDemo";
//  生命周期
import LifecycleDemo from "./demo/lifecycle/";
//  React Hooks
import HookDemo from "./demo/hooks/";
//  React FiDer
import Fiberdemo from "./demo/fiber/";

// react-call-return 父组件根据子组件的回调
// 复用已有组件  ReactDOM.hydrate
export default (
  <>
    <Route path="/componentdemo" component={ComponentDemo} />
    <Route path="/puredemo" component={PureDemo} />
    <Route path="/functionaldemo" component={FunctionalDemo} />
    <Route path="/hocdemo" component={HocDemo} />
    <Route path="/portalsdemo" component={PortalsDemo} />
    <Route path="/suspensedemo" component={SuspenseDemo} />
    <Route path="/memodemo" component={MemoDemo} />
    <Route path="/contextdemo" component={ContextDemo} />
    <Route path="/refdemo" component={RefDemo} />
    <Route path="/errdemo" component={ErrDemo} />
    <Route path="/lifecycledemo" component={LifecycleDemo} />
    <Route path="/hookdemo" component={HookDemo} />
    <Route path="/fiberdemo" component={Fiberdemo} />
  </>
);
