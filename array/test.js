let array = [1,2,3,4,5,6,7,8,9,10];
/**
 * 入参 startIndex 删除的长度 添加的元素(不处理)
 * 出参 被删除的数组
 * 会改变原数组
 */
console.log(array.splice(3,1,666,123));

console.log(array);

/**
 * 入参 开始index，结束index
 * 出参  修改的array
 */

let newArray = array.slice(3,5);

console.log(newArray);