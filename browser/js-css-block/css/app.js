const http = require('http');

const app = http.createServer(function (req, res) {
  console.log('comming');
  setTimeout(function () {
    res.setHeader('Content-Type', 'text/css');
    res.end('body div:first {\
      color: pink;\
      }');
  }, 5000);
});

app.listen(8012);