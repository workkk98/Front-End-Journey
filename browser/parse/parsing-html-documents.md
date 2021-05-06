# 解析html文档

1. 标记化
标记化是词法分析过程，将输入内容解析成多个标记。HTML标记包括**起始标记、结束标记、属性名称和属性值**。
2. 树构建
标记生成器识别标记，传递给树构造器，然后接受下一个字符以识别下一个标记；如此反复直到输入的结束。


### 标记化算法

> 该算法的输出结果是 HTML 标记。该算法使用状态机来表示。每一个状态接收来自输入信息流的一个或多个字符，并根据这些字符更新下一个状态。当前的标记化状态和树结构状态会影响进入下一状态的决定。这意味着，即使接收的字符相同，对于下一个正确的状态也会产生不同的结果，具体取决于当前的状态。该算法相当复杂，无法在此详述，所以我们通过一个简单的示例来帮助大家理解其原理。

基本例子:
```html
<html>
  <body>
    Hello world
  </body>
</html>
```

初始状态是“数据状态”。遇到字符 < 时，状态更改为“标记打开状态”。接收一个 a-z 字符会创建“起始标记”，状态更改为“标记名称状态”。这个状态会一直保持到接收 > 字符。在此期间接收的每个字符都会附加到新的标记名称上。在本例中，我们创建的标记是 html 标记。

遇到 > 标记时，会发送当前的标记，状态改回“数据状态”。<body> 标记也会进行同样的处理。目前 html 和 body 标记均已发出。现在我们回到“数据状态”。接收到 Hello world 中的 H 字符时，将创建并发送字符标记，直到接收 </body> 中的 <。我们将为 Hello world 中的每个字符都发送一个字符标记。

现在我们回到“标记打开状态”（因为接收到了标签的<）。接收下一个输入字符 / 时，会创建 end tag token 并改为“标记名称状态”。我们会再次保持这个状态，直到接收 >。然后将发送新的标记，并回到“数据状态”。</html> 输入也会进行同样的处理。

### 树构建算法

在解析的过程中，文档对象也同时在被创建。在树构建阶段，以 Document 为根节点的 DOM 树也会不断进行修改，向其中添加各种元素。标记生成器发送的每个节点都会由树构建器进行处理。规范中定义了每个标记所对应的 DOM 元素，这些元素会在接收到相应的标记时创建。**这些元素不仅会添加到 DOM 树中，还会添加到开放元素的堆栈中。此堆栈用于纠正嵌套错误和处理未关闭的标记。其算法也可以用状态机来描述。这些状态称为“插入模式”。**

还是上面的例子：
```html
<html>
  <body>
    Hello world
  </body>
</html>
```

树构建阶段的输入是一个来自标记化阶段的标记序列。第一个模式是“initial mode”（TODO: 这个模式是跟DTD有关吗？）。接收 HTML 标记后转为“before html”模式，并在这个模式下重新处理此标记。这样会创建一个 HTMLHtmlElement 元素，并将其附加到 Document 根对象上。

然后状态将改为“before head”。此时我们接收“body”标记。即使我们的示例中没有“head”标记，系统也会隐式创建一个 HTMLHeadElement，并将其添加到树中。

现在我们进入了“in head”模式，然后转入“after head”模式。系统对 body 标记进行重新处理，创建并插入 HTMLBodyElement，同时模式转变为“in body”。

现在，接收由“Hello world”字符串生成的一系列字符标记。接收第一个字符时会创建并插入“Text”节点，而其他字符也将附加到该节点。

接收 body 结束标记会触发“after body”模式。现在我们将接收 HTML 结束标记，然后进入“after after body”模式。接收到文件结束标记后，解析过程就此结束。

### 解析完成，进入交互阶段

> 在此阶段，浏览器会将文档标注为交互状态，并开始解析那些处于“deferred”模式的脚本，也就是那些应在文档解析完成后才执行的脚本。然后，文档状态将设置为“完成”，一个“加载”事件将随之触发。

### 容错机制

举个例子，比如说之前我在开发中遇到的table, 如果你在tr里再写嵌套的tr，浏览器就会分离这个tr出去。例如

```html
  <tbody>
    <tr>
      <td>1</td>
      <td>
        <tr>
          <td>1.1</td>
          <td>1.2</td>
        </tr>
        <tr>
          <td>1.3</td>
          <td>1.4</td>
        </tr>
      </td>
    </tr>
  </tbody>
```

最终构建的dom树是这样的
```html
  <tbody>
    <tr>
      <td>1</td>
      <td></td>
    </tr>
    <tr>
      <td>1.1</td>
      <td>1.2</td>
    </tr>
    <tr>
      <td>1.3</td>
      <td>1.4</td>
    </tr>
  </tbody>
```

篇幅有限，这里不过多讲述。

### CSS解析

### 处理脚本和样式表的顺序

* 脚本

网络的模型是同步的（通过DOM去修改节点就能说明），script脚本会阻塞html的渲染。html5-script元素属性加入了defer和async。

* 预解析

WebKit 和 Firefox 都进行了这项优化。**在执行脚本时**，其他线程会解析文档的其余部分，找出并加载需要通过网络加载的其他资源。通过这种方式，资源可以在并行连接上加载，从而提高总体速度。请注意，预解析器不会修改 DOM 树，而是将这项工作交由主解析器处理；预解析器只会解析外部资源（例如外部脚本、样式表和图片）的引用。

* 样式表

另一方面，样式表有着不同的模型。**理论上来说，应用样式表不会更改 DOM 树，因此似乎没有必要等待样式表并停止文档解析。**但这涉及到一个问题，就是脚本在文档解析阶段会请求样式信息。如果当时还没有加载和解析样式，脚本就会获得错误的回复，这样显然会产生很多问题。这看上去是一个非典型案例，但事实上非常普遍。Firefox 在样式表加载和解析的过程中，会禁止所有脚本。而对于 WebKit 而言，仅当脚本尝试访问的样式属性可能受尚未加载的样式表影响时，它才会禁止该脚本。

这个对我而言，还是有些冲击的。按照之前学习的，js脚本会阻塞html的解析，css样式表则会并行加载。但实际上，因为js脚本有访问样式时，就会有异常情况。就如文章中最后几句的不同浏览器的实现来说。

### 呈现树的构建

在 DOM 树构建的同时，浏览器还会构建另一个树结构：呈现树。这是由可视化元素按照其显示顺序而组成的树，也是文档的可视化表示。它的目的是用正确的顺序来渲染这个树结构。

```c++
// webkit中的渲染树
class RenderObject{
  virtual void layout();
  virtual void paint(PaintInfo);
  virtual void rect repaintRect();
  Node* node;  //the DOM node
  RenderStyle* style;  // the computed style
  RenderLayer* containgLayer; //the containing z-index layer
}

RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    ...
    RenderObject* o = 0;

    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
       ...
    }

    return o;
}
```

非可视化的元素，比如head是不会插入到呈现树中的。

有一些 DOM 元素对应多个可视化对象。它们往往是具有复杂结构的元素，无法用单一的矩形来描述。例如，“select”元素有 3 个呈现器：一个用于显示区域，一个用于下拉列表框，还有一个用于按钮。如果由于宽度不够，文本无法在一行中显示而分为多行，那么新的行也会作为新的呈现器而添加。
另一个关于多呈现器的例子是格式无效的 HTML。根据 CSS 规范，inline 元素只能包含 block 元素或 inline 元素中的一种。如果出现了混合内容，则应创建匿名的 block 呈现器，以包裹 inline 元素。

有一些呈现对象对应于 DOM 节点，但在树中所在的位置与 DOM 节点不同。浮动定位和绝对定位的元素就是这样，它们处于正常的流程之外，放置在树中的其他地方，并映射到真正的框架，而放在原位的是占位框架。

### 构建呈现树的流程

在 Firefox 中，系统会针对 DOM 更新注册展示层，作为侦听器。展示层将框架创建工作委托给 FrameConstructor，由该构造器解析样式（请参阅样式计算）并创建框架。

在 WebKit 中，解析样式和创建呈现器的过程称为“附加”。每个 DOM 节点都有一个“attach”方法。附加是同步进行的，将节点插入 DOM 树需要调用新的节点“attach”方法。

处理 html 和 body 标记就会构建呈现树根节点。这个根节点呈现对象对应于 CSS 规范中所说的容纳块（containing block），这是最上层的 block，包含了其他所有 block。它的尺寸就是视口，即浏览器窗口显示区域的尺寸。Firefox 称之为 ViewPortFrame，而 WebKit 称之为 RenderView。这就是文档所指向的呈现对象。呈现树的其余部分以 DOM 树节点插入的形式来构建。

> html元素则继承了该视口的宽度。在之前学习的viewport相关知识中，html元素的clientWidth代表着视口的（设备像素宽度），offsetWidth则代表这html元素本身的border内部的宽度。