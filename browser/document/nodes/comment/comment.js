// Comment 与Text类型继承自相同的基类 拥有除了splitText()之外所有字符串的操作方法
// nodeType = 8 ; nodeName = "#comment" ; nodeValue = 注释内容 parentNode可能是Document或Elment 无子节点

var div = document.getElementById('div')
var comment = div.firstChild
console.log(comment.data) // a common node

// document.createComment('aaaa')

// 因为只是用于注释用的不多