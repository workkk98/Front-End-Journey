# babel

简单来说 就是一个编译器
把ES6 转换成 ES5的语法结构

**babel在执行编译的过程中，会从项目根目录下的.babelre文件中读取配置。.babelrc是一个JSON格式的文件。**
1. Plugins

plugins 属性告诉 Babel 要使用哪些插件，这些插件可以控制如何转换代码 。

babel-plugin-transform-runtime 是 Babel 官方提供的 一个插件，作用是减少冗余的代码。
需和babel-runtime配合使用

2. Presets 预设

presets属性告诉 Babel 要转换的源码使用了哪些新的语法特性， 一个 Presets 对一组 新语法 的特性提供了支持， 多个 Presets 可以叠加。