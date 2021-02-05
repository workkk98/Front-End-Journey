# npm link

1. 在某个模块下执行npm link命令，会在全局folder`{prefix}/lib/node_modules/<package>`下创建一个链接，指向当前工作文件夹。并且它也会将任何bins文件连接到`{prefix}/bin/{name}`。
> 注意，`npm link`使用全局前缀符，可以通过`npm prefix -g`查看prefix的值。

`npm link package-name`这个指令和上面则相反，是在shell工作的那个目录下，创建一个软连接，指向全局目录下的一个模块。

> 无论是将模块注册到全局去，还是从全局注册到本地。package-name都是指package.json文件中的name字段。
> package-name可选作用域，作用域包名称必须有例如`@scope/`

```sh
cd ~/projects/node-bloggy  # go into the dir of your main project
npm link ../node-redis     # link the dir of your dependency

// equals
cd ~/projects/node-bloggy  # go into the dir of your main project
npm link ../node-redis     # link the dir of your dependency
```

参考资料：[npm-link](https://docs.npmjs.com/cli/v6/commands/npm-link)