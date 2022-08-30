# Http 请求中 token 和 cookie 有什么区别

## 现在浏览器开始禁止第三方 cookie

- 和跨域限制不同，这里是：禁止网页引入第三方 js 设置 cookie
- 打击第三方广告，保护用户隐私
- 新增属性`SameSite: Strict/Lax/None;` 值可自己选择

## cookie 和 session

- cookie 用于登录验证，存储用户标识（如 userId）
- session 在服务端，存储用户详细信息，和 cookie 信息一一对应
- cookie+session 是常见的登录验证的解决方案

```js
// 登录  用户名  密码
// set-cookie userId: "x2"
// cookie userId: "x2"

// 服务端 - 缓存
const session = {
  x1: {
    username: "x1",
    phone: "177xx",
  },
  x2: {
    username: "x2",
    phone: "187xx",
  },
};
```

## token vs cookie

- cookie 是 http 规范，而 token 是自定义传递
- cookie 会默认被浏览器存储（跨域之间不共享），而 token 需要自己存储
- token 默认没有跨域限制

### JWT (Json Web Token)

#### 区别

- session 存储体积大 cookie 存储体积小
- token 信息存储到客户端

## Session 和 JWT

- session 优点
  - 用户信息存储在服务端，可快速封禁用户信息
- session 缺点

  - 占用服务端内存，硬件成本高
  - 多进程，多服务器时，不好同步——需要使用第三方缓存，如 redis

- JWT 缺点
  - 用户信息存储在客户端，无法快速封禁某用户（黑名单）
  - 万一服务端密钥被泄漏，则用户信息全部丢失
  - token 体积大于 cookie, 会多 1-2kb 的流量

### 使用场景

- 如果严格管理用户信息需求（保密、快速封禁）推荐使用 session
- 如果没有特殊要求，则使用 JWT（如创业初期网站）

## 如何实现 SSO(Single Sign On) 单点登录

### 基于 cookie

- cookie 默认不可跨域共享，但某些情况下可设置为共享
- 主域名相同，如`www.baidu.com`与`image.baidu.com`
  - cookie 设置顶级域名

### SSO

- 主域名完全不同，则 cookie 无法共享
- 登录 用户信息的保存 用户信息的验证 在 sso 网站完成

### OAuth 2.0

- 扫码、三方登录需要遵从`OAuth2.0规范`
