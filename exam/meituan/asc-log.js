//只能用这个log函数，来实现升序打印0到100

const log=(callback)=>{
    log.count = log.count || 0;
    var count = log.count++
    setTimeout(()=>{
        console.log(count)
        callback && callback()
    },Math.random()*1000%10)
}

// 本质上这题还是考递归
function printf (n) {
  if (n < 0) {
    return;
  }
  log(() => {
    printf(n-1);
  });
}

async function printf2() {
  function createPromise () {
    return new Promise(resolve => {
      log(resolve);
    });
  }

  for (let i = 0; i <= 100; ++i) {
    await createPromise();
  }
}

printf2();