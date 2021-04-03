const server = require('./server')
const fs = require('fs')
const puppeteer = require('puppeteer')
const getFileCount = () => {
  return new Promise(resolve => {
    const dir = './image'
    fs.readdir(dir, (err, files) => {
      resolve(files.length)
    })
  })
}

(async () => {
  // 主要配置项
  let pageWidth = 1080 // 页面宽度
  const port = 3000 // Express服务端监听端口
  const instance = server.app.listen(port)
  const itemCount = 2 //单页图像总数
  const column = 1 // 单页图像列数
  const fontSize = '50px' //文件名标签字体大小

  const fileCount = await getFileCount()
  const pageCount = Math.ceil(fileCount / itemCount)
  const browser = await puppeteer.launch({
    headless: true,
  })
  for (let i = 0; i < pageCount; i++) {
    const page = await browser.newPage()
    const pageNumber = i + 1
    console.log(`${pageNumber}/${pageCount}`)
    const url = `http://localhost:${port}/?p=${pageNumber}&itemCount=${itemCount}&column=${column}&fontSize=${fontSize}`
    try {
      await page.goto(url, {'waitUntil': 'networkidle2'})
    } catch (err) {
      await browser.close()
    }
    await page.setViewport({width: Math.round(pageWidth), height: 100})
    await setTimeout(async () => {
      const containerHeight = await page.evaluate(() => {
        return document.body.offsetHeight
      })
      await page.setViewport({width: Math.round(pageWidth), height: containerHeight + 100})
      if (!fs.existsSync('./output/')) fs.mkdirSync('./output/')
      await page.screenshot({path: './output/' + pageNumber + '.png'})
      await page.close()
      if (pageNumber === pageCount) {
        await browser.close()
        instance.close()
      }
    }, 200)
  }
})()
