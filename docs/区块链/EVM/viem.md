# viem

```shell
pnpm install viem / npm install viem
```

```tsx
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
// 只读
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});
const blockNumber = await client.getBlockNumber();

// 写
const client = createWalletClient({
  account,
  chain: foundry,
  transport: http(process.env.RPC_URL!),
}).extend(publicActions);
const address = await client.getAddress();
const hash = await client.sendTransaction({
  account,
  to: '',
  value: parseEther('0.001'),
});
```

## 与合约交互

- 读
  - 一
    - 1. 创建client
    - 2. 创建合约对象
    - 3. 合约获取数据
  - 二
    - 1. 创建client
    - 2. 用client的readContract （合约地址 + ABI + 参数）

```ts
const contract = getContract({
  address: TOKEN_ADDRESS,
  abi: token_abi,
  client: {
    public: publicClient,
    wallet: walletClient, // 要写的话
  },
});
contract.read.balanceOf({ userAddress });

publicClient.readContract({
  address: TOKEN_ADDRESS,
  abi: token_abi,
  functionName: 'balanceOf',
  args: [address.toString],
});
```

- 写

```ts
const contract = getContract({
  address: COUNTER_ADDRESS,
  abi: Counter_ABI,
  client: {
    public: publicClient,
    wallet: walletClient,
  },
});
contract.write.increment();

walletClient.writeContract({
  address: COUNTER_ADDRESS,
  abi: Counter_ABI,
  functionName: 'increment',
  args: [],
});
```

- 等待确认

```ts
const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
console.log({ receipt: receipt.status === 'success' ? '成功' : '失败' });
```

```ts
// 监听
const receipt = await publicClient.waitForTransactionReceipt({
  hash: tx,
});
const transferLogs = await parseEventLogs({
  abi: ERC20_ABI,
  eventName: 'Transfer',
  logs: receipt.logs,
});
for (const log of transferLogs) {
  const eventLog = log as unknown as { eventName: string; args: { from: string; to: string; value: bigint } };
  if (eventLog.eventName === 'Transfer') {
    console.log('转账事情详情：');
    console.log(`从：${eventLog.args.from}`);
    console.log(`到：${eventLog.args.to}`);
    console.log(`金额：${eventLog.args.value}`);
  }
}

// 实时监听链上发生的事件
publicClient.watchEvent({
  address: ERC20_ADDRESS,
  event: {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { type: 'address', name: 'from', indexed: true },
      { type: 'address', name: 'to', indexed: true },
      { type: 'uint256', name: 'value' },
    ],
  },
  onLogs: (logs) => {},
});
```

- 使用用户钱包来创建

```ts
const walletClient = createWalletClient({
  chain: foundry,
  transport: custom(window.ethereum),
});
```
