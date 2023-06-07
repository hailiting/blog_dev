# python 基础

## 下载 MAC

```shell
https://www.python.org/downloads/macos/
```

1. 查看操作系统类型

- `uname -a`

2. 查看安装路径

- `which python3`

```shell
# 1. 添加环境变量
# .zshrc
export PATH="/Library/Frameworks/Python.framework/Versions/3.8/bin:${PATH}"
alias python="/Library/Frameworks/Python.framework/Versions/3.8/bin/python3"
alias pip="/Library/Frameworks/Python.framework/Versions/3.8/bin/pip3"
# 2. python (原来叫python)
```

## PyCharm 编辑器

- 格式化 `option+shift+Enter`

## 基本数据类型

### 常量

- 大写变量可以认为是常量 -> python 里没有绝对的常量

### 数据类型

- 数据类型：区分不同的数据，不同的数据类型应该有不同的操作
  - Python 中有 8 中内置类型
    - 数字，布尔，字符串，List，Dict，Set，Bytes,Tuple
    - 可变类型
      - List Dict
    - 不可变类型
      - number, str, bool, Set, Tuple, bytes
- 数字：整数 int, 小数 float
  - float:
    - 计算机是一个二进制的产品：0 1
    - 计算机表示一个小数会有误差`0.1+0.2`
- 布尔：True 真， False 假
  - 在 python 中，所有非零的数字都是 True, 零为 False
  - 所有非空都是 True, 空是 False
- 文字：字符串 str
  - 字符串占位，格式化字符串
    - `%s` 字符串占位
    - `%d` 整数占位
    - `{}`
    - `f"sss{变量}"`
  - 索引和切片
    - `print(s[-1])` 表示倒数
    - `print(s[3:6])` 从索引 3 开始切到 6 结束（包含 3，不包含 6）
    - `print(s[:6])`, `print(s[:-1])` 从索引 0 开始切, 0 可以省略
    - `print(s[3:])` 从索引 3 开始，到结尾
    - 索引如果超过范围会报错
    - 可以给切片添加步长来控制切片方向
      - `print(s[::-1])` 表示从右往左
      - `s[start:end:step]` 从 start 切到 end，每 step 个元素出来一个元素，step 是正，取左，step 为负，取右
  - 字符串的操作一般不会对原字符串产生影响，一般是返回新的字符串
    - 字符串大小写转换
      - `s.capitalize()` 首字母大写
      - `s.lower()` 小写
      - `s.upper()` 所有字母大写
    - 切割和替换
      - `strip()`删除开头和结尾给定的字符，默认情况下`空格, \t, \n`
      - `replace(old, new)`字符串替换
      - `split(用什么切割)`字符串切割, 返回一个 list, 用什么切，就会损失掉谁
    - 查找与判断
      - `find(xxx)` 查找,返回 xxx 的下标， `-1`表示没有该字符串
      - `index(xxx)` 如果报错，就是没有
      - `xxx in s`, `xxx not in s` 返回 bool, in 可以做条件上的判断
      - `s.startswith(xxx)`,`s.endswith(xxx)`判断字符串是否以 xxx 开头，结尾
      - `s.isdigit()` s 是不是整数
    - `len(s)` 长度
    - `join()` `list<string>` 组合成 string
- list 列表
  - 索引和切片(和 str 用法一样)
  - `for in`循环
  - `len(lst)`列表长度
  - 列表的增删改查
    - 增 (lst 被改变了)
      - `lst.append()` 追加
      - `lst.insert(index, value)` 插入
      - `lst.extend(lst2)` 合并两个列表，批量添加
    - 删 (lst 被改变了)
      - `a = lst.pop(index)` 删除下标 index 元素，返回 index 元素
      - `lst.remove(value)` 删除指定元素
    - 改 (lst 被改变了)
      - `lst[index]=newValue` 直接用索引就可以进行修改操作
    - 查
      - `lst[index]`
  - 排序 (lst 被改变了)
    - `lst.sort()` 对列表升序排序
    - `lst.sort(reverse=True)` 降序， reverse：翻转
  - 嵌套
    - `lst[index1][index2][index3]`
  - 列表的循环删除
- dict 字典
  - 字典是以键值对的形式进行存储数据的
  - 表示方式：`{key: value, key2: value2}`
  - `val = dic[key]`
  - 字典的 key 必须是可 hash 的数据类型
  - 字典的 value 可以是任何数据类型
  - 字典的增删改查
    - `dic["jay"] = "xxx"` 如果字典中已经有了 key，此时执行的就是修改操作
    - `dic.setdefault("jay", "sss")` 设置默认值，如果以前已经有了 jay，setdefault 就不起作用
    - `dic.pop(key)` 根据 key 去删除 （`del dic['jay']`）
    - 查
      - `dic[key]` 如果 key 不存在，会报错
      - `dic.get(key)` 如果 key 不存在，程序返回 None
    - 循环与嵌套
      - `for key in dic:` 可以用 for 循环，直接拿到 key
      - `list(dic.keys())` 拿到所有的 key
      - `list(dic.values())` 拿到所有的 values
      - `dic.items()`直接拿到字典中的 key 和 value
      - 循环删除
- bytes
  - 程序员平时遇见的所有数据最终单位都是字节 byte
  - str.encode("编码") 进行编码
  - str.decode("编码") 进行解码
- tuple 元祖
  - `t=tuple()`
  - 不可变的列表 `t=("a","b","c")`
  - 固定某些数据，不允许外界修改
  - 元素如果只有一个元素，则`()`默认为优先级，如果想用元祖，需在末尾添加一个逗号`t=("a1",)`
  - **元祖不可变指的是第一层内存地址**（如果元祖里有列表，列表内容是可变）
    - `id(xxx)` 查看空间地址
- set 集合
  - set 是无序的
  - 可以去除重复（去除重复后的数据是无序的）去重 (Dict 要 hash 成本会高)
  - 创建空集合 `s=set()`
  - 加 `s.add()`
  - 可哈希与不可哈希
    - python 中的 set 集合进行数据存储的时候，需要对数据进行哈希计算，根据计算出来的哈希值进行存储数据
    - set 集合要求存储的数据必须可以进行哈希计算
    - 可哈希：不可变的数据 int, str, tuple, bool
    - 不可哈希：list, dict, set
  - 交集，并集，差集
    - `s1 & s2`, `s1 | s2`, `s1-s2`
- 运算符
  - 算数运算符
    - `+ - * / % //(整数除法，返回商的整数部分) **(paw)`
  - 比较运算符
    - `> < >= <= == !=`
  - 逻辑运算
    - and 并且，左右两端同时成立，结果才能成立
    - or 或者，左右两端有一个成立，结果就成立
    - not 非，非真即假，非假即真
    - 运算顺序：先算括号 > 算 not > and > or
  - 位运算符
  - 成员运算
    - in `value in lst`
    - not in `value not in lst`
  - 身份运算符
    - is
    - is not
- 文件操作
  - open(文件路径, mode="", encoding="")
    - 文件路径
      - 1. 绝对路径
      - 2. 相对路径
    - mode 模式
      - r: read 读取
      - w: write 写
        - w 模式下，如果文件不存在，则创建，
        - w 模式下，每一次 open 都会清空文件中的内容
      - a: append 接着写, 不会影响现有的文件
      - b: 非文本文件 -> bytes
    - encoding 读写图片没法给，文本都给
      - utf-8
    - `f.close()` 需要 close
  - `with open(文件路径, mode="", encoding="") as f:` 文件的上下文，不需要手动关闭文件
- NoneType

```py
a = input("请输入第一个数字：")
b = input("请输入第二个数字：")
if bool(a) & bool(b):
    print(type(a))  # <class "str">
    print(int(a) + int(b))

print(type(100 - 1))
if type(1) == int:
    print("dddd")

# bool
print(bool([]))
print(bool(0))
print(bool(''))


# str
name = "小红"
address="杭州"
age=12
hobby="画画"
s = "我叫%s，住在%s，我今年%d岁，我喜欢做%s" % ("小红", "杭州", 12, "画画")
s1 = "我叫{}，住在{}，我今年{}岁，我喜欢做{}".format("小红", "杭州", 12, "画画")
s2 = f"我叫{name}，住在{address}，我今年{age}岁，我喜欢做{hobby}" # f-string
print(s2)
print(s2[-1])

# defghig  dh
ss = "abcdefghigklmn"
print(ss[3:10:4])
print(ss[-1:-5:-2])


s= "hello, mom"
s1 = s.replace("mon", "dad")
s2 = s.replace(" ", "")

lst = ["1", "2", "3", "5", "6"]
s = "_".join(lst)
print(s)

# list
lst = ["a",1,3, true]
print(lst[::-1])
print(lst[1:3])
print(lst[0])

# 列表的增删改查
lst=[]
lst.append("hi")
lst.append("你好")
lst.append("哦哈哟")
lst.insert(0, "wow! ")
lst.extend(["小明", "小红"])
print(lst)


lst = ['wow! ', 'hi', '哦哈哟']
for index in range(len(lst)):
    newValue = lst[index].replace("w", "----")
    lst[index] = newValue
print(lst)

```

```py
# set
s = {}
print(type(s))  # dict
s = {2,"1m",True}
print(s) # set是无序的
s = {2,"1m",True, []} # error: unhashable type: "list"

s = set()
s.add("1")
s.add("2")
s.add("4")
print(s)
# s.pop() # 由于集合是无序的，测试的时候没法验证是最后一个
# print(s)
# 修改 -> 先删除，在修改
s.remove("1")
s.add("11")
print(s)
for item in s:
  print(item)

s1 = {"1","2","3"}
s2 = {"1", "a","b","c"}
# 交集
print(s1&s2)
print(s1.intersection(s2))
# 并集
print(s1 | s2)
print(s1.union(s2))
# 差集
print(s1-s2)
print(s1.difference(s2))

lst = [1,2,3,1,2,3,4]
print(lst)
print(list(set(lst))) # 去除重复后的数据是无序的
```

```py
dict
dic = {"key1": "sddd"}
dic["sss"] = "dddd"
dic["key1"] = "2111"
print(dic.get("sdadsf") is None)

for key, value in dic.items():
    print(key, value)

a, b = (1, 2) # 元组或列表都可以执行该操作，该操作被称为解构（解包）

# dict 循环删除
dic = {"key1": "2111", "sss": "dddd", "sss2": "dddd"}
temp = {}
for key, value in dic.items():
    if not key.startswith("sss2"):
        temp[key] = value
dic = temp
print(dic)
```

```py
bytes
s = "周杰伦"
# bs = s.encode() # b'\xe5\x91\xa8\xe6\x9d\xb0\xe4\xbc\xa6' 9个字节 默认为utf-8
bs = s.encode("gbk") # b'\xd6\xdc\xbd\xdc\xc2\xd7' 6个字节
# bs = s.encode("utf-8") # b'\xe5\x91\xa8\xe6\x9d\xb0\xe4\xbc\xa6'


# 把gdk的字节转为utf-8的字节
ss = bs.decode("gbk")
bs2 = ss.encode("utf-8")
print(bs2)

a = "abcs"
print(a.encode("utf-8")) # ascii
print(a.encode("gbk"))# ascii
```

```py
# 文件操作
open(文件路径, mode="", encoding="")

f = open("AA.txt", mode="r", encoding="utf-8")
# 10g 20g 内存就炸了
# content = f.read()
# print(content)

line = f.readline().strip()
print(line) # print内部存在一个换行
line = f.readline().strip()
print(line)

content = f.readlines()
print(content)


# 从f中取到每一行数据
for line in f:
  print(line.strip())


# 写
f = open("AA.txt", mode="w", encoding="utf-8")
for item in "xxx":
  f.write(f"{item}\n")
f.close()

f = open("AA.txt", mode="w", encoding="utf-8")

# with
with open("AA.txt", mode="r", encoding="utf-8") as f:
  for line in f:
    print(line.strip())

# 想读取图片
with open("xxx.jpeg", mode="rb") as f:
  for line in f:
    print(line)

# 文件复制
import os
import time

with open("a.jpeg", mode="rb") as f1, \
        open("bbb.jpeg", mode="wb") as f2:
    for line in f1:
        f2.write(line)

# 文件修改  import os
# 把文件中的xÒ
os.remove("a.jpeg")
time.sleep(3)
os.rename("bbb.jpeg", "a.jpeg")
```

### 条件判断

```py
money = input("咱剩下的钱: ")
if float(money) > 300:
    print("洗脚")
elif float(money) > 200:
    print("铁锅炖")
else:
    print("回家")
print(11)
```

### 循环

#### while

```py
a = 0
while a < 0:
    print(a)
    a += 1
```

##### break, continue

- break: 当前循环立即停止
- continue: 停止当前本次循环，继续执行下一次循环

```py
while True:
  content = input("说啥：")
  if content == "q":
      break
  elif content == "continue":
      continue
  print(content)
print(3333)
```

#### for

- `for 变量 in 可迭代的东西:`
- for 循环想要计数，必须借助于 range
  - range(n): 从 0 数到 n，不包含 n
  - range(m, n): 从 m 数到 n，不包含 n
  - range(m, n, s): 从 m 数到 n，不包含 n, 每次间隔 s

```py
for i in range(3, 10):
  print(i)
for i in range(3, 10, 2):
  print(i)
```

##### pass 代码站位

```py
a=10
if a>100:
    pass
```

## 字符集与编码

- 0 1 <----二极管----> 01010100101111 <----二进制转化为二进制 ----> 88
- 电脑如何进行存储文字信息
  - 100101 <===> a 编码方式
  - 统一一个标准：ascii => 每一个符号对应的 ascii，排了 128 个字符，只需要 7 个 0 和 1 就可以表示, 01111111 => 1 bytes => 8bit
  - ANSI => 一套标准，每个字符 16bit，2byte 2^16(65536)
    - 中国 gb2312 编码，gbk 编码(微软用的是这个)，gbxxx
  - Unicode: 万国码，统一码 码位 码区
    - USC-2 两个字节
    - USC-4 4 个字节 `01111111 01111111 01111111 01111111`
  - utf: 可变长度的 unicode, 可以进行数据传输和存储
    - utf-8 最短的字节长度 8
      - 英文: 8bit, 1byte
      - 欧洲文字: 16bit, 2byte
      - 中文: 24bit, 3byte
    - utf-16 最短的字节长度 16

#### 总结

- 1. ascii, 8bit 1byte
- 2. gbk: 16bit, 2byte Windows 默认
- 3. unicode: 32bit, 4byte 没法用，只是一个标准
- 4. utf-8: Mac 默认
  - 英文: 8bit 1byte
  - 欧洲: 16bit 2byte
  - 中文: 24bit 3byte
- 5. gbk 和 utf-8 不能直接进行转化，必须先转文字在转化

## 函数定义

对某一个特定的功能或者代码块进行封装，在需要使用该功能的时候直接调用即可

- 定义： `def 函数名字():`
  - 1. 形参，在函数定义的时候，需要准备一些变量来接收信息
    - 1. 位置参数，按照位置一个一个的去声明变量
    - 2. 默认值参数，在函数声明的时候给变量一个默认值，如果实参不传递信息，此时默认值生效
    - 3. 动态传参
      - `*args`，表示接收所有位置参数的动态传参
      - `**args` 表示接收关键字的动态传参，接收到的所有参数都会被处理成字典
    - 4. 顺序：`位置 > *args > 默认值 > **kwargs`, 可以随意搭配使用
  - 2. 实参，实际在调用的时候传递的信息
    - 1. 位置参数，按照位置进行传递参数
    - 2. 关键字参数，按照参数的名字进行传递参数
    - 3. 混合参数：
      - 顺序：位置参数放前面，关键字参数放后面
      - 实参在执行的时候，必须要保障形参有数据
- 返回值
  - 如果没有 return 值，默认 return None
  - 如果只写了 return 值，
    - 没有值，则收到的依然是 None
    - 如果返回多个值，则外面收到的是元祖，并且，该元祖内存放所有的返回值

```py
def chi(zhu, fu, tang):
    print(zhu, fu, tang)


chi(zhu="小", fu="ss", tang="ddd")
chi("小2", "ss2", "ddd2")

# 默认值
def aa(aaa="333"):
  print(aaa)


aa()
aa("ddd")
aa("zzz")

def chi(*food): # * 表示位置参考的动态传参
  print(food)

chi("xxx","ddd", "ss")

def chi(**food): # ** 表示接收关键字的动态传参，接收到的所有参数都会被处理成字典
  print(food)


def func(a, b, c="哈哈", *args, **kwargs):
  print(a, b, c, args, kwargs)

func(1, 2,3,4,5,6,7,8,aa=11,bb=22,cc=33)

stu_lst = ["a1","a1","a1","a1"]
def func(*args):
   print(args)

func(*stu_lst)

```

## python 内置函数

- 基础数据类型
  - 和数字相关的
    - 数据类型
      - bool, int, floot, complex(复数：实部+虚部)
    - 进制类型
      - bin, oct, hex
    - 数学运算
      - obs, divmod, round, pow, sum, min, max
  - 和数据结构相关的
    - 序列
      - 列表和元祖 list tuple
      - 相关内置函数 reversed(翻转) slice(切片)
      - 字符串 str format bytes bytearry memoryview(内存的展示) ord chr ascii repr
    - 数据集合
      - 字典 dict
      - 集合 set frozenset(不允许改变-和 tuple 差不多)
    - 相关内置函数
      - len sorted enumerate all any zip fiter map
        - `sorted(__iterable, key(排序规则), reverse)`
        - `map(fn, __iterable)`
- 作用域
  - `locals` 函数会以字典的类型返回当前位置的全部局部变量
  - `globals` 函数以字典的类型返回全部全局变量
- 其他
  - 字符串类型代码的执行
    - eval 执行字符串类型的代码，并返回最终结果
    - exec 执行字符串类型代码
    - complie 将一个字符串编译为字节代码
  - 输入输出
    - input print
  - 内存相关
    - hash(计算 hash 值) 一定是一个数字，想办法转化为内存地址，然后进行数据的存储 -> 字典(集合)哈希表
      - 运行的过程保持一致
    - id
  - 文件相关
    - open
  - 模块相关
    - `__import__`
  - 帮助
    - help `help(str)`
  - 调用相关
    - callable
  - 查看内置属性
    - dir 当前这个数据能执行哪些操作

```py
a = 18
print(bin(a)) # 二进制
print(oct(a)) # 八进制
print(hex(a)) # 16进制
print(int(a)) # 10进制

a=10
b=3
print(a**b) # 次幂
print(pow(a, b))

lst=[12, 23,21,233]
print(max(lst))
print(min(lst))
print(sum(lst))


s={1,2,3}
lst = list(s) # for item in s:
print(lst)

s = slice(1,3,4)
print("123456789"[s])

# format 格式化
a = 18
print(format(a, "b")) # b 二进制, o 八进制, x 16进制
# 定长的
print(format(a, "08b")) # 前面补充0的8位二进制，如果超过8位，则不做操作(只补充，不切断)

# ord
a = "中" # python的内存中使用的是unicode
print(ord(a)) # 中 字在unicode中码位是20013
print(chr(20013)) # 给出编码位置，展示出文字

for i in range(65536):
  print(chr(i) + " ", end="")



# list = sorted(iterable, key=None, reverse=False)
  # iterable 指定序列
  # key 自定义排序规则
  # reverse 参数指定升序（false），降序（true）排序
a = "51423"
print(sorted(a))

# enumerate
lst=["张无忌","张翠山","张三丰"]
for index, item in enumerate(lst):
  print(index, item)
# all 把 all 当成 and 来看
print(all([12, "ad","ddds"]))
print(all([0, "ad","ddds"]))
# any 当成or来看
print(any([0, "ad","ddds"]))


# dir
s="呵呵哒"
dir(s)
```

### 函数

- 函数的嵌套
  - 函数名实际上就是一个变量名，都表示一个内存地址
    - 1. 函数可以作为返回值进行返回
    - 2. 函数可以作为参数进行相互传递
- 变量的作用域: 变量的访问权限
  - global 把外面的全局变量引入到局部
  - nonlocal: 在局部引入外层的局部变量
- 闭包：本质，内层函数对外层函数的局部变量的使用，此时内层函数被称为闭包函数
  - 可以让一个变量常驻内存
  - 可以避免全局变量被修改
- 装饰器
  - 本质上是一个闭包，在不改变原有函数的情况下，给函数增加新的功能
  - 在用户登录的地方
    - `def wrapper`
- 迭代器 iterator
  - interable 可迭代的数据类型都会提供一个叫迭代器的东西，这个迭代器可以帮我们把数据类型中的所有数据逐一拿到
  - str, list, tuple, dict, set, open
  - 获取迭代器
    - 1. `iter()` 内置函数可以直接拿到迭代器
    - 2. `__iter__()`
  - 从迭代器中拿到数据
    - 1. `next()` 内置函数
    - 1. `xx.__next__()` 内置函数
  - for 循环的工作原理： 迭代器
    - 可迭代的数据类型会提供一个叫迭代器的东西，迭代器会帮我们把数据类型中的所有数据逐一拿到
  - 迭代器本身可以被迭代的
  - 只能向前，不能反复
  - 特别节省内存
  - 惰性机制（什么时候执行 next，什么时候才到下一个）
- 生成器
  - 生成器的本质就是迭代器
  - 如何创建
    - 生成器函数
    - 生成器表达式
  - 生成器函数中有一个关键字 yield
    - yield 可以返回数据
    - 可以分段的执行函数中的内容，通过`__next__()`可以执行到下一个 yield 位置
  - 用好了会特别节省内存
  - 生成器表达式`(数据 for循环 if判断)`
- 推导式
  - 简化代码
    - 语法
      - 列表推导式: `[数据 for循环 if判断]`
        - `lst = [i for i in range(10) if i%2==1]`
      - 集合推导式: `{数据 for循环 if判断}`
      - 字典推导式: `{k:v for循环 if判断}`
- 匿名函数
  - 本质是 lambda 表达式
  - `变量 = lambda 参数1,参数2,参数3...: 返回值`
- 内置函数
- 递归
  - 递归如果没有任何东西拦截，它默认是一个死循环
    - `RecursionError: maximum recursion depth exceeded ...`栈
    - python 有默认的递归限制，默认最大递归为 1000（永远到不了 1000） `sys.getrecursionlimit()`
    - `sys.setrecursionlimit(2000)` 如果达到 1000 说明有 bug

```py
a = 10 # 全局变量 -> 全局作用域
def func():
  b=99 # 局部变量 -> 局部作用域
  print(b)



def func1():
  print(123)
  def func2():
    print(345)
    def func3():
      print(789)
    return func3 # 函数变成一个变量返回
  print(2)
  a = func2()
  print(3)
  a()
func1()

# 代理模式
def a(n):
  n()
def b(){
  print("ddd")
}
a(b)

def aa():
  global a
  a= 20

aa()
print(a)


def c():
  a = 100
  def aa():
    nonlocal a
    a= 20
  aa()
  print(a)
c()

def guanjia(fn):
  def inner():
    print("管家开始管理")
    fn() # 内层函数使用外层还是的参数
    print("撤退")
  return inner

@guanjia
def play_dnf():
  print("我在玩DNF")

@guanjia
def play_lol():
  print("我在玩LOL")


play_dnf()
play_lol()

# 装饰器传值
def guanjia(fn):
  #  *  ** 表示接收所有参数，打包成元祖和字典
  def inner(*args, **kwargs): # inner添加参数 args一定是一个元组，kwargs 一定是字典
    print("管家开始管理")
    # * ** 表示把args元祖和kwargs字典打撒成位置参数以及关键字参数传递进去
    fn(*args, **kwargs) # 内层函数使用外层还是的参数
    print("撤退")
  return inner

# 装饰器传值返回值 -> 通用装饰器写法
def guanjia(fn):
  def inner(*args, **kwargs):
    print("管家开始管理")
    res = fn(*args, **kwargs)
    print("撤退")
    return res
  return inner

@wrapper1 # target = wrapper1(wrapper2(target))
@wrapper2  #  target = wrapper2(target)
def target():
  print("xxxx")


it = iter("你的名字")
print(next(it))
# StopIteration: 迭代已经停止了，不可以在拿了

it = "呵呵哒".__iter__()
print(it.__next__())
print(it.__next__())
print(next(it)) # print(it.__next__())



it = iter("你的名字")
while 1:
  try:
    data = it.__next__()
    print(data)
  except StopIteration:
    break

def func():
  print(123)
  yield 999 # yield 也有返回的意思
  print(456)
  yield 1111

ret = func()
print(ret.__next__()) # yield只有执行到next的时候才会返回数据
print(ret.__next__())


def order():
  lst = []
  for i in range(10000):
    lst.append(f"衣服{i}")
    if len(lst)%50==0:
      yield lst
      lst = []

ord = order()
print(next(ord))
print(next(ord))
print(next(ord))


lst1 = ["sd","Ad","Sad"]
lst2 = [item.upper() for item in lst1]

lst3 = {i:lst1[i] for i in range(len(lst1))}
print(lst3)

gen = (i**2 for i in range(10))
print(gen)
lst = list(gen) # list site 有一个循环的迭代

fn = lambda a, b: a+b
print(fn)
ret = fn(12,14)
print(ret)

lst1 = ["A", "b","c"]
lst2=[1,2,3]
lst3=["aac","dds","ccs",]
result = zip(lst1, lst2, lst3)
# for item in result:
#   print(item)

lst = list(result)
print(lst)

lst = [1213,123,123,345,123]
s = sorted(lst)
print(s)

lst = ["秋", "Sdasdada","张二炸","努尔哈赤"]
s = sorted(lst, key=lambda x: len(x))
print(s)
lst = [
  {"name": "a", "age": 12, "salary": 12},
  {"name": "12", "age": 1, "salary": 12200},
  {"name": "df", "age": 3, "salary": 121300},
  {"name": "vfa", "age": 123, "salary": 100},
  {"name": "fga", "age": 43, "salary": 22},
]
s = sorted(lst, key=lambda d:d["age"])
print(s)
s = sorted(lst, key=lambda d:d["salary"], reverse = True)
print(s)

lst = ["张五级", "张无底洞", "张SSD", "王阿萨德"]
f = filter(lambda x: x.startswith("张"), lst) # 生成器
print(list(f))

lst = [1,2,3,4,5,6,7]
r = map(lambda x:x**2, lst)
print(list(r))
```
