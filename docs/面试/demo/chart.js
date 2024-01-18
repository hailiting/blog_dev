const aCode = "a".charCodeAt(0);
const bCode = "b".charCodeAt(0);
const fCode = "f".charCodeAt(0);
const zCode = "z".charCodeAt(0);

const codeLength = zCode - aCode + 1;
const zkeyLast = (bCode - aCode) * codeLength + fCode - aCode;
const zkeyList = [];
let i = 0;
while (i <= zkeyLast) {
  const n1 = Math.floor(i / codeLength);
  const n2 = i % codeLength;
  zkeyList.push(
    `${String.fromCharCode(n1 + aCode)}${String.fromCharCode(n2 + aCode)}`
  );
  i++;
}
// zkeyList => 从 aa 到 zz 的所有组合
async function getBigFileUrl(url) {
  let index = 0;
  let computed = 0;
  const results = new Array(zkeyList.length).fill(null);
  await new Promise((end) => {
    asyncPool(zkeyList.length, async () => {
      const xhr = new XMLHttpRequest();
      const curIndex = index++;
      if (!zkeyList[curIndex]) return false;
      // true  是否异步
      xhr.open("GET", `${url}${zkeyList[curIndex]}`, true);
      xhr.responseType = "arraybuffer";
      const res = await new Promise((resolve, reject) => {
        try {
          xhr.onload = () => resolve(xhr.response);
          xhr.send();
        } catch (err) {
          reject(new Error(err));
        }
      });
      results[curIndex] = res;
      computed++;
      if (computed >= zkeyList.length) end(null);
      return true;
    });
  });
  console.log({ results });
  const sortedBuffers = results.map((item) => new Uint8Array(item));
  const fullFile = concatenate(sortedBuffers);
  return getFileUrl(fullFile);
}

async function asyncPool(poolLimit, iteratorFn) {
  const promises = [];
  for (let i = 0; i < poolLimit; i++) {
    promises.push(iteratorFn());
  }
  await Promise.all(promises);
}

function getFileUrl(buffers) {
  const blob = new Blob([buffers], { type: "application/octet-stream" });
  return URL.createObjectURL(blob);
}

function concatenate(arrays) {
  if (!arrays.length) return null;
  const totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
  const result = new Uint8Array(totalLength);
  let length = 0;
  for (const array of arrays) {
    result.set(array, length);
    length += array.length;
  }
  return result;
}
async function main() {
  const zkeyFile = await getBigFileUrl("/zkeys60/");
  console.log({ zkeyFile });

  const mergedContent = await fetch(zkeyFile).then((response) =>
    response.arrayBuffer()
  );
  console.log(new Uint8Array(mergedContent));
}

main();
