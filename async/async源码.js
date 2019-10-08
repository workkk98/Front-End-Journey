/**
 * async函数实现源码
 * @param {Function} genF 
 * return Promise对象
 */
function spawn(genF) {
    return new Promise(function(resolve, reject) {
      const gen = genF();//gen = 遍历器对象
      step(function() { return gen.next(undefined); });
      function step(nextF) {
        let next;
        try {
          next = nextF();       //返回yeild表达式后面的值
        } catch(e) {
          return reject(e);
        }
        if(next.done) {         //遍历完成后， 即next.done === true 
          return resolve(next.value);   //加这个return 主要是 返回step函数，不再递归下去
        }
        Promise.resolve(next.value).then(function(v) {  //如果next.value就是一个promise对象，应该都不用调用Promise.resolve()这个api
          step(function() { return gen.next(v); });
        }, function(e) {
          step(function() { return gen.throw(e); });
        });
      }
    });
  }

  function fn(args) {
    return spawn(function* () {
      // ...
    });
  }