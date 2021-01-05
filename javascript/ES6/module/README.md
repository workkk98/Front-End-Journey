# ES6 模块

例子可以看vue-cli/hello文件夹

### 模块的整体导出

```js
export * from './模块名A';

// 但是不知道为什么，这个是不支持的
// @babel/plugin-proposal-export-namespace-from
export * as ModuleA from './模块名A';
```

### 模块的继承

```js
export * from 'circle';
export var e = 2.71;
export * from './模块名A'
```

这里可以看到，该文件导出的内容，会先继承circle模块，并合并到一个导出对象中。