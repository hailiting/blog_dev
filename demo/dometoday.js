// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
var isMatch = function (s, p) {
  if (!s && !p) {
    return true;
  } else {
    let bol = true;
    let str = ''
    if (s && p) {
      for (let i = 0; i < p.length; i++) {
        if (p[i] !== s[i]) {
          if (p[i] === ".") {
            str += p[i];
          } else if (p[i] === "*") {
            if (!str.length) {
              bol = false;
              break;
            } else {
              if (str.indexOf(s[i]) === -1) {
                bol = false;
                break;
              } else {
                str += s[i];
              }
            }
          }
        } else {
          str += p[i];
        }
      }
      if (str !== s[i]) {
        bol = false;
      }
    }
    return bol;
  }
};
const arr = [
  {
    A: "aa",
    B: "a",
    c: false
  },
  {
    A: "aa",
    B: "a*",
    c: true
  },
  {
    A: "ab",
    B: ".*",
    c: true
  },
  {
    A: "aab",
    B: "c*a*b",
    c: true
  },
  {
    A: "mississippi",
    B: "mis*is*p*.",
    c: false
  },
]
let i = 0
let Timer = setInterval(() => {
  if (i < arr.length) {
    console.log("算法得到值：", isMatch(arr[i].A, arr[i].B), "   ", "目标值：", arr[i].c)
    i++
  } else {
    clearInterval(Timer)
  }
}, 1000)