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
