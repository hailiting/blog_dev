# 遍历数组 for 和 forEach 哪个快

- 时间复杂度为 O(n)
- for 会比 forEach 快
  - forEach 每次都会创建一个函数来调用，而 for 不会创建函数
    - `array.forEach(function(currentValue, index, arr), thisValue)`
  - for 循环没有额外的函数调用栈和上下文
  - 在数据量不是太大的情况下，代码的简洁与可读性更重要
- 越低级的代码，性能越好
- 循环和递归也是同理
