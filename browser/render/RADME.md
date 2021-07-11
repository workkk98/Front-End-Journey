# 渲染过程

前言：因为这块内容暂时没有能力去深入源码，或者是硬件，所以阅读了很多文章来补充这方面的知识。希望在后面能有能力去探究下底层。

### 一些定义

1. 帧：在视频领域，电影、电视、数字视频等可视为随时间连续变换的许多张画面，其中帧是指每一张画面。
2. rAF: requestAnmaiteFrame函数
3. Jank既指“卡顿”表现，通常是由于在主线程上执行长任务，阻止渲染或在后台进程上消耗过多处理器能力所致。
4. 信息转换为屏幕上的像素，我们称为光栅化。
5. 分层：为了分清哪些元素位于哪些图层（这里要和absolute元素脱离文档流要区分开来，他们还是属于同一层的。），主线程遍历布局树创建图层树（此部分在 DevTools 性能面板中称为“Update Layer Tree”）。如果页面的某些部分应该是单独图层（如滑入式侧面菜单）但没拆分出来，你可以使用 CSS 中的 will-change 属性来提示浏览器。
6. 渲染管线（render pipeline）：指浏览器渲染的一个流程。（可以参看./render-process.png)
7. 合成是一种将页面的各个部分分层，分别光栅化，并在称为合成线程的单独线程中合成为页面的**技术**。
8. 绘制四边形：包含诸如图块在内存中的位置，以及合成时绘制图块在页面中的位置等信息。
9. 合成帧：一个绘制四边形的集合，代表一个页面的一帧。
10. Raster Scheduled （栅格化规划）and Rasterize（栅格化）
11. janks: 卡顿

### 对渲染管线各个阶段的总结

1. Frame Start：Vsync 触发, 一帧开始。
2. Input event handlers ：合成线程 compositor thread 把 input 数据传给主线程，
  处理事件回调。OS调度程序将尽最大努力合理调度事件回调(touchmove, scroll, click等)，以及时响应用户交互。
  即便如此，在用户交互和主线程处理事件获得响应之间多少会有些延迟。
3. requestAnimationFrame
  因为它离vsync很近，可以就近获取input data，所以这是操作dom理想的地方，例如修改 100 个元素的 class，
  并不会导致100 次样式计算style calculations，而是会在之后的管道流中批量处理。
  需要注意的是：**你不能在查询任何已计算的样式或布局属性**(例如el.style.backgroundImage, el.style.offsetWidth)。
  **如果你这么做了，就像图中红色箭头标明的一样，recalc styles 或 layout 或两者会提前执行**，将导致强制布局，更糟会引起页面抖动。
  Avoid Large, Complex Layouts and Layout Thrashing。
4. Parse HTML：任何新增的 HTML 都会被处理，构建新的DOM元素。
你可以在页面加载或 appendChild 等操作中看到这一过程。
5. Recalc Styles：对于解析样式文件或class 或 style 等样式操作都会引发样式计算。可能会重新渲染整棵样式树。
  具体取决于哪个元素的样式改变，例如 body 就影响比较大。值得注意的是，浏览器已经很聪明能自动限制波及的范围。
6. Layout：计算可见元素几何(盒模型)信息(位置、尺寸)。通常会对整个文档操作一遍。
   产生的开销和 DOM 个数成正比例关系。
7. Update Layer Tree：创建**层叠上下文和元素层级顺序**。
8. Paint：其实这是绘画的第一步，这一步记录需要调用绘制的方法 draw calls (fill a rectangle here, write text there)。
  第二步是光栅化 Rasterization (下面会提到)，draw calls 会被执行。
  第一步显然速度要快于第二步，但经常把这两步都成为 painting。
9. Composite：层 layer 和瓷砖 tile 信息被计算后回传给 compositor thread 处理。
Composite 负责处理有 will-change，overlapping elements，或任何硬件加速的 canvas。
10. Raster Scheduled and Rasterize：光栅调度和光栅化，这里将执行在 Paint 任务中提到的draw calls。
将在 Compositor Tile Workers 中处理，该线程的多少取决于系统和硬件设备的能力。
例如 Android 通常起一个Compositor Tile Workers线程，PC 可能有4个。
根据层 layers 信息来光栅化，layers 是由很多瓷砖 tiles 组成。
11. Frame End：所有 layers 中被光栅化的 tiles 和 input data (可能被事件回调处理了)将被提交给 GPU Thread。
12. Frame Ships：最后，所有的瓷砖 tiles 都将被 GPU Thread 上传给硬件 GPU 处理。
  GPU 将使用quads and matrices 来把 tiles 打印在屏幕上。

在主线程处理完一帧后还剩余一些处理空间的话`requestIdleCallback`会被触发。
这是一个非常好的机会来处理非必要的工作，如用户行为信息等采集。
如果你是一个新手，这里有份参考：[Using requestIdleCallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback?hl=en)。

### layers and layers

上文有提到两个layer。
第一个是update Layer Tree元素间的层级（层叠上下文）。

第二个是Compositor Layers 中的 Layers。
```css
 .foo {
  will-change: transform;
  transform: translateZ(0); /* 3D */
 }
```
对于层级少 animation 元素能减少性能开销(避免主线程管道流中的某部分执行)，俗称 GPU加速。
但浏览器可能不得不创建额外的 Compositor Layers 来保存层叠顺序(z-index指定)，
这就是产生了 overlapping elements 元素。

### 合成（composite）

经前面几个步骤，浏览器知道文档的结构、每个元素的样式、页面的几何形状和绘制顺序，它是如何绘制页面的？

> 处理这种情况的一种简单的方法是，先在光栅化视窗内的画面，如果用户滚动页面，则移动光栅框，并光栅化填充缺少的部分。这就是 Chrome 首次发布时处理光栅化的方式。但是，现代浏览器会运行一个更复杂的过程，我们称为合成。

合成的定义已经在“一些定义”章节中给出了。简单来说就是先将页面分成独立的layer，分别光栅化后，在将其合成的技术。


**那这种比先前的技术哪里有优势？**
就比如说, 如果输入事件是滚动。那么合成线程不需要涉及主线程的情况下完成就行了。

**合成的流程**
1. 合成线程将(若干个)图层分块后发送到光栅线程
2. 光栅线程光栅化每个小块后将他们存储在显存中。
3. 一旦块被光栅化，合成线程会收集这些块的信息（称为绘制四边形）创建合成帧。
4. 合成帧通过 IPC（进程间通讯）提交给浏览器进程，可以从 UI 线程或其他插件的渲染进程添加另一个合成帧。这些合成器帧被发送到 GPU 然后在屏幕上显示。

### 参考：

[[译] 现代浏览器内部揭秘（第三部分）](https://juejin.cn/post/6844903692894732295)

例子：

// 疑似是app.update()中的m.offsetTop导致在一次渲染管线中，js线程占用太多时间了。
[jank](https://googlechrome.github.io/devtools-samples/jank/)
[一帧剖析](https://github.com/Godiswill/blog/issues/14)

