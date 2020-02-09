# 知识点

**使用配置文件 一定要在命令行上 加上 --config webpack.config.js**

#### loader

* use 属性的值需要是一个由Loader名称组成的数组， Loader的执行顺序是由后到前的；
* require (’ style-loader! css-loader? minimize!./main.css ’);
* 每个Loader都可以通过 querystring的方式传入参数，例如css-loader?minimize中的minimize告诉css-loader要开启css压缩。
* 还可以通过Object的方式通过

```
{
  loader: 'css-loader',
  options: {
    minimize: true
  }
}
```


style-loader 把css混入js的原理。
先把内容通过字符串保存起来，在网页执行js脚本时，在head中创建文件。


#### plugin

通过在构建流程里注入钩子实现(tapable)

```
  plugins:[
    new ExtractTextPlugin({
      filename: `[name]-[contenthash:8].css`
    })
  ]
  // 有点像 hooks.extractTextPlugin = new ExtractTextPlugin() 的味道 像是注册插件
```

Webpack 是通过 plugins 属性来配置需要使用的插件列表的。 plug ins 属性是一个数组，里面 的每一项都是插件的一个实例，在实例化一个组件时可以通 过构造函数传入这个组件支持的配置属性。

#### DevServer

DevServer 会启动一个**HTTP 服务器用于服务网页请求**， 同时会帮助启动Webpack， 并接收Webpack发出的文件更变信号， 通过 WebSocket协议自动刷新网页做到实时预览。

```
但如果改动文件不能 即使更新 ，例如<link rel="stylesheet" href="./main.css">
```
原因是 DevServer 会将 Webpack构建出的文件保存在内存中， 在要访问输出的文件时， 必须通过 HTTP 服务访问。

通过DevServer启动的 Webpack会开启监听模式(该模式 通过 **webpack --watch** 即可启动),
当发生变化时重新执行构建， 然后通 知 DevServer。