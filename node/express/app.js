const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express();

// // create application/json parser
// var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(urlencodedParser)

app.get('/index' , function (req,res,next) {
  fs.readFile('./src/index.html', function (err,data) {
    if(err) next(err);
    else {
      res.writeHead(200, 'OK' ,{'Content-Type' : ['text/html', 'charset=utf-8']})
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