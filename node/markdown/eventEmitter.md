#### EventEmitter

> 在node.js的用于实现各种事件处理的events模块中，定义了一个EventEmitter类
> 所有可能触发事件的对象都是一个继承EventEmitter类的子类对象(以证明 /eventEmitt/app.js)

| 方法名和参数 | 描述 |
| :--------: | :-: |
| addListener(event , callback) | 对绑定事件处理函数 |
| on | addListener别名 |
| once | 对指定事件只执行一次的函数 |
| removeListener( event , Listen ) | 移除指定事件的指定函数 |
| removeAllListeners( [event] ) | 移除指定事件的所有函数 |
| setMaxListeners | 指定事件处理函数的最大数量. |
| listeners(event) | 获取指定事件的所有处理函数 |
| emit( event , [arg1] , [arg2]) | 手动触发指定事件 |

类似与element对象的可以对同一个事件设定多个监听器，serve对象也可以(http.createServe)
但默认情况下，最多只能绑定10个事件，但可以通过setMaxListeners

具体的API使用可以看/eventEmitt/app.js

* 静态方法 EventEmmiter.listenerCount(emmiter对象, 事件名 )
* 此外 eventEmitter对象还有removeListener 和 newListener 事件 用来检测移除和添加事件监听器

事件循环
类似于客户端的事件循环机制。js是单线程的，非阻塞IO
也就是会先把一件事情干完，再去执行另外一件事
例如请求发送到服务器，遇到读文件的IO问题，先执行完其他的代码，等IO问题解决了在执行IO的回调函数
