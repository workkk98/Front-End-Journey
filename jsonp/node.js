var http = require('http')
var urlTool = require('url')
// json 数据
var data = {'methods': 'jsonp', 'result': 'success'};

http.createServer(function (request, response) {
    var params = urlTool.parse(request.url, true)
    console.log(params)
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    if (params.query && params.query.callback) {

      // callback(data)
      var str = `${params.query.callback}(${JSON.stringify(data)})`
    }

    response.end(str);
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');