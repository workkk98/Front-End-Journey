const fs = require('fs')

// 移动 文件
function removeTest(oldpath , newPath) {
  fs.exists(oldpath, function (exists) {
    if(exists) {
      fs.exists(newPath , function (exists) {
        if(exists) {
          console.error('newPath is existed.')
        } else{
          fs.rename(oldpath , newPath , function (err) {
            if(err) console.log(err)
            else console.log('rename sucess')
          })
        }
      })
    } else {
      console.warn('file isn\'t existed')
    }
  })
}

// removeTest('./rename.txt' , './test/rename.txt')

// 硬连接？ 暂时先跳过了 书106 pdf119
// fs.link(existingPath , newPath , function (err) {
  
// })
// 截断
//fs.truncate(filename , len , callback)

// 移除空目录
// fs.rmdir(path , function (err) {

// })

// 监视文件 感觉还挺有用的 热编译或许也在监听 第二个参数可选 [options]
// fs.watchFile('./watch.txt', function (curr , prev) {
//   // 如果是 新创建
//   if(Date.parse(prev.ctime) === 0) {
//     console.log('文件被创建')
//   } else if (Date.parse(curr.ctime) === 0) {
//     console.log('文件被删除')
//   } else if(Date.parse(curr.mtime) !== Date.parse(prev.mtime)) {
//     console.log('文件被修改')
//   }
// })

// 第二个 第三个 参数可省略 [options] [function]
// watcher是个 eventEmitter函数
const watcher = fs.watch(__dirname)
watcher.on('change' ,function (e , filename) {
  console.log('evnet' , e);
  console.log('filename' , filename);
  watcher.close()
})
