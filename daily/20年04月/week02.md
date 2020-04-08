# 20年4月周记 2

#### CORS问题

做毕设的时候遇到的问题,遇到跨域问题了。采用CORS解决，复习一下这个过程。

简单请求没问题

请求头携带origin字段， 响应头携带Access-Control-Allow-Origin: value, value是源地址或*都可以

复杂请求
复杂请求先分为这几类(可以从请求报文中分析记忆)
1. 除get,post以外的请求方法
2. 有自定义的请求头
3. Content-Type: 除三个值application/x-www-form-urlencoded、multipart/form-data、text/plain以外的

那么浏览器就会发送一个预检请求options请求, 目的我觉得就是说去检查服务器是否支持这些请求服务。

所以响应会携带这些字段

1. Access-Control-Allow-Methods: 支持的请求方法

2. Access-Control-Allow-Headers: 支持的自定义请求头

3. Access-Control-Max-Age: 该预检请求缓存时间

4. 还有跟cookie相关的 Access-Control-Allow-Credentials

服务器如果不返回 1和2这两个字段，浏览器就会认为服务器不同意预检请求，无法实现跨域访问。


#### options请求在 79+ chrome版本上不再出现

值得一提的是，我昨天在实现过程中，发现到了这一点。

但我的服务器的确是有接收到options请求的，有打印在控制台中。

那原因搜了一下 大致上就是chrome79+ 以上版本不再打印，具体可以看这个链接 [Chrome 79+ no longer shows preflight CORS requests](https://httptoolkit.tech/blog/chrome-79-doesnt-show-cors-preflight)