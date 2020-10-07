# 函数

### new操作符

new操作符 = new 函数[()]

> 注意这里是可选的括号

然后它的优先级低于括号(), 成员访问'.'，需要计算的成员访问'[]'。

### 严格模式

严格模式下，函数的this指向undefined。
非严格模式下，函数的this指向global对象。这里与调用函数的环境没有关系，而是与函数声明的环境有关系。（有点像词法作用域）

例子在this/index.html文件中。


### reference

> reference是存在于规范之中的类型，它的意义是帮助开发者更好的去理解底层的行为，实际上是不存在的。

在Ecmascript5.1的规范11.2.3节，具体阐述了是如何确定this.value这个调用值的。

* 1.Let ref be the result of evaluating MemberExpression.
* 6.If Type(ref) is Reference, then
a.If IsPropertyReference(ref) is true, then
 i.Let thisValue be GetBase(ref).
b.Else, the base of ref is an Environment Record
i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).
* 7.Else, Type(ref) is not Reference.
a. Let thisValue be undefined.

第一步是计算成员表达式的结果，并将值赋予给ref。成员表达式有以下内容：
* 原始表达式 （基础变量、保留字，变量等，不包括对象、数组字面量）
* 函数定义表达式 
* 对象属性访问表达式 链式访问，动态属性访问
* 创建对象表达式（即new Constructor())