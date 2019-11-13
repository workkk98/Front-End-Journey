// function* foo() {
//     yield 'a';
//     yield 'b';
//   }
  
// function* bar() {
//     yield 'x';
//     // 手动遍历 foo()
//     for (let i of foo()) {
//         console.log(i);
//     }
//     yield 'y';
// }

// for (let v of bar()){
//     console.log(v);
// }


function* foo() {
    yield 'c';
    yield 'd';
  }
  
function* bar() {
    yield 'x';
    yield* foo()
    yield 'y';
}

for (let v of bar()){
    console.log(v);
}

//yield*后面的 Generator函数（没有return语句时），等同于在yield*函数体内 对表达式后面的遍历器对象，部署一个for...of循环。+yield

let a = [1, [[2, 3], 4], [5, 6]];

function* flat(arr) {
    for(let i = 0; i<arr.length ; i++ ) {
        if (Array.isArray(arr[i])) {
            yield* flat(arr[i]); //yield* 表达式
          } else {
            yield arr[i];
        }
    }
}

for(let i of flat(a)) {
    console.log(i)
}
//forEach是个普通函数 所以 不能用yield
