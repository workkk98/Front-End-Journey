// 先手撕一个iterator
// 总结下 of 接口就是调用Symbol.iterator函数，需要一个** 遍历器对象 ** ，对象里有个next函数，每次调用next函数
/**
 * iterator接口
 * 必须有[Symbol.iterator]并返回一个遍历器对象，每次迭代调用这个next方法
 * 出参{ value: value, done: boolean }
 */

let iterator = {
  [Symbol.iterator] : function () {
    let arr = [1,2,3]
    let index = 0
    return {
      next() {
        if(index > 2) {
          return {
            value:undefined,
            done:true
          }
        } else {
          return {
            value:arr[index++],
            done:false
          }
        }
      }
    }
  }
}


for(let item of iterator) {
  console.log(item)
}

let jterator = {
  [Symbol.iterator]: function * (params) {
    yield 4
    yield 5
    yield 6
    return 4
  }
}

for(let j of jterator) {
  console.log(j)
}