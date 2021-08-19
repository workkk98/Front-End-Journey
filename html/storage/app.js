const express = require('express');
const fs = require('fs')
const app = express();

app.get('/' , function (req,res) {
  fs.readFile('./src/index.html' , function (err,data) {
    res.setHeader('Content-Type' , 'text/html')
    res.send(data)
  })
})

app.listen(8012,function () {
  console.log('express is running at 8012')
})