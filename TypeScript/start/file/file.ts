// 声明文件
// 打开.d.ts后缀的声明文件后，就不会报错了？

jQuery('#app')
jQuery(function () {
  console.log('ready')
})

// let cat = new Animal('cat')

// let directions = [Directions.up]

jQuery.fn.entend()

// 第三方库文件，编译器不知道jquery是什么东西，导致出错