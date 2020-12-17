# .d.ts文件

1. 使用common.js规范的语法导出模块,得需要.d.ts文件支撑，才能显示类型。

2. 使用ES module就不需要使用.d.ts文件去支持。

### 默认导出(Default Exports)

导出一个常量，具体例子可以看./default-export文件夹，简单来说就是如果使用common.js语法。用ES6的语法去写dts文件即可。

注意映射关系
```
// common.js
const a = {};
module.exports = a;

// ES6
declare const a = {};
export default a;
```

有点奇怪的是这个例子
```js
// common.js
function getArrayLength(arr) {
  return arr.slice;
}
getArrayLength.maxInterval = 12;

module.exports = getArrayLength;


// d.ts
export default function getArrayLength(arr: any[]): number;
export const maxInterval: 12;
```