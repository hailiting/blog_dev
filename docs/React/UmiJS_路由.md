# UmiJS_路由
umi会根据pages目录自动生成路由配置，当然也可以通过设置根目录的``.umirc.js``来引导路由
## 约定式路由
### 1.1 基础路由
例如page文件夹下是如下目录
~~~js
├── tradecompetition
│   └── in.js
└── user
    └── login.js
~~~
那会自动生成如下路由配置
~~~js
[
    {path: '/user/login', component: './pages/user/login.js'}
    {path: '/tradecompetition/in', component: './pages/tradecompetition/in.js'}
]
~~~
### 1.2 动态路由
umi里约定，带$前缀的目录或文件为动态路由。
比如如下目录结构：
~~~js
│page
├── $post/
│   ├──index.js
│   └──comments.js
└── user
    └── $id.js
~~~
会产生如下路由
~~~js
[
    {path:'$post/', component: './pages/$post/index.js'},
    {path:'$post/comments', component: './pages/$post/comments.js'},
    {path:'user/:id', component: './pages/user/$id.js'},
]
~~~
### 1.3 可选动态路由
umi里约定动态路由如果带$后缀，则为可选动态路由。
~~~js
└── user
    └── $id$.js
=>
[
    {path: '/user/:id?', component: './pages/user/$id$.js'}
]
~~~
### 1.4 嵌套路由
umi里约定目录下有``_layout.js``时会生成嵌套路由，以``_layout.js``为该目录的layout.
~~~js
└── user
    ├── _layout.js
    ├── $id.js
    └── index.js
=>
[
    {
        path: '/user', component: './pages/user/_layout.js',
        routes: [
            {path: '/user/', component: './pages/user/index.js'},
            {path: '/user/$id', component: './pages/user/$id.js'},
        ]
    }
]
~~~
### 1.5 全局layout
约定 src/layouts/index.js为全局的路由，返回一个React组件，通过``props.children``渲染子组件
也可以根据url来渲染不同的取全局layout
~~~js
export default function(props){
    if(props.location.pathname === '/login'){
        return <SimpleLayout> {props.children} </SimpleLayout>
    }
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}
~~~
### 1.6 404路由
umi约定``pages/404.js``为404页面，需返回React组件 
tips: 开发模式下，umi会添加一个默认的404来辅助开发，不过可以通过``/404``来验证404页面。
### 1.7 通过注释扩展路由
~~~js
 index.js
 /**
 * title: Index Page
 * Routes:
 *   - ./src/routes/a.js
 *   - ./src/routes/b.js
 */
 =>
 [
  { path: '/', component: './index.js',
    title: 'Index Page',
    Routes: [ './src/routes/a.js', './src/routes/b.js' ],
  },
]
~~~
## 配置式路由
设置根目录的``.umirc.js``来配置路由
~~~js
export default {
    ...,
    routes: [
        {
            path: `/user/login`,
            component: `user/login`,
        },
        {
            path: `/tradecompetition/`,
            redirect: `/tradecompetition/index`,
        },
        {
            path: `/tradecompetition/index`,
            component: './tradecompetition/in',
        },
    ],
}
~~~
## 权限路由
umi通过Routes属性来实现
~~~js
[
  { path: '/list', component: './pages/list.js', Routes: ['./routes/PrivateRoute.js'] },
]
// 用 ./routes/PrivateRoute.js 渲染 /list
export default(props)=>{
    return (
        <div>
            <p>routes/PrivateRoute</p>
            {props.children}
        </div>
    )
}
~~~
## 路由动效
这里用``react-transition-group``
~~~js
yarn add react-transition-group
layouts/index.js
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
export default withRouter(
    ({location})=>
    <TransitionGroup>
        <CSSTransition key={location.pathname} classNames = 'fade' timeout={300}>
            { children }
        </CSSTransition>
    </TransitionGroup>
)
~~~
~~~css
//src/global.css
.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
~~~
## 面包屑
这里用插件 react-router-breadcrumbs-hoc 
~~~js
yarn add react-router-breadcrumbs-hoc 

Breakcrumbs.js

import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
  { path: '/', breadcrumb: '首页' },
  { path: '/list', breadcrumb: 'List Page' },
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>
          {breadcrumb}
        </NavLink>
        {(index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}
  </div>
));
~~~
## Scroll to top
在layout里的componentDidUpdata里决定是否要scroll to top
~~~js
import { Component } from 'react';
import withRouter from 'umi/withRouter';

class Layout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(Layout);
~~~
## 页面跳转
声明式
~~~js
import Link from 'umi/link';
export default () => (
  <Link to="/list">Go to list page</Link>
);
~~~
命令式
~~~js
import router from 'umi/router';
function goToListPage() {
  router.push('/list');
}
~~~
