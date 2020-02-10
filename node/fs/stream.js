const fs = require('fs')

const out = fs.createWriteStream('./stream.txt');
for(let i= 0 ; i< 10000 ; i++) {
  var flag = out.write(i.toString()) // flag代表 系统缓存是否被占满
  console.log(flag)
}

out.on('drain' , function () {
  console.log('drain 系统缓存被清空')
  const out2 = fs.createWriteStream('./stream.txt')
  for(let i=0; i< 10 ; i++) {
    let flag = out2.write(i.toString())
    console.log(flag)
  }
})