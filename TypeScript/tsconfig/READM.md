# tsconfig.json

通过`tsc --init`这个命令行，我们就可以生成一个默认配置文件。

### typescript编译器

1. 编译esModule会在该文件声明属性，声明文件是个esmodule
```js
exports.__esModule = true;
```

### 手动编译文件

```s
tsc index.ts
```
该条命令，tsc编译器不会读取tsconfig.json文件。