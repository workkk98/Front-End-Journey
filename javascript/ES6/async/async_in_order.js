// 如何把promise数组 顺序执行

function createPromise (ms,index) {
  return new Promise(function (resolve,reject) {
    setTimeout(function () {
      console.log(index)
      resolve('index')
    },ms)
  })
}


async function inOrder(arr) {
  let newArr = [],index=0,timeoffset = [100,5000,2000]
  console.time('time1');
  for(let i of arr) {
    newArr[index] = await i(timeoffset[index] , index);
    index++;
  }
  console.timeEnd('time1');
  return newArr
}

console.log(inOrder([createPromise,createPromise,createPromise]))