# 2020年4月 周4

#### 原生实现文件上传

前端通过input flie元素, 获取元素后监听change事件

change事件 和 input的区别， 前者必须修改原先值，后者则是有输入就会触发。

HTML5提供了元素的files接口，这个接口是FileList类的实例。原型有symbol.iteerator接口

接口中有着file对象，获取到对象后

1. 实例化一个new FormData()对象   form
2. form.append(name, value) value就是这个file对象即可

最后通过ajax上传form。但要注意的是 这个文件上传的类型是 Content-Type: mutipart/form-data

后端方面

通过监听流，写入文件然后移动文件到对应文件夹即可。