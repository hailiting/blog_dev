/**
 * 栈
 * 378. 有序矩阵中第K小的元素
 * 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
 * 请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  let arr = []
  for (let i in matrix) {
    arr.push(...matrix[i])
  }
  arr = arr.sort((a, b) => a - b)
  console.log({ arr, k })
  return arr[k - 1]
};


let i = 0;
const arr = [
  {
    A: [[1, 5, 9], [10, 11, 13], [12, 13, 15]],
    B: 8,
    c: 13
  },
  {
    A: [[1, 5, 9], [10, 11, 13], [1, 2, 3]],
    B: 4,
    c: 10
  },
  {
    A: [[7, 8, 9], [10, 11, 13], [1, 2, 3]],
    B: 7,
    c: 2
  },
  {
    A: [[6, 10, 19], [4, 7, 9], [11, 22, 31]],
    B: 6,
    c: 19
  },
]
let Timer = setInterval(() => {
  if (i < arr.length) {
    console.log("算法得到值：", kthSmallest(arr[i].A, arr[i].B), "   ", arr[i].c, "目标值：",)
    i++
  } else {
    clearInterval(Timer)
  }
}, 2000)
/**
 * 718. 最长重复子数组
 * 给两个整数数组 A 和 B ，
 * 返回两个数组中[公共的]、[长度最长]的[子数组的长度]。
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
const findLength = (A, B) => {
  const m = A.length;
  const n = B.length;
  const dp = new Array(m + 1);
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }                                 // 初始化二维数组dp，每一项都是0
  let res = 0;
  for (let i = 1; i <= m; i++) {    // base case的情况，初始化时已包括了
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] == B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }                             // A[i-1]!=B[j-1]的情况，初始化时已包括了
      res = Math.max(dp[i][j], res);
    }
  }
  return res;
};
const arr = [
  { A: [0, 1, 1, 1, 1], B: [1, 0, 1, 0, 1], c: 2 },
  { A: [1, 2, 3, 2, 1], B: [3, 2, 1, 4, 7], c: 3 },
  { A: [0, 0, 0, 0, 0], B: [0, 0, 0, 0, 0], c: 5 },
  { A: [0, 0, 0, 0, 1], B: [1, 0, 0, 0, 0], c: 4 },
  { A: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], B: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], c: 9 },
  { A: [1, 0, 0, 0, 1, 0, 0, 1, 0, 0], B: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0], c: 3 },
]
let i = 0;
let Timer = setInterval(() => {
  if (i < arr.length) {
    console.log("算法得到值：", findLength(arr[i].A, arr[i].B), "   ", arr[i].c, "目标值：",)
    i++
  } else {
    clearInterval(Timer)
  }
}, 2000)

/**
 * 09. 用两个栈实现队列
 * 用两个栈实现一个队列。
 * 队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
 * 在队列尾部插入整数 
 * 在队列头部删除整数的功能。
 * (若队列中没有元素，deleteHead 操作返回 -1 )
 */
class CQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  appendTail(value) {
    this.stack1.push(value);
  }
  deleteHead() {
    if (this.stack2.length) return this.stack2.pop();
    while (this.stack1.length) {
      // 一直往stack2加，直到stack1 length 为0,此时stack2的最后一个元素的为stack1的第一个元素
      this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop() || -1;
  }
}
/**
 * 215. 数组中的第K个最大元素
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const bol = nums instanceof Array && nums.length;
  if (bol) {
    const numsCopy = nums.sort((a, b) => b - a);
    return numsCopy[k - 1];
  }
};

// const nums = [3, 2, 1, 5, 6, 4], k = 2; // 5
// const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4; // 4
// console.log(findKthLargest(nums, k))
/**
 * 209. 长度最小的子数组
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，
 * 找出该数组中满足其和 ≥ s 的长度最小的连续子数组，
 * 并返回其长度。如果不存在符合条件的连续子数组，返回 0。
 * j
 * 1 2 3 4 5
 * k
 * j动 k不动，和 k动 j不动
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
  if (nums.length) {
    const MaxNumber = Number.MAX_SAFE_INTEGER;
    let i = 0, sum = 0, aum = MaxNumber;
    for (let j = 0; j < nums.length; j++) {
      sum += nums[j]
      while (sum >= s) {
        console.log(i, j)
        aum = Math.min(aum, j - i + 1);
        sum -= nums[i++]
      }
    }
    if (aum !== MaxNumber) {
      return aum;
    }
  }
  return 0;
}
// const s = 7, nums = [2, 3, 1, 2, 4, 3];
// console.log(minSubArrayLen(s, nums))



/**
 * 16. 最接近的三数之和
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。
 * 找出 nums 中的三个整数，使得它们的和与 target 最接近。
 * 返回这三个数的和。假定每组输入只存在唯一答案。
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  const bol = nums instanceof Array && nums.length && nums.filter(v => v % 1 === 0).length >= 3 && target % 1 === 0;
  if (bol) {
    let sum = Number.MAX_SAFE_INTEGER, sub = Number.MAX_SAFE_INTEGER, j = 0, k = 0;
    for (let i = 0; i < nums.length - 2; i++) {
      while (i + 2 < nums.length) {
        j = i + 1;
        while (j < nums.length) {
          k = j + 1;
          while (k < nums.length) {
            const sum02 = nums[i] + nums[j] + nums[k];
            const sub02 = Math.abs(sum02 - target);
            // console.log(sum02, i, j, k)
            if (sub02 === 0) {
              return sum02;
            }
            if (sub >= sub02) {
              sum = sum02;
              sub = sub02;
            };
            k++;
          }
          j++;
        }
        i++
      }
    }
    return sum === Number.MAX_SAFE_INTEGER ? 0 : sum;
  }
};
// const target = 1, nums = [0, 2, 1, -3]; // 0
// const target = 1, nums = [-1, 2, 1, -4]; // 2
// const target = -100, nums = [1, 1, 1, 0];   // 2
// const target = -1, nums = [1, 1, -1, -1, 3]; // -1
// const nums = [-7, -71, -7, -13, 45, 46, -50, 83, -29, -72, 9, 32, -74, 81, 68, 92, -31, 28, -46, -86, -70, 31, -62, -20, -56, 97, -41, 21, 81, 17, -14, 56, 69, 16, 25, -38, 65, -48, 15, 16, -25, 68, -41, 46, -56, -2, -3, 82, 8, 19, -32, 62, 92, -56, -9, 43, 50, 100, 66, -45, 41, -24, -4, 83, -36, 79, 24, 97, 82, 89, -56, -91, 75, -64, -68, 96, -55, -52, -58, -37, 68, 27, 89, -40, -42, 94, -92, -70, 40, 74, 75, -15, 54, -54, 0, 4, -39, 93, 88, -31, -26, 93, 8, -85, -62, 89, -93, 98, 4, -58, 8, 5, -93, 7, 30, -75, 63, 41, 62, -52, 49, 93, -11, 87, 7, 52, 5, -96, -56, 43, -41, -75, -16, 73, 6, 35, -32, 62, -50, -57, -25, 5, -32, 94, -70, 6, 19, -12, 63, -47, 76, -57, 41, -49, -33, -15, -81, 55, 88, 67, -51, 100, -19, -39, 62, 84, -100, 78, -24, 31, -32, -83, 33, -25, 86, 9, -30, -40, 52, 64, -30, -17, 19, -69, -89, -67, -79, -100, -53]
// const target = 157   // 157
// threeSumClosest(nums, target)
// console.log(threeSumClosest(nums, target))

