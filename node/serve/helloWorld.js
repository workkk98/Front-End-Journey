const http = require('http')

const data = {
  a: 'a',
  b: 'b'
}

http.createServer((req,res) => {
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  const result = JSON.stringify(data)
  res.end(result)
}).listen(8000, ()=> {
  console.log("serve run on 8000")
})