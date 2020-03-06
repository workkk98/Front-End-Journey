# Fetch

> * 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
> * fetch() 不会接受跨域 cookies。其他网站的Set-Cookie头部字段将会被无视。
> * fetch 不会发送 cookies。除非你使用了credentials的 初始化选项。（自2017年8月25日以后，默认的credentials政策变更为same-origin。Firefox也在61.0b13版本中，对默认值进行修改）

这是MDN网站 的一个例子
```
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
```

#### 关于cookie

> 为了让浏览器发送包含凭据的请求（即使是跨域源），要将credentials: 'include'添加到传递给 fetch()方法的init对象。
> 如果你只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'。
> 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'。

#### 检测请求是否成功

> **如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。**虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。


#### Request和Header API


#### Response类