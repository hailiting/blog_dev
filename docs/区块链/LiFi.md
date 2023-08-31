# LiFi

Li.Fi 是一种跨链桥接聚合协议，通过聚合桥接并将它们连接到 DEX 聚合器来支持任意交换

## npm 包

`@lifi/sdk`允许访问 LiFiAPI, 它可以在不同的网桥和交易所找到最佳的跨链路由，然后通过 SDK 执行路由

```bash
npm install --save @lifi/sdk
or
yarn add @lifi/sdk
```

```js
// 初始化
const lifi = new LIFI(config)

type ConfigUpdate = {
  apiUrl?: string;
  rpcs?: Record<number, string[]>
  multicallAddress?: Record<number, string | undefined>
  defaultExecutionSettings?: ExecutionSettings
  defaultRouteOptions?: RouteOptions
}
interface RouteOptions {
  order?: Order; // 'RECOMMENDED'推荐的 | 'FASTEST' | "CHEAPEST" | "SAFEST"
  slippage?: number; // 以小数点表示 0.03 =? 3%
  infiniteApproval?: boolean; // 无限批准
  allowSwitchChain?: boolean;
  integrator?: string;
  fee?: number; // 以小数点表示 0.03 =? 3%
  bridges?: AllowDenyPrefer;
  exchanges?: AllowDenyPrefer;
}
interface AllowDenyPrefer {
  allow?: string[] // 允许
  deny?: string[] // 拒绝
  prefer?: string[] // 首选
}

const routeOptions = {
  bridges: {
    allow: ["connext"]
  },
  exchanges: {
    deny: ["1inch"]
  }
}
```

### `getRoute`

```js
// step1:
interface RoutesRequest {
  fromChainId: number;
  fromAmount: string;
  fromTokenAddress: string;
  fromAddress?: string;
  toChainId: number;
  toTokenAddress: string;
  toAddress?: string;
  options?: RouteOptions;
}
const routeOptions = {
  slippage: 3 / 100,
  order: "RECOMMENDED",
};
const routesRequest = {
  fromChainId: 100,
  fromAmount: "1000000", //1usdt
  fromTokenAddress: "0x4ecaba5870353805a9f068101a40e0f32ed605c6",
  toChainId: 56,
  toTokenAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
  options: routeOptions,
};
const result = await LiFi.getRoutes(routesRequest);
const routes = result.routes;
```

### `executeRoute`

```js
async function executeRoute (
  signer: Signer,
  route: Route,
  settings?: ExecutionSettings
): Promise<Route>
interface ExecutionSettings {
  updateCallback?: CallbackFunction
  switchChainHook?: SwitchChainHook
}
```

#### 基于 Broken link 中的代码，选择一条路线并执行它

```js
// getting routes
const routeOptions = {...}
const routeRequest = {...}
const result = await Lifi.getRoutes(routesRequset)
const routes = result.routes;
const chosenRoute = routes[0]
const updateCallback = (updatedRoute: Route)=>{
  console.log('Ping! Everytime a status update is made!')
}
const route = await LiFi.executeRoute(signer, chosenRoute, {...updateCallback})
```

### 获取支持的链和 swap

```js
const getTools = async () => {
    const result = await axios.get('https://li.quest/v1/tools');
    return result.data;
}
{
  "bridges": [
    {
      "key": "avalanche",
      "name": "AVAX Bridge",
      "logoURI": "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/bridges/avalanche.png"
    },
    ... more bridges will come here
  ],
  "exchanges": [
    {
      "key": "quickswap",
      "name": "Quickswap",
      "logoURI": "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/exchanges/quick.png"
    },
    ... more exchanges will come here
  ]
}
```

### 获取所有 chain

```js
const getChains = async () => {
  const result = await axios.get("https://li.quest/v1/chains");
  return result.data;
};
{
  "chains": [
    {
      "id": 1,
      "key": "eth",
      "name": "Ethereum",
      "coin": "ETH",
      "mainnet": true,
      "logoURI": "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.png",
      "tokenlistUrl": "https://gateway.ipfs.io/ipns/tokens.uniswap.org",
      "multicallAddress": "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
      "metamask": { // this information is required to add the chain to your MetaMask wallet
        "chainId": "0x1",
        "blockExplorerUrls": [
          "https://etherscan.io/"
        ],
        "chainName": "Ethereum Mainnet",
        "nativeCurrency": {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18
        },
        "rpcUrls": [
          "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        ]
      }
    },
    ... // all other supported chains will be present in the list
  ]
}
```
