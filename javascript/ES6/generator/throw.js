// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
// 除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

function * demoWithTC (x) {
  try {
    const y = yield x << 1
  } catch (e) {
    console.log(e)
  }
  return x
}

function * demoWithoutTC (x) {
  const y = yield x << 1
  yield 5
  return x
}

let iterator = demoWithTC(2)
console.log(iterator.next())
iterator.throw('an error')
console.log(iterator.next())

iterator = demoWithoutTC(2)
console.log(iterator.next())
iterator.throw('an error')
// console.log(iterator.next())

// 很明显 iterator.throw(arg) 等价于 yield 换成了 throw arg

