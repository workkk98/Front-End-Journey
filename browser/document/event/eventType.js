// 事件类型

// load事件
document.body.onload = function (event) {
  console.log('onload')
} //为了向后兼容 所以 window也可以
// DOMContentLoaded事件
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded')
},false)
// readyState
// unload事件
window.unload = function () {
  // 清除引用
}
// resize事件

// scroll事件
var throttle = function (handler,wait) {
  var before = Date.now()
  return function () {
    var current = Date.now()
    if(current - before >= wait ) {
      handler()
      before = current
    }
  }
}
window.onscroll = throttle(function () {
  console.log("html元素 scrollLeft 和 scrollTop:" , document.documentElement.scrollLeft , document.documentElement.scrollTop)
  console.log('scrolling')
},1000)
// 焦点事件


// 鼠标事件
// mousedown mouseup click
let container = document.querySelector('.container')
container.addEventListener('click' , function (event) {
  console.log('mouse client (视口)' , event.clientX , event.clientY)
  console.log('mouse page(页面)', event.pageX , event.pageY)
  console.log('mouse screen(屏幕)', event.screenX , event.screenY)
},false)

//同时按下键盘 例如shift ctrl alt meta(command) 通过event.shiftKey或类似的ctrlKey来访问
const anotherPart = document.getElementById('anotherPart');
anotherPart.addEventListener('mouseover' ,function () {
  console.log('mouseover')
},false)

// 滚轮事件