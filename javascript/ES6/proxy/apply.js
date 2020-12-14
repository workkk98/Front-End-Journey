(function foo() {

  var target = function (a, b, c) {
    return Math.max(a, b, c);
  }

  // 校验入参是否合法
  var proxy = new Proxy(target, {
    apply (target, ctx, args) {

      console.log(ctx);
      for (let i of args) {
        if (typeof i !== 'number') {
          throw new TypeError('not number');
        }
      }

      return target(...args);
    }
  })

  console.log(proxy.apply({ foo: 'foo' }, [1,2,3]));
  proxy(1, '2', 3);
}())