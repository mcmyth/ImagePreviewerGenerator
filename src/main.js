const server = require('./server')
const config = require('../config.js').config
const fs = require('fs')
const puppeteer = require('puppeteer')
const api = require('./server/api')
const fileHelper = require('./FileHelper')
const getFileCount = () => {
  return new Promise(resolve => {
    const dir = './image'
    fs.readdir(dir, (err, files) => {
      resolve(files.length)
    })
  })
}

(async () => {
  const files = JSON.parse(String(await fileHelper.getFile('./image'))).files
  const instance = server.app.listen(config.port)
  if (String(process.argv.splice(2)) === 'debug') {
    console.log(`express running on:http://localhost:${config.port}\nfirst page:http://localhost:${config.port}/?p=1&itemCount=${config.itemCount}&column=${config.column}&fontSize=${config.fontSize}&sizeLabel=${config.sizeLabel}`)
    return
  }
  const pageCount = await getFileCount()
  const browser = await puppeteer.launch({
    headless: true,
    timeout: 600000
  })
  for (let i = 0; i < pageCount; i++) {
    const page = await browser.newPage()
    const pageNumber = i + 1
    console.log(`${pageNumber}/${pageCount}`)
    const url = `http://localhost:${config.port}/?p=${pageNumber}&itemCount=${config.itemCount}&column=${config.column}&fontSize=${config.fontSize}&sizeLabel=${config.sizeLabel}`
    try {
      await page.goto(url, {'waitUntil': 'networkidle2', timeout: 600000})
    } catch (err) {
      await browser.close()
    }
    await page.setViewport({width: Math.round(config.pageWidth), height: 100})
    await setTimeout(async () => {
      const containerHeight = await page.evaluate(() => {
        return document.body.offsetHeight
      })
      await page.setViewport({width: Math.round(config.pageWidth), height: containerHeight})
      if (!fs.existsSync('./output/')) fs.mkdirSync('./output/')
      await page.screenshot({path: `./output/${files[i].substring(0, files[i].indexOf("."))}.png`})
      await page.close()
      if (pageNumber === pageCount) {
        await browser.close()
        instance.close()
      }
    }, 200)
  }
})()
