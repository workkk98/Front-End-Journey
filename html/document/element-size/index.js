// 1偏移量(包含元素在屏幕上占用的所有 可见的空间 )

var box = document.querySelector('.box');
var underBox = document.querySelector('.under-box')
console.log('box元素的偏移量 offsetTop, offsetHeight', box.offsetTop, box.offsetHeight)
console.log('under-box元素 offsetTop, offsetHeight', underBox.offsetTop, underBox.offsetHeight)
// console.log('元素的offsetParent', box.offsetParent.dataset) // 包含元素不一定是父元素

// 2客户区大小(客户区内容指 元素内容及其内边距所占据的空间大小)

console.log("body元素的客户区高度", document.body.clientHeight)

// 一定要弄清楚 html元素 在chrome环境下指的是视口
console.log("html元素的客户区高度，因为html元素是视口", document.documentElement.clientHeight)

// 3滚动大小(包含滚动内容的元素的大小)

console.log("html元素的滚动内容高度, 垂直滚动的距离", document.documentElement.scrollHeight , document.documentElement.scrollTop)
var scrollContainer = document.querySelector('.scroll-container')
console.log("scroll元素 滚动高度，客户区大小",scrollContainer.scrollHeight, scrollContainer.clientHeight)

// 4getBoundingClientRect() top-left都是描述元素相对于视窗位置
console.log("scroll getBoundingClientRect", scrollContainer.getBoundingClientRect())