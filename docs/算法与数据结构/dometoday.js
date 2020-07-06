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
    for (let k in matrix[i]) {
      arr.push(matrix[i][k])
    }
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