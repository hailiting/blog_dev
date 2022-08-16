# 工作中常用的工具类

## 输入框为数字

```
export function inputNumStyleValue(value, exp) {
  let v = value
    .replace(/[^0-9\.]/, "")
    .replace(/^0{1,}/, "0")
    .replace(/^(0)([1-9])/, ($1, $2) => {
      return $2;
    })
    .replace(/^\./, "0.");
  let d = v.split(".");
  if (d[1] && d[1].length > exp) {
    console.log(111, d[1].slice(0, exp))
    v = d[0] + "." + d[1].slice(0, exp);
  }
  if (v && !isFloat(v)) {
    return;
  }
  console.log({ v })
  return v;
}
```

## 显示数字

```
function toNonExponential(num) {
  let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}


export function accFloorInfo(value = 0, exp = 8) {
  if (String(Number(value)) === 'NaN' || value == '') {
    return ''
  }
  if (String(value).indexOf('.') > -1 && !String(value).split('.')[1]) {
    return value
  }
  if (Number(value) === 0) {
    return String(value);
  }
  let val = String(parseFloat(Number(value)))

  if (val.indexOf('e') !== -1) {
    val = toNonExponential(+val)
  }
  if (exp === 0) {
    return val.split('.')[0]
  }
  let pointval = val.split('.')[1]
  if (pointval) {
    for (let i = 0; i < 12; i++) {
      if (pointval.charAt(pointval.length - 1) === '0') {
        pointval = pointval.substr(0, pointval.length - 1)
      }
    }
  }
  const num002 = pointval ? String(pointval).length > 0 ? '.' + String(pointval).substring(0, exp) : '' : ''
  return val.split('.')[0] + num002
}
```

## 0.001 小数点位数

```
export function numberSplit(str) {
  if (+str >= 1) {
    return str.split('.')[0];
  } else {
    let tepmlue = parseFloat(str);
    let result = tepmlue.toString();
    if (result.indexOf('e') !== -1) {
      result = toNonExponential(+result)
    }
    return result.split('.')[1].length;
    // return str.replace(/(\.\d+[1-9])0+$/, '$1');
  }
};
```

## 判断能不能被`JSON.parse`解析

```
function isJson(str) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}
```

## 保留小数点 n 位，并规避科学计数法

```js
function digits(v, d = 0) {
  let a = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
  if (!v && v !== 0) {
    if (!d) return v;
    a.length = d;
    return "0." + a.join("");
  }
  if (d === 0 || d === "0" || !d || !Number(d)) {
    return Math.floor(v);
  }
  // 整数截取
  if (d <= 0) {
    let r = math
      .chain(v)
      .multiply(
        math
          .chain(math.pow(10, math.bignumber(d)))
          .format({ notation: "fixed" })
          .done()
      )
      .format({ notation: "fixed" })
      .done();
    r = Math.floor(r);
    r = math
      .chain(r)
      .divide(
        math
          .chain(math.pow(10, math.bignumber(d)))
          .format({ notation: "fixed" })
          .done()
      )
      .format({ notation: "fixed" })
      .done();
    return r;
  }
  let s = v;
  if (`${s}`.indexOf("e") !== -1) {
    let m = s.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    s = s.toFixed(Math.max(0, (m[1] || "").length - m[2]));
  }
  let c = `${s}`.split(".");
  if (!c[1]) {
    c[1] = "";
  }
  if (c[1].length == d) {
    return s;
  }
  if (c[1].length < d) {
    a.length = d - c[1].length;
    return c[1] ? s + a.join("") : a.length ? s + "." + a.join("") : s;
  }
  if (c[1].length > d) {
    c[1] = c[1].split("");
    c[1].length = d;
    return c[0] + "." + c[1].join("");
  }
  return v;
}
```

## 对象排序

```
var compare = function (prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop]; if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}
data.sort(compare("symbolName"))
```
