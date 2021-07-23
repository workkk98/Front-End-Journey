# CSRF

CSRF = Cross Site Request Forgery 即跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式。

> 通常情况下，CSRF 攻击是攻击者借助受害者的 Cookie 骗取服务器的信任，可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击服务器，从而在并未授权的情况下执行在权限保护之下的操作。

过程就是这样
1. 用户在A网站登陆，服务端返回用户的cookie信息
2. 用户未关闭页面(cookie 浏览器会话结束后 自动删除)，访问恶意网站B
3. B伪造一个请求，向A服务器发起（因为设定完cookie后，再次向创建它的域名发送时会自动包含这个cookie)
4. 因为A服务以为 这个请求就是用户发送的 所以就执行了某个事件


可以打开相关例子 app.js 和 app2.js
但是 这两个域名相同就很尴尬

如何防范？

### Cookie SameSite属性

- Strict 最为严格。如果 SameSite 的值是 Strict，那么浏览器会**完全禁止**第三方 Cookie。简言之，如果你从极客时间的页面中访问 InfoQ 的资源，而 InfoQ 的某些 Cookie 设置了 SameSite = Strict 的话，那么这些 Cookie 是不会被发送到 InfoQ 的服务器上的。只有你从 InfoQ 的站点去请求 InfoQ 的资源时，才会带上这些 Cookie。
- Lax 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。

- 而如果使用 None 的话，在任何情况下都会发送 Cookie 数据。

### 验证请求的来源站点

http请求中的Referer字段 或Origin(CORS)
判断请求的来源地址 如果是非本服务器地址 则判断为CSRF攻击

根据HTTP协议，在HTTP头中有一个字段叫Referer，记录了该HTTP请求的来源地址。
对于Ajax请求，图片和script等资源请求，Referer为发起请求的页面地址。对于页面跳转，Referer为打开页面历史记录的前一个页面地址。因此我们使用Referer字段

**关于Origin**
如果是使用 script的src 或是 img的src 方法来请求
#### CSRF TOKEN
例如操作一些重要信息时 必须使用验证码操作

> CSRF 攻击之所以能够成功，是因为攻击者可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 Cookie 中，因此攻击者可以在不知道这些验证信息的情况下直接利用用户自己的 Cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入攻击者所不能伪造的信息，并且该信息不存在于 Cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。