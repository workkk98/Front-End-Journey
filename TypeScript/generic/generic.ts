function getLength <T extends Lengthwise> (arg: T) {
  return arg.length;
}

interface Lengthwise {
  length: number;
}

getLength(222);

function getProperty <T, K extends keyof T> (obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
