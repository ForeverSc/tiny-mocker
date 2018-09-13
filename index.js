const path = require('path')
const fs = require('fs')
const http = require('http')
const URL = require('url')

const { argv } = require('yargs')
const mockDir = argv.m || 'mock'
const port = argv.p || 4000

http.createServer((req, res) => {
  try {
    const url = URL.parse(req.url)
    const filePath = path.join(__dirname, mockDir, url.pathname)
    const file = fs.readFileSync(filePath + '.json', 'utf8')

    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
    res.write(file)
    res.end()
  } catch (error) {
    res.statusCode = 500
    res.end()
  }
}).listen(port)
