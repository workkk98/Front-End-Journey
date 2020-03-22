//Intersection Observer API 会注册一个回调方法，
//每当期望被监视的元素进入或者退出另外一个元素的时候(或者浏览器的视口)该回调方法将会被执行，
//或者两个元素的交集部分大小发生变化的时候回调方法也会被执行。
//通过这种方式，网站将不需要为了监听两个元素的交集变化而在主线程里面做任何操作，并且浏览器可以帮助我们优化和管理两个元素的交集变化。
/**
 * entry
{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,  // 目标元素的可见比例 与threhold有关
  target: element
}
*/


class ScrollListView {
  firstElement; // element id
  lastElement;
  observe;
  domList;
  firstIndex = 1;
  itemHeight = 200;
  constructor(options) {
    let { firstElement , lastElement } = options;
    this.firstElement = firstElement;
    this.lastElement = lastElement;
    this.domList = Array.from(document.querySelectorAll('.element'))
    this.container = document.getElementById('container')
    // 观察的dom 出现和消失都会调用
    const observeEntryCb = (entries) => {
      entries.forEach((entry,index) => {
        console.log(entry)
        if(entry.target.id === this.lastElement) {
          this.bottomCb(entry)
        }
      })
    }
    this.observe = new IntersectionObserver(observeEntryCb,options.opt)
    this.domRecordCache = {
      topSentinelPreviousY: 0,
      bottomSentinelPreviousY: 0,
      bottomRadio: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
  startObserve() {
    this.observe.observe(document.getElementById(this.firstElement))
    this.observe.observe(document.getElementById(this.lastElement))
  }
  setView() {
    this.domList.forEach((dom,index) => {
      dom.innerText = this.firstIndex + index;
    })
  }
  bottomCb(entry) {
    console.log('excute bottomCb')
    const { bottomSentinelPreviousY, bottomRadio} = this.domRecordCache

    const currentY = entry.boundingClientRect.top; // 在视图上的高度
    const currentRatio = entry.intersectionRatio; // 交集度
    const isIntersecting = entry.isIntersecting; // 是否有交集

    if(
      isIntersecting
    ) {
      console.log('trigger to refresh list')
      this.firstIndex = this.firstIndex + 5;
      this.setView()
      this.adjustPaddings()
    } else {

    }
  }
  // 调整padding后，滚动条仍在原刻度处
  //例如 滚动条在2000px容器的2000px位置 处于列表的尾部，padding变化成了1000 总容器3000 对应列表10
  // 那么 滚动条仍在2000px位置 现处于列表的中间刻度位置，但此时列表中每个元素加 5  那原先中间刻度恰好是10
  adjustPaddings() {
    let { paddingTop } = this.domRecordCache
    this.container.style.paddingTop = paddingTop + 1000 + 'px'
    this.domRecordCache.paddingTop = paddingTop + 1000
  }
}

let options = {
  firstElement: 'first',
  lastElement: 'last',
  opt: {
    //如果使用container 会造成第一次触发后更改padding后，监听的元素未离开的效果
    // 默认使用浏览器视窗的话就不会出现这种原因
    // root: document.getElementById('container'), 
    //rootMargin: '0px',
    //threhold: 0
  }
}
const listView = new ScrollListView(options)
listView.setView()
listView.startObserve()