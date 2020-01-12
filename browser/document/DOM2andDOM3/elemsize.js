// 元素大小 ele

var container = document.querySelector('#container')
console.log("\n 元素大小 \n")
var conOffset = document.getElementById('conOffset')
console.log("element 偏移量",conOffset.offsetLeft,conOffset.offsetTop)

// 客户区大小 ele
console.log("element 客户区大小",conOffset.clientWidth,conOffset.clientHeight)

// 通过这个属性可以确定视窗大小

console.log("浏览器视窗大小",document.documentElement.clientWidth,document.documentElement.clientHeight)

// scroll
var scrollItem = document.getElementById('scrollItem')
// scrollHeight在没有滚动条的情况下， 元素内容的总高度。
console.log("scroll",scrollItem.scrollWidth,scrollItem.scrollHeight,scrollItem.scrollLeft,scrollItem.scrollTop)


// 确定元素大小 element.getBoundingClientRect()
