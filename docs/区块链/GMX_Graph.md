# GMX_Graph

```shell
# 1
npm install -g @graphprotocol/graph-cli
# 2 网站注册 获取
# SUBGRAPH SLUG
# https://thegraph.com/studio/subgraph/avault/
# 3 init
graph init --studio <SUBGRAPH_SLUG>

# graph init \
#     --studio \
#     --protocol ethereum \
#     --from-contract 0xc2c747e0f7004f9e8817db2ca4997657a7746928 \
#     --index-events \
#     --contract-name Hashmasks \
#     --network mainnet \
#     hashmasks hashmasks-subgraph
```

```js
// 账户资金  当前链的整个资产（GMX支持的token）
const tokens = [
  "ETH",
  "WETH",
  "BTC",
  "LINK",
  "UNI",
  "USDC",
  "USDT",
  "DAI",
  "FRAX",
];

function accountFundsUsd(blockNumber: number) {
  for (let i = 0; i < token.length; i++) {}
  const tokenBalanceUsd = Promise.all(
    tokens.map((token) => {
      return getTokenBalance(token, blockNumber);
    })
  );
  return tokenBalanceUsd.reduce((a, b) => a + b);
}
function getTokenBalanceUsd(tokenAddress, blockNumber) {
  // "user address - token address"
  let balance = Balance.load(
    user.address.toHexString() + token.address.toHexString()
  );
  let tokenPrice = TokenPrice.load(event.address.toHexString());
  return balanceFrom.balance.mul(tokenPrice.price);
}

profitTimes;
lossesTimes;

function positClose() {
  const priceDelta = averagePrice.gt(price)
    ? averagePrice.sub(price)
    : price.sub(averagePrice);
  let delta = size.mul(priceDelta).div(averagePrice);
  const pendingDelta = delta;

  const hasProfit = isLong ? price.gt(averagePrice) : price.lt(averagePrice);
  const minBps = 150;
  if (hasProfit && delta.mul(BASIS_POINTS_DIVISOR).lte(size.mul(minBps))) {
    delta = bigNumberify(0);
  }

  const deltaPercentage = delta.mul(BASIS_POINTS_DIVISOR).div(collateral);
  const pendingDeltaPercentage = pendingDelta
    .mul(BASIS_POINTS_DIVISOR)
    .div(collateral);

  return {
    delta,
    pendingDelta,
    pendingDeltaPercentage,
    hasProfit,
    deltaPercentage,
  };
}

function ordering() {
}

// 本金是100%吧，150%是250对吧，那100%就是166.7
// 就是上面那个情况，我们视为他从166.7赚了83.3，就是当前250，而且50%收益率
function accountFundsPercent(){
  const balance = accountFundsUsd()
  const totalProceedsUsd=
}


盈利 = （当前减仓价格 - 平均开仓价格）* 当前减仓数量

当前盈利百分比 = 盈利/当前用户保证金余额

平均开仓价格 = 开仓1价格 *（开仓1数量/当前总仓位） + 开仓2价格 *（开仓2数量/当前总仓位） + ...
=》 平均开仓价格_now = 平均开仓价格_old * （总仓位_old / 总仓位_now） + 最新开仓价格 *（最新开仓数量/总仓位_now）

size 开的倍数
collateral   -> sizeDelta  保证金
isLong  ->  isLong
averagePrice   平均价格  -> acceptablePrice
price 当前价格

export function calculatePositionDelta({ size, collateral, isLong, averagePrice, price }) {
  const priceDelta = averagePrice.gt(price) ? averagePrice.sub(price) : price.sub(averagePrice)
  let delta = size.mul(priceDelta).div(averagePrice)
  const pendingDelta = delta

  const hasProfit = isLong ? price.gt(averagePrice) : price.lt(averagePrice)
  const minBps = 150

  const BASIS_POINTS_DIVISOR = 10000;
  if (hasProfit && delta.mul(BASIS_POINTS_DIVISOR).lte(size.mul(minBps))) {
    delta = bigNumberify(0)
  }

  const deltaPercentage = delta.mul(BASIS_POINTS_DIVISOR).div(collateral)
  const pendingDeltaPercentage = pendingDelta.mul(BASIS_POINTS_DIVISOR).div(collateral)

  return {
    delta,
    pendingDelta,
    pendingDeltaPercentage,
    hasProfit,
    deltaPercentage
  }
}

```
