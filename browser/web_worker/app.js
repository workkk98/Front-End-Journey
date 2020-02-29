const express = require('express');
const fs = require('fs');
const app = express();

app.get('/' , function (req,res) {
  fs.readFile('./src/index.html' , function (err,data) {
    res.setHeader('Content-Type' , 'text/html');
    res.send(data)
  })
})

app.get('/worker.js' , function (req,res) {
  fs.readFile('./src/worker.js' , function (err,data) {
    res.setHeader('Content-Type' , 'text/plain');
    res.send(data)
  })
})

app.get('/utils.js' , function (req,res) {
  fs.readFile('./src/utils.js' , function (err,data) {
    res.setHeader('Content-Type' , 'application/javascript');
    res.send(data)
  })
})


app.listen(8012 , function () {
  console.log('app is running on 8012')
})