# scoped-packages

### 描述

每个npm使用者或组织，都拥有它们自己的作用域，并且只有你自己可以在该作用域下添加包。

### installing scoped packages

> 作用域包（我个人的翻译，不知道对不对），被安装到常规目录下的一个子目录。

举个例子：
对比常规的packages。它们会被安装到`node_modules/packagename`
而scoped packages则会被安装到`node_modules/@myorg/packagename`
而且在这个@myorg目录下，可以有任意数量的包。

### 发布scoped packages

* 发布公共包

> To publish a public scoped package, you must specify --access public with the initial publication. This will publish the package and set access to public as if you had run npm access public after publishing.

* 发布私有包

> To publish a private scoped package to the npm registry, you must have an npm Private Modules account.

You can then publish the module with npm publish or npm publish --access restricted, and it will be present in the npm registry, with restricted access. You can then change the access permissions, if desired, with npm access or on the npmjs.com website.

### 关联作用域with a registry

You can associate a scope with a registry at login.
`npm login --registry=http://reg.example.com --scope=@myco`