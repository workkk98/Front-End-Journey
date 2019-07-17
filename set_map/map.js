const items = [
    ['name', '张三'],
    ['title', 'Author']
  ];

const map = new Map();
//作为构造函数Map，能接受数组的原因。
items.forEach(
  ([key, value]) => map.set(key, value)
);

console.log(map.get('name'));  //张三

const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3


const m4 = new Map();
m4.set(['a'],'引用类型看地址是否相同');
console.log(m4.get(['a'])); //undefined

/**
 * .size属性返回map结构的成员总数
 * .set(key,value),返回map结构，可以采用链式调用  
 * .get(key)
 * .has(key)
 * .delete(key)
 * clear() 清除所有，没有返回值
 * 
 * keys()返回所有key
 * values()返回所有value
 * entries()返回key及value
 * forEach()遍历map的所有成员
 */