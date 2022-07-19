// bad
const arr = [1, 2, 0, 0, 0, 0, 12, 1];
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
moveZero3(arr);
console.log(arr);

// const arr1 = [];
// for (let i = 0; i < 20 * 10000; i++) {
//   if (i % 10 === 0) {
//     arr1.push(0);
//   } else {
//     arr1.push(i);
//   }
// }
// console.time("arr1");
// moveZero1(arr1);
// console.timeEnd("arr1");
// const arr2 = [];
// for (let i = 0; i < 20 * 10000; i++) {
//   if (i % 10 === 0) {
//     arr2.push(0);
//   } else {
//     arr2.push(i);
//   }
// }
// console.time("arr2");
// moveZero2(arr2);
// console.timeEnd("arr2");
