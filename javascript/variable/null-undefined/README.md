# null and undefined

### undefined

基础类型的空值对应的就是undefined。

#### 为什么使用void 0.
因为undefined并不是JavaScript的保留字，你完全可以声明一个变量称为'undefined'，对它进行赋值。

那在这个函数内部，就污染了原本的undefined值。

而且我发现另一个优点，那就是"void 0"是6个字符，比9个字符的"undefined"优秀多了😊。

#### 扩展运算符

在数组中扩展运算符不支持，因为undefined类型没有包装类型，换句话说没有iterator接口。
但是在对象字面量中，可以使用扩展运算符。