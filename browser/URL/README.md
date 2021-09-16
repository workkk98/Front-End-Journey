# URL

看到拼多多的面试题，所以这块知识稍微学习下。实际上就是对URLSearchParams的polyfill

### location.search（包括「？」)

location.search返回一段[USVString](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/search)。

### URLSearchParams 以及URL.searchParams

通过这两个来获取url中的参数，变得很容易。

1. append
2. delete
3. entries
4. get
5. getAll
6. has
7. keys
8. set: 覆盖所有的值, 而且入参数是个string（你输入一个数组也会被转换成string）
9. sort
10. toString
11. values

### 看了下polyfill的实现

实际上就是用了split这个API，将"&"作为分隔符。然后取第一个"="然后前者为key，后者为value。
其他一个小问题就是要转义字符
```js
    function decode(str) {
        return str
            .replace(/[ +]/g, '%20')
            .replace(/(%[a-f0-9]{2})+/ig, function(match) {
                return decodeURIComponent(match);
            });
    }
```

