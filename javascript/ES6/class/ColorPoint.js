class ColorPoint extends Point {
  type = "2019年倒数第二天"
  constructor(color) {
    super() // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。
    this.color = color || 'black'
  }
}
//Uncaught ReferenceError: Must call super constructor in derived(派生的) class before accessing 'this' 
// or returning from derived constructor

let point2 = new ColorPoint()

ColorPoint.info() // 静态方法可继承