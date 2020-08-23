// 暂时性死区

// function tempDeadBlock (arg: number) {

//   a++;
//   let a = 0;
// }

function foo() {
  // okay to capture 'a'
  return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a;


// 重定义
function f (x) {
  let x = 0;
}

function g () {
  let y = 0;
  var y = 0;
}

// 屏蔽

function sheild () {
  let y = 0
  for(let y = 0; y < 10; y++) {
    console.log(y)
  }
  return y
}