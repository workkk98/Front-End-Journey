# requestIdleCallback

> requestIdleCallback will schedule work when **there is free time at the end of a frame**, or when the user is inactive. This means that there’s an opportunity to do your work without getting in the user’s way. 

### 为什么要使用这个API

1. 很难分辨当前帧时间还剩余多少
2. 浏览器准确的知道剩余多少时间，也知道用户是否在交互

### 如何使用

从index.html的例子中我们可以看到，实际上就是在input event handler需要用户执行该函数。

```js
function myNonEssentialWork (deadline) {
  while (deadline.timeRemaining() > 0 && tasks.length > 0)
    doWorkIfNeeded();

  // 原文该语句则是tasks.length > 0;
  if (tasks.length === 0)
    requestIdleCallback(myNonEssentialWork);
}
```

通过递归调用来彻底清除task队列。

总结：

requestIdleCallback函数在调用callback时会传入一个deadline对象：
1. timeRemaining(): number;
2. didTimeout: boolean;

### 注意

> Another reason not trigger DOM changes in the idle callback is that the time impact of changing the DOM is unpredictable, and as such we could easily go past the deadline the browser provided.

> The best practice is to only make DOM changes inside of a requestAnimationFrame callback

如果要使用rIC（requestIdleCallback），通过使用document.createFragment并在下一帧中更新DOM而不是rIC。

### FAQ

What happens if I overrun the deadline?（这个也是我想问的）
答案就是：If timeRemaining() returns zero, but you opt to run for longer, you can do so without fear of the browser **halting** your work. 

### 参考资料

[Cooperative Scheduling of Background Tasks](https://w3c.github.io/requestidlecallback/)
[Using requestIdleCallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback?hl=en)