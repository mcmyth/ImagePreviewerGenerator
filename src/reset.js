(() => {
  const fs = require('fs')
  if (fs.existsSync('./output/')) fs.rmdirSync('./output/',{ recursive: true })
  if (fs.existsSync('./image/')) fs.rmdirSync('./image/', { recursive: true })
  fs.mkdirSync('./output/')
  fs.mkdirSync('./image/')
})()