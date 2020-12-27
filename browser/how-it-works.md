# 浏览器的工作原理

### 浏览器的组成

1. UI界面：除window以外的组件，例如地址栏，后退主页等按钮。
2. 浏览器引擎：在用户界面和渲染引擎间传递指令
3. 渲染引擎：解析并渲染内容（HTML和图片之类的不一样）
4. 网络层
5. UI backend：用于绘制基本的窗口小部件（组合框，窗口），并暴露了通用接口，这些接口底层是用了操作系统的用户界面方法。
6. JS interpreter
7. Data Storage

### 浏览器的渲染引擎

* IE: Trident
* Firefox: Gecko
* Safari: Webkit
* Chrome and Opera: Blink（a fork of Webkit）
