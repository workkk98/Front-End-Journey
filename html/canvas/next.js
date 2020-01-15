// 绘制图像

const canvasNext = document.querySelector('#canvasNext');
const nextContext = canvasNext.getContext('2d')

window.onload = function () {
  console.log('onload in image')
  nextContext.drawImage(document.images[0] , 0,0 , 400 ,300)  // img元素 起点x,y
  evaluateCanvas()
}

// 阴影 属性
// context.shadowColor 阴影颜色
// context.shadowOffsetX shadowOffsetY 阴影偏移量
// context.shadowBlur 模糊的像素数

// 渐变
// context.createLinearGradient(xStart , yStart , xEnd , yEnd)
// createRadialGradient()
const gradient = nextContext.createLinearGradient(400,300, 500 , 400);
gradient.addColorStop(0 , 'white');
gradient.addColorStop(0.5 , 'gray');
gradient.addColorStop(1 , 'black');

nextContext.fillStyle = gradient;
nextContext.fillRect(400,300,100,100)

// const pattern = createPattern(image , "repeat") // image元素 和 如何重复图像的字符串
// context.fillStyle = pattern;

// 使用图像数据

function evaluateCanvas() {
  const gsxData = nextContext.getImageData(0,0,400,300)
  console.log('canvas图像数据' , gsxData)
  // gsxData中有三个属性 宽 高 和data数组
  const data = gsxData.data
  for (let i = 0, len = data.length; i< len ; i+=4) {
    let red=data[i],green=data[i+1],blue=data[i+2],alpha=data[i+3];
    average= Math.floor((red+green+blue) / 3);
    data[i] = average;
    data[i+1] = average;
    data[i+2] = average;
  }
  nextContext.putImageData(gsxData, 0 ,0)
}

//合成
//context.globalAlpah = 0 ~ 1 设置透明度
//context.globalCompositionOperation = "" 表示后绘制的图形怎样和先绘制的图形结合


