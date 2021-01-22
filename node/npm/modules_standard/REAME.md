# 模块规范

### @目录名/模块

> Scoped packages are installed the same way, except they are grouped together in a sub-folder of the relevant node_modules folder with the name of that scope prefix by the @ symbol, e.g. npm install @myorg/package would place the package in {prefix}/node_modules/@myorg/package. See scope for more details.

这段NPM官网的意思是，那些被组织在一起的二级文件夹，是通过被`@`标示符，例如`@myorg/package`模块会被放到这个目录下`{prefix}/node_modules/@myorg/package`。这种模块官方称为为`scoped packages`（https://docs.npmjs.com/cli/v6/using-npm/scope）

