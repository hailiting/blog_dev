# REST
## 什么是REST
Representational State Transfer: 表述性状态转移
一种风格、约束、设计理念
RESTFul Api 是基于REST的API设计理论
### SOAP VS REST
Simple Object Access Protocol(重、通常来说使用XML描述数据)
Rest(轻、通常来说json描述数据、无状态[1，无前后顺序 2，查询不要前置操作])
SOAP 网站后台转发代用

Restful API
GET: /movie/:mid
基于资源，增删改查都是只是对资源状态的改变
使用HTTP动词来操作资源【 get | post | delete | put ... 】
传统的GET POST 取决与参数的简单复杂
REST的GET POST 取决与数据库操作
## RESTFul API 的最佳实践
### @http 动词 （幂等性，资源安全性）
POST 创建  PUT 更新  GET 查询 DELECT 删除
### 状态码
404(资源没找到)
400(参数校验不成功)
200(查询成功)
201(post创建资源成功)
202(put更新成功（http：请求已发生，但未返回）)
401(未授权)
403(当前资源被禁止【有权限，因为某些原因不能用，a用户操作b用户行为】)
500(服务器未知错误【1，代码问题，未知bug；2，知道错误原因，但不想让客户端知道】)

### 统一描述错误：错误码、错误信息、当前URL
### 使用Token令牌授权和验证身份
cookie是浏览器行为
token更加灵活
### 版本控制
测试与生产环境分开：api.xxx.xx
                dev.api.xxx.xx
### URL语义明确
### 标准的文档

资源型  业务型
