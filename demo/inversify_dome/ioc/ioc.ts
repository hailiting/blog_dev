import {
  Container,
  inject,
  interfaces as inversifyInterfaces,
} from "inversify";
import { controller, interfaces, httpGet, TYPE } from "inversify-koa-utils";
import {
  provide,
  fluentProvide,
  buildProviderModule,
} from "inversify-binding-decorators";
import * as Router from "koa-router";
// 导入service别名
import TAGS from "../constant/TAGS";

// 流式provide
let provideThrowable = function(
  identifier: inversifyInterfaces.ServiceIdentifier<any>,
  name: string
) {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
};
export {
  Container,
  inject,
  controller,
  interfaces,
  httpGet,
  Router,
  TAGS,
  TYPE,
  provide,
  provideThrowable,
  buildProviderModule,
};
