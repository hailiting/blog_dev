# Flutter 项目优化

- 代码优化
  - 封装，组件化，删除冗余代码
- 包大小
  - 压缩本地图片
  - 使用单架构 so 只使用`abiFilters 'armeabi-v7a'`
- 流畅性优化
  - 按需创建页面
  - 按需 AutomaticKeepAliveClientMixin
  - 耗时的计算放到独立的 isolate
- 内存优化
  - 图片优化 - 根据控件大小加载指定分辨率的图片
  - 列表优化
    - 分页加载
    - 使用 ListView.build()来复用子控件
    - 防止内存泄漏，dispose 需要销毁的 listener 等
