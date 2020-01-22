console.error('出错了....')

console.warn('出错了2....')

console.dir({ myName: 'liMei' , job: 'student'})

console.time('IO')

for(var i = 0 ; i< 1000 ; i++ ) {

}

console.timeEnd('IO')

//追踪出错行数

console.trace('这17行出错了')

console.assert('abc' === 3)