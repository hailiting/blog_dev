/**
 * 长度最小的子数组
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
  const bol = nums instanceof Array && nums.filter(v => +v > 0 && +v % 1 === 0).length === nums.length && nums.length && s > 0 && s % 1 === 0;
  let i = 0, sum = 0, minLength = Number.MAX_SAFE_INTEGER;
  if (bol) {
    for (let j = 0; j < nums.length; j++) {
      sum += nums[j];
      while (sum >= s) {
        minLength = Math.min(minLength, j - i + 1);
        sum -= nums[i++]
      }
    }
  }
  return minLength === Number.MAX_SAFE_INTEGER ? 0 : minLength;
}
const s = 11, nums = [5, 2, 5];
console.log(minSubArrayLen(s, nums))



/**
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
  // 判断nums是数组，并且有3+ 整数 (/(^[1-9]\d*$)/.test(v) 
  const bol = nums instanceof Array && nums.filter(v => +v % 1 === 0).length >= 3 && !isNaN(target);
  if (bol) {
    const numsCopy = nums.filter(v => +v % 1 === 0).map(v => +v);
    let sumArr = []
    for (let i = 0; i < numsCopy.length; i++) {
      for (let j = i + 1; j < (numsCopy.length); j++) {
        for (let k = j + 1; k < (numsCopy.length); k++) {
          sumArr.push(numsCopy[i] + numsCopy[j] + numsCopy[k])
        }
      }
    }
    let val = '', key = '';
    for (let i = 0; i < sumArr.length; i++) {
      const p = Math.abs(sumArr[i] - target)
      if (p === 0) {
        key = sumArr[i];
        break;
      }
      if (val) {
        if (p <= val) val = p, key = sumArr[i];
      } else {
        val = p;
        key = sumArr[i];
      }
    }
    return key;
  }
};
// threeSumClosest([1, 1, -1, -1, 3], -1)

