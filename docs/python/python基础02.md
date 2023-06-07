# python 基础 02

## pip 安装和使用

- 模块仓库地址：https://pypi.org/
- pip 基本使用
  - 指定版本安装
    - `pip install pillow<2.0` `== >= <= > <`
  - 卸载 `pip uninstall pillow`
  - 列出已安装的库 `pip list`
  - 将已安装的库的列表保存到文本`pip freeze > requirements.txt`
  - 根据依赖文件批量安装库`pip install -r requirements.txt`
  - 使用安装包(wheel 格式的文件)，使用 pip 安装
  - pip 源
    - `pip install -i https://pypi.doubanio.com/simple/ --trusted-host pypi.doubanio.com 模块名称`

## Anaconda 集成开发环境

- Anaconda 是基于 Python 做数据分析+机器学习快速开发的集成环境。
- jupyter 可视化工具
  - 在 Anaconda 中提供了一个基于浏览器的可视化工具叫 jupyter，在浏览器中可以进行 python 的开发
- 在官网：https://www.jetbrains.com/pycharm/download/#section=mac 下载安装包。

## 编译器与解释器

- 计算机的数据表现方式
  - **计算机本质作用：存储和运算二进制数据**
  - 为什么计算机要使用二进制作为自己的机器语言
    - 因为计算机最小的计算单元是根据**开关状态**, **高低电平**来确定的，只有开和关，高和低的概念。换成数学就是 0 和 1
    - 在物理存储方面，磁盘的**磁道只能区分打孔和未打孔**
    - **抗电磁干扰**，当受到一定程度的电磁干扰时，只要分辨高低，不需要知道高多少，低多少
  - 编译器/解释器
    - 高级语言与机器之间的翻译

## 内存结构

- 计算机的内存空间作用：存储数据
- 衡量计算机内存空间大小单位
  - bit 位：存储一个二进制数字
  - byte：= 8bit 2 的 8 次方
  - kb, mb, gb
  - 计算机内存空间的大小表示
    - 计算机内存空间越大存储数据的数值越大
- 计算机内存空间会有两个默认属性
  - 内存空间的大小
    - 决定内存存储数据的大小
  - 内存空间的地址
    - 用来让 CPU 寻址
- 数据类型存在的意义
  - 提高数据存储运算的性能和适当节省内存空间
  - 在计算机中，存储 1 和 9999，两个数据占据的内存大小是一样的
