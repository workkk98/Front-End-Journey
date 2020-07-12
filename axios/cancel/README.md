# axios的学习

[官网地址](https://github.com/axios/axios)

#### config的结构

axios封装了一个对象，参数名为config，含有以下属性:
* request: XMLHttpRequest对象
* data: 响应携带的参数
* config: 用户自定义的配置
* headers: 请求头的一些参数
* status: 响应状态码
* statusText: 响应消息

#### cancel请求

首先得注意了，通过axios.create实例创建的axios实例对象，并不能获取CancelToken这个构造函数，所以只能使用axios.CancelToken这个接口获取函数。

**取消的两种方式**

axios提供了两种取消方式，一种是souce.cancel，另一种是直接获取cancel函数，我是觉得说两种应用的场景不同，一种可以取消若干个请求，另一种用于取消单个请求。

**取消后，axios返回的promise对象会变成reject状态**

通过catch或是then的第二个函数来捕获状态，值得一提的是cancel(message)，可以提供具体的取消请求的原因。