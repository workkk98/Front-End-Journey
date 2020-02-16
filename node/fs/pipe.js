const fs = require('fs')

const entry = fs.createReadStream('./test.txt');
const output = fs.createWriteStream('./newTxt.txt');

entry.pipe(output);

// 就如果pipe的意思 流向 也就是从一个输入流流向另一个流出流

// .pipe(target , [options]) 
// 假如把options对象里的end属性设为false 也就是说 传输完毕后 目标文件不关闭 
// 也就是仍可以往target输入内容