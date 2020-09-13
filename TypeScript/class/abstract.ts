abstract class Animal {
  abstract makeSound(): void;
  move(): void {
      console.log('roaming the earch...');
  }
}

abstract class Car {
  abstract run (speed: number): void;
}

class BMW extends Car {
  constructor () {
    super();
  }

  public run (speed: number) {
    return speed;
  }
}

