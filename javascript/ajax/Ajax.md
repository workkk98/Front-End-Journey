# XMLHttpRequest

* responseText
* responseXML
* status 响应状态码 例如200 , 304 等
* statusText 响应状态信息

#### XHR的readyState属性

* 0 未初始化 尚未调用open
* 1 启动 调用open 未调用send
* 2 发送 调用send
* 3 接受 接收到部分响应数据
* 4 完成 接收到全部响应数据

#### xhr.abort()
中止请求 ， 接触引用操作

#### 请求头相关

xhr.setRequestHeader()
xhr.getResponseHeader()
xhr.getAllResponseHeaders()


#### 针对于form表单

如果要发送表单元素则需设置表单头
xhr.setRequestHeader('content-Type' , 'application/x-www-form-urlencodede')

XMLHttpRequest 2级 进一步发展了XHR
定义了一个FormData类

```
var data = new FormData(formElem) // 可以直接加入表单元素 也可以通过append方法
data.append("name" , "Nicholas")

xhr.send(data)  // 无需设置请求头 content-Type字段
```


#### 超时设定

IE8 为XHR对象添加了一个timeout属性 也就是用来超出timeout时间后结束请求

```
xhr.timeout = 1000 //ms为单位
// 若请求超时 触发回调
xhr.ontimeout = function () {

}
```


#### 进度事件

进度事件还有很多 p580 

1. onload

2. onprogress
  这个有些意思,注意event参数
  ```
  xhr.onprogress = function (event) {

  }
  // event.target 指向xhr对象
  // event.lengthComputable 布尔值，表示进度信息是否可用的布尔值
  // event.position 表示已经接受的字节数
  // event.totalSize 表示根据Content-Length响应头部确定的预期字节数
  ```
  在调用open()前 ，声明这个事件处理程序

**xhr.upload对象**
xhr.onprogress事件处理函数，是用于处理下载事件。那对应的上传文件的动态数据，我们得通过xhr.upload对象获取。

[XMLHttpRequest.upload](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload)

```ts
xhr.upload.onprogress = function (e: progressEvent) {

  // 并且上传的字节数目，和总文件上传数对应的名称，如下：
  e.loaded;
  e.total;
}

```

3. abort
  调用xhr.abort() 后触发

4. error
  在请求发生错误时触发