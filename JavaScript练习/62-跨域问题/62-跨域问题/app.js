const http = require("http")
const fs = require('fs')

let server = http.createServer(function (req, res) {
  console.log(req.url)
  if (req.url === "/") {
    fs.createReadStream('./index.html').pipe(res)
    return
  }

  if (req.url == '/index.css') {
    res.setHeader("Content-Type", "text/css")
    fs.createReadStream('./index.css').pipe(res)
    return;
  }
  if (req.url == '/api/list') {
    // res.setHeader("access-control-allow-origin", "*")
    res.end(
      JSON.stringify({ "name": "wuwei" })
    )
  }
  res.end("hello wuwei")
})

server.listen(3000, function (err) {
  if (err) {
    console.log("服务启动失败")
    return
  }
  console.log("Server start at 3000 port")
})