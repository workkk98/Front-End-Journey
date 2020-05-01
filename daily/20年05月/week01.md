# 20年5月周记 1

#### pow(x, n)

实现一个计算x的N次方的函数。

如果是直接模拟计算过程，那时间复杂度是O(n)。从x -> x^2 -> ... -> x^n

结合数学 和 二分思想，我们知道 x^n = x^n/2 * x^n/2

问题就转换成了求x^n/2。 所以通过递归即可求的x^n的结果 时间复杂度是O(logn)

这个时间复杂度可以画一个函数运算二叉树的图，n * (1/2)^k = 1 所以k = logn

值得一提的是如果n < 0, 实际上求 (1/x)^n次方即可

#### TS类型声明

```ts
const nullVal: null = null
const undefVal: undefined = undefined

const name: string|number = 'workkk'
```

基础类型里这两个类的声明得注意下。还有就是联合类型

interface得注意下，这个规范了对象的形状(shape)

```ts
interface Person {
  name: string
  age: number
  job?: string
  [propName: string]: any
  readonly id: number
}
```

另外interface里有三个特殊属性，分别是
* 可选属性: 如同其名
* 任意属性: 值接口里所有属性对应value都是该属性的声明的子类, 也意味着可以随意往对象里增加属性
* 可读属性: 仅在声明时可以赋值