console.log('index.js')
var button = document.getElementById('target');

var sayHi = function (event) {
  console.log('hi')
}

// 添加事件处理函数和移除时 参数得相同
button.addEventListener('click', sayHi , false)

button.addEventListener('click', function () {
  console.log(this.nodeName)
},false)

button.removeEventListener('click', sayHi , false)


// 事件对象 event
// 值得注意的一些属性 bubbles 是否冒泡 cancelable 是否可以取消事件的默认行为 
// currentTarget处理事件的那个元素(当前目标) target 实际目标
button.addEventListener('mousedown', function (event) {
  console.log(event.type)
},false)

document.body.addEventListener('click', function (event) {
  console.log('body click');
  console.log('event.currentTarget , this', event.currentTarget , this);
  console.log('target' , event.target)
})

// 阻止默认事件
document.querySelector('#preventDefault').addEventListener('click', function (event) {
  console.log('event.cancelable' , event.cancelable)  // 是否可以取消事件的默认行为
  event.preventDefault()
},false)


// 阻止事件冒泡
document.getElementById('stopPropagtion').addEventListener('click', function (event) {
  console.log('stop propagation');
  event.stopPropagation()
}, false)