// HTML5 规范 新增API

// 1. document.getElementsByClassName 通过类名查找元素组
var domList = document.getElementsByClassName('same special')
console.log(domList) // 返回HTMLCollection类型的对象

// 2. element新属性classList
var footer = domList['1']
console.log(footer.classList)
// 这个类型 有很多新的API 例如 add(value) contains(value)是否存在某类
// remove(value) taggle(value)存在则删除 不存在添加
footer.classList.remove('special')
console.log('既可以印证nodelist是动态的 也可以证明classList.remove这个API',domList)


// 焦点管理
// document.activeElement 属性 指向焦点元素
// document.hasFocus() 返回boolean值

// HTMLDocument的变化 即扩展document对象
console.log('hasOwnProperty ',document.hasOwnProperty('readyState'),'\'readyState\' in document' , 'readyState' in document)
// 说明属性定义在原型上

// 扩展的属性有 readyState , compatMode(渲染页面的模式) , head属性(即指向head元素) , charset(字符集属性)
var xname = document.querySelector('#xname')
// 自定义属性dataset 之前有讲到element的attribute相关 h5增加了dataset属性 是DOMStringMap的一个实例
console.log(xname.dataset.xname)  // 对应特性值
// 值得一提的是，这样子注册的特性 通过getAttributes是全称'data-xname'，但是通过dataset属性则是后半部分'xname'


// 插入标记

// 1. element.innerHTML 属性 可读写 chrome写入脚本不会调用 也就是会把指定值创建新的DOM树
xname.innerHTML = "<strong>innerHTML 属性</strong><script>console.log('innerHTML')</script>"

// 2. element.outerHTML 属性 可读写 操作内容 对调用它的元素及所有子节点的HMTL


// scrollIntoView(boolean)方法 这个方法支持所有元素，滚动视窗或容器元素，调用元素就可以出现在视口中

// 插入文本
// 1. innerText属性 移除所有子节点，并换成唯一Text节点
var innerText = document.getElementById('innerText');
console.log('innerText原有内容\n',innerText.innerText)
innerText.innerText = 'hello innerText <strong>如何解析标签</strong>'

// 2. outerText属性


