// 不经常用到的


var myObject = {
  [Symbol.for('name')]: 'name'
};
Reflect.defineProperty(myObject, 'foo', {
  get () {
    return 'foo'
  },
  set () {
    throw new ReferenceError('you can"t set')
  }
});

// 获取target的属性描述符
console.log(Reflect.getOwnPropertyDescriptor(myObject, 'foo'))

console.log(Reflect.preventExtensions(myObject));
console.log(Reflect.isExtensible(myObject));

console.log(Reflect.ownKeys(myObject));
console.log(Object.getOwnPropertySymbols(myObject))