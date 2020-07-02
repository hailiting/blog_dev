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

// var findLength = function (A, B) {
//   const bol = A instanceof Array && A.length && B instanceof Array && B.length;
//   if (bol) {
//     let arr = [], Len = 0, sub = 0;
//     for (let i = 0; i < A.length; i++) {
//       let j = 0, k = i;
//       while (j < B.length && k < A.length) {
//         let e = j
//         while (e < B.length && k < A.length) {
//           console.log(j, e, k)
//           if (A[k] == B[e]) {
//             if (arr.length && (e > arr[arr.length - 1] && sub == e - k)) {
//               arr.push(e)
//             } else {
//               Len = arr.length > Len ? arr.length : Len;
//               arr = [e]
//               sub = e - k; // 差值
//             }
//             k++
//           } else {
//             k = i
//           }
//           e++
//         }
//         k = i
//         j++;
//       }
//     }
//     return Len && Len > arr.length ? Len : arr.length
//   }
// };
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
