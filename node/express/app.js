const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')
const app = express();

// 配置环境
if(app.get('env') == 'devlopment') {
  console.log(app.get('env'))
} else {
  console.log(app.get('env'))
}

// 中间件集合

// Body-Parser
// // create application/json parser
// var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

// cookie-parser
app.use(cookieParser())

// static
app.use(express.static(path.resolve(__dirname , './public')))

// 路由 + 正则
app.get('/params/:id?/:name' , function (req,res) {
  console.log('path 通过解析 放入params的对象 获得' , req.params)
  res.send('params')
})
// 匹配 /regex路径
app.get(/\/regex\/?(\w*\d*)?\/?(\w*\d*)?/ , function (req,res) {
  console.log('path 通过解析 放入params的对象 获得' , req.params)
  res.send('params')
})


app.get('/index' , function (req,res) {
  fs.readFile('./src/index.html', function (err,data) {
    if(err) next(err);
    else {
      console.log(req.cookies)
      res.writeHead(200, 'OK' ,{
        'Content-Type' : ['text/html', 'charset=utf-8'],
        'Set-Cookie': 'express=cookieParser'
      })
      res.end(data)
    }
  })
})

app.post('/post' ,  function (req,res) {
  console.log(req.body);
  res.send('success');
})


app.listen(8012 , function () {
  console.log('express is running on 8012')
})