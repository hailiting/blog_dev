# js 基础算法题

- 冒泡排序
- 快速排序
- 二分查找
- 递归算法
- 常见前端算法面试题

## 计算汉明重量

### 汉明重量是一串符号中非零符号的个数。

```js
function hammingWeight(n) {
  let num = 0;
  while (n !== 0) {
    console.log(n);
    n &= n - 1; // n=n&(n-1) 转二进制
    console.log(n);
    num++;
  }
  return num;
}
let a = hammingWeight(111);
console.log(a);
```

### 判断奇偶

```js
function isOdd(n) {
  return n & (1 === 1);
}
```

### 二分查找

非递归方法

```js
function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = parseInt((low + high) / 2);
    console.log(low, mid, nums[mid]);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      low = mid + 1;
    }
    if (nums[mid] > target) {
      high = mid - 1;
    }
  }
  return -1;
}
// 凡有序，必二分
// 凡二分，时间复杂度必包含O(logn)
binarySearch([12, 213, 123, 312, 123, 12312, 123], 213);
// O(logn)
function binarySearch01(arr, target) {
  const len = arr.length;
  let startIndex = 0;
  let endIndex = len - 1;
  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midValue = arr[midIndex];
    if (target < midValue) {
      endIndex = midValue - 1;
    } else if (target > midValue) {
      start = midValue + 1;
    } else {
      return midValue;
    }
  }
  return -1;
}
```

递归方法

```js
function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  const binaryWalker = (nums, low, high, target) => {
    if (low > high) return -1;
    const mid = parseInt((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) return binaryWalker(nums, low, mid - 1, target);
    if (nums[mid] < target) return binaryWalker(nums, mid + 1, high, target);
  };
  return binaryWalker(nums, low, high, target);
}
```

## 常见排序

### 快速排序

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let left = [];
  let right = [];
  let pivot = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= privot) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

### 冒泡排序

```js
function bubbleSort(arr) {
  let i = arr.length - 1;
  while (i >= 0) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    i--;
  }
  return arr;
}
```

二叉树遍历相关
先序遍历（中->左->右）

```js
// 递归实现
function preOrderTraverse(root) {
  if (root) {
    console.log(root);
    preOrderTraverse(root.left);
    preOrderTraverse(root.right);
  }
}
// 非递归实现
function preOrderTraverse(root) {
  let stack = [];

  if (root) {
    stack.push(root);
  }

  while (stack.length) {
    let temp = stack.pop();
    console.log(temp);

    if (temp.right) stack.push(temp.right);

    if (temp.left) stack.pus(temp.left);
  }
}
```

中序遍历（左->中->右）

```js
// 递归实现
function midOrderTraverse(root) {
  if (root) {
    midOrderTraverse(root.left);
    console.log(root);
    midOrderTraverse(root.right);
  }
}
// 非递归实现
function midOrderTraverse(root) {
  let stack = [];
  while (true) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    if (!stack.length) break;

    let temp = stack.pop();
    console.log(temp);
    root = temp.right;
  }
}
```

后序遍历（左->右->中）

```js
// 递归实现
function postOrderTraverse(root) {
  if (root) {
    postOrderTraverse(root.left);
    postOrderTraverse(root.right);
    console.log(root);
  }
}
// 非递归实现
function postOrderTraverse(root) {
  let stack = [];
  let rest = [];
  if (root) stack.push(root);
  while (stack.length) {
    let temp = stack.pop();
    rest.push(temp);
    if (temp.left) stack.push(temp.left);
    if (temp.right) stack.push(temp.right);
  }
  return rest.reverse();
}
// 层次遍历
function levelTraverse(root) {
  if (!root) return;
  let stack = [];
  stack.push(root);

  while (stack.length) {
    let temp = stack.shift();
    console.log(temp);
    if (temp.left) stack.push(temp.left);
    if (temp.right) stack.push(temp.right);
  }
}
```

把一个数组旋转 k 步

```ts
// pop unshift
function rotate1(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length === 0) return arr;
  const step = Math.abs(k % length);
  for (let i = 0; i < step; i++) {
    const n = arr.pop();
    if (n !== null) {
      arr.unshift(n); // unshift  shift  splice 都是很慢的
    }
  }
  return arr;
}
// slice concat
function rotate2(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!k || length === 0) return arr;
  const step = Math.abs(k % length);
  const part1 = arr.slice(-step);
  const part2 = arr.slice(0, length - step);
  const part3 = part1.concat(part2);
  return part3;
}
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const arr1 = rotate1(arr, 4);
console.log(arr1);

// 单元测试
// npx jest src/xx.test.ts
describe("数组旋转", () => {
  it("正常情况", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;
    const res = rotate1(arr, k);
    expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });
});

// 性能测试
const arr1 = [];
for (let i = 0; i < 10 * 10000; i++) {
  arr1.push(i);
}
console.time("rotate1");
rotate1(arr1, 9 * 1000);
console.timeEnd("rotate1");

const arr2 = [];
for (let i = 0; i < 10 * 10000; i++) {
  arr2.push(i);
}
console.time("rotate2");
rotate2(arr2, 9 * 1000);
console.timeEnd("rotate2");
```

判断一个字符串是否括号匹配
push 入栈
pop 出栈

```ts
function isMatch(left: string, right: string): boolean {
  if (left === "{" && right === "}") return true;
  if (left === "[" && right === "]") return true;
  if (left === "(" && right === ")") return true;
  return false;
}
function matchBracket(str: string): boolean {
  const length = str.length;
  if (!length) return true;
  const stack = [];
  const leftSymbols = "{[(";
  const rightSymbols = ")]}";
  for (let i = 0; i < length; i++) {
    const s = str[i];
    if (leftSymbols.includes(s)) {
      stack.push(s);
    } else if (rightSymbols.includes(s)) {
      const top = stack[stack.length - 1];
      if (isMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
describe("括号匹配", () => {
  it("正常情况", () => {
    const str = "{([])}";
    const res = matchBracket(str);
    expect(res).toBe(true);
  });
  it("不匹配", () => {
    const str = "{([])}}";
    const res = matchBracket(str);
    expect(res).toBe(false);
  });
  // ...
});
```

逻辑结构 VS 物理结构

- 栈 VS 数组
- 栈：逻辑结构，理论模型，不管如何实现，不受任何语言限制
- 数组：物理结构，真实的功能实现，受限于编程语言

```ts
// 两个栈 一个队列
class Queue {
  private stack1;
  private stack2;
  add(n: number) {
    this.stack1.push(n);
  }
  delete(): number | null {
    let res;
    const stack1 = this.stack1;
    const stack2 = this.stack2;
    while (stack1.length) {
      const n = stack1.pop();
      if (n !== null) {
        stack2.push(n);
      }
    }
    res = stack2.pop();
    while (stack2.length) {
      const n = stack2.pop();
      if (n !== null) {
        stack1.push(n);
      }
    }
    return res || null;
  }
  get length(): number {
    return this.stack1.length;
  }
}

// 单元测试
describe("两个栈，一个队列", () => {
  it("get", () => {
    const queue = new Queue();
    queue.add(12);
    queue.add(13);
    queue.add(14);
    expect(queue.delete()).toBe(14);
    expect(queue.delete()).toBeNull();
  });
});
```

使用 js 反转单向链表

- 队列是逻辑结构
- 链表是一种物理结构，类似于数组
- 数组是连续存储结构，链表是零散存放的数据格式

```ts
interface ILinkListNode {
  value: number;
  next?: ILinkListNode;
}
function createLinkList(arr: number[]): ILinkListNode {
  const length = arr.length;
  if (!length) throw new Error("Arr is empty");
  let curNode: ILinkListNode = {
    value: arr[length - 1],
  };
  for (let i = length - 2; i >= 0; i--) {
    // 反转，即节点next指向前一个节点
    // pre cur next
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }
  return curNode;
}

function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
  let prevNode: ILinkListNode | undefined = undefined;
  let curNode: ILinkListNode | undefined = undefined;
  let nextNode: ILinkListNode | undefined = listNode;
  while (nexNode) {
    // 第一个元素，删掉next，防止循环引用
    if (curNode && !prevNode) {
      delete curNode.next;
    }
    // 反转指针
    if (curNode && prevNode) {
      curNode.next = prevNode;
    }
    // 整体向后移动指针
    prevNode = curNode;
    curNode = nextNode;
    nextNode = nextNode?.next;
  }
  curNode!.next = preNode;
  return curNode!;
}

const arr = [100, 200, 300, 400, 500];
const list = createLinkList(arr);
console.log("list: ", list);
const list1 = reverseLinkList(list);
console.log("list1: ", list1);
```

- 列表和栈是有序结构
- 对象是无序结构（Object Set）
- Object Map 根本区别
  - Map 是有序结构
  - Object 是无序结构
- 链表 查询慢 存储快
- 数组 查询快，存储慢（除了最后插入或去除）

##### 链表和数组，哪一个实现队列更快

- 数组实现队列有性能问题
- 链表实现队列
- 数组是连续存储，push 快，shift 慢, (shift 的复杂度为`O(n)`)
- 链表是非连续存储，add 和 delete 都很快，但查找慢

###### 实现链表注意事项

- 单向链表，但要同时记录 head 和 tail
- 要从 tail 入队，从 head 出队，否则出队时，tail 不好定位
- length 要实时记录，不可遍历链表获取

```ts
class Queue {
  private head: IListNode | null = null;
  private tail: IListNode | null = null;
  private len = 0;
  // 入队
  add(n: number) {
    const newNode: IListNode = {
      value: n,
      next: null,
    };
    if ((this.head = null)) {
      this.head = newNode;
    }
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;
    this.len++;
  }
  // 出队
  shift(): number | null {
    const headNode = this.head;
    if (headNode === null) return null;
    if (this.len <= 0) return null;
    // 取值
    const value = headNode.value;
    // 处理head
    this.head = headNode.next;
    // 记录长度
    this.len--;
    return value;
  }
  get length(): number {
    return this.len;
  }
}
```

**数据结构的选择，要比算法优化更重要**

### 找出一个数组中和为 n 的两个数->嵌套循环不是最优解

```ts
// 嵌套循环
function findTwoNumbers1(arr: number[], n: number): number[] {
  const res: number[] = [];
  const length = arr.length;
  if (length === 0) return res;
  // O(n^2)
  for (let i = 0; i < length - 1; i++) {
    const n1 = arr[i];
    let flag = false; //是否得到结果
    for (let j = i + 1; j < length; j++) {
      const n2 = arr[j];
      if (n1 + n2 === n) {
        res.push(n1);
        res.push(n2);
        flag = true;
        break;
      }
      if (flag) break;
    }
  }
}
```

利用递增（有序）的特性

- 随便找两个数
- 如果和大于 n，则需要向前寻找
- 如果和小于 n，则需要向后寻找-二分法

##### 双指针，时间复杂度降到`O(n)`

- 定义 i 指向头，j 指向尾，求`arr[i]+arr[j]`
- 如果大于 n，则 j 需要向前移动
- 如果小于 n，则 i 需要向后移动

```ts
//
function findTwoNumbers2(arr: number[], n: number): number[] {
  const res: number[] = [];
  const len = arr.length;
  const res: number[] = [];
  let i = 0;
  let j = len - 1;
  while (i < j) {
    const n1 = arr[i];
    const n2 = arr[j];
    const total = n1 + n2;
    if (total < n) {
      i++;
    } else if (total > n) {
      j--;
    } else {
      res.push(n1);
      res.push(n2);
      break;
    }
  }
  return res;
}
```

##### 求一个二叉搜索树的第 k 小的值

- 二叉树数据结构`{vaule: any; left?:T; right?:T }`

二叉树的遍历

- 前序遍历: `root->left->right`
- 中序遍历: `left->root->right`
- 后序遍历: `left->right->root`

```ts
const tree: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 2,
      left: null,
      right: null,
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
};
interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}
// 二叉树前序遍历
function preOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;
  preOrderTraverse(node.left);
  preOrderTraverse(node.right);
}
```
