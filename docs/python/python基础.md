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
- set 集合
  - set 是无序的
  - 可以去除重复（去除重复后的数据是无序的）
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
    - `+ - * / % //(整数除法) **(paw)`
  - 比较运算符
    - `> < >= <= == !=`
  - 逻辑运算
    - and 并且，左右两端同时成立，结果才能成立
    - or 或者，左右两端有一个成立，结果就成立
    - not 非，非真即假，非假即真
    - 运算顺序：先算括号 > 算 not > and > or
  - 成员运算
    - in `value in lst`
    - not in `value not in lst`
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
  - 2. 实参，实际在调用的时候传递的信息
    - 1. 位置参数，按照位置进行传递参数
    - 2. 关键字参数，按照参数的名字进行传递参数
    - 3. 混合参数：
      - 顺序：位置参数放前面，关键字参数放后面
      - 实参在执行的时候，必须要保障形参有数据

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
```
