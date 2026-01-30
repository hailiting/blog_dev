# Webpack 打包优化和性能分析

## 打包优化策略

- 代码分割与 Tree Shaking
  - 配置 splitChunks
  - TerserPlugin 压缩
- 构建性能优化
  - `thread-loader`加速 Babel 编译
  - `cache-loader` 或 Webpack5 的持久化缓存
    - `cache: {type: "filesystem"}`
- 资源压缩与 CDN 部署
