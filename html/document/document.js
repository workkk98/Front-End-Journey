// document表示文档 是HTMLDocument类(继承自document)的一个类型
console.log('document ',document.nodeType,document.nodeName)

// 1.文档的子节点 

//console.log(document.documentElement) //始终指向html元素
// 类似还有document.body!!!

// 关于<!DOCTYPE>标签
console.log("document.doctype ",document.doctype)
console.log(document.childNodes) // 事实上 chrome 79这个版本里在childNode中含有<!doctype>标签

// 2.文档信息
document.title = 'document' //可读写

// URL referrer(保存着链接到当前页面的URL) domin(仅这个属性可修改)
console.log('document.URL === location.href',document.URL === location.href) // true
console.log(document.domain)

// 3.查找元素
// getElementId()
// getElementsByTagName() 返回一个HTMLCollection类型的对象类似与NodeList
var images = document.getElementsByTagName('img')
console.log('getElementsByTagName',images)
// 可以从浏览器控制台看到原型上有item(元素位置)，namedItem(元素名)方法
// getElementsByName() 只有HTMLDocument类型才有的也就是说只有html文档

// 4.特殊集合 例如document.anchors(a链接集合)!!!,document.forms !!!,document.images !!!

// 5.文档一致性检测 红宝书p259

// 6.文档写入 write() writeln()与write的区别在与字符串末尾增加\n open() close()
document.write('<div>write by document.write</div>')

