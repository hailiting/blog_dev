# 工作中常用的工具类
## 输入框为数字
~~~
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
~~~
## 显示数字
~~~
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
~~~
## 0.001小数点位数
~~~
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
~~~
## 判断能不能被``JSON.parse``解析
~~~
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
~~~
