// 断言

// 因为某个变量可能是多种类型的，我们知道联合声明的变量只能使用公有的属性和方法
// 所以当我们需要单独调用某个类型的方法时，需要使用断言
interface Cat {
  name: string
  run(): void
}

interface Fish {
  name: string
  swim(): void
}

function isFish (animal: Cat|Fish): boolean {
  if(typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}

// 如果不在类型判断中加上(animal as Fish)就会报错
// assertion.ts:13:20 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.


// assertion 我认为是使用在 变量在执行过程中推断类型时

interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal1: Animal = {
  name: 'tom'
};
let tom1 = animal1 as Cat;
let tom2: Cat = animal1;

// 从这里可以看出，类型声明比类型断言来的更严谨。
// 因为Cat和Animal的类型可以是父类和子类的关系，所以通过断言是可以互相推断的。
// 但是类型声明比较的是两个类型结构的差异