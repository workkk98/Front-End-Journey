// 深拷贝数组

/**
 * 1. 通过JSON对象的API
 * 优点最简单
 * 缺点对函数无法拷贝
 */

function copyByJson(target) {
  return JSON.parse(JSON.stringify(target))
}

// var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
// var res = copyByJson(arr)
// arr[3][0] = 'new1'
//[ 'old', 1, true, [ 'new1', 'old2' ], { old: 1 } ]
//console.log(arr)
//[ 'old', 1, true, [ 'old1', 'old2' ], { old: 1 } ]
//console.log(res)
  
//无法拷贝函数问题
// arr = [ function() {console.log('anything')} , { doSomething() {console.log('do')}}]
// res = copyByJson(arr)
// console.log(res)

/**
 * 自己实现一个浅拷贝
 */

var shallowCopy = function (target) {
  if(typeof target === 'object' && target !== null) {
    let another
    if(Array.isArray(target)) {
      another = target.slice()
    } else {
      another = {}
      let keys = Object.keys(target)
      for(let key of keys) {
        another[key] = target[key]
      }
    }
    return another
  } else {
    return target
  }
}

// var target = { a: 'a' , b : { b_a: 'b_a' } }
// var shallowRes = shallowCopy(target)
// target['a'] = 'at'
// target['b']['b_a'] = 'b_at'
// console.log(target)
// console.log(shallowRes)


function deepCopy(target) {
  if(typeof target === 'object' && target !== null) {
    let another
    if(Array.isArray(target)) {
      another = target.reduce(function (accumulator,value) {
        if(value instanceof Object) {
          accumulator.push(deepCopy(value))
          return accumulator
        } else {
          accumulator.push(value)
          return accumulator
        }
      },[])
    } else {
      another = {}
      let keys = Object.keys(target)
      for(let key of keys) {
        if(target[key] instanceof Object) {
          another[key] = deepCopy(target)
        } else {
          another[key] = target[key]
        }
      }
    }
    return another
  } else {
    return target
  }  
}

var test = [ 1, { a: 'a', b: 'b'} , [2,3],function doSomething(params) {}]
var deepRes = deepCopy(test)
test[2][0] = 1
test[1]['a'] = 'at'
console.log(test)
console.log(deepRes)