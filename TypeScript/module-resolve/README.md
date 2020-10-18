# TypeScript解析策略

> TypeScript是模仿Node.js运行时的解析策略来在编译阶段定位模块定义文件。 因此，TypeScript在Node解析逻辑基础上增加了TypeScript源文件的扩展名（ .ts，.tsx和.d.ts）。 同时，**TypeScript在 package.json里使用字段"types"来表示类似"main"的意义** - 编译器会使用它来找到要使用的"main"定义文件。

### --traceResolution

这个命令汗语句，可以帮助我们认识到ts编译器在找文件过程中的路径查询。
```js
// e.g.

======== Resolving module './util' from '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util', target file type 'TypeScript'.
File '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util.ts' does not exist.
File '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util.tsx' does not exist.
File '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util.d.ts' does not exist.
Found 'package.json' at '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './index.ts' that references '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util/index.ts'.
File '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util/index.ts' exist - use it as a name resolution result.
======== Module name './util' was successfully resolved to '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/util/index.ts' with Package ID 'module-resolve/index.ts@1.0.0'. ========

```

### 解析逻辑

TypeScript的解析策略有两种，默认策略node以及classical(ts自身的解析逻辑)，开发者还可以通过`--moduleResolution`命令行参数来指定使用哪种模块解析。

node.js模块解析逻辑
1. 相对路径例如`./moduleA`
   1. 查找当前目录下的moduleA.js
   2. 查找当前目录下的/moduleA/package.json（如果有main字段）
   3. 查找当前目录下的/moduleA/index.js
2. 非相对模块名

总的概括：两个大方向，相对路径、非相对模块名。小方向上，先查找文件，再或者查找对应目录下的文件。

### 附加的模块解析标记

像webpack的resolve参数，编译器都会有额外的模块解析策略。

* baseUrl
* paths

```js
// e.g.
======= Resolving module 'generated/util' from '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/resolve/folder1/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
'baseUrl' option is set to '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/resolve', using this value to resolve non-relative module name 'generated/util'.
'paths' option is specified, looking for a pattern to match module name 'generated/util'.
Module name 'generated/util', matched pattern '*'.
Trying substitution '*', candidate module location: 'generated/util'.
Loading module as file / folder, candidate module location '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/resolve/generated/util', target file type 'TypeScript'.
File '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/resolve/generated/util.ts' exist - use it as a name resolution result.
======== Module name 'generated/util' was successfully resolved to '/Users/zhanghefan/web/Front-End/TypeScript/module-resolve/resolve/generated/util.ts'. ========
```

> 它告诉编译器所有匹配"*"（所有的值）模式的模块导入会在以下两个位置查找：
   1. "*"： 表示名字不发生改变，所以映射为<moduleName> => <baseUrl>/<moduleName>
   2. "generated/*"表示模块名添加了“generated”前缀，所以映射为<moduleName> => <baseUrl>/generated/<moduleName>

### rootDirs

> 有时多个目录下的工程源文件在编译时会进行合并放在某个输出目录下。 这可以看做一些源目录创建了一个“虚拟”目录。
> 利用rootDirs，可以告诉编译器生成这个虚拟目录的roots； 因此编译器可以在“虚拟”目录下**解析相对模块导入**(因为语法就是用的相对路径引入的)，就 好像它们被合并在了一起一样。

