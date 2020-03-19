// splice方法 意义从数组中删除元素、插入元素到数组中或者同事完成这两种操作

/**
 * 第一个参数 start 指定了插入和(或)删除的起始位置
 * 第二个参数 deleteCount 指定了应该从数组中删除的元素的个数 (如果省略，从起始点到数组结尾的所有元素都被删除)
 * 第三个参数及后面的任意个参数，指定了需要插入的参数(从start开始插入)
 */

var a = [1,2,3,4,5,6,7]
a.splice(a.length, 0, 8)
console.log(a)

var b = [1,2,3]
b.splice(b.length -1, 0, 2)
console.log(b) // 插入位置 也就是 index = 2 所以index=2及后面的数值往后挪