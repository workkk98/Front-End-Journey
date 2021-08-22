var http  = require('http');
var fs = require('fs')
var path = require('path')

var regex = /\.js/g;

var serve = http.createServer(function (req,res) {
  if( regex.test(req.url) ) {
    //捕捉一下具体文件名
    var regex2  = /(\w+)\.js$/g;
    var matches = regex2.exec(req.url);
    var absolute = path.resolve(__dirname, `./${matches[1]}.js`)
    var index = fs.readFileSync(absolute)
    res.end(index);
  }
  if( req.url === '/') {
    var absolute = path.resolve(__dirname,'./index.html')
    var index = fs.readFileSync(absolute)
    res.end(index);
  } else {
    res.end('nothing')
  }
})

serve.listen(1818,function () {
  console.log('http serve start at 1818')
})