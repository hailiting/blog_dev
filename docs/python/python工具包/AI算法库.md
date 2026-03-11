# AI算法库

- `scikit-learn.org`
- `PyTorch`
  - facebook
  - 核心模块：`tensor`, `nn(神经网络)`, `optim`
- `TensorFlow`
  - google
  - 核心模块：tensor, keras, data

## Scikit Learn

`pip install scikit-learn`

- Classification 分类
  - 算法
    - 梯度提升 Gradient boosting
    - 最近邻(KNN算法的核心概念) nearest neighbors
    - 随机森林(一种集成学习算法，常用于分类和回归) Random
    - 逻辑回归 解决二分类的问题 Logistic Regression
- Regression 回归
  - 线性模型 Linear Models
- Clustering 聚类
- Dimensionality reduction 降维
- Model selection 模型选择
  - 算法
    - 网格搜索 Grid search
    - 交叉验证 Cross validation
    - 评估指标 metrics
- Preprocessing 预处理
  - 算法
    - Preprocessing
    - 特征提取 Feature extraction

```py
import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

def main():
  df = pd.read_csv(
    "aapl.csv",
    header=None,
    index_col="Date",
    usecols=["Date","Close"],
    names=["Date","Close","High","Low","Open","Volume"],
  )
  X = df[:-1] # 不要最后一个
  Y = df[1:] # 不要第一个
  # print(df.head(5))
  # 创建并训练模型
  model = LinearRegression()
  model.fit(X,Y)
  print(model.coef_, model.intercept_)
  # y = model.coef_* x + model.intercept_
  print("!",model.coef_* 222 + model.intercept_)
  print("!!",model.predict([[222]]))
  plt.scatter(X,Y)
  # plt.plot(X, Y, color = "red", label="Regression Line") # plot 折线图
  # X 已有的  Y 次日的
  plt.plot(X, model.predict(X), color = "red", label="Regression Line") # plot 折线图
  plt.show()
if __name__ == "__main__":
  main()
```
