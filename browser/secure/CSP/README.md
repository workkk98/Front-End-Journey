# CSP = Content Security Policy

CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。


### 资源加载限制

- script-src：外部脚本
- style-src：样式表
- img-src：图像
- media-src：媒体文件（音频和视频）
- font-src：字体文件
- object-src：插件（比如 Flash）
- child-src：框架
- frame-ancestors：嵌入的外部资源（比如<frame>、<iframe>、<embed>和<applet>）
- connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）
- worker-src：worker脚本
- manifest-src：manifest 文件

### URL 限制

// 这个可能就是导致DMP的罪魁祸首
frame-ancestors：限制嵌入框架的网页
base-uri：限制<base#href>
form-action：限制<form#action>

### 其他限制

block-all-mixed-content：HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）
upgrade-insecure-requests：自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议
plugin-types：限制可以使用的插件格式
sandbox：浏览器行为的限制，比如不能有弹出窗口等。

### report-uri

自动记录注入行为。

### 参考

[阮一峰CSP](http://www.ruanyifeng.com/blog/2016/09/csp.html)