// DocumentFragment "轻量级"的文档 可以包含和控制节点，但不像完整的文档那样占用额外的资源
// nodeType = 11 , nodeName = "#document-fragment" , nodeValue = null , parentNode = null 
var fragment = document.createDocumentFragment();

// 把documentfragment当作 仓库使用，保存将来可能会添加到文档中的节点
var myList = document.getElementById('myList');
var liElem = null

for(let i = 0 ; i < 3 ; i++) {
  liElem = document.createElement('li');
  liElem.appendChild(document.createTextNode(`我是第${i}个`))
  fragment.appendChild(liElem)
}

myList.appendChild(fragment)

