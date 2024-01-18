# nestjs

## 选择的技术栈

- 简单的接口 mock -> Postman, json-server, mock.js ×
- 单体项目接口数量比较少，20-30 个左右，没有性能需求 ×
- 长期项目、微服务框架（多个子模块）及考虑扩展使用 Nestjs

## docker

```sh
docker --version
docker-compose --version
# 运行ubuntu容器，以交互方式附加到本地命令行会话，然后运行 /bin/bash
docker run -i -t ubuntu /bin/bash


docker ps
```

### docker-compose

```sh
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

```yml
# docker-compose.yml
# Use root/example as user/password credentials
version: "3.1"
services:
  db:
    image: mysql
    # NOTE: use of "mysql_native_password" is not recommended: https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password
    # (this is just an example, not intended to be a production configuration)
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    ports:
      - 3090:3306
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

相当于

```sh
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=example mysql:tag --restart=always --default-authentication-plugin=mysql_native_password -p 3090:3306
# http://localhost:3090/
docker run --restart=always -p 8080:8080 adminer
```

```sh
# 运行yml
docker-compose up -d
# 停止容器不移除
docker-compose stop
# 停止正在运行的 Docker Compose
docker-compose down

# 查看当前网络服务
docker network ls
# 查看xxx地址
docker network inspect NAME
```

## Nestjs 官方 CLI

```sh
npm i -g @nestjs/cli
nest --version
nest new project-name
```

## `package.json`

### `license`

`"license": "MIT"`

> 插件：Choose A License

MIT: 可以商业应用的
GPL: Linus 开源

- `**.controller.ts` 路由文件
- `**.module.ts` 模块，服务 路由
- `**.service.ts` 业务核心代码
- `main.ts` 根模块

**约定大于配置**

```
技术栈： Nest + sequelize-typescript + JWT + Jest + Swagger
目录结构
- bin
- dist
- public
- src
  - config
  - entity
  - auth
  - common
    - constants
    - controllers
    - decorators
    - dto
    - filters
    - guards
    - interceptors
    - interfaces
    - middleware
    - pipes
    - providers
  - shared
  - gql
  - greeter
    - greeter.constant.ts
    - greeter.controller.ts
    - greeter.service.ts
    - greeter.module.ts
    - greeter.*.ts
    - index.ts
- test
- typings

```

```sh
# 创建一个user模块
nest g module user
# 创建user controller 并且不创建测试模块
# -d 做一个测试
nest g controller user --no-spec -d
# 创建 user service 逻辑层
nest g service user --no-spec
```

## 配置 webpack 热重载模式 `recipes/Hot reload`

对比变化，不需要重新编译整个项目

- webpack 不能自动加载 assets
- 修改数据库要重新启动进程

```sh
pnpm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
pnpm i -D @types/webpack-env
```

1. add file `webpack-hmr.config.js`
2. 修改 main.ts
3. 修改 package.json

```json
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
```

## webpack 调试

https://code.visualstudio.com/docs/editor/debugging#_launch-configurations

```json
// launch.json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch via NPM",
      "type": "node",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      // 设置脚本
      "runtimeArgs": ["run-script", "start:debug"],
      "runtimeExecutable": "npm",
      "runtimeVersion": "18.12.0",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## 编程思想

- OOP 面向对象编程 Object Oriented Programming
  - 具体的问题抽象
- FP 函数式编程 Functional Programming
  - 确定的输入得到确定的输出，没有副作用，相对独立
- FRP 函数响应式编程
  - rxjs, 广告推荐
  - 适合需要对事件流进行复杂组合应用的场景
- AOP 面向切面编程 Aspect Oriented Programming
- IoC 控制反转，降低耦合度
- DI 依赖注入

```js
// DI
export interface Phone {
  playGame: (name: string) => void;
}
export class DIStudent {
  constructor(private name: string, private phone: Phone) {
    this.phone = phone;
    this.name = name;
  }
  getName() {
    return this.name
  }
  play() {
    this.phone.playGame(this.name)
  }
}

class Android implements Phone {
  playGame(name: string) {
    console.log(`${name} use android play game`)
  }
}
const student1 = new DIStudent("toimc1", new Android());
student1.play()
```

## Nestjs 核心概念

- Controller 负责处理请求，返回响应
- Service 负责提供方法和操作，只包含业务逻辑
- Data Access 负责访问数据库中的数据

## Nestjs 生命周期

客户端 -> 中间件 -> 守卫 -> 前置拦截器 -> 管道 -> 控制器 -> 服务 -> 后置拦截器 -> 过滤器 -> 响应 -> 客户端

- 中间件
  - 全局中间件
  - 模块中间件
- 守卫
  - 全局守卫
  - 控制器守卫
  - 路由守卫
- 前置拦截器
  - 全局拦截器 pre
  - 控制器拦截器 pre
  - 路由器拦截器 pre
- 管道
  - 全局管道
  - 控制器管道
  - 路由管道
  - 路由参数管道
- 后置拦截器
  - 路由拦截器 post
  - 控制器拦截器 post
  - 全局拦截器 post
- 过滤器 对错误响应
  - 路由过滤器
  - 控制器过滤器
  - 全局过滤器

## 模块化系统

- 功能模块与共享模块是一回事，只是叫法不一样
- 全局模块通常应用在配置、数据库连接、日志上
- 动态模块是在使用到模块的时候才初始化（懒）

```js
ModuleMetadata {
  imports
  controllers
  providers
  exports
}
```

## MVC DTO DAO

- MVC 是一种软件架构模式 Model View Controller
- DTO(Data Transfer Object) 数据传输对象
  - 接收部分请求数据
  - 对数据进行筛选
  - 不对应实体
  - 属性是小于等于实体
- DAO(Data Access Object) 数据访问对象 数据库 Controller 之后的
  - 对接数据库接口
  - 不暴露数据库的内部信息
  - 对应实体

```js
// 约定数据字段、属性
// 方便数据校验
// create-cat.dto.ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
// DAO  Nestjs 做了一层封装， 通过ORM库与种类数据库对接
@@filename(user.entity)
import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({default: true})
  isActive: boolean;
}

```
