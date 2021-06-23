// 枚举 添加const就变为常量枚举 -> 会优化性能
const enum Direction {
  up = "up",
  down = "down",
  right = "right",
  left = "left",
}
const value = "up";
if (value === Direction.up) {
  console.log("go up!")
}
// console.log(Direction.up) // 10
// console.log(Direction[0]) // up  像双线映射
