/**
* 实现subType类对工厂类中的superType类型的抽象类的继承
* @param subType 要继承的类
* @param superType 工厂类中的抽象类type
*/
const VehicleFactory = function(subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {
    function F() {
      this.type = '车辆'
    } 
    F.prototype = new VehicleFactory[superType]()
    subType.constructor = subType
    subType.prototype = new F()                // 因为子类subType不仅需要继承superType对应的类的原型方法，还要继承其对象属性
  } else throw new Error('不存在该抽象类')
}

VehicleFactory.Car = function() {
  this.type = 'car'
}
VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error('抽象方法不可使用')
  },
  getSpeed: function() {
    return new Error('抽象方法不可使用')
  }
}

const BMW = function(price, speed) {
  this.price = price
  this.speed = speed
}
VehicleFactory(BMW, 'Car')        // 继承Car抽象类
BMW.prototype.getPrice = function() {        // 覆写getPrice方法
  console.log(`BWM price is ${this.price}`)
}
BMW.prototype.getSpeed = function() {
  console.log(`BWM speed is ${this.speed}`)
}

const baomai5 = new BMW(30, 99)
baomai5.getPrice()                          // BWM price is 30
baomai5 instanceof VehicleFactory.Car       // true