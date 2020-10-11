function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]

let personKey: keyof Person = 'name';

interface Maps<T> {
  [key: string]: T;
}
let keys: keyof Maps<number>; // string
let value: Maps<number>['foo']; // number

/**
 * 萃取data中的内容，并加工。
 * @param data 
 * @param key 
 */
function pluckData <T> (data: T, map: { [key in keyof T]?: any}) {
  let newData: { [key in keyof T]?: any} = {};
  Object.entries(data).forEach(([key, value]) => {
    newData[key] = map[key] ? map[key](value) : value;
  });

  return newData;
}


let me = {
  name: 'zhang',
  age: 16
};

let meMap = {
  age: (value) => value + 'years old'
}

console.log(pluckData(me, meMap));

type PickAge = Pick <Person, 'age'>;

type CarRecord = Record<'brand' | 'price' | 'horse-power', string | number>