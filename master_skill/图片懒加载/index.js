var imagesBox = document.getElementById('images-box');
var html = document.documentElement;

// 假设是一个请求，去获取img的地址和其他信息
var fragment = document.createDocumentFragment()
var imagesHeightList = [], divStart = 72;
for(let i =0 ; i < 50 ; i++) {
  var image = new Image();
  image.className = "image"
  image.setAttribute('data-src', './default.jpg');
  image.setAttribute('data-unicode', ''+ i);
  var div = document.createElement('div')
  div.setAttribute('class', 'image-item');
  div.appendChild(image)
  fragment.appendChild(div)
  // 预设的image-item 每个的高度520px 避免重复去计算图片的高度
  imagesHeightList[i] = i == 0? 72 : imagesHeightList[i-1] + 520;
}
imagesBox.appendChild(fragment);
console.log("图片高度数组的长度", imagesHeightList.length)

// 这里的this 指向html
function lazyLoad (event) {
  // 避免初始化问题 然后 向上滚不加载内容
  if(event&&event.wheelDelta>0) {
    return;
  }
  var html = this == document.documentElement ? this : document.documentElement;
  var viewPortBottom = html.scrollTop + html.clientHeight;
  for(var index=0; index <  imagesHeightList.length; index++) {
    // 视口下边界 靠近 当前图片顶部height时
    if(imagesHeightList[index] - viewPortBottom <= 20) {
      var imgElem = imagesBox.children[index].firstChild;
      if(!imgElem.src) {
        var url = imgElem.getAttribute('data-src');
        imgElem.src = url;
      }
    }
  }
}

var throttle = (function (callback, delay) {
  var prev = new Date().getTime()
  return function (e) {
    var curr = new Date().getTime()
    if(curr - prev > delay) {
      callback.call(this, e)
      prev = curr;
    }
  }
})(lazyLoad, 1000)

html.addEventListener('mousewheel', throttle, false)

lazyLoad(null)