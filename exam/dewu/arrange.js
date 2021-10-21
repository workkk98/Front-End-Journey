// 实现一个arrange函数，可以进行时间和工作调度

function arrange (name) {
  return new schedular(name);
}

class schedular {
  constructor (name) {
    this.name = name;
    this.queue = [
      function (callback) {
        console.log(name + 'is notified');
        callback();
      }
    ];
  }

  do (action) {
    this.queue.push(function (callback) {
      console.log('start to ' + action);
      callback();
    });
    return this;
  }

  wait (time) {
    this.queue.push(function (callback) {
      setTimeout(() => {
        callback();
      }, time * 1000);
    });
    return this;
  }

  waitFirst (time) {
    this.queue.unshift(function (callback) {
      setTimeout(function () {
        callback();
      }, time * 1000);
    });
    return this;
  }

  execute () {
    const next = () => {
      if (this.queue.length > 0) {
        const fn = this.queue.shift();
        fn(next);
      }
    }

    next();
  }
}

// arrange('William').execute();
// > William is notified

// arrange('William').do('commit').execute();
// > William is notified
// > Start to commit

// arrange('William').wait(5).do('commit').execute();
// > William is notified
// 等待5s
// > start to commit

arrange('William').waitFirst(5).do('push').execute();
// 等待5s
// > William is notified
// > Start to push