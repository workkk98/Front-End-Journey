/**
 * 1、实现一个set函数来更新对象中任意路径的值
 *
 * set(object, path, value)
 */

function set (target, key, value) {
  let i = 0;
  while (i < key.length) {
    let partKey = '';
    while (i < key.length && key[i] !== '[' && key[i] !== ']' && key[i] !== '.') {
      partKey += key[i++];
    }
    if (i < key.length) {
      target = target[partKey];
      console.log(target[partKey])
      if (target == void 0) {
        throw ReferenceError();
      }
    } else {
      target[partKey] = value;
    }
    // 跳过
    while (key[i] === '[' || key[i] === ']' || key[i] === '.') i++;
  }
}


 
 const object = { 'a': [{ 'b': { 'c': 3 } }] };
 set(object, 'a[0].b.c', 4);
 console.log(object.a[0].b.c); // => 4