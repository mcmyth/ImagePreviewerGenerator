const express = require('express')
const router = express.Router()
const fs = require('fs')
router.get('/files', async (req, res) => {
    const dir = './image'
    fs.readdir(dir, (err, files) => {
        fs.readdir(dir, (err, files) => {
            const json = {
                files,
                count: files.length
            }
            json.files = bSort(json.files)
            res.send(JSON.stringify(json))
        });
    });
})

function bSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len-1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            // 相邻元素两两对比，元素交换，大的元素交换到后面
            if (Number(arr[j].replace(/[^\d.]/g,'')) > Number(arr[j + 1].replace(/[^\d.]/g,''))) {
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
module.exports = router
