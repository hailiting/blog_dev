from __future__ import annotations

import argparse  # 标准库: 专门用来解析命令行参数的模块
import math  # 标准库: 数学函数，比如平方根
from dataclasses import dataclass  # dataclass 是一种简化“数据类”的语法，这里暂时没用到
from typing import Sequence, List  # 类型标注用: Sequence 表示“序列类型”，List 表示“列表”

import numpy as np  # 第三方库: NumPy，做数值运算、数组运算非常方便


# =========================
# 一、基础收益率函数
# =========================


def nominal_return(P0: float, P1: float) -> float:
    """
    名义收益率(最基础的收益率):
    金融含义:
      - P0: 期初价格/投入金额(initial price)
      - P1: 期末价格/当前价值(final price)
      - 公式:  (P1 - P0) / P0
    Python 语法点:
      - 函数定义用 def
      - 冒号后缩进的部分是函数体
      - P0: float 表示类型提示: P0 是一个浮点数
      - -> float 表示这个函数返回一个浮点数
    """
    return (P1 - P0) / P0


def real_return(nominal: float, inflation_rate: float) -> float:
    """
    实际收益率(扣除通胀后的收益率):
    金融含义:
      - nominal: 名义收益率(上面函数算出来的结果)
      - inflation_rate: 通胀率
      - 公式:  (1 + 名义收益率) / (1 + 通胀率) - 1
      - 直观理解: 名义涨了 10%，通胀 5%，真实购买力大约涨 5% 左右
    """
    return (1 + nominal) / (1 + inflation_rate) - 1


def holding_period_return(P0: float, P1: float, cash_flows: Sequence[float] = ()) -> float:
    """
    持有期收益率(考虑中间现金流，比如股息/利息/租金):
    金融含义:
      - P0: 一开始投入多少钱
      - P1: 最后卖出或当前市值
      - cash_flows: 持有期间收到的所有现金流(列表)，例如 [100, 200, 300]
      - 公式: [(P1 + 所有现金流之和) - P0] / P0
    Python 语法点:
      - 参数 cash_flows: Sequence[float] = ():
          * Sequence[float] 表示“这是一个包含 float 的序列”(可以是 list、tuple 等)
          * = () 表示默认值是一个空的 tuple，如果你不传这个参数就是没有现金流
      - sum(cash_flows): 求序列中所有元素的和
    """
    total_cf = sum(cash_flows)
    return (P1 + total_cf - P0) / P0


def annualized_return_from_hpr(hpr: float, years: float) -> float:
    """
    将总持有期收益率换算成年化收益率:
    金融含义:
      - hpr: 持有期收益率(比如 2 年赚了 21%)
      - years: 持有了多少年
      - 公式: 年化 = (1 + hpr) ** (1 / years) - 1
        举例: 2 年赚 21%(hpr=0.21)，则年化约为 (1.21)^(1/2) - 1 ≈ 10%
    Python 语法点:
      - if years <= 0: raise ValueError(...) 用来做简单的参数检查
      - ** 表示“乘方”，a ** b 就是 a 的 b 次方
    """
    if years <= 0:
        # raise 会抛出一个异常，让调用者知道传入的参数不合法
        raise ValueError("years must be positive")
    return (1 + hpr) ** (1 / years) - 1


def sharpe_ratio(returns: Sequence[float], rf: float, periods_per_year: int) -> float:
    """
    夏普比率(风险调整后的收益):
    金融含义:
      - returns: 一串周期收益率，比如每月收益率 [0.01, -0.02, 0.03, ...]
      - rf: 年化无风险利率(比如国债收益率)，例如 0.03 表示 3%
      - periods_per_year: 一年有多少个周期(日频 252，月频 12)
      - 计算逻辑(简化版):
          * 先算平均周期收益率 mean_r
          * 再算周期收益率的标准差 std_r(波动率)
          * 再把 mean_r 和 std_r 年化
          * 夏普 = (年化收益率 - 无风险利率) / 年化波动率
    Python 语法点:
      - np.asarray(returns, dtype=float): 把列表转成 NumPy 数组，方便做数学运算
      - returns.mean(): 求平均值
      - returns.std(ddof=1): 求样本标准差(ddof=1 是统计上的标准写法)
      - float("nan"): 表示一个“不是数字”的特殊值，用来表示结果无意义
    """
    returns = np.asarray(returns, dtype=float)
    mean_r = returns.mean()
    std_r = returns.std(ddof=1)
    if std_r == 0:
        # 没有波动就无法计算夏普(会除以 0)，返回 NaN
        return float("nan")
    # 将平均周期收益率年化
    avg_annual = (1 + mean_r) ** periods_per_year - 1
    # 将周期波动率年化(乘以根号下 periods_per_year)
    vol_annual = std_r * math.sqrt(periods_per_year)
    return (avg_annual - rf) / vol_annual


def irr(cash_flows: Sequence[float], guess: float = 0.1) -> float:
    """
    内部收益率 IRR:
    金融含义:
      - cash_flows: 等间隔的现金流序列，例如:
          [-100000, 10000, 10000, 120000]
        第一个通常为负(投资)，后面为正(回款)
      - IRR 是一个贴现率，使得这些现金流的净现值(NPV)刚好等于 0
    数学思路:
      - NPV(rate) = Σ cf_t / (1 + rate)^t
      - 找到一个 rate，使 NPV(rate) ≈ 0
      - 这里用牛顿迭代法做数值求解(不需要你完全理解微积分，先知道“反复逼近”就行)
    """
    cash_flows = np.asarray(cash_flows, dtype=float)

    def npv(rate: float) -> float:
        """
        计算某个贴现率下的净现值 NPV。
        Python 语法点:
          - enumerate(cash_flows) 会返回 (索引, 元素)，这里索引 t 当作时间点
          - for t, cf in enumerate(cash_flows): 遍历所有现金流
        """
        return sum(cf / (1 + rate) ** t for t, cf in enumerate(cash_flows))

    rate = guess  # 初始猜测值
    for _ in range(100):  # 最多迭代 100 次
        eps = 1e-6  # 很小的数，用来近似求导数
        f = npv(rate)  # 当前贴现率下的 NPV
        f_deriv = (npv(rate + eps) - f) / eps  # 导数的数值近似(差分)
        if abs(f_deriv) < 1e-12:
            # 导数太小，说明再迭代意义不大，跳出循环
            break
        # 牛顿迭代公式: new_rate = old_rate - f / f'
        new_rate = rate - f / f_deriv
        if abs(new_rate - rate) < 1e-8:
            # 收敛了: 新旧结果非常接近，可以认为找到解
            return new_rate
        rate = new_rate
    return rate


def _parse_float_list(text: str) -> List[float]:
    """
    把命令行里输入的字符串解析成浮点数列表。
    例如:
      - 输入: "0.01 -0.02 0.03"
      - 或:   "0.01,-0.02,0.03"
    最终返回: [0.01, -0.02, 0.03]
    Python 语法点:
      - text.strip(): 去掉首尾空白字符(如果全是空白就会变成空字符串)
      - text.replace(",", " "): 把逗号替换成空格，统一用空格分隔
      - .split(): 按空白字符切分成列表
      - 列表推导式 [float(x) for x in ...]: 把每一段字符串转成 float
    """
    if not text.strip():
        return []
    return [float(x) for x in text.replace(",", " ").split()]


def cli() -> None:
    """
    命令行界面的入口函数(Command Line Interface = CLI)。
    负责:
      - 定义有哪些子命令(hpr / sharpe / irr)
      - 定义每个子命令需要哪些参数
      - 根据用户输入，调用上面的金融计算函数

    Python 语法点:
      - argparse.ArgumentParser: 创建一个“命令行解析器”
      - parser.add_subparsers(...): 支持多种子命令(类似 git commit / git push 这种风格)
      - add_argument: 定义某个参数，比如 --p0、--p1
      - args = parser.parse_args(): 从命令行实际读取参数
      - if args.command == "hpr": 根据子命令名决定走哪一块逻辑
    """
    parser = argparse.ArgumentParser(description="收益率计算小工具")

    # subparsers: 用于支持多个子命令
    subparsers = parser.add_subparsers(dest="command", required=True)

    # ------- 子命令 1: 持有期收益率 + 年化收益率 -------
    hpr_parser = subparsers.add_parser("hpr", help="计算持有期收益率和年化收益率")
    hpr_parser.add_argument("--p0", type=float, required=True, help="期初价格或投资额")
    hpr_parser.add_argument("--p1", type=float, required=True, help="期末价格或当前价值")
    hpr_parser.add_argument(
        "--cash-flows",
        type=str,
        default="",
        help="期间现金流列表，空格或逗号分隔，如: '100 100 100'",
    )
    hpr_parser.add_argument("--years", type=float, required=True, help="持有年数")

    # ------- 子命令 2: 夏普比率 -------
    sharpe_p = subparsers.add_parser("sharpe", help="根据收益率序列计算夏普比率")
    sharpe_p.add_argument(
        "--returns",
        type=str,
        required=True,
        help="周期收益率列表，如: '0.01 -0.02 0.03'",
    )
    sharpe_p.add_argument("--rf", type=float, required=True, help="年化无风险利率，例如 0.03")
    sharpe_p.add_argument(
        "--periods-per-year",
        type=int,
        default=252,
        help="每年的期数，日频 252，月频 12 等",
    )

    # ------- 子命令 3: 内部收益率 IRR -------
    irr_p = subparsers.add_parser("irr", help="根据一串现金流计算内部收益率 IRR")
    irr_p.add_argument(
        "--cash-flows",
        type=str,
        required=True,
        help="等间隔现金流列表，首个通常为负，如: '-100000 10000 10000 120000'",
    )
    irr_p.add_argument("--guess", type=float, default=0.1, help="初始猜测利率")

    # 解析命令行参数，例如:
    #   python returns_tools.py hpr --p0 100000 --p1 120000 --cash-flows "3000 3000" --years 2
    args = parser.parse_args()

    # 根据不同子命令，调用不同计算函数
    if args.command == "hpr":
        cfs = _parse_float_list(args.cash_flows)
        hpr = holding_period_return(args.p0, args.p1, cfs)
        annual = annualized_return_from_hpr(hpr, args.years)
        print("持有期收益率: {:.4%}".format(hpr))   # {:.4%} 表示按百分比格式输出，保留 4 位小数
        print("年化收益率: {:.4%}".format(annual))

    elif args.command == "sharpe":
        rets = _parse_float_list(args.returns)
        ratio = sharpe_ratio(rets, rf=args.rf, periods_per_year=args.periods_per_year)
        print("夏普比率: {:.4f}".format(ratio))  # {:.4f} 表示保留 4 位小数

    elif args.command == "irr":
        cfs = _parse_float_list(args.cash_flows)
        rate = irr(cfs, guess=args.guess)
        print("内部收益率 IRR: {:.4%}".format(rate))


if __name__ == "__main__":
    # 这一段是 Python 脚本的常见写法:
    # - 当你直接运行这个文件时(python returns_tools.py)，__name__ 会等于 "__main__"
    # - 当你在别的地方 import 这个文件时(import returns_tools)，__name__ 就不是 "__main__"
    #   这样可以避免在 import 时自动执行命令行逻辑
    cli()
~~~sh
# 持有期收益率 + 年化收益率
python demo/returns_tools.py hpr \
  --p0 100000 \
  --p1 120000 \
  --cash-flows "3000 3000" \
  --years 2
# 夏普比率(假设月度收益率)
python demo/returns_tools.py sharpe \
  --returns "0.01 -0.02 0.03 0.015 -0.005" \
  --rf 0.03 \
  --periods-per-year 12
# IRR
python demo/returns_tools.py irr \
  --cash-flows "-100000 10000 10000 120000"
~~~
