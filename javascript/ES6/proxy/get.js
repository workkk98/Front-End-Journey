(function () {
  function createQueue (...args) {
    return new Proxy(args, {
      get (target, name, recevier) {
        // console.log(name, typeof name);
        console.log('tartget: ', target)
        console.log('recevier: ', recevier)
        if (+name >= 0) {
          return target[+name];
        } else {
          return target[target.length - 1];
        }
      }
    })
  }

  var queue = createQueue(1, 2, 3);

  console.log(queue[-1]);

  console.log(Reflect.get(queue, 'abc', {
    abc: 'cba'
  }))

  console.log('\n\n')

  var bar = {};
  Object.defineProperty(bar, 'bar', {
    value: 'bar',
    configurable: false
  })
  var foo = new Proxy(bar, {
    get (target, key) {
      return 'foo';
    }
  })
  try {
    console.log(foo.bar);
  } catch (err) {
    console.error(err);
  }
})()