// 复习下类
class Point {
  // 等价于在构造函数中 this.className = 'Point'
  className = 'Point'
  // 使用new时，自动调用该方法，若无显示定义会默认添加
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  // 下面的方法都是对原型的声明，
  disPlay2D () {
    console.log(`position is (${this.x},${this.y})`)
  }
  // 注意这个方法 ，其实是设置这个构建对象的拦截器
  get distance() {
    console.log(this.x ** 2 + (Math.pow(this.y,2)))
  }
  set distance(value) {
    console.log('you can\'t change this value to ')
  }
  // 通过static 声明构造函数的属性 如果是静态方法 可被子类继承
  static info() {
    console.log('static声明的静态方法和静态属性 ' + this.value)
  }
  static value = 0
}

// function
//console.log(typeof Point)

// 类必须使用new调用 ，否则会报错 Class constructor Point cannot be invoked without 'new'
//Point()

let p1 = new Point(0,0)
p1.disPlay2D()

p1.distance
p1.distance = 9

// TypeError: p1.info is not a function
// p1.info()
Point.info()


