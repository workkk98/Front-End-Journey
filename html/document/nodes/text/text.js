// Text节点
// nodeType = 3 ; nodeName = "#text" ; nodeValue = 节点的文本 ; parentNode是个Element ; 没有子节点

var div = document.getElementById('div');
var text = div.firstChild;
console.log(text.nodeValue)

// 操作节点文本
// appendData(text):将text放到句尾
// deleteData(offset, count): 从offset指定的位置开始删除count字符
// insertData(offset, text)
// replaceData(offset, count, text)
// splitText(offset) 这正好与element.normalize相反 也就是说拆分文本节点
// substringData(offset, count)
console.log('text节点有length属性', text.length)

// 1.创建 就是通过document.createTextNode() text经过转义
div.appendChild(document.createTextNode('<strong>fighting</strong>'))

// 2.规范化文本节点 合并文本节点
console.log('调用normalize前',div.childNodes)
div.normalize()
console.log('调用normalize后',div.childNodes)
