(function () {
  var target = {};
  var proxy = new Proxy(target, {
    set (target, key, value) {
      target[key] = value;
      return value;
    }
  });

  console.log(proxy.foo = 'foo');
})()