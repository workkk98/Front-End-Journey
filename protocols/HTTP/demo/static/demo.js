// 修改http请求头 来减少流量 (2分钟过去了，重新访问资源)

// 改下页面title
const path = location.href;
const regex = /\/([-\w]*)$/g;
const result = regex.exec(path)
document.title = result[1]