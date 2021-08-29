//基本语法 函数关键字  和 函数名 中间有*  函数体内有 yield

function* helloWorldGenerator(params) {
  console.log(params);
  let r1 = yield 'hello'
  console.log(r1);
  yield 'world'
  return 'end'
}

let p = helloWorldGenerator('params')  //返回的是遍历器对象

//invoke 遍历器的Symbol.iterator函数
console.log("Symbol.iterator指向本身: ", p[Symbol.iterator]() === p);
console.log(p.next(1))
console.log(p.next(2))
console.log(p.next(3))

//只能在 generator函数中 使用 yield关键词

let a = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
      var item = a[i];
      if (typeof item !== 'number') {
        yield* flat(item); //yield* 表达式
      } else {
        yield item;
      }
    }
  };

//当使用 for of循环时 ，会调用Symbol.iterator方法 即创建一个指针对象
  
//   for (let f of flat(a)) {
//     console.log(f);
//   }

//由于generator函数就是生成遍历器函数，所以可以用这个函数 创造遍历器
let ex = {
    [Symbol.iterator] : exObj
}

function* exObj(params) {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

for(let i of ex) {
    console.log(i)
}

//yield 如果用在另一个表达式之中，必须放在圆括号中 例如console.log('Hello' + (yield)); // OK

//如果是 用作函数参数 或是 赋值中 则不必要  foo(yield 'a', yield 'b');  OK let input = yield;  OK


