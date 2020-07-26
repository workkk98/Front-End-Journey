function Car () {
  this.band = 'benz';
}

Car.BMW = function () {
  this.band = 'BMW'
}

let benz = new Car // 这里可以看出使用new操作符，()是可以省略的
console.log(benz)

benz = new Car.BMW()
console.log(benz)