// 防抖： 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
class Dom {
  name = "dom"
  constructor(id) {
    this.dom = document.getElementById(id);
    this.butt = document.getElementById('button')
  }

  setListeners() {
    let count = 0
    const { handler , cancel } = Dom.debounce(() => {
      this.dom.innerText = ++count;
    } , true)
    this.dom.addEventListener('mousemove', 
    handler
    ,false)
    this.butt.onclick = cancel
  }
  // 防抖的意义： 想要把某些频繁化的操作，减少其触发次数
  // 原理：例如本来点击事件，点击立马触发操作，而现在通过计时器让触发时间在n秒后，且若在等待的n秒中操作，重新计时。
  // 以用户的操作时间为重启计时器的标准
  static debounce(cb , immediate) {
    let timer;
    const handler = function() {
      if(timer) clearTimeout(timer) // 关闭上一个计时器重新计时
      if(immediate) {
        let calNow = !timer  // 为什么不直接用timer 是因为timer在下一步修改
        timer = setTimeout(function () {
          timer = null
        },5000)
        if(calNow) cb()
      } else {
        setTimeout(function () {
          cb()
        },5000)
      }
    }
    const cancel = function () {
      timer = null
      immediate = true
    }
    return {
      handler,
      cancel
    }
  }
}

let table = new Dom('table')
table.setListeners()