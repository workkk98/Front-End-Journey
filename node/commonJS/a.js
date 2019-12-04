// a.js

console.log('module.id: ', module.id);
console.log('module.exports: ', module.exports);
console.log('module.parent: ', module.parent);
console.log('module.filename: ', module.filename);
console.log('module.loaded: ', module.loaded);
console.log('module.children: ', module.children);
console.log('module.paths: ', module.paths);


/**
module.id:  .
module.exports:  {}
module.parent:  null
module.filename:  /Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS/a.js  //文件绝对路径
module.loaded:  false  //module未被加载完
module.children:  []
module.paths:  [
  '/Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS/node_modules',
  '/Users/zhanghefan/Desktop/web/web_study/web_study/node/node_modules',
  '/Users/zhanghefan/Desktop/web/web_study/web_study/node_modules',
  '/Users/zhanghefan/Desktop/web/web_study/node_modules',
  '/Users/zhanghefan/Desktop/web/node_modules',
  '/Users/zhanghefan/Desktop/node_modules',
  '/Users/zhanghefan/node_modules',
  '/Users/node_modules',
  '/node_modules'
]
 */