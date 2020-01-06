/**
 * RegExp 实例属性
 * 1. global属性 flags是否有g
 * 2. ignoreCase flags是否有i
 * 3. mutiline flags是否有m
 * 4. lastIndex 下一个匹配位置
 * 5. source 匹配模式字面量
 */

var text = 'mom and dad and baby';
var pattern = /mom( and dad( and baby)?)?/gi;

// 方法exec 多用来捕获组
//matches 是array实例
var matches = pattern.exec(text);
//  匹配项在字符串中的位置
console.log(matches.index);
//  应用正则表达式的字符串 即pattern的字符串形势不包括特殊字符(\w,.)这类
console.log(matches.input);
//捕获组内容
console.log(matches[0])
console.log(matches[1])
console.log(matches[2])

var text1 = 'cat, bat, sat, fat';
var pattern1 = /.at/g;// 组1

// 如果设置g 下一次执行exec就会按照lastIndex的匹配位置 依次匹配
var matchesG1 = pattern1.exec(text1)
console.log(matchesG1.index)//0
console.log(pattern1.lastIndex)//3

var matchesG2 = pattern1.exec(text1)
console.log(matchesG2.index)//5
console.log(pattern1.lastIndex)//8

/**
 * test方法
 * 
 */
function test(pattern , string) {
  return pattern.test(string)
}

console.log(test(/\d{3}-\d{2}-\d{4}/, '000-00-0000')) //true

