// canvas

const canvas = document.querySelector('#canvas');

const context = canvas.getContext('2d')

//导出canvas元素上绘制的图像 toDataURL("image/png"(格式类型))

var everyAttrInContext = function (context) {
  return Object.assign(context)
}
console.log(everyAttrInContext(context))

// 填充 context.fillStyle = "颜色" 描边 context.strokeStyle
//  context.lineWidth = 任意整数

// 绘制矩形 fillRect stokeRect
context.fillStyle = "#ff0000";
context.fillRect(10,10,50,50)

context.fillStyle = "rgba(0,0,255,0.5)"
context.fillRect(30,30,50,50)  // x , y  ,width ,height

context.clearRect(40,40,10,10)


// 绘制路径

context.beginPath() // 开始绘制路径
context.arc(500 , 100 , 100 , 0 , Math.PI * 2, false) // x ，y , 弧度 , 开始角度 , 结束弧度 , 是否反顺时针
context.moveTo(595,100)
context.arc(500,100,95,0,2*Math.PI,false)

context.translate(500,100) // 移动原点
context.rotate(1)

context.moveTo(0,-80); // 以原点绘制
context.lineTo(0,0)
context.lineTo(40,0)

context.stroke()  // 描边
context.closePath()


// 绘制文本 fillText() 和 stokeText()

context.font = "bold 14px Arial"
context.textAlign = "center" // start end 等 例如start,字符串第一个1的位置在500，18
context.textBaselin = "middle"
context.fillText("12",0,-82)




// 变换 变换原点
// rotate(angle)
// translate(x,y)


