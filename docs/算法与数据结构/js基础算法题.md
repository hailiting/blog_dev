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

递归

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let left = [];
  let right = [];
  const midIndex = Math.floor(length / 2);
  const midValue = arr.splice(midIndex, midIndex + 1)[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= midValue) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat(midValue, quickSort(right));
  // return [...quickSort(left), midValue, ...quickSort(right)];
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

##### 求一个二叉搜索树的第 k 小的值（O(logn)）

- 二叉树数据结构`{vaule: any; left?:T; right?:T }`

二叉树的遍历

- 前序遍历: `root->left->right`
- 中序遍历: `left->root->right`
- 后序遍历: `left->right->root`

```ts
export const tree: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
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
export interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}
const arr: number[] = [];

// 二叉树前序遍历
function preOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;
  // console.log(node.value);
  arr.push(node.value);
  preOrderTraverse(node.left);
  preOrderTraverse(node.right);
}
/**
 * 二叉树中序遍历
 */
function inOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;
  inOrderTraverse(node.left);
  arr.push(node.value);
  // console.log(node.value);
  inOrderTraverse(node.right);
}
function postOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;
  postOrderTraverse(node.left);
  postOrderTraverse(node.right);
  arr.push(node.value);
  // console.log(node.value);
}
/**
 * 寻找BST里的第k小值
 */

export function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node);
  // console.log(arr);
  return arr[k] || null;
}
// postOrderTraverse(tree);
getKthValue(tree, 3);
```

- 二叉树，有 前序，中序，后序 三种遍历方法
- 二叉搜索树的特点：`left<=root; right>=root`
- 二叉搜索树的价值：可使用二分法进行快速查找
- 为什么二叉树重要，而不是三叉树、四叉树
  - 二叉搜索树 BST: 查询快，增删快 -> 木桶效应
  - BST 如果不平衡就变成了链表
  - 所有要尽量平衡，平衡二叉搜索树 BBST
  - BBST 增删查，时间复杂度都是`O(logn)`，即树的高度
  - 红黑树（低成本的快速的保持平衡的二叉树）
  - B 树：物理是多叉树，但逻辑上是二叉树，一般用于高效 I/O，关系型数据库常用 B 树来组织数据

#### 堆栈模型

- js 代码执行时
  - 值类型变量，存储在栈
  - 引用类型变量，存储在堆
- 堆
  - 完全二叉树
  - 最大堆：父节点>=子节点
  - 最小堆：父节点<=子节点
    堆：逻辑是二叉树，物理是一个数组
  - 查询比 BST 慢
  - 增删比 BST 快，维持平衡更快
  - 整体复杂度为 O(logn)

```js
     10
  14   25
33 81 82 99

const heap = [-1,10,24,25,33,81,82,99] // 忽略0节点

// 节点关系
const parentIndex = Math.floor(i/2)
const leftIndex = 2*i
const rightIndex = 2*i+1
```

### 移动 0 到数组的末尾-splice 会导致性能问题

splice 的时间复杂度是`O(n)`

- 需要确认：是否必须修改原数组
- 数组是连续存储空间，要慎用 splice unshift
- 双指针思路

```js
// bad
const arr = [1, 2, 0, 0, 0, 0, 12, 1];
function moveZero1(arr: number[]): void {
  const length = arr.length;
  if (length === 0) return;
  let zeroLength = 0;
  // O(n^2)
  for (let i = 0; i < length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(0);
      arr.splice(i, 1);
      i--;
      zeroLength++;
    }
  }
}
// moveZero1(arr);
// console.log(arr);

// 双指针
function moveZero2(arr: number[]): void {
  const length = arr.length;
  if (length < 2) return;
  let i;
  let j = -1; // 指向第一个0 下标
  for (i = 0; i < length; i++) {
    if (arr[i] === 0) {
      // jj 付过值了
      if (j < 0) {
        j = i;
      }
    }
    if (j >= 0 && arr[i] !== 0) {
      const n = arr[i];
      arr[i] = arr[j];
      arr[j] = n;
      j++;
    }
  }
}
function moveZero3(arr: number[]): void {
  const length = arr.length;
  if (length < 2) return;
  let i;
  let j = arr.indexOf(0); // 指向第一个0 下标
  if (j < 0) return;

  for (i = j; i < length - 1; i++) {
    if (j >= 0 && arr[i + 1] !== 0) {
      const n = arr[i + 1];
      arr[i + 1] = arr[j];
      arr[j] = n;
      j++;
    }
  }
}
// moveZero2(arr);
// console.log(arr);

const arr1 = [];
for (let i = 0; i < 20 * 10000; i++) {
  if (i % 10 === 0) {
    arr1.push(0);
  } else {
    arr1.push(i);
  }
}
console.time("arr1");
moveZero1(arr1);
console.timeEnd("arr1");
const arr2 = [];
for (let i = 0; i < 20 * 10000; i++) {
  if (i % 10 === 0) {
    arr2.push(0);
  } else {
    arr2.push(i);
  }
}
console.time("arr2");
moveZero2(arr2);
console.timeEnd("arr2");
```

### 获取字符串中连续最多的字符以及次数 - 使用嵌套循环

跳步`O(n)`

```js
export function ContinuousChar01(str: string): any {
  const res: any = {
    char: null,
    length: 0,
  };
  const len = str.length;
  for (let i = 0; i < len; i++) {
    let templength = 0;
    for (let j = i; j < len; j++) {
      if (str[i] === str[j]) {
        templength++;
      }
      if (str[i] !== str[j] || j === len - 1) {
        if (templength > res.length) {
          res.length = templength;
          res.char = str[i];
        }
        if (i < len - 1) {
          i = j - 1; // 跳步，因为for最后一步要 i++ 所以这要 -1
        }
        break;
      }
    }
  }
  return res;
}
export function ContinuousChar02(str: string) {
  const res: any = {
    char: null,
    length: 0,
  };
  const len = str.length;
  if (!len) return res;
  let tempLen = 0;
  let i = 0;
  let j = 0;
  for (; i < len; i++) {
    if (str[i] === str[j]) {
      tempLen++;
    }
    if (str[i] !== str[j] || i === len - 1) {
      if (res.length < tempLen) {
        res.length = tempLen;
        res.char = str[j];
      }
      if (i < len - 1) {
        j = i;
        i--; // 循环体末尾会++
      }
      tempLen = 0;
    }
  }
  return res;
}
export const str = "aabbcccddeeee11223";
console.info(ContinuousChar02(str));
```

- 正则表达式->效率非常低，慎用
- 累计各个元素的连续长度，最后求最大值->增加了空间复杂度
- 算法尽量用最原始的判断和循环，不要用语法糖或看似简单的东西

```js
const str = "100abc";
const reg = /^\d+/;

console.time("reg");
for (let i = 0; i < 10000 * 10000; i++) {
  reg.test(str);
}
console.timeEnd("reg"); // 2600

console.time("indexOf");
for (let i = 0; i < 10000 * 10000; i++) {
  str.indexOf("100");
}
console.timeEnd("indexOf"); //80
```

```js
const arr1 = [];
for (let i = 0; i < 10 * 10000; i++) {
  arr1.push(Math.floor(Math.random() * 1000000));
}
function sortFn(arr: number[]): number[] {
  if (arr.length < 2) return arr;
  const left = [];
  const right = [];
  const midIndex = Math.floor(arr.length / 2);
  const midValue = arr[midIndex];
  for (let i = 0; i < arr.length; i++) {
    if (i !== midIndex) {
      const item = arr[i];
      if (item < midValue) {
        left.push(item);
      } else {
        right.push(item);
      }
    }
  }
  return sortFn(left).concat([midValue], sortFn(right));
}
console.time("sort");
sortFn(arr1);
console.timeEnd("sort");
```

### 获取 1-10000 之间所有的对称数（回文数）

```ts
function findPalindromeNumbers1(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;
  for (let i = 1; i <= max; i++) {
    const s = i.toString();
    if (s === s.split("").reverse().join("")) {
      res.push(i);
    }
  }
  return res;
}
console.info(findPalindromeNumbers1(200));
function findPalindromeNumbers2(max) {
  const res = [];
  for (let i = 1; i <= max; i++) {
    const item = i.toString();
    const length = item.length;
    let flag = true;
    let start = 0;
    let end = length - 1;
    while (start < end) {
      if (item[start] !== item[end]) {
        flag = false;
        break;
      } else {
        start++;
        end--;
      }
    }
    if (flag) res.push(i);
  }
  return res;
}
console.info(findPalindromeNumbers2(200));
function findPalindromeNumbers3(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;
  for (let i = 1; i <= max; i++) {
    let n = i;
    let rev = 0;
    while (n > 0) {
      rev = rev * 10 + (n % 10);
      n = Math.floor(n / 10);
    }
    if (i === rev) res.push(i);
  }
  return res;
}
console.info(findPalindromeNumbers3(200));
```

- 尽量不要转换数据结构，尤其数组这种有序的结构
- 尽量不要用内置 api，如 reverse，不好识别复杂度
- 数字操作快，其次是字符串

### 高效的字符串前缀匹配

- 有一个英文单词库（数组），里面有几十万个英语单词
- 输入一个字符串，快速判断是否是某一个单词的前缀
- 方法一：
  - 防抖，节能
  - 遍历单词库数组
  - indexOf
  - 复杂度`>O(n)`
- 方法二：
  - 树状结构 `O(m)` m 为单词的长度
  - 哈希表 -> 逻辑结构，理论模型

### 数字千分位格式化

- 转换为数组，reverse，每 3 位拆分
- 正则表达式
- 字符串拆分

```js
function format1(n: number): string {
  n = Math.floor(n);
  const s = n.toString();
  const arr = s.split("").reverse();
  return arr.reduce((prev, val, index) => {
    if (index % 3 === 0) {
      if (prev) {
        return val + "," + prev;
      } else {
        return val;
      }
    } else {
      return val + prev;
    }
  }, "");
}
function format2(n: number): string {
  n = Math.floor(n);
  const s = n.toString();
  const len = s.length;
  let res = "";
  for (let i = len - 1; i >= 0; i--) {
    const j = len - i;
    if (j % 3 === 0) {
      if (i === 0) {
        res = s[i] + res;
      } else {
        res = "," + s[i] + res;
      }
    } else {
      res = s[i] + res;
    }
  }
  return res;
}
const n = 1231231231312312;
console.info(format2(n));
```

### 用 js 切换字母大小写

计算机编码的基础

- 正则
- ASCII 编码
  - `"abc".charCodeAt(0)`

```js
function switchLetterCase1(s: string): string {
  let res = "";
  const len = s.length;
  if (len === 0) return "";
  const reg1 = /[a-z]/;
  const reg2 = /[A-Z]/;
  for (let i = 0; i < len; i++) {
    const c = s[i];
    if (reg1.test(c)) {
      res += c.toUpperCase();
    } else if (reg2.test(c)) {
      res += c.toLowerCase();
    } else {
      res += c;
    }
  }
  return res;
}

const str = "adfADSdwewe";
console.time("1");
console.info(switchLetterCase1(str));
console.timeEnd("1");

function switchLetterCase2(s: string): string {
  let res = "";
  const len = s.length;
  if (len === 0) return "";
  for (let i = 0; i < len; i++) {
    const c = s[i];
    const cCode = c.charCodeAt(0);
    if (cCode >= 65 && cCode <= 90) {
      res += c.toLowerCase();
    } else if (cCode >= 97 && cCode <= 122) {
      res += c.toUpperCase();
    } else {
      res += c;
    }
  }
  return res;
}
console.time("2");
console.info(switchLetterCase2(str));
console.timeEnd("2");
```

### 为啥`0.1+0.2 !== 0.3`

二进制的问题
小数存储二进制，没法精确解析二进制
`mathjs`

## 常见的数据结构：数组、栈、队列、链表、二叉树

- 有序数据考虑二分
- 双指针可以解决嵌套循环
