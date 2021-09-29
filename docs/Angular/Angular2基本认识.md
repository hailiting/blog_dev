# Angular2 基本认识

为什么有 2

- 1. ES6 的发展
- 2. 最初架构限制，框架性能提升困难
- 3. 移动端支持差，比如缓存预编译的视图、触控支持等
- 4. 双向数据绑定，任何操作都会造成 scope 脏检查机制。默认的绑定方式为单向绑定，每个组件的背后都维护着一个独立的变化监听器。当 Zones 捕获到异步异常，都会通过 Angular 执行变化操作，每次检测都始于根组件，并已深度优先的员向叶子组件遍历执行
- 5. `$scope`观察机制，隔离浏览器原生模块，并用流的形式

## Angular2 系统的核心概念：

组件由元数据（Metadata）、组件类（Component）和模板（Template）组成

- 元数据->描述组件的属性
- 组件类实现组件的功能，可调用依赖注入（Dependent Injection）的服务（Service）
- 模板定义的组件视图（view），其中包括 HTML 元素（element）、其他组件或 Directive

> 组件类和模板通过数据绑定关联：通过属性绑定（Perperty Binding）在模板视图中显示属性值，用户操作模板视图触发事件通过事件绑定回调组件的事件处理函数。注意：系统架构仅包括 Angular2 核心，可选的路由，http 服务未包括在内

### 组件

```js
import { Component } from "@angular/core";
// 组件
@Component({
  selector: "increase",
  template: `
    <div class="myborder">
      <div>数值是：{{value}}</div>
    </div>
  `,
  providers: [CalcService],
  directives:[],
  pipes: [],
  styles: [".myborder{border: 1px solid;}"]
})
export class Increase {...}
```

- selector: CSS selector, 组件一般是元素名称
- template: 组件视图模板
- providers: 组件级依赖注入的服务列表
- directives: 模板可使用的其他组件和 Directive
- 模板可使用的 Pipe 列表

```js
export class Increase {
  @Input() value: number;
  @Output() changed: EventEmitter<string> = new EventEmitter();
  constructor(private calc: CalcService){}
  private onIncreates(events: any){
    this.value = this.calc.increase(this.value);
    this.changed.next(`数值增加到${this.value}`);
  }
}
```

- `@Input`声明输入的属性绑定成员字段
- `@Output`声明输出的事件绑定成员字段
- 构造函数通过参数类型 CalcServuce 自动注入服务实例，并由 TypeScript 自动赋值给私有的`this.calc`成员字段
- 在事件绑定的处理函数中，可以调用依赖注入的服务，并更新成员变量值。成员变量值更新后，由 Angular2 的变更检测自动更新到视图中
- this.changed.next() 向父组件输出事件，事件参数是字符串

### 元数据 Metadata

元数据告诉 Angular2 如何处理类。如`@Component`是采用 TS 标注（decorator）方式表示的组件配置信息。
TS 标注是一个函数，将组件配置信息转换为附加在类定义上的元数据。
Angular2 在运行时根据元数据创建和显示组件实例。
其他常用的元数据包括`@Injectable`, `@Input`, `@Output`, `@RouteConfig`

### 依赖注入 Dependency Injection

- Angular2 使用依赖注入向类注入服务实例，以及服务实例所有的依赖实例
- Angular2 采用构造注入，一般地根据构造函数的参数类型确定注入实例
- Angular2 可以在 BootStrap 函数注册全局 provider，或组件定义时注册组件级 provider。

```js
- Injector
ServiceA   HeraService  ServiceC  ServiceD


- Component
constructor(HeraService) // 创建组件时，通过Injector获取对应的服务实例
```

### Directive

Angular2 模板根据 directive 指令动态生成 DOM。
Directive 是使用`@Directive`标注的类，分为结构型（structural）和属性型（attribute）。

- 系统预定义的结构型 Directive 包括`ngIf`,`ngFor`和`ngSwitch`
- 属性型 Directive 包括`ngClass`,`ngStyle`等

Directive 也可以自定义

## Angular4

```js
// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
@NgModule({
  declarations: [AppComponent], // 导入模块依赖的组件、指令等
  imports: [BrowserModule], // 用来导入当前模块所需要的其他模块
  bootstrap: [AppComponent], // 启动模块
})
export class AppModule {}
```

- `npm install -g @angular/cli`
- `ng new my-dream-app`
- `cd my-dream-app`
- `ng serve --open`
- `ng g c User` 生成 User 模块
  - cl: class 创建一个新类
  - c: component 创建一个新的组件
  - d: directive 创建一个新的指令
  - e: enum 创建一个新的枚举
  - m: module 创建一个新的指令
  - p: pipe 创建一个新的指令
  - s: service 创建一个新的服务
- `ng serve --prod --aot`
- `ng build`
- `ng test`

### 实战

- 基本路由配置和路由传参
- 模块懒加载
- 路由守卫
- 服务端支持 Angular 路由的配置

```js
ng g c Index
ng g c Error
ng g c Test
ng g m test
ng g s user
```

```js
// test.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { testRoutes } from "./test.routes";
import { TestComponent } from "./test.component";
import { UserComponent } from "../user/user.component";
@NgModule({
  declarations: [TestComponent, UserComponent],
  imports: [CommonModule, RouterModule.forChild(testRoutes)],
  declarations: [],
})
export class TestModule {}
```

```js
// test.routes.ts
import { TestComponent } from "./test.component";
import { userComponent } from "../user/user.component";

export const testRoutes = [
  {
    path: "",
    component: TestComponent,
    children: [
      {
        path: ":id",
        component: userComponent,
        canActivate: [],
      },
    ],
  },
];
```

```html
<!-- test.component.html -->
<p>
  test works!
  <router-outlet></router-outlet>
</p>
```

```js
// app.routes.ts
import { IndexComponent } from "./index/index.component";
import { ErrorComponent } from "./error/error.component";
export const appRoutes = [
  {
    path: "",
    redirectTo: "/index.html",
    pathMatch: "full",
  },
  {
    path: "index.html",
    component: IndexComponent,
  },
  {
    path: "test",
    loadChildren: "./test/test.module#TestModule",
  },
  {
    path: "**",
    component: ErrorComponent,
  },
];
```

```js
// user.component.ts
...
export class UserComponent implements OnInit {
  data: any={
    id: 0
  }
  constructor(public activeRoute: ActivatedRoute){}
  ngOnInit(){
    this.activeRoute.params.subscribe(
      params=>this.getPost(params["id"])
    )
  }
  public getPost(id: number){
    console.warn(id);
    this.data.id = id;
  }
}
```

```js
// User.ts
export class User {
  id: number;
  name: string;
}
```

```js
// user.service.ts
import { Injectable } from "@angluar/core";
import { Objectvalue } from "rxjs/Rx";
import { User } from "../model/User";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams,
} from "@angular/http";
@Injectable()
export class UserService {
  public userListURL = "/api/users";
  constructor(public http:Http){}
  public getUsers():Observable<User[]>{
    return this.http.get(this.userListURL).map((res:Response)=>res.json().data as User[])
  }
}
```

## RxJS 与 Promise 类比

- 动作可以取消
- 可以发射多个值
- 各种工具函数

```js
let stream1$ = new Observable((observer) => {
  let timeout = setTimeout(() => {
    observer.next("observable timeout");
  }, 2000);
  return () => {
    clearTimeout(timeout);
  };
});
let disposable = stream1$.subscribe((value) => console.log(value));
setTimeout(() => {
  disposable.unsubscribe();
}, 1000);
```

## Zomejs 暴力之美

。。。
