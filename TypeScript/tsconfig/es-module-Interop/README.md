# esModuleInterop (interop = interoperability)

```s
tsc index.ts --esModuleInterop
```
默认情况下，该属性默认为false。此时编译index.ts文件，代码如下:

```js
"use strict";
exports.__esModule = true;
var react_1 = require("react");
console.log(react_1["default"]);
```

默认导入的是react模块的default属性。(因为这是按照es6的语法去编译的。)
而tsc去编译模块时，会是这样子。
```js
// name.ts
export const name = "esm";
export default {
   name: "esm default",
 };

// name.js
"use strict";
exports.__esModule = true;
exports.name = "esm";
exports["default"] = {
    name: "esm default"
};
```

### ESModuleInterop = true时

编译的index.ts文件就变了
```js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
console.log(react_1["default"]);
```

编译后的js文件做了一层兼容，如果import的是esm（ESModule）文件则不用处理。
但如果是commonjs文件，则会将整个暴露出来的mod，放在default下。

```ts
import react, { component } from 'react';
```
当使用这种语法时，ts编译器会使用函数，将commonjs文件转换成esm文件。
方法就是新建一个对象，将exports对象代理到default对象上，访问的component属性，挂在到新对象上。
具体可以看index.js

### 总结

--ESModuleInterop属性是做兼容。这个问题的本质就是esm和commonjs规范的不同。