// Node接口 DOM中但所有节点类型都继承自Node类型
// 因此所有节点类型都共享着相同都基本属性和方法。Node是一个构造函数
// 该函数有12个数值常量，对应不同都节点
// console.log('ELEMENT_NODE '+Node.ELEMENT_NODE) //1

var someNode = document.getElementById('someNode')
// 1 nodeName和nodeValue
const { nodeName , nodeValue } = someNode;

console.log(nodeName , nodeValue) // DIV,null

// 2 节点关系
console.log(someNode.childNodes)
// childNodes是个NodeList类型 ，即类数组对象
// 实际上是基于DOM结构动态执行查询的结果 引用对象

// 类似这种属性还有，parentNode ,preventSibling(前面的兄弟), nextSibling
// 还有父节点的firstChild lastChild
// 判断节点是否有子节点
console.log(someNode.lastChild.previousSibling.hasChildNodes());

// 3 操作节点
// 最常用的有appendChild()
let newNode = someNode.appendChild(someNode.childNodes['1']);
console.log("appendChild方法对已有node，只会移动不会删除",newNode === someNode.lastChild)

// 还有 node.insertBefore(newNode,target) 如果target === null 则与appendChild一样
// node.replaceChild(newNode,target) 替换节点 removeChild() 这两个移除的节点仍在文档中，但是没有自己的位置
//someNode.replaceChild(document.createElement('div'),document.getElementById('replace'))

// 其他方法
// node.cloneNode() true深拷贝 false浅拷贝即就拷贝该节点
var cloneSomeNode = someNode.cloneNode(false)
console.log(cloneSomeNode)
//someNode.insertBefore(cloneSomeNode , null)

// node.normalize() 标准化节点 textNode



