const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const md5 = require('md5');

function getGLNZ(){
  return moment().utc().add(2,'m').format('ddd, DD MMM YYYY HH:mm:ss')+' GMT';
}


app.get('/index.js' , function (req, res) {
  let indexPath = path.resolve(__dirname, './static/index.js')
  const indexString = fs.readFileSync(indexPath);
  res.setHeader('Cache-Control', 'pulic,max-age=86400') // 过期时间一天
  res.send(indexString)
})

// 使用expires 字段的缺点
// 1. 浏览器时间和服务器时间不同步，如果浏览器设置未来的时间，可能导致expires字段没用
// 2. 超过过期时间后，客户端不管文件是否被修改都会重新发起请求
app.get('/expires.js',(req, res)=>{
    let jsPath = path.resolve(__dirname,'./static/demo.js');
    let cont = fs.readFileSync(jsPath);
    // 刷新多次页面打开控制台可以观察到访问/demo.js,不重新访问，并使用缓存
    res.setHeader('expires',getGLNZ())
    // http 1.0的产物
    res.end(cont)
})


// cache-control 主要是弥补expires的浏览器服务器时间不同步的原因
// 但是过期后还是得重新发送请求获取新资源
app.get('/cache-control.js',(req, res)=>{
  let jsPath = path.resolve(__dirname,'./static/demo.js');
  let cont = fs.readFileSync(jsPath);
  res.setHeader('Cache-Control', 'public,max-age=60') // max-age单位秒
  res.end(cont)
})

// Last-Modified
// 过程: 给文件设置强缓存 和 协商缓存 如果强缓存过期后，请求携带If-modified-since(就是上次响应的Last-Modified字段值)
// 跟服务器进行比对，如果有修改则返回新的文件。没有则是304
// 优点 比对资源是否被修改 未修改则不返回 减轻了服务器的压力
// 缺点：不精确。1. 1s内修改多次，无法获得最新的 2. 修改后与原来的内容相同，仍会被发送
app.get('/last-modified.js',(req, res)=>{
  let jsPath = path.resolve(__dirname,'./static/demo.js')
  let cont = fs.readFileSync(jsPath);
  // 注意这一行代码 返回文件修改状态
  let status = fs.statSync(jsPath)

  let lastModified = status.mtime.toUTCString()
  //
  if(lastModified === req.headers['if-modified-since']){
      res.writeHead(304, 'Not Modified')
      res.end()
  } else {
      res.setHeader('Cache-Control', 'public,max-age=5')
      res.setHeader('Last-Modified', lastModified)
      res.writeHead(200, 'OK')
      res.end(cont)
  }
})

// E-Tag
// 解决了 last-modified的问题
app.get('/etag.js',(req, res)=>{
  let jsPath = path.resolve(__dirname,'./static/demo.js');
  let cont = fs.readFileSync(jsPath);
  // 对字符串加密
  let etag = md5(cont);
  if(req.headers['if-none-match'] === etag){
      res.writeHead(304, 'Not Modified');
      res.end();
  } else {
      res.setHeader('ETag', etag);
      res.writeHead(200, 'OK');
      res.end(cont);
  }
})

app.get('*',(req,res) => {
  console.log(req.url)
  let target = {
    'expires': 'expires',
    'cache-control': 'cache-control',
    'last-modified': 'last-modified',
    'etag': 'etag'
  }
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <title>Document</title>
  </head>
  <body>
      HTTP cache demo
      <script src="/${target[req.url.substring(1)] || 'index'}.js"></script>
  </body>
  </html>`)
})

app.listen(port,()=>{
    console.log(`listen on ${port}`)    
})

