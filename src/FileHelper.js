const fs = require('fs')
const getFile = async function (dir) {
  return new Promise(resolve => {
    fs.readdir(dir, async (err, files) => {
      const json = {
        files,
        count: files.length
      }
      json.files = bSort(json.files)
      resolve(JSON.stringify(json))
    });
  })
}

function bSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 相邻元素两两对比，元素交换，大的元素交换到后面
      if (Number(arr[j].replace(/[^\d.]/g, '')) > Number(arr[j + 1].replace(/[^\d.]/g, ''))) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
module.exports.getFile = getFile;
