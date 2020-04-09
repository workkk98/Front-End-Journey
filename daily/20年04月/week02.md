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

**跨域cookie**

非同源服务器上，假如在http请求头上 设置了 Set-Cookie字段，它的确是存储到浏览器上的。

另外这一个不能忽略了，每个cookie都绑定在设置它的域名上。

那么下次cors访问时，我们需要在ajax上携带cookie。所以得设置withCredentials字段

日后 chrome在跨域cookie上需要设置一个SameSite=none 和 Secure 才能让请求携带cookie(具体可以看项目截图)


#### options请求在 79+ chrome版本上不再出现

值得一提的是，我昨天在实现过程中，发现到了这一点。

但我的服务器的确是有接收到options请求的，有打印在控制台中。

那原因搜了一下 大致上就是chrome79+ 以上版本不再打印，具体可以看这个链接 [Chrome 79+ no longer shows preflight CORS requests](https://httptoolkit.tech/blog/chrome-79-doesnt-show-cors-preflight)


#### 机器人行走的范围

问题: 机器人在mXn的矩阵内行走，每次只能走一步，只能上下左右走，限制条件就是 当前位置的数分位之和 < k

例如 此时的位置(10, 5), k是16。 1 + 0 + 5 < 16 所以这个位置是可以走的

那这题其实很简单，我用了BFS。具体思路就是，由若干个可能的当前位置，然后依次每个位置走向下一个位置，并统计总数。

把每个当前位置抽象成树的节点，的确这个就是BFS的思路。**而且我发现，其实往上走和往左走都是不必要的，因为这两个节点必然**

**已经走过了** ,那边界情况还是存在的，当前的几个节点可能会走到同一个节点上这里还是要处理下的。

所以我设置了一个mXn的record表用来记录已经走过的节点，避免重复。