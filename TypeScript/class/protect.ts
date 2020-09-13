class Car {
  protected name: string;
  constructor (name) {
    this.name = name;
  }
}

class BMW extends Car {
  public run: 'run'
  constructor (name: string) {
    super(name);
  }

  getName () {
    return this.name;
  }
}

var _330 = new BMW('330');
console.log(_330.getName())
console.log(_330.run);