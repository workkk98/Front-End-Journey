# 欺骗词法

### eval

### with

> with声明实际上是根据你传递的对象凭空创建了一个全新的词法作用域。

但如果在这个词法作用域中找不到该变量，就会按照正常的LHS查找。