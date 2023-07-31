# yarn

## yarn workspace

yarn workspace 命令是用于在 Yarn 的多包工作区中运行命令、安装依赖、移除依赖、执行脚本命令。它简化了多包项目的管理和操作，提供了方便的方式来处理工作区中的包。

- 运行命令: `yarn workspace <package_name> <command>`
  - 在指定的包中运行命令。例如：`yarn workspace my-package build`，在名为 "my-package" 的包中执行 "build" 命令
- 安装依赖: `yarn workspace <package_name> add <dependency>`
  - 在指定的包中安装依赖。例如：`yarn workspace my-package add react`，在名为 "my-package" 的包中安装 "react" 依赖
- 移除依赖: `yarn workspace <package_name> remove <dependency>`
  - 在指定的包中移除依赖。例如：`yarn workspace my-package remove lodash`，在名为 "my-package" 的包中移除 "lodash" 依赖
- 执行脚本: `yarn workspace <package_name> run <script>`
  - 在指定的包中执行脚本。例如：`yarn workspace my-package run start`，在名为 "my-package" 的包中执行名为 "start" 的脚本
