# GMX 合约调研

## 基本资料

[合约地址](https://gmxio.gitbook.io/gmx/contracts)
[产品分析](https://www.youtube.com/watch?v=_KyDkEu0sYs)
[产品分析 github](https://github.com/Dapp-Learning-DAO/Dapp-Learning/blob/7972ece80edd6deb05222ac5932005ba021e294d/defi/GMX/Share.md)
[github 地址](https://github.com/gmx-io/gmx-contracts)
[交易指南](https://gmxio.gitbook.io/gmx/trading)
[项目官网](https://gmx.io/#/)
[经济模型文章链接](https://www.panewslab.com/zh/articledetails/43mbrzzo.html)

- OrderBookReader 获取当前用户持仓

## 合约

### core

#### PositionRouter

##### Event

- CreateIncreasePosition 创建仓位
- CreateDecreasePosition close 仓位

- ExecuteIncreasePosition 追加保证金
- ExecuteDecreasePosition 减少保证金

- CancelIncreasePosition 取消加仓
- CancelDecreasePosition 取消减仓

- SetPositionKeeper 设置位置保持器
- SetMinExecutionFee 设置最低执行费
- SetIsLeverageEnabled 设置是否启用杠杆
- SetDelayValues 设置延迟值
- SetRequestKeysStartValues 设置请求键起始值
- SetCallbackGasLimit 设置回调 gas 限制
- Callback

CreateIncreasePosition

```js
// 抵押品必须为WBTC，WETH，UNI，LINK这四种非稳定币
event CreateIncreasePosition(
  address indexed account,
  address[] path,
  address indexToken,
  uint256 amountIn,
  uint256 minOut,
  uint256 sizeDelta,
  bool isLong,
  uint256 acceptablePrice,
  uint256 executionFee,
  uint256 index,
  uint256 queueIndex,
  uint256 blockNumber,
  uint256 blockTime,
  uint256 gasPrice
);
// key-> keccak256(abi.encodePacked(_account, _index))
// increasePositionsIndex[account]
// increasePositionRequests[key]
// increasePositionRequestKeys[key]
const a = {
  account: msg.sender,
  // _path allows swapping to the collateralToken if needed
  path: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1"],
  // WETH address
  indexToken: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  amountIn: 10000000000000000, // 0.01 eth
  // 要交换的抵押代币的最小数量； 如果不需要交换，则为零
  minOut: 0,
  // 大小差异
  sizeDelta: 50768139743206926573000000000000,
  // 做多还是做空
  isLong: True,
  // 开仓时接受的最高（多头）或最低（空头）指数价格的美元值
  acceptablePrice: 1088505750000000000000000000000000,
  // show be larger than or equal to minExecutionFee 显示大于或等于 minExecutionFee
  executionFee: 100000000000000, // 0.0001eth
  index: 1, // increasePositionsIndex[account]
  queueIndex: 114642, // increasePositionRequestKeys.length-1 队列
  blockNumber: 16024986,
  blockTime: 1669113289,
  gasPrice: 100000000 // tx.gasprice
}
```

CreateDecreasePosition

```js
// 开空，抵押品必须是USDC,USDT,DAI,MIM,FRAX这五种稳定币
event CreateDecreasePosition(
    address indexed account,
    address[] path,
    address indexToken,
    uint256 collateralDelta,
    uint256 sizeDelta,
    bool isLong,
    address receiver,
    uint256 acceptablePrice,
    uint256 minOut,
    uint256 executionFee,
    uint256 index,
    uint256 queueIndex,
    uint256 blockNumber,
    uint256 blockTime
);
// key-> keccak256(abi.encodePacked(_account, _index))
// decreasePositionsIndex[account]
// decreasePositionRequests[key]
// decreasePositionRequestKeys[key]
const a = {
  account: msg.sender,
  // _path allows swapping to the collateralToken if needed
  path: ["0x82af49447d8a07e3bd95bd0d56f35241523fbab1"],
  // WETH address
  indexToken: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  // 平仓抵押品金额
  collateralDelta: 0,
  sizeDelta: 50768139743206926573000000000000,
    // 做多还是做空
  isLong: true,
  receiver: 0x5458b8f9453d93b14ed132c118f7f6ad5b4f20de,
  // 平仓时接受的最高（多头）或最低（空头）指数价格的美元值
  acceptablePrice: 1082662240000000000000000000000000,
  // 要交换的抵押代币的最小数量； 如果不需要交换，则为零
  minOut: 0,
  // show be larger than or equal to minExecutionFee 显示大于或等于 minExecutionFee
  executionFee: 100000000000000,
  index: 1, // decreasePositionsIndex[account]
  queueIndex: 74753, // decreasePositionRequestKeys.length-1 队列
  blockNumber: 16025056, //   block.number
  blockTime: 1669114134, // block.timestamp
}
```

other

```js
event ExecuteIncreasePosition(
    address indexed account,
    address[] path,
    address indexToken,
    uint256 amountIn,
    uint256 minOut,
    uint256 sizeDelta,
    bool isLong,
    uint256 acceptablePrice,
    uint256 executionFee,
    uint256 blockGap,
    uint256 timeGap
);

event CancelIncreasePosition(
    address indexed account,
    address[] path,
    address indexToken,
    uint256 amountIn,
    uint256 minOut,
    uint256 sizeDelta,
    bool isLong,
    uint256 acceptablePrice,
    uint256 executionFee,
    uint256 blockGap,
    uint256 timeGap
);

event ExecuteDecreasePosition(
    address indexed account,
    address[] path,
    address indexToken,
    uint256 collateralDelta,
    uint256 sizeDelta,
    bool isLong,
    address receiver,
    uint256 acceptablePrice,
    uint256 minOut,
    uint256 executionFee,
    uint256 blockGap,
    uint256 timeGap
);

event CancelDecreasePosition(
    address indexed account,
    address[] path,
    address indexToken,
    uint256 collateralDelta,
    uint256 sizeDelta,
    bool isLong,
    address receiver,
    uint256 acceptablePrice,
    uint256 minOut,
    uint256 executionFee,
    uint256 blockGap,
    uint256 timeGap
);

event SetPositionKeeper(address indexed account, bool isActive);
event SetMinExecutionFee(uint256 minExecutionFee);
event SetIsLeverageEnabled(bool isLeverageEnabled);
event SetDelayValues(uint256 minBlockDelayKeeper, uint256 minTimeDelayPublic, uint256 maxTimeDelay);
event SetRequestKeysStartValues(uint256 increasePositionRequestKeysStart, uint256 decreasePositionRequestKeysStart);
event SetCallbackGasLimit(uint256 callbackGasLimit);
event Callback(address callbackTarget, bool success);

```

#### Limit -> OrderBook

##### Event

- CreateIncreaseOrder 创建增加订单
- CreateDecreaseOrder 创建减少订单
- CreateSwapOrder 创建交换订单
- CancelIncreaseOrder 取消增加订单
- CancelDecreaseOrder 取消减少订单
- CancelSwapOrder 取消交换订单
- ExecuteIncreaseOrder 执行增加订单
- ExecuteDecreaseOrder 执行减少订单
- ExecuteSwapOrder 执行 SwapOrder
- UpdateIncreaseOrder 更新增加订单
- UpdateDecreaseOrder 更新减少订单
- UpdateSwapOrder 更新交换订单
- Initialize 初始化
- UpdateMinExecutionFee 更新 MinExecutionFee
- UpdateMinPurchaseTokenAmountUsd 更新最低购买令牌金额（美元）
- UpdateGov 更新 Gov
- wrong

CreateIncreaseOrder

```js
event CreateIncreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address purchaseToken,
    uint256 purchaseTokenAmount,
    address collateralToken,
    address indexToken,
    uint256 sizeDelta,
    bool isLong,
    uint256 triggerPrice,
    bool triggerAboveThreshold,
    uint256 executionFee
);
event CancelIncreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address purchaseToken,
    uint256 purchaseTokenAmount,
    address collateralToken,
    address indexToken,
    uint256 sizeDelta,
    bool isLong,
    uint256 triggerPrice,
    bool triggerAboveThreshold,
    uint256 executionFee
);
event ExecuteIncreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address purchaseToken,
    uint256 purchaseTokenAmount,
    address collateralToken,
    address indexToken,
    uint256 sizeDelta,
    bool isLong,
    uint256 triggerPrice,
    bool triggerAboveThreshold,
    uint256 executionFee,
    uint256 executionPrice
);
event UpdateIncreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address collateralToken,
    address indexToken,
    bool isLong,
    uint256 sizeDelta,
    uint256 triggerPrice,
    bool triggerAboveThreshold
);
event CreateDecreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address collateralToken,
    uint256 collateralDelta,
    address indexToken,
    uint256 sizeDelta,
    bool isLong,
    uint256 triggerPrice,
    bool triggerAboveThreshold,
    uint256 executionFee
);
event CancelDecreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address collateralToken,
    uint256 collateralDelta,
    address indexToken,
    uint256 sizeDelta,
    bool isLong,
    uint256 triggerPrice,
    bool triggerAboveThreshold,
    uint256 executionFee
);
event ExecuteDecreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address collateralToken,
    uint256 collateralDelta,
    address indexToken,
    uint256 sizeDelta,
    bool isLong,
    uint256 triggerPrice,
    bool triggerAboveThreshold,
    uint256 executionFee,
    uint256 executionPrice
);
event UpdateDecreaseOrder(
    address indexed account,
    uint256 orderIndex,
    address collateralToken,
    uint256 collateralDelta,
    address indexToken,
    uint256 sizeDelta,
    bool isLong,
    uint256 triggerPrice,
    bool triggerAboveThreshold
);
event CreateSwapOrder(
    address indexed account,
    uint256 orderIndex,
    address[] path,
    uint256 amountIn,
    uint256 minOut,
    uint256 triggerRatio,
    bool triggerAboveThreshold,
    bool shouldUnwrap,
    uint256 executionFee
);
event CancelSwapOrder(
    address indexed account,
    uint256 orderIndex,
    address[] path,
    uint256 amountIn,
    uint256 minOut,
    uint256 triggerRatio,
    bool triggerAboveThreshold,
    bool shouldUnwrap,
    uint256 executionFee
);
event UpdateSwapOrder(
    address indexed account,
    uint256 ordexIndex,
    address[] path,
    uint256 amountIn,
    uint256 minOut,
    uint256 triggerRatio,
    bool triggerAboveThreshold,
    bool shouldUnwrap,
    uint256 executionFee
);
event ExecuteSwapOrder(
    address indexed account,
    uint256 orderIndex,
    address[] path,
    uint256 amountIn,
    uint256 minOut,
    uint256 amountOut,
    uint256 triggerRatio,
    bool triggerAboveThreshold,
    bool shouldUnwrap,
    uint256 executionFee
);

event Initialize(
    address router,
    address vault,
    address weth,
    address usdg,
    uint256 minExecutionFee,
    uint256 minPurchaseTokenAmountUsd
);

```

#### Vault

##### Event

- BuyUSDG
- SellUSDG
- Swap
- IncreasePosition
- DecreasePosition
- LiquidatePosition
- UpdatePosition
- ClosePosition
- UpdateFundingRate
- UpdatePnl
- CollectSwapFees
- CollectMarginFees
- DirectPoolDeposit
- IncreasePoolAmount
- IncreaseUsdgAmount
- DecreaseUsdgAmount
- IncreaseReservedAmount
- DecreaseGuaranteedUsd

```
合约
	做空
		市价交易
			开仓
			追加保证金
			减少保证金
			平仓
				强平
				收益平仓
			未实现盈利  实现盈利
		限价交易
	做多
		第一步: Router
0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064
			Approve Plugin
				https://arbiscan.io/tx/0xb52765a115de78c1b61f6b995d28287470f6c4f933e777526ba4c3cdfe57ecdb
		市价Market
			第二步: PositionRouter  CreateIncreasePosition

 0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868
				交易hash: https://arbiscan.io/tx/0xcd6fda3f32ab56f671542924fa19ce09ccd9829bacf03591ccee2e510b8e117c
			第三步：CreateDecreasePosition
 PositionRouter

 https://arbiscan.io/tx/0xcfb00089eb9d59b6a0ec913d7bba1bc300b3a5e7c76919ee1f8bb296aab3da38
			第四步：ExecuteIncreasePosition      https://arbiscan.io/tx/0xc291909f955a6874a12e2bc5ffc9c158e059d36a2408b2c17c6ca0793a041981#eventlog
		限价Limit
			第一步: Approval

https://arbiscan.io/tx/0x4d8680e3168da6d289cf95b6738faa3c644fe23aa50ee192626605d2af410a35
			第二步：CreateIncreaseOrder  https://arbiscan.io/tx/0x435cba44f521bafeaf74005ea86dcdb2e029de4752739e78eba22461101306f7
			第三步：  ExecuteIncreaseOrder

https://arbiscan.io/tx/0xc3087f7e176282a0f94fa63e88c588cf1ea78278c8141f5654f7e13e10404a20#eventlog
			第四步：CreateDecreaseOrder https://arbiscan.io/tx/0x1048504aa8c9f648ed4aea642b14b5105e7f92aa0fe3557c272e79f095581c47#eventlog
		swap
			第二步：OrderBook
			CreateSwapOrder :

https://arbiscan.io/tx/0x7f8959c6ea87d11ea246938b002c5da3c9a700d149401cf2bae56d4da7bfefc5
			UpdateSwapOrder :

https://arbiscan.io/tx/0x725a326550a6dfc62d189b83a4da903fc1ac9750f8cf72fdcbb206228fcf9bad#eventlog
	当时token的价格
	合约规则
		最小订单10u
	用户
		盈利
	本金
		钱包 + 合约
	收益率=> 盈利/本金
```
