// 自己再写一个封装一个函数 功能是把一个generator函数 转换成 async函数

function swap2(generator) {
  // 因为要转换一个函数吗，那肯定返回的也是一个函数
  return function (...args) {
    // async函数 返回一个promise对象
    return new Promise((resolve, reject) => {
      // 该函数 控制 generator函数的执行与否
      function step (value) {
        let result;
        try {
          result = iterator.next(value) //result =  { value , done}
        } catch (error) {
          reject(error)
          return // 假设在执行过程中出错，就应该停止执行代码
        }
        // 递归终止条件
        if(result.done === true) {
          resolve(result.value);
          return
        }
        // 递归方程, 如果promise实例 是fulfilled则 next下去，否则 throw error
        Promise.resolve(result.value).then((pValue) => {
          step(pValue)
        }).catch((error) => {
          iterator.throw(error)
        })
        return
      }
      const iterator = generator(...args)
      step(undefined)
    })
  }
}

function * gen(a,b,c) {
  // 假设gen函数在执行中 遇到错误
  try {
    console.log(d)
  } catch(error) {
    console.log(error)
  }
  const abc = yield new Promise ((resolve, reject) => { setTimeout(function () {
    resolve(a+b+c)
  },1000)})
  return abc
}

const asyncGen = swap2(gen)

asyncGen(1,2,3).then(function (value) {
  console.log(value)
}, function (error) {
  console.log(error)
})