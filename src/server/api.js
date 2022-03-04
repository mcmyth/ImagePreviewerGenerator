const express = require('express')
const router = express.Router()
const fileHelper = require('../FileHelper')
router.get('/files', async (req, res) => {
  res.send(await fileHelper.getFile('./image'))
})
module.exports = router
