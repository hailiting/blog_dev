# Pandas And Matplotlib

## Pandas

`https://pandas.pydata.org`
`pip install pandas`

## Matplotlib

https://matplotlib.org/stable/

`pip install matplotlib`

https://github.com/matplotlib/mplfinance

`pip install --upgrade mplfinance`

```py
import pandas as pd
import matplotlib.pyplot as plt
import mplfinance as mpf
# 读
def main():
  df = pd.read_csv("aapl.csv",
  header=None,
  names=["Date","Close","High","Low","Open","Volume"])
  # print(df.head(10))
  # print(df.index) # 总览
  # 获取这一列
  df.index =pd.to_datetime( df["Date"]) # 让 Date 成为索引
  df = df.drop(columns=["Date"])
  # drop_duplicates
  # print(df.head(5))
  # 检查缺失值
  # print(df.isnull())
  # 统计null值的数量
  # print(df.isna().sum())
  df_nan = df;
  # df_nan["Na"] = pd.NA

  # print(df_nan.isna().sum())
  # print(df_nan.index)
  # 输出聚合统计信息 .describe()
  # print(df.describe())
  # count 数量
  # mean 均值
  # std 标准差 Standard Deviation
  # min 最小值
  df_100 = df.tail(100)[["Open", "High", "Low", "Close", "Volume"]]
  # (close-open)/open *100
  # df_100["Rate"] = (df_100["Close"]-df_100["Open"])/df_100["Open"] *100
  df_100.round(2)
  # print(df_100)
  # df_100.plot()
  # plt.show()
  # df_100["Close"].plot()
  # plt.show()
  # 蜡烛图 开盘 收盘 最低 最高
  mpf.plot(df_100,type="candle", mav=(3, 6, 9))
  mpf.show()
if __name__ == "__main__":
  main()

```
