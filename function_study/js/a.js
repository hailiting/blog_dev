"use strict";
const arr1 = [];
for (let i = 0; i < 10 * 10000; i++) {
    arr1.push(Math.floor(Math.random() * 1000000));
}
function sortFn(arr) {
    if (arr.length < 2)
        return arr;
    const left = [];
    const right = [];
    const midIndex = Math.floor(arr.length / 2);
    const midValue = arr[midIndex];
    for (let i = 0; i < arr.length; i++) {
        if (i !== midIndex) {
            const item = arr[i];
            if (item < midValue) {
                left.push(item);
            }
            else {
                right.push(item);
            }
        }
    }
    return sortFn(left).concat([midValue], sortFn(right));
}
console.time("sort");
sortFn(arr1);
console.timeEnd("sort");
