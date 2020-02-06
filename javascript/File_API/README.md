# File API

HTML 5为文件输入元素 提供了files属性
files类数组对象,对象里存放了File对象

File: {
  name,
  lastModified(毫秒数),
  lastModifiedDate,
  webkitRelativePath,
  size,
  type(MIME类型)
}

File继承于Blob构造函数,通过slice方法 分片， 并返回blob类对象

#### FileReader

var reader = new FileReader()

类似于XMLHttpRequest构造函数使用,结果都保存在reader.result中

* reader.readAsText(file)
* reader.readAsDataURL()
* reader.readAsBinaryString()
* reader.readAsArrayBuffer()

事件 progress error load

#### 对象URL

window.createObjectURL()
chrome: window.webkitURL.createObjectURL()

手工释放内存

window.rebokeObjectURL()
chrome: window.webkitURL.rebokeObjectURL()

#### 使用XHR上传文件

xhr传递时, 像下面一样即可。优化的很好HTML5
```
var formdata = new FormData()
// file是File类的对象
formdata.append('name' , file)
```