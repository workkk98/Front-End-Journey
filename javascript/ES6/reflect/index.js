var myObject = {
  foo: 1,
  bar: 2,
  get baz () {
    return this.foo + this.bar;
  },
  set fun (val) {
    this.bar = val;
  }
}

var get = Reflect.get;

Reflect.get = function (...args) {
  console.log(get(...args))
}

Reflect.get(myObject, 'foo', {
  foo: 3,
  bar: 4
})
Reflect.get(myObject, 'baz', {
  foo: 3,
  bar: 4
})

Reflect.set(myObject, 'foo', 5)
Reflect.get(myObject, 'foo')

var transfer = {};
Reflect.set(myObject, 'bar', 10, transfer)
console.log(transfer)