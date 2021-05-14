# 正则表达式(regular expression)

PCER 的全称是 Perl Compatible Regular Expression，即：Perl 兼容的正则表达式。

这应该是目前使用得最广泛的一种正则表达式，我们平时使用的就是这种正则表达式，各种编程语言如 Java、Python、C#、JavaScript 实现的就是这种正则表达式。

### 非捕获组(?:regex)

```js
var str = 'scq000'.
str.replace(/(scq00)(?:0)/, '$1,$2')
// 返回scq00,$2
// 由于使用了非捕获正则，所以第二个引用没有值，这里直接替换为$2

// 第二个例子
str.replace(/(\w*)(?:\s*)(\w*)/g, '$1%20$2')
```

并且捕获组会继续沿用序号。例如第二个例子

### 前向查找lookahead (?=regex)

> 前向查找(lookahead)的含义是查找regex前面的表达式，但可以用来限制词根。

捕获组内部的表达式，有非捕获组的特性。
另外`(?!regex)`与`(?=regex)`是不同的。

前者是表示 非匹配 该正则表达式则返回true
后者则表示 匹配 该正则表达式则返回true


### 扩展

在 Unix/Linux 环境下，常常会通过命令行进行各种 匹配 操作，常用的两种匹配方式就是通过 Glob 和 正则表达式.

和 Unix/Linux 的文件系统一样，Unix/Linux 环境下的正则表达式也存在一套 POSXI 规范，在这套规范下的正则表达式可以分为 BRE(Basic Regular Expression, 基本型正则表达式) 和 ERE(Extended Regular Express, 扩展型正则表达式) 两种。这两者在某些元字符上具有不同的含义罢了。

|PCRE|BRE|ERE|含义|
|:--:|:--:|:--:|:--:|
|(	|\(|	(|	定义子表达式的开始|
|)	|\)|	)|	定义子表达式的结束|
|+	|\+|	+|	匹配前一个字符(子表达式)的一次或多次重复|
|?	|\?|	?	|匹配前一个字符(子表达式)的零次或一次重复|
|\vert|	\\vert|	\vert	|匹配前面的或后面的元素|
|{	|\{|	{|	略|
|}|	\}|	}|	略|
