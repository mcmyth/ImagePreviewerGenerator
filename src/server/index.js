const express = require('express')
const api = require('./api.js')
const app = express()
app.use(express.static(__dirname + '/public'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
})
app.use('/api', api)

module.exports.app = app
