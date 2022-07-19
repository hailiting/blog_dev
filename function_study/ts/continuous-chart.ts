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
