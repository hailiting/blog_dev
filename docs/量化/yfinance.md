# yfinance

```shell
pip install yfinance
```

```py
import yfinance as yf
dat = yf.Ticker("MSFT")
# 基本信息摘要，100多项关键数据
# 包括：市值、市盈率、股息率、业务板块、员工数、总部位置
dat.info
# 获取公司的重要财务日程安排
# 包括：下一次财报发布日期、年度股东大会日期、除息日等
# Ex-Dividend Data
# Revenue: 公司通过销售商品或服务获得的总收入，也叫 营收 或 销售额
# Earnings: 从Revenue中扣除所有成本、费用、税之后剩下的净利润，也叫“盈利”或”利润“
dat.calendar
# 华尔街分析师对股价的预测
# 包含：各投行的目标价、评级（买入/持有/卖出）、分析师姓名、预测日期。
dat.analyst_price_targets
# 获取最近几个季度的利润表。
# 包含内容：营收、毛利率、运营费用、净利润、每股收益等季度数据。
dat.quarterly_income_stmt
dat.quarterly_financials
# 功能：获取过去1个月的历史行情数据。
# 包含内容：每日的开盘价、最高价、最低价、收盘价、成交量。
# 参数变化：可改为"1d"、"1y"、"max"等获取不同时段数据。
dat.history(period="1mo")
# Dividends 分红
data Open        High         Low       Close    Volume  Dividends  Stock Splits
# 获取最近到期日的看涨期权（Call）合约数据。
# 分解理解：
# dat.options：获取所有可交易的期权到期日列表
# dat.options[0]：取列表第一个，即最近的到期日
# dat.option_chain(日期)：获取该到期日的所有期权链
# .calls：只看涨期权部分
# 包含内容：执行价、最后交易价、持仓量、隐含波动率等期权数据。
dat.option_chain(dat.options[0]).calls
```

## 处理缺失值、异常波动

- 缺失
  - 填充
    - 用前一天的数据补上今天缺值，保证价格的连续性
      - `data.fillna(method="ffill", inplace=True)=100`
  - 插值
    - 用缺失点的前后数据，按一定规则估算出来，更平滑
      - `data.interpolate(method="linear", inplace=True)=101`
  - 删除
    - 把有缺失值的整行数据去掉，可能会导致数据不足
      - `data.dropna(inplace=True)`
- 异常
  - 明显偏离正常范围的“离群点”
    - 股价/成交量突然飙升或暴跌：100->5000->102
    - 数据源错误：小数点错位 10.0->100
    - 极端市场事件：2020年原油期货价格跌至 -37 美元
    - 复权处理不当：股票除权除息，导致股价突然减半或翻倍
  - 先检测
    - 统计
      - 标准差法 σ(Sigma 希腊字母表的第18个字母) 四方位距发 IQR
    - 技术分析
      - 波动率突增检测、布林带（Bollinger Bands）
    - 业务规则
      - 对比历史数据、参考新闻事件
  - 后调整
    - 修正
      - 线性插值：用前后正常值填充（适合孤立异常点）
      - 复权处理：使用Adj Close 或手动复权
    - 剔除
      - 直接删除异常时段数据
    - 特殊处理
      - 极端市场事件保留（2020年的负油价）
  ```py
  mean = data["Close"].mean()
  std=data["Close"].std()
  outliners = data[(data["Close"]>mean+3*std) | (data["Close"]<mean-3*std)]
  ```


