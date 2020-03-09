async function testErrorCatch() {
  let result
  try {
    result = await new Promise((resolve, reject) => {
      setTimeout(function () {
        reject('error')
      },100)
    })
  } catch (err) {
    console.error(err)
  }
  console.log('error - next')
  return result
}

function container () {
  const res = testErrorCatch()
  setTimeout(function () {
    console.log(res)
  },1000)
}

container()

// 的确 try catch能够捕获当前代码行的 错误。
// 之前只注意到 await promise实例  promise实例是正确的情况，忽视了promise实例 reject的状态
