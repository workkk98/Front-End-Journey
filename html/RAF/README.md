# requestAnimateFrame

该函数的确是和渲染频率相关。具体可以看index.html的例子（用文件协议打开，避免干扰。）

### raf触发的时机


> requestAnimationFrame一般是用来实现动画的，是浏览器在绘制每一帧的时候会执行，所以相比于setTimeout不会掉帧，并且在界面不显示的情况下不会执行，而setTimeout在界面隐藏情况下默认会继续执行的。一般webgl实现动态可视化的时候都会使用。

从牛客那摘过来的，可能是对的？