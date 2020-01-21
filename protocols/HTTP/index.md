# HTTP

#### 知识准备

> MIME(Multipurpose Internet Mail Extensions):[多用途网络扩展邮件](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

> HTTP 请求的内容通称为"资源"。”资源“这一概念非常宽泛，它可以是一份文档，一张图片，或所有其他你能够想到的格式。每个资源都由一个 (URI) 来进行标识。一般情况下，资源的名称和位置由同一个 URL（统一资源定位符，它是 URI 的一种）来标识。也有某些特殊情况，资源的名称和位置由不同的 URI 进行标识：例如，待请求的资源希望客户端从另外一个位置访问它。我们可以使用一个特定的首部字段，Alt-Svc，来指示这种情况。
URI (uniform resource identify)= URL (uniform resource locator)+ URN(uniform resource name)


#### 报文格式

###### 请求报文结构
```
请求方法 URL 协议版本
请求头(请求首部字段 通用首部字段 实体首部字段)
/n/r
请求报文主体

例如:
get https://www.github.com http/1.1
accept: text/html
...

请求内容
...
```

响应报文结构
```
协议版本 状态码 状态码信息
响应头(响应首部字段 通用首部字段 实体首部字段)
/n/r 
响应报文主体
```

###### 报文和实体差异
> 报文（message）：
是HTTP通信中的基本单位，由8位组字节流（octet sequence，其中octet为8个比特）组成，通过HTTP通信传输。

> 实体（entity）：
作为请求或响应的有效载荷数据（补充项）被传输，其内容由实体首部和实体主体组成。

> HTTP报文的主体用于传输请求或响应的实体主体。

通常，报文主体等于实体主体，只有当传输中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异。**后面会多次出现，所以我们在这里提前了解两者差异**

###### 请求方法

|      方法名称    |  内容     |
| :-----------: | :-----------: |
|   GET    |   请求获取服务器资源，返回报文主体 |
|   HEAD   |   主要为了用于确认URI的有效性及资源更新的日期时间等,与get一样，但不返回响应主体 |
|   POST   |   向指定资源提交数据进行处理请求(例如提交表单或者上传控件)。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。 |
|   PUT    |   向指定资源，传送数据 |
|   DELETE |   请求服务器删除删除指定内容 |
|   CONNECT |   HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。 它可以用来创建隧道（tunnel)。(通常用于SSL加密服务器的链接，经由加密的HTTP代理服务器) |
| OPTIONS | 测试服务器功能是否正常，服务器返回该资源支持的所有请求方法 |
| TRACE | 显示服务器收到的请求，主要用于测试或诊断

> 一般 DELETE，PUT直接被禁用，毕竟在HTTP/1.1中没有验证机制，所以为了服务器的安全，一般会禁止使用这两种方法


#### 首部字段

**通用字段**

|  通用字段名  |   内容  |
|   :--------: | :-----: |
| **Cache-Control** | 控制缓存行为 |
| **Pragma:no-cache** | 唯一形式。是HTTP/1.1 之前版本保留的历史遗留字段，仅作为与HTTP/1.0 的向后兼容而定义。该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不反回缓存的资源。|
| **Connection** | 管理持久连接，设置其值为Keep-Alive可实现长连接。|
| **Date** | 创建HTTP报文的日期和时间。 格式Date: Tue, 03 Jul 2012 04:40:59 GMT|
| **Trailer** | 报文末端的首部一览 |
| **Transfer-Encoding** | 规定了传输报文主题时使用的传输编码，如Transfer-Encoding: chunked |
| **Upgrade：** | 用于检查HTTP协议或其他协议是否有可使用的更高版本。|
| **Via：** | 追踪客户端和服务端之间的报文的传输路径，还可避免会环的发生，所以在经过代理时必须添加此字段。|
| **Warning：** | Http/1.1的报文字段，从Http/1.0的AfterRetry演变而来，用来告知用户一些与缓存相关的警告信息。|

#### 请求首部字段

| 请求首部字段 | 内容 |
| :---------: | :--: |
| **Accept** | text/html, application/xml ; q = 0.9 , */* 这个字段是指:客户端能够处理的媒体类型。 当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。默认权重为q = 1.0|
| **Accept-Encoding** | 表示客户端支持的内容编码格式。 例如Accept-Encoding: gzip   * gzip: 由文件压缩程序gzip生成的编码格式[RFC1952](https://tools.ietf.org/html/rfc1952)； 采用 Lempel-Ziv 算法（LZ77）及32位循环冗余校验（Cyclic Redundancy Check，通称 CRC)* compress: 由Unix文件压缩程序compress生成的编码* 格式；* deflate: 组合使用zlib和deflate压缩算法生成的编码格式；* identity：默认的编码格式，不执行压缩。|
| **Accept-Charset** | Accept-charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级。|
| **Accept-language** | 用来告知服务器用户代理能够处理的自然语言集（指中文或者英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集 |
| **Authorization** | 表示客户端的认证信息。客户端在访问需要认证的时候，服务器会返回401，随后客户端将认证信息加在Authorization字段中发送到服务器后，如果认证成功，则返回200. 如Linux公社下的Ftp服务器就是这种流程：ftp://ftp1.linuxidc.com。|
| **Proxy-Authorizatio** | 当客户端接收到来自代理服务器的认证质询时，客户端会将认证信息添加到Proxy-Authorization来完成认证。与Authorization类似，只不过Authorization是发生在客户端与服务端之间。|
| **Referer** | 告知服务器请求是哪个页面发起的。值得一提的是看到这个字段名。(我想起了document.referrer这个属性，有点类似。稍微搜索了下，是HTTP/1.0 拼写错误后导致的，一致惯用这个名称。)|
| **User-Agent** | 将发起请求的浏览器版本和代理名称等信息一并发送给服务器。|
| **Host** :exclamation::exclamation::exclamation:  | HTTP/1.1 唯一一个必须被包含在请求内的首部字段。告知服务器，请求的资源所处的互联网主机名和端口号。(因为一台服务器可以有多个服务例如端口号是80，8080,通过Host能有效的区分) |
| **If-Modified-Since** :exclamation::exclamation: |  用于确认代理或客户端拥有本地资源的有效性 |
| **If-None-Match** :exclamation::exclamation: | 用于确认代理或客户端拥有本地资源的有效性 |
| **Max-Forwards** :exclamation: | 最大转发次数(整数) ，结合via字段 在TRACE方法 或 OPTIONS方法中使用 |

#### 应答首部字段

| 应答字段 ｜ 内容 |
| :-----: | :--: |
| **Age：** | 服务端告知客户端，源服务器（而不是缓存服务器）在多久之前创建了响应。|
单位为秒。
| **ETag：** :exclamation::exclamation: | 实体资源的标识，可用来请求指定的资源。|
| **Expires：** | 告知客户端资源的失效日期。可用于对缓存的处理。|
| **Last-Modified：** | 告知客户端资源最后一次修改的时间。|
| **Location：** :exclamation::exclamation:| 请求的资源所在的新位置。几乎所有的游览器在接受到包含首部字段 Location 的响应后，都会强制性地尝试对已提示的重定向资源的访问。|
| **Retry-After：** :exclamation::exclamation: | 服务端告知客户端多久之后再重试，一般与503和3xx重定向类型的应答一起使用。|
| **Vary：** :exclamation::exclamation:  | 可对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的指令。 |
| **Proxy-Authenticate：** | 将代理服务器需要的认证信息发送给客户端。|
| **Server：** | 告知服务端当前使用的HTTP服务器应用程序的相关信息。|
| **WWW-Authenticate：** | 告知客户端适用于所访问资源的认证方案，如Basic或Digest。401的响应中肯定带有 |
WWW-Authenticate字段。
| **Allow：** | 通知客户端，服务器所支持的请求方法。但服务器收到不支持的请求方法时，会以405（Method Not Allowed）作为响应。 **OPTIONS方法** (和实体字段 重复 后期得重新确认下) |
| **Content-Encoding：** | 告知客户端，服务器对资源的内容编码。|
| **Content-Language：** | 告知客户端，资源所使用的自然语言。|
| **Content-Length：** | 告知客户端资源的长度 |
| **Content-Location：** | 告知客户端资源所在的位置。|
| **Content-Type：** | 告知客户端资源的媒体类型，取值同请求首部字段中的Accept。|
  

#### 实体首部字段

| 实体首部字段 | 内容 |
| :--------: | :-: |
| **Allow** :exclamation::exclamation: |  通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。当服务器接收到不支持的 HTTP 方法时，会以状态码 405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。 **OPTIONS方法** |
| **Expires** :exclamation::exclamation::exclamation: | 资源过期时间 |
| **Last-Modified** :exclamation::exclamation::exclamation: | 上一次修改时间，用于协商缓存 |
| **Content-Encoding** | 主体部分选用的内容编码方式 |
| **Content-Language** | 实体主体使用的自然语言（指中文或英文等语言）。|
| **Content-Length** | 单位字节，内容主体长度 |
| **Content-MD5** | 一串由MD5算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达。|
| **Content-Type** | 实体主体内对象的媒体类型。和首部字段 Accept 一样，字段值用 type/subtype 形式赋值。|



