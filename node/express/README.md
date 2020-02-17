# Express

其实自己刚开始用的就是express。但只能说学了些皮毛，在现在的基础上更深入的学习一些。

#### 设置路由

不像http模块中 你需要对req.url进行一个判断.

```
app.get('/params/:id/:name' , function (req,res) {
  console.log('path 通过解析 放入params对象 获得' , req.params)
  res.send('params')
})
```
通过 :id的写法 可以获取到req中的params对象中的参数

还引入了正则的"? * "概念 即出现0或1次 也就是说省略某段path仍能访问该


**正则路径**

也完全可以写正则的请求路由
```
app.get(/\/regex(\/id)?(\/name)?/ , function (req,res) {
  console.log('path 通过解析 放入params的对象 获得' , req.params)
  res.send('params')
})
```

那params对象则返回 { '0': '/id', '1': '/name' }


#### 使用各种请求的方法

就跳过了 比较简单


#### 中间件

只记录几个我使用过的 ，觉得重要的

**BodyParser**

不能使用express.bodyParser()得独立使用
使用该中间件后 是req.body是携带的请求内容

**cookieParser**

req.cookies

**static中间件**

既可以访问静态内容，很棒的是，连http缓存都帮你做好了


#### 配置应用程序

app.configure(\[env] , callback)这个函数被移除了
解决办法就是通过app.get('env') 或 原生 process.env.NODE_ENV获取

process.env.NODE_ENV这个属性是人为命令环境变量

```
// 类似这样即可 但千万NODE_ENV=production 不能有任何空格
NODE_ENV=production node app.js
```




