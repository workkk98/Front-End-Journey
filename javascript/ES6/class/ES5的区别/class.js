class Car {
  constructor (type) {
    this.type = type
  }
  sayType () {
    console.log(this.type)
  }
}

class BMW extends Car {
  constructor (name) {
    super('tourism car'); // 这一步相当于是Car.call()
    this.name = name;
  }
  sayName () {
    console.log(this.name)
  }
}

var bmw330 = new BMW('330')
console.log('class', bmw330)