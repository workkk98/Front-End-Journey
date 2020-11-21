/**
 * @date 2020年11月21日
 * 在知乎上，看到尤大提出的一个语法糖，声明响应式变量。
 * 里面用到了标签语法。而之前不怎么又用到，甚至都遗忘了这个语法。
 * 所以在这里复习一下。
 */


// 标签语法一般和循环语句配合使用，它的作用就是返回到代码的特定位置。
back: for (let i = 0; i < 10; i++) {
  if (i === 5) {
    
    // break back;

    continue back;
  } else {
    console.log(i);
  }
}

// 但是一般为了好看，一般都这么写。

console.log('outside');