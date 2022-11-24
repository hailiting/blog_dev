# GMX\_用户看板数据分析

## ETH

- 用户量
  - 存入
  - 转出
  - 花费
- 用户做合约所用量
  - 市价
    - PositionRouter
      - 开仓
        - Long CreateIncreasePosition
        - Short createIncreasePositionETH
      - 加保证金
        - Long CreateIncreasePosition
        - Short createIncreasePositionETH
      - 减保证金
        - Long createDecreasePosition
      - 平仓
        - 用户主动平仓
          - createDecreasePosition
        - 强平
          - ExecuteDecreasePosition

## 币种

ETH
WETH
BTC
LINK
UNI
USDC
USDT
DAI
FRAX

## 表

- 用户表
- Market 订单表
- Limit 订单表
- 转账

```sql
表：
GMXDapp # GMX dapp数据表

Account # 用户地址

UserToken # 币种细则列表
AccountUser # 用户细则表
IncreaseOrder # Limit 开单
DecreaseOrder # Limit 减仓
IncreasePosition # Market 开仓
DecreasePosition # Market 减仓

Yield24H # k线
Yield1W # k线
Yield1M # k线
AccumulatedPL24H # k线
AccumulatedPL1W # k线
AccumulatedPL1M # k线
AccountFunds24H # k线
AccountFunds1W # k线
AccountFunds1M # k线
```

```graphql
type Account @entity {
  id: Bytes!
  address: String!
  token: [UserToken!]!
  accountUser: AccountUser!
  increaseOrders: [IncreaseOrder!]!
  decreaseOrders: [DecreaseOrder!]!
  increasePositions: [IncreasePosition!]!
  decreasePositions: [DecreasePosition!]!
  yield24H: [Yield24H!]!
  yield1W: [Yield1W!]!
  yield1M: [Yield1M!]!
  accumulatedPL24H: [AccumulatedPL24H!]!
  accumulatedPL1W: [AccumulatedPL1W!]!
  accumulatedPL1M: [AccumulatedPL1M!]!
  accountFunds24H: [AccountFunds24H!]!
  accountFunds1W: [AccountFunds1W!]!
  accountFunds1M: [AccountFunds1M!]!
}

type GMXDapp @entity {
  liquidationUsd1H: BigInt! # uint256
  liquidationUsd24H: BigInt! # uint256
  userNumber: BigInt! # uint256
  LSRatio: BigInt! # uint256
  futuresPositionsUsd: BigInt! # uint256
}

type AccountUser @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  accountFundsPercent: BigInt!
  accountFundsUsd: BigInt!
  followNumber: BigInt!
  followGains: BigInt!
  tradingWinRatePercent: BigInt!
  day30Yield: BigInt!
  totalYield: BigInt!
  totalProceedsUsd: BigInt!
  totalTransactionsTimes: BigInt!
  totalBalanceUsd: BigInt! # uint256
  profitTimes: BigInt!
  lossesTimes: BigInt!
}
<!-- ETH WETH BTC LINK UNI USDC USDT DAI FRAX -->
type UserToken @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  tokenAddress: String!
  transactionsTimes: BigInt!
  percent: BigInt!
  accountFundsUsd: BigInt!
}

type Yield24H @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  yield: BigInt!
}
type Yield1W @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  yield: BigInt!
}
type Yield1M @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  yield: BigInt!
}
type AccumulatedPL24H @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  accumulatedPL: BigInt!
}
type AccumulatedPL1W @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  accumulatedPL: BigInt!
}
type AccumulatedPL1M @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  accumulatedPL: BigInt!
}
type AccountFunds24H @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  accountFunds: BigInt!
}
type AccountFunds1W @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  accountFunds: BigInt!
}
type AccountFunds1M @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  accountFunds: BigInt!
}


type IncreaseOrder @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  orderIndex: BigInt! # uint256
  purchaseToken: String! # address
  purchaseTokenAmount: BigInt! # uint256
  collateralToken: String! # address
  indexTokenAddress: String!
  sizeDelta: BigInt! # uint256
  isLong: Boolean!
  triggerPrice: String!
  triggerAboveThreshold: Boolean!
  executionFee: String!
  timeStamp: BigInt! # event.block.timestamp
  excuted: Boolean! # 是否平仓结束
}
type DecreaseOrder @entity {
  id: Bytes!
  orderOwner: Account!
  account: String! # address
  orderIndex: BigInt! # uint256
  collateralToken: String! # address
  collateralDelta: BigInt! # uint256
  indexTokenAddress: String!
  sizeDelta: BigInt! # uint256
  isLong: Boolean!
  triggerPrice: String!
  triggerAboveThreshold: Boolean!
  executionFee: String!
  timeStamp: BigInt!
  excuted: Boolean!
}

type IncreasePosition @entity {
  id: Bytes!
  account: String! # address
  orderOwner: Account!

  collateralToken: String! # path[path.length - 1].toHexString()
  indexTokenAddress: String!
  amountIn: BigInt! # uint256
  minOut: BigInt! # uint256
  sizeDelta: BigInt! # uint256
  isLong: Boolean!
  acceptablePrice: BigInt!
  executionFee: String!
  timeStamp: BigInt!
  excuted: Boolean!
}

type DecreasePosition @entity {
  id: Bytes!
  account: String! # address
  orderOwner: Account!
  collateralToken: String! # path[0].toHexString()
  indexTokenAddress: String!
  collateralDelta: BigInt! # uint256
  sizeDelta: BigInt! # uint256
  isLong: Boolean!
  receiver: String!
  acceptablePrice: BigInt!
  minOut: BigInt! # uint256
  executionFee: String!
  positionIndex: BigInt! # uint256
  queueIndex: BigInt! # uint256
  timeStamp: BigInt!
  excuted: Boolean!
}
```
