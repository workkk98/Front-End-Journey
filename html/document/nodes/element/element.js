// element
var target = document.getElementById('target')

// 1.HTML 元素
// id title lang dir(语言方向 left-to-right) className(避免与class保留字的冲突)
// 都是可读写的属性

// 2.操作特性,包括自定义特性 (H5规范,特性加data-前缀)
console.log(target.getAttribute('data-prop'))

// 特性名会被toLowerCase() 即不被区分大小写
// 不能对element对象直接增加属性，不会自动变成元素的特性 !!!!!
target.setAttribute('data-prop','Vue 2.0')

// removeAttribute() 彻底删除特性 清除特性值和节点再无这个特性

// attributes属性 除了可以遍历外用的不多 包含一个NamedNodeMap类型的对象 与NodeList相似，'动态'的集合
console.log(target.attributes)
// 有以下的方法
var attrProcess = function (a) {
  console.log('attrProcess function start')
  var attributes = a.attributes
  // attributes.setNamedItem(node) 用的不多
  var nodeValue = attributes.getNamedItem('data-prop').nodeValue // 更简单attributes['1'].nodeValue
  // removeNamedItem(name)
  console.log('attrProcess function end')
} (target)

var newDiv = document.createElement("div")
newDiv.className = 'create-div';
document.body.appendChild(newDiv)