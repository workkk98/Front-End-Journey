// DOM2和DOM3
var example = document.body.firstElementChild

// element的样式
// style属性 CSSStyleDeclaration的实例 类数组对象 这个style只涉及内联样式及元素内部的style属性
// console.log(newDiv.style)
example.style.cssText = "height: 200px;width: 200px;background-color: lightgreen;"
// 注意下float属性 因为是保留字 应该是cssFloat IE则是styleFloat
setTimeout(function () {
  example.style.cssText = ""  // cssText访问style属性中的css代码，是为元素应用多项变化最快捷的方式
},500)

// 计算的样式 从上述 我们只能看到元素的class样式 和 内联style 仅可读
// 通过document.defaultView.getComputedStyle(目标元素,伪元素字符串) 可以获取元素计算后的样式
var compStyleOfExamp = document.defaultView.getComputedStyle(example,null)
// compStyleOfExamp也是CSSStyleDeclaration的实例 类数组对象加可以查询对应的属性如下
console.log("计算样式属性 背景色",compStyleOfExamp.backgroundColor)

var dStyleSheets = document.styleSheets
// 应用于文档的样式表 也就是内嵌<style></style> 和 外联link样式表
console.log("全局样式表", dStyleSheets)
// 返回一个StyleSheetList 类数组对象，index元素都是CSSStyleSheet对象
var linkStyleSheet = document.getElementsByTagName('link')[0]
console.log("link标签CSSStyleSheet", dStyleSheets[0])
// 说明link标签的sheet属性 也是CSSStyleSheet (IE里这个属性是styleSheet)
console.log("link标签sheet属性也是CSSStyleSheet", linkStyleSheet.sheet == dStyleSheets[0])

//CSSStyleSheet属性有个CSSRules规则(IE为rules)
console.log("CSSStyleSheet.cssRules",dStyleSheets[1].cssRules)
// chrome无法访问本地的样式库的原因 通源策略(内嵌样式没有问题)
//https://stackoverflow.com/questions/48753691/cannot-access-cssrules-from-local-css-file-in-chrome-64/49160760#49160760

// 样式表API
// sheet.insertRule("规范文本",index)
// sheet.deleteRule(index)