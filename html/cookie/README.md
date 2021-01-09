# cookie

#### document.cookie
没想到cookie是归到文档对象上的，不过我觉得也非常合理。**毕竟文档也是服务器发过来的解析后获得的。**

#### cookie的结构

比我想象中的复杂。

1. **名称name: 一个唯一确定cookie的名称。经过URL编码的**(因为HTTP请求头不支持ASCII码？以外的字符)
2. **值value: 储存在cookie中的字符值。经过URL编码的**
3. secure: 设置后，cookie只能设置在发往https资源的请求上
4. 域名domain: cookie对于哪个域名是有效的。如果没有明确设定，那么这个域会被认作来自设置cookie的那个域
5. 路径path: 具体访问那个路径会携带这个cookie
6. 失效时间expires: GMT时间(Thu, 01 Jan 1970 00:00:00 GMT)这个想到Date的`Date.prototype.toGMTString()`这个方法就可以了

3,4,5完全就是个web资源的具体地址🤔，可以按照这样记忆。


一个cookie的样子:

>一个叫name的cookie,value是Nicolas
name=Nicolas , 

#### 操作cookie

首先得提一点🧐，**cookie可以添加同名会覆盖，但不能删除。**

获取cookie我想不难，通过字符串去匹配即可。
写入也没问题。

删除那怎么办呢？很巧妙 ，不是有过期时间这个字段吗？设置成过去的时间即可。

#### 子cookie

许多浏览器对cookie的条数有限制所以前辈们提出了这个子cookie的意思

其实就是 原先的 cookie 是 name=value
现在设置成 name=name1=value1&name2=value2
也就是把value 替换成了 name1=value1&name2=value2


