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
  - 在计算机中，存储 1 和 9999，两个数据占据的内存大小是一样的，都是占用 4 个字节 `获取字节长度：sys.getsizeof(xxx)`

```py
import random

score = 100
while score > 0:
    guess_num = random.randint(0, 20)  # 随机生成0-20的随机数
    num = input("enter you guess num: ")
    try:
        num = int(num)
    except Exception as ex:
        print("请输入数字")
        continue
    if score > 0:
        if num == guess_num:
            print(f"----{score}")
            break
        else:
            score -= 10
            if num > guess_num:
                print("大了")
            else:
                print("小了")
if score == 0:
    print("你没分了")

# 排序
alist = [12,1,2,41,12]
for i in range(len(alist)-1):
  if(alist[i] > alist[i+1]):
    alist[i],alist[i+1] = alist[i+1],alist[i]

print(alist)
print(sorted(alist))
```

```py
# 闭包
def line_conf(a, b):
  def line(x):
    return a * b + x
  return line
def line_conf():
  a = 1
  b = 2
  def line(x):
    print(a * b + x)
  return line
def _line_(a, b):
  def line_c(c):
    def line(x):
        print(a * b + x+c)
    return line
  return line_c
```

```py
# 函数的参数
a = 1
bb = {}
def func(b):
  b=2
  print("函数内部b:", b)
func(a)
print("函数外部a:", a)

func(bb)
print("函数外部bb:", bb)

c = {}
def func(b):
    b.setdefault("jay", "sss")
    print("函数内部b:", b)
func(b = c)
print("函数外部c:", c)


# 因为Python函数体在被读入内存的时候，默认参数a指向的空列表
def func(a=[]):
  a.append("A")
  return a

print(func()) #['A']
print(func()) #['A', 'A']
print(func()) #['A', 'A', 'A']

# 动态参数
def func(*args):
  print(args)

func(1,2,3,4,"sdd")

alst = [1,2,3]
func(*alst)
```

```py
result = lambda x:1 if x>0 else 0
print(result(-1))
```

```py
def sum_number(n):
  sum = 0
  if(n<0){
    return sum
  }
  sum_number(sum+1)

def sum_number(n):
  if n==1:
    return 1
  return n + sum_number(n-1) # 每一次递归处理函数的规模比上一次少
result = sum_number(5)
```
