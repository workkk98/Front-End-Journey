# plugins

#### DevServer

**hot**

DevServer 的默认行为是 在发现源代码被更新后通过自动刷新整个页面来做到实时预 览，开启模块热替换功能后， 将
**在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览** 。

**inline**

devServer . inline 用于配置是否将这个代理客户端 自动注 入将运行在页面中的 Chunk 里，默认自动注入。 DevServer 会根据我们是否开启 inline 来调 整它的自动刷新策略。

* 如果开启 inline ，则 DevServer 会在构建变化后的代码时通过代理客户端控制网页刷新。
* 如果关闭 in line ，则 DevServer 将无法直接控制要开发的网页 。 这时它会通过 ifame 的方式去运行要开发的网页。在构建完变化后的代码时，会通过刷新 iframe 来实现实时预览，但这时我们需要去 http://localhost:8080/webpa ckdev-server ／实时预览自己的网页。

**historyFallback**

devServer.historyApiFallback用于方便地开发使用了HTML5 History API
( https://developer.mozilla.org/en-US/docs/Web/API/History ）的单页应用 。 
这类单页应用 要求服务器在针对任何命中的路由时，都返回 一 个对应的 HTML 文件 。

**contentBase**

devServer .contentBase 配置 DevServer HTTP 服务器的文件根目录。在默认情况下为当前的执行目录，通常是项目根目录， 所以在一般情况下不必设置它，除非有额外的文件 需要被DevServer服务。例如， 若想将项目根目录下的public目录设置成 DevServer服务器的文件根目录，则可以这样配置 ：

```
devServer: {
  contentBase: path.resolve(__dirname,'public')
}
```

**headers**

**host**

**port**

**allowHosts**

**disableHostCheck**

**HTTPS**

```
devServe : {
  https: true
}

// 假如想用自己的证书 用这个
devServe : {
  key: fs.readFileSync( ’ pathltolserver . key ’ ) ,
  cert: fs.readFileSync ( ’ pathltolserver.crt ’ ) , 
  ca : fs.readFileSync( ’ pathltolca.pem ’)
}
```


#### watch

watch在devServe情况下 是默认开启的
那在别的情况下可以这样使用
```
{
  //开启监听模式
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    //重新监听到变化后会等300ms 再去执行动作， 防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300,
    poll: 1000
  }
}
```