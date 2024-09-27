#

## 设置编译工作流

1. 新建项目

```bash
npm init -y
yarn add typescript ts-node @types/node @swc/core --dev
```

2. 新建`tsconfig.json`

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "ts-node": {
    "transpileOnly": true,
    // swc 转译器
    "transpiler": "ts-node/transpilers/swc"
  }
}
```

3. 安装 TON 相关插件

```bash
yarn add ton-core ton-crypto @ton-community/func-js --dev
```

##

`impure`

### 开发合约

保存并更新发件人地址

```fc
#include "imports/stdlib.fc";

;; cell 是一组bit, 是信息内部的第一个bit
() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {
  ;; 解析cell
  slice cs = in_msg.begin_parse();
  ;; 读出前4位
  int flags = cs~load_uint(4);
  ;; 发送地址
  slice sender_address = cs~load_msg_addr();
  ;; store_slice 存储判断 用新cell替换旧cell
  set_data(begin_cell().store_slice(sender_address).end_cell());
}
;; 在函数之外
slice get_the_latest_sender() method_id {
  slice ds = get_data().begin_parse();
  return ds~load_msg_addr();
}
```

### 测试

```bash
# sandbox TON沙盒
yarn add @ton-community/sandbox jest ts-jest @types/jest ton --dev
```
