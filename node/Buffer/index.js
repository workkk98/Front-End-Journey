// const buffer = new Buffer('我喜爱编程') 不推荐使用

const buffer = Buffer.from('我喜爱编程')

console.log(buffer.toString('utf8'));
buffer.write('热' , 3 , 3 )
console.log(buffer.toString('utf8'));

const buffer2 = Buffer.alloc(100)
buffer.copy(buffer2 , 0 , 0 ,15)
console.log(buffer2);
