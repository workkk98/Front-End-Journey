// 任何没有通过try-catch处理的错误都会触发window对象的error事件

window.onerror = function (message , url , line) {
  console.log(message , url ,line)
  return false // 阻止浏览器报告错误的默认行为？ chrome并没有发生
}

function simple () {
  try {
    new eval()
  } catch (error) {
    console.log(error)
  }
}

// simple()

// Error基类 用于派生一些新的错误类型

function throwErrorByV8 (values) {
  try {
    values.sort()
  } catch (error) {
    console.error(error)
  }
}

throwErrorByV8()

console.log(kjahsdkjh)