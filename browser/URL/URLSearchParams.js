const foo = new URLSearchParams('foo=foo&name=name&foo=123');

// 返回某个key的所有value，类型数组
console.log('getAll', foo.getAll('foo'));

function createGen (urlParams) {
  const it = urlParams.entries()
  return function * () {
    while (true) {
      let result = it.next();
      if (result.done === true) {
        return result;
      } else {
        yield result;
      }
    }
  }
}

const it = createGen(foo)();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

