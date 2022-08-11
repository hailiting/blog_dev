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
