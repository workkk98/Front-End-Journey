const a = require('./a')

/**
 * 打印的是a模块
module.id:  /Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS/a.js
module.exports:  {}
module.parent:  Module {  parent是b模块 因为b调用a
  id: '.',
  path: '/Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS',
  exports: {},
  parent: null,
  filename: '/Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS/b.js',
  loaded: false,
  children: [
    Module {
      id: '/Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS/a.js',
      path: '/Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS',
      exports: {},
      parent: [Circular],
      filename: '/Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS/a.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  ],
  paths: [
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
}
module.filename:  /Users/zhanghefan/Desktop/web/web_study/web_study/node/commonJS/a.js
module.loaded:  false
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