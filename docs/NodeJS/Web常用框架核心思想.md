# Web 常用框架核心思想

## 多层架构

- 表现层 User Interface layer(Web Components)
- 业务逻辑层 BLL（Business Logic Layer）
- 数据访问层工厂类 DALFactory(Data access layer Factory)
- 数据访问接口层 IDAL（Interface Data access layer）
- 数据访问接口层 DLL(Data access layer)
- 数据访问 SqlServer 封装层（SQL Server Data access layer）
- 数据库集群

### MVC

- 用户输入路由（Controller）
- Controller 组装好 Model 吐给 View（用户接收）
- 用户交互 View 向 controller 要，controller 组装好 model 再次发送给 view
