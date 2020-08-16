// function 考虑函数的输入和输出

//1. 函数声明

function sum (x: number, y: number): number {
  return x+y
}

//sum(1,2,3) 多的少的参数都是错误的
sum(1,2)

//2. 函数表达式

let mySum = function (x: number, y: number): number {
  return x + y;
};
// 在上面的函数中，仅对右侧的函数进行了类型定义，而左侧的数据是通过类型推论而来的。
// 手动添加对左侧变量的类型声明，应当例如函数mySum2

let mySum2: (x:number, y:number) => number = function (x: number, y: number): number {
  return x+y;
};

// 注意不要混淆 TS中的 => 和 ES6中的=>
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。


// 使用interface 描述 左侧的变量

interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function (source, subString):boolean {
  return source.search(subString) !== -1;
}

// 可选参数optional 必须放在末尾，也很好理解，可选参数如果放参数列表前头不是出大问题了。

function buildName (firstName: string, lastName: string, middleName?: string): string {
  return firstName + middleName + lastName
}

// 默认值(声明了默认值，相当于该变量成了可选参数), 默认值其实是ES6的东西，
// 但只是TS会把这个值， 优化成默认值

function buildName2 (firstName: string, lastName: string, middleName: string = 'may'): string {
  return firstName + middleName + lastName
}

function defaultParams (one: string, two: number = 123) {
  return two
}

// 剩余参数

function push(array: any[], ...items: any[]): void {
  items.forEach(function(item) {
      array.push(item);
  });
}


// 重载

// 利用联合类型

function reverse (x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

// 但是缺点在于 实际上x对应number函数也返回number，不够精确的表达

function reverse1(x: number): number;
function reverse1(x: string): string;
function reverse1(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

// 函数重载
// 注意，TypeScript 会优先从最前面的函数定义开始匹配
// 所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。