项目开发要注意：
1： 自动化
2： 标准化
3： 规范化
4： 文档化




# 前端架构知识点整理
	HTML核心技巧
		HTML语义化
		埋点、监控、日志分析
		LocalStorage扩容
		跨域问题解决方案
		漏洞攻防
	css核心技巧
		现代化CSS方法论实践
		CSS高级绘制实战
		CSS 3D在前端的应用
		CSS WorkFlow深入
		CSS 矩阵与高性能渲染
		CSS 结合数学知识高级应用
	JavaScript 核心技巧
		JavaScript 语言精髓
			基本数据类型，变量提升
			函数与对象、构造函数
			this、作用域与闭包
			Call、appl、bind
			原型与原型链
			递归与尾递归
			微任务、宏任务、同步队列
			异步队列
			暂时性死区、GC、执行堆栈
			纯函数、柯里化、函数组合
			高阶函数、范畴、容器
			函子、AP因子、IO
		TypeScript深入实践
			数据类型、枚举、接口、类、函数、泛型、装饰器
			类型断言与类型守卫、类型兼容性
			高级类型之交叉类型、联合类型、类型别名
			高级类型之索引类型、映射类型、条件类型、强大的infer关键字
			模块与命名空间、声明文件编写
			TypeScript结合Vue、React实践
			TypeScript与企业级服务实践
			TypeScript编译原理
		ES6~ES10实践应用
		jQuery经典源码解读
	前端必回的后端知识
		Linux入门与精通
			Linux环境安装与配置
			Web程序员必会的Linux命令
			Linux深入
			Linux安全加固
		Linux与Web服务器
			nginx
			Apache
		代理与反向代理服务器
			反向代理实战
		后端开发
			PHP+MySQL
			图书管理系统实战
	Node.JS 与大前端开发
		核心知识
			EventLoop与事件队列与模块
			第三方模块、自定义模块
			全局对象、常用工具、HTTP
			Net、Fs、Stream、Buffer
			核心API、回调函数
			进程与线程
			Promise、Async await
		必会技能
			koa、express、egg、hapi框架实践应用
			Mysq、MongoDB、Redis数据库实践应用
			中间件原、Restful Api设计
			Cookie、token、鉴权Linux下的Node.js服务管理
			异步IO原理及优化
			内存管理机制及优化
			集群管理
			线上部署与压力测试
		深入实践
			Node.js源码解析
			手写Koa2源码
			手写中间件机制
			手写MVC开发开发框架
			6个深入实践项目
				腾讯地图H5Node.js架构搭建复盘
				Express实战之版块引擎、日志记录、路由跳、错误处理、综合应用
				Express+PHP 实战之数据库设置、路由设置、数据操作、容错机制、错误处理综合应用
				Koa2实战之Web应用构建
				爬虫实战之Roboot协议、环境配置、代码编写
				数据推送之Comet、WebSocket、SSE实际应用
				前端BFF架构代码实战
	网络协议
		HTTP协议系列
		TCP/IP 协议栈
		DNS协议与CDN技术
		WebSockets
	前端工程化化、构建与测试
		构建工具
			webpack4核心原理与开发优化
			FIS、Gulp、Rollup、Yeoman快速上手
		版本控制
			SVM/GIT
		CI/CD
			持续集成方案及流程
			安装配置使用Jenkins、Travis、drone
		代码质量管理
			lint
			手把手安装配置使用sonar
		自动化测试
			单元测试、性能测试、压力测试、安全测试、功能测试具体分析与深入实践
			热门测试框架介绍、安装与实战
		深入实践
			从0构建适合团队的CLI工具
			webpack简版实现
			前端工程化企业级部署
	前端性能优化
		高级前端性能调试、AMP
		高性能CSS与浏览器渲染原理
		精通FCP/FMP等于CSR SSR
		服务器端优化常见策略
		百度地图极致webapp性能优化
		网红平台性能优化实战
		大规模Node.js项目架构优化
	前端架构师实战
		集成Spring版本的Node.js
		深度优化Webpack
		持续集成工具的搭建
		前端微服务+Node微服务
		MPA转化与SPA的种种实践
	前端框架与全家桶
		Vue
			核心知识
				组件化思维
				CLI脚手架实战
				组件化实战
				组件化通信方案
				内容分发
				模板语法
				计算属性
				表单处理
				事件处理
				动画
			VueRouter构建应用
				实现原理
				路由管理
				动态路由
				嵌套路由
				编程式导航
				命名路由
				路由懒加载
				路由守卫
				路由传参
			Vuex数据管理
				核心api State、Getter、Mutation、Action、Module原理与架构剖析
		React
			核心知识
				组件化思想
				CLI脚手架实战
				JSX模板语法
				虚拟DOM
				Props
				State
				生命周期
				组件化
				事件和this绑定
				表单处理
			React16.8新特性
				新特性的最佳使用
				纯组件、纯函数、高阶函数、组件插槽高级玩法
				suspend、lazy、memo、context使用详解
				结合内部架构的变更侧面讲解react生命周期的变更及使用
				新特性Hook实战
			ReactRouter构建应用
				路由组件
				编程式导航
				动态路由
				嵌套路由
			Redux数据管理
				三大核心： Action、Reducer、Store
				中间件
				结合React实战
		Angular
			核心知识
				cli脚手架实战
				路由与动态加载
				组件
				声明周期
				Service与Rxjs
				Zone.js暴力之美
		Vue、React最佳实践指导
		TypeScript在Vue、React中的实际应用
		手撸Vue、React SSR
	前端框架源码分析
		Vue2源码解析
			双向数据绑定与setState 原理
			Virtual-dom分析以及React virtual-dom对比
			dom diff 原理及算法实现
			vue2整体解析流程
			vue运行时的优化
		Vue周边原理剖析
			vue数组双向绑定的处理与原理
			$set与vue.use原理
			手撸vue-router
			Vuex应用于原理
			手撸Vue CLI
			BFF架构实现与服务端渲染
		Vue3源码分析
			Vue3与Vue2深入对比
			元编程之proxy与reflect
			proxy与definePrototype深度对比
			vue3整体源码讲解及深度剖析双向绑定的新实现
			vue3源码单元测试讲解
			AST构建过程、词法分析、语法分析
			vue2和vue3动态构建发深度对比
		flux思想及redux使用
			flux思想剖析，store、dispatcher等关系梳理
			redux基于flux思想实现的演变及差别对比
			redux对应函数式范畴论的容器、函子等各种比较
			redux的state、action、dispatch、reducer等作用与协同关系
			redux在服务器端渲染管理数据的架构模式及使用
		Redux源码实现
			redux源码架构分析
			redux各种方法及特性作用剖析
			redux与react结合使用源码剖析
			手写Redux源码的演变及诞生过程，基于原因寻找答案
			Middleware中间件的实现及异步处理过程中间件作用解读
			结合设计模式剖析redux实现的优缺点
		React16.8 源码深入
			Fiber架构深入剖析
			renderRoot、commitRoot源码深入
			createElement、useState、useEffect源码浅析
			BatchUpdate、useState、useEffect源码浅析
			memo、context内部原理深入
			新特性各个hooks源码解读
			实验性的调度层级的优化讲解
			内部部分api的替换促使性能提升的剖析
			ReactHooks和Fiber调度的关系
			MessageChannel的妙用
			suspend及lazy原理剖析
			手撸suspend
			手撸常用ReactHooks
	前端跨界技术
		跨界移动应用（ios、android）
			ReactNative与Cordova原理剖析
			Flutter入门到实战，开发豆瓣网App
			微信小程序入门到实战，上线Note完整小程序
			Uniapp入门到实战，开发一个多端应用
			PWA实战
		跨界PC应用
			NW.js
			Electron 
			VR
		物联网时代的大前端（loT）
			从软件到硬件
			JavaScript硬件开发
			Node串行端口
			Ruff处体验
		AI
			TensorFlow.js
			BrainJS
		WebAssemble 
			GO语言入门
			Emmscripten
			WASM Api
			WASM实战
	前端知识进阶
		深入Nodejs
			c语言与内存管理机制
			nodejs源码分析
			v8引擎源码分析
			事件循环与libuv源码分析
			webkit源码分析
		数据结构与算法
			基本数据结构
			常用排序、搜索算法
			列表、栈、队列、链表等
			前端数据结构与算法JS实践
			手写Dom diff等高能算法面试题
			JavaScript ECS Stack等
			前端数据结构与算法js实践
			LeetCode 算法真题实战
		设计模式与代码实战
			单一职责原则
			开闭原则
			里氏转换原则
			迪米特法则
			接口分离原则
			依赖倒转原则
		网络安全
			前端加密技术
			前端安全策略
			OWASP
			前端靶机环境与渗透平台
	前端图形学与H5游戏
		游戏中的数学和物理与图形绘制
			计算机图形学
			canvas 2D图形绘制
			图形学知识扫盲
			数学、物理知识和图形学
		three.js入门到实战
		智慧工厂大型3D项目实战
		WebGL入门到进阶
		Cocos2D - JS快速上手开发
		Phaser核心物理引擎手把手代码实战
		DataV原理与大数据可视化
		WebSocket与WebAssemply在图形学中的应用
	云时代前端的核心技术
		容器与虚拟化技术
			K8s、Docker与虚拟机
			环境搭建
		Serverless 与 RPC
			云计算技术发展的特点
			架构师思想与落地方案
			阿里函数计算开发案例
		前端与微服务
			设计思想与落地方案案例
			权限控制与服务治理
			监控、分析与日志
			扩容、熔断、服务降级与限流
		微前端
			架构思想与落地方案案例
			SingleSPA
			模块加载、消息总线、路由分发
			静态数据共享技术方案
			构建与部署
	人工智能实践课
		Python语言
			Python语言核心技术
			Python与爬虫
			Python与自动化
		数据科学与数据分析
			python中的统计学
			Numpy实践
			Pandas实践
		深度学习与神经网络
			TensorFlow实践
			Pytorch实践


# Web全栈架构师
## Vue进阶实战
### Vue组件化设计
### 全家桶（Vuex Vue-router）
### 服务端渲染SSR(Nuxt.js)
### Typescript
### 源码分析
### 手写自己的Vue.js
## React进阶实战
### 组件化设计
### 全家桶（Redux React-Router）
### 服务端ssr渲染
### umi+ dva最佳实践
### 源码分析
### 手写React
## Node实战
### Node的IO和异步
### Web开发（Koa Eggjs）
### 手写脚手架Kkb-Cli
### 手写MVC框架
### JWT鉴权
### 企业级项目后端
### 数据库Moogoodb+mysql
### Docker部署
## 前端工程化工具
### webpack高级配置
### 手写Webpack
### 自动化测试
### 性能优化
### 算法和数据结构
### 设计模式
## 多端
### 小程序实战
### 小程序云开发
### React-native客户端
### 混合应用开发
### Fluter