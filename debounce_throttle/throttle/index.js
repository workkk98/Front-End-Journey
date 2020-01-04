// 节流：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
class Dom {
  constructor(dom) {
    this.dom = document.getElementById(dom)
  }
  setListener() {
    let count = 0;
    const { version1 , version2 , version3 } = Dom.throttle(1000,() => {
      this.dom.innerText = ++count;
    })
    this.dom.addEventListener('mousemove' , version3 ,false)
  }
  static throttle(wait,handler) {
    let previous = 0;
    let timer;
    // 使用时间戳
    const version1 = function () {
      let current = Date.now()
      if( current - previous > wait) {
        handler();
        previous = current;
      }
    }
    // 使用定时器
    const version2 = function () {
      if(!timer) {
        timer = setTimeout(function () {
          handler()
          timer = null;
        },wait)
      }
    }
    // 既有时间戳又有定时器，优点 如果在n秒后操作，则立即执行，如果不是，则设置定时器在剩余时间后执行
    const version3 = function () {
      let current = Date.now();
      let remaining = current - previous - wait;
      if(remaining >= 0) {
        handler();
        previous = current;
      } else { // 假如最后一次操作在 时间间隔n秒内
        if(!timer) {
          timer = setTimeout(function () {
            handler()
            timer = null
          }, -remaining )
        }
      }
    }
    return {
      version1,
      version2,
      version3
    }
  }
}

const container = new Dom('container')
container.setListener()