// require方法

const  moduleExport = require('./export')


// require.resolve() 静态方法
console.log("moduleExport 绝对路径: ",require.resolve('./export'))

console.log()

// require.cache 缓存对象
// console.dir(require.cache)

// __filename , __dirname
console.log("__filename \n" , __filename , "\n" ,"__dirname \n" , __dirname )

if( module = require.main ) {
  console.info("this module is main")
}