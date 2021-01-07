# StringRow

```js
String.raw1  = function(strings, ...values){
  // strings: [object Object], values: 3
  console.log(`strings: ${strings}, values: ${values}`);
  let output = "";
  let index;
  let len = strings.raw.length;
  for(index =0;index<len, index++){
    output +=  (strings.raw[index]?strings.raw[index]:"")+(values[index]?values[index]:"");
  }
  return output
}
```
