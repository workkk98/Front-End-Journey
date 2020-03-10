function * gen (a,b) {
  yield a;
  yield b;
  return 'a+b'
}

const ite = gen('a', 'b')
console.log(ite.return('c')) // {value: 'c', done: true}