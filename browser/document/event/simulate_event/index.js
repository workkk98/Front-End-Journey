// 模拟事件
// document.createEvent() 可以创建以下事件
// UIEvents
// MouseEvents
// MutationEvants
// HTMLEvents

console.log("document.implementation.hasFeature",document.implementation.hasFeature("CustomEvents", "3.0"))
// 自定义DOM事件

// 全局环境下注册个事件

const myEvent = document.createEvent("CustomEvent")
myEvent.initEvent('myevent', true , false , "凌晨了")
console.log("event: ",myEvent)

const container = document.querySelector('#container')
const missonButt = document.getElementById('missonButt')

container.addEventListener('myevent' , function (event) {
  console.log("父组件" , myEvent)
},false)

missonButt.addEventListener('myevent', function (event) {
  event.playload = {
    vue: 'vue'
  }
  console.log("子组件")
})

missonButt.addEventListener('click', function (event) {
  //完全在这里可以修改detail的一些值
  this.dispatchEvent(myEvent)
})
