# wagmi

- Wagmi 方便前端开发的库，方便与链同步数据状态
- 专为React/next.js设计，提供hooks
- 底层依赖 Viem 或 Ethers.js，自身是高层抽象
  - wagmi作为react层
  - viem作为底层引擎

```ts
import { createConfig } from 'wagmi';
import { createPublicClient, http } from 'viem';
// 配置
export const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

// 使用 useWriteContract 写入合约数据
const { writeContract, isPending, data: hash, isSuccess, isError, error } = useWriteContract();
const handleIncrement = () => {
  writeContract({
    address: COUNTER_ADDRESS as `0x${string}`,
    abi: Counter_ABI,
    functionName: 'increment',
  });
};
```

- 使用 WalletConnect
  - WalletConnect升级为Reown, 从钱包连接协议（WalletConnect）升级为专注于链上用户体验的平台
  - WalletKit：钱包开发者的工具
  - AppKit 链接的库，整合钱包功能到应用的sdk
    - 支持多种钱包登录、社交登录、网络切换（多链支持）、智能合约交互等
  - WalletKit 多链版”连接钱包“工具。功能类似RainbowKit,更侧重多链（EVM/SOL/TRON）

```ts
import {EthereumProvider } from "@walletconnect/ethereum-provider";

const handle = async ()=>{
  const provider = await EthereumProvider.init({
    // https://cloud.reown.com
    projectId: "xxx", // 从 WalletConnect Cloud 获取
    metadata: {
      name: "xx",
      description:"xx",
      url: "xx",
      icons: ["xxx"],
    },
    showQrModal: true, // 开启QR码弹窗
    optionalChains: [1, 10],
  })
}
// 会话标识符
wc: xxxxx?
expiryTimestamp=xxx& // 会话过期时间戳
relay-protocol=irn& // 消息中继协议
symKey=xxxx // 用于配对加密的对称密钥
```

- Web3Auth
  - 怎么生成钱包
  - 社交登录原理，利用多方安全计算（MPC），将私钥分片，2/3的分片可重建私钥或各自签名后合并签名
  - 3个分片：社交登录（google/X） + Auth Newwork (钱包服务商)，设备本地，备份片

## SIWE 以太坊登录

- 1. SIWE(Sign-In with Ethereum - EIP4361): 用户身份认证（后端）

```ts
const message = createSiweMessage({
  address,
  chainId: mainnet.id,
  domain: '域名',
  nonce: Math.random().toString(36).substring(2),
  uri: window.location.origin,
  version: '1',
  statement: '请签名以登录到我们的应用',
});
// 请求用户签名
const signature = await walletClient.signMessage({
  account: address,
  message,
});  

// 验证签名
const isValid = await verifySiweMessage(publicClient, {
  message,
  signature,
});
```
