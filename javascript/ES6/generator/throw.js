// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
// 除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

// 这里探究一下 .throw()方法
// throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获');
  }
}

var g = gen();
// g.throw(1);
// 为什么会在函数体外被捕获？因为gen函数都没执行，也就是说错误不会被内部捕获


function * demoWithTC (x) {
  console.log('执行顺序')
  let y
  try {
    y = yield x << 1
  } catch (e) {
    console.log(e)
  }
  console.log(y)
  yield 'throw在哪个位置停止'
  return x
}

function * demoWithoutTC (x) {
  const y = yield x << 1
  yield 5
  return x
}

let iterator = demoWithTC(2)
console.log(iterator.next())
console.log(iterator.throw('an error'))
console.log(iterator.next())

// iterator = demoWithoutTC(2)
// console.log(iterator.next())
// iterator.throw('an error')
// console.log(iterator.next())

// 很明显 iterator.throw(arg) 等价于 yield 换成了 throw arg

