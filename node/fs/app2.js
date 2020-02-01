// fs
const fs = require('fs')
// fs.mkdir('./test' , function (err) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('sucess')
//   }
// })

// fs.readdir('./test' , function (err , files) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(files)
//   }
// })

// fs.readdirSync()

// 查看文件夹或文件的状态
// fs.stat('./test' , function (err , stats) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(stats)
//   }
// })

// Stats {
//   dev: 16777220,
//   mode: 16877,
//   nlink: 3,
//   uid: 501,
//   gid: 20,
//   rdev: 0,
//   blksize: 4096,
//   ino: 18974006,
//   size: 96,
//   blocks: 0,
//   atimeMs: 1579857358000, //access time
//   mtimeMs: 1579857358000, //modify time 指文件内容被修改时
//   ctimeMs: 1579857358581.5574, //change time 权限被修改？ chamod后会修改这个事件
//   birthtimeMs: 1579857246000,
//   atime: 2020-01-24T09:15:58.000Z,
//   mtime: 2020-01-24T09:15:58.000Z,
//   ctime: 2020-01-24T09:15:58.582Z,
//   birthtime: 2020-01-24T09:14:06.000Z
// }

// 判断文件或文件夹是否存在
fs.exists('./test/index.js' , function (exists) {
  console.log('fs.exists() :' , exists)
})
//fs.existsSync

// 返回文件或目录的绝对路径
fs.realpath('./test.txt' , function (err , resolvedPath) {
  if(err) console.log(err);
  else console.log(resolvedPath)
})

// 修改 文件访问时间和修改时间
fs.utimes('./test.txt' , new Date() , new Date() , function (err) {
  if(err) console.log(err);
  else console.log("文件修改成功")
})
//fs.utimesSync

// 上述是未打开文件的情况下 ， 在打开文件的情况下 使用 fs.futimes()
// fs.futimes( fd , atime , mtime , callback )

// 修改文件权限
// fs.chmod(path , mode , callback) fs.chmodSync
// fs.fchmod() fs.fchmodSync()