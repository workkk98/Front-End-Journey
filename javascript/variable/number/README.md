# number

### 字面量

1. 十进制
2. 八进制`007`
3. 十六进制`0x1F`

之前一直认为，js的最大值是2^32-1，因为是32位长度的存储。(这个值可以通过一个阶乘公式去计算)

但一个偶然的机会，我去查询了相关的资料。number的最大值是2^53-1。

> The most frequently-used number type, Number, is a 64-bit floating point IEEE 754 number.

> Note that all the positive and negative integers whose magnitude is no greater than 253 are representable in the Number type (indeed, the integer 0 has two representations, +0 and -0).

然而使用位操作，则安全的数字则是2^31-1。

[what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin](https://stackoverflow.com/questions/307179/what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin)
[ECMA-Number-type](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-language-types-number-type)

### 浮点数

> The type Number is a set of values representing numbers. In ECMAScript, the set of values represents the double-precision 64-bit format IEEE 754 values including the special "Not-a-Number" (NaN) values, positive infinity, and negative infinity. []()

可以看到一个number类型是一组值来表示它的。
| Total bits | Sign | Exponent(指数) | Significand |
| :--: | :--: | :--: | :--: | :--: |
| 64 | 1 | 11 | 52 |
