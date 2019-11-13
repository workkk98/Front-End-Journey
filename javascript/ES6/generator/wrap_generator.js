//先看下整个generator执行过程

function * flow(params) {
  console.log('并没执行')
  let a = yield 'a'   //第一次调用next
  let b = yield 'b'   //第二次调用next
  return 'c'          //第三次调用next
}

let iterator = flow()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())


function spwan (generator) {
  return new Promise(function (resolve,reject) {
    const iterator = generator()  //遍历器
    function step (value) {
      let fragment = iterator.next(value)
      if(fragment.done) {
        resolve(fragment.value)
      } else {
        Promise.resolve(fragment.value).then(function (data) {
          step(data)
        })
      }
    }
    step()
  })
}

let special =function * () {
  let a = yield new Promise(function (resolve,reject) {
    setTimeout(function () {
      resolve('1')
    },10000)
  })
  console.log(a)
  let b = yield 'b'
  console.log(b)
  return 'c'
}

spwan(special).then((data) => {
  console.log(data)
})