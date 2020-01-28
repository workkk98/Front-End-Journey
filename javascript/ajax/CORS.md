# CORS (corss-origin-resource-sharing)

CORS是W3C的一个工作草案，定义了在必须访问跨源资源是，浏览器与服务器应该如何沟通。
基本思想，就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是应该失败.

请求额外附加一个请求首部 origin 字段

Origin: \http://www.nczonline.net

响应
Access-Control-Allow-Origin: \http://www.nczonline.net
如果对应但属性值是 * ,则表示是公共资源
如果响应没有这个字段 或 有字段但对应但源信息不对应 则浏览器会驳回请求。

#### 除IE其他浏览器对CORS的实现

通过XMLHttpRequest对象实现了对CORS的原生实现。
具体红宝书p584

#### Preflighted Request(复杂请求)

> CORS通过一种叫做 PReflighted Request的透明服务器验证机制支持开发人员使用自定义的头部,
> GET或POST之外的方法,以及不同类型的主体内容(POST 假如content-type 不是常用的格式 也会有这个过程)
> 就会向服务器发送一个preflight请求。这种请求使用**OPTIONS**方法。

options请求头部
* Origin
* Access-Control-Request-Method: 请求自身使用的方法
* Access-Control-Request-Headers: 自定义头部信息,多个头部以逗号分隔

响应
* Access-Control-Allow-Origin 允许的源地址
* Access-Control-Allow-Method: 允许的方法
* Access-Control-Allow-Headers: 允许的头部
* Access-Control-Max-Age : 1728000 预请求结束后，结果将按照响应中指定的事件缓存起来

#### 带凭据的请求。

默认情况下，跨源请求不提供凭据( cookie , HTTP认证 以及客户端SSL 证明等) 预请求也可发送

请求头
withCredentials: true

响应头
Access-Control-Allow-Credentials: true

假如响应没有这个Access-Control-Allow-Credentials字段，那么浏览器不会把这个响应移交给JS。
* xhr.status为0
* xhr.responseText为空字符串
* 且会触发onerror事件处理程序


