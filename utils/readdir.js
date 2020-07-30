const { readdir, writeFile } = require('fs');
const { resolve } = require('path');

const FOLDERPATH = resolve(__dirname, "../docs");

const promisify = function (nodeFun) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      nodeFun.call(this, ...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }
}
/**
 *
 * @description 将多层的打印数组降为所有item行单维数组
 * @param {Array} arr 数据数组
 * @returns 所有item行数据数组
 */
const deepFlatten = (arr) => {
  return [].concat(...arr.map(v => {
    return Array.isArray(v) ? deepFlatten(v) : v
  }));
}
// promise异步读取
const getFileName = async (dir, bol, filesM = "") => {
  let files = await promisify(readdir)(dir);

  if (files && files.length) {
    let result = files.map(file => {
      if (file.toLowerCase() === 'readme.md') {
        return `${bol ? "/" + filesM + "/" : ""}`;
      } else if (file.indexOf(".md") > -1) {
        file = file.replace('.md', ''); //替换文件后缀为空
        return `${bol ? "/" + filesM + "/" : ""}${file}`;
      } else {
        if (file !== "node_modules" && file.indexOf(".") === -1) {
          return getFileName(dir + "/" + file, true, file).then(data => {
            data = data instanceof Array ? data : [];
            return {
              title: file,
              collapsable: true,
              children: data.filter(v => v && typeof v === "string"),
              sidebarDepth: 2,
            }
          })
        }
      }
    })
    return deepFlatten(await Promise.all(result));
  }
}
let fileName = []
getFileName(FOLDERPATH, 0).then(data => {
  data = JSON.stringify(data.filter(v => v))
  //写入操作
  console.log({ data })
  writeFile(resolve(__dirname, '../docs/.vuepress/filenames.json'), `${data}`, () => {
    console.log('文件名获取完成.');
  })
})