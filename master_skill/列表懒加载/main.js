var container = document.querySelector('.container');
var prefixHeight = 200; // 指预设高度

function lazyLoad (e) {
  // console.log('wheelDelta', e.wheelDelta) 滚轮滚动值
  console.log(prefixHeight,e.pageY);
  // 向下滚动 且 是属于container容器时
  if(e.pageY>200 && e.wheelDelta < 0) {
    var fragment = document.createDocumentFragment()
    for(var i =0; i< 3; i++) {
      var div = document.createElement('div');
      div.className = "image-box"
      div.appendChild(document.createTextNode('通过lazyLoad新加的内容'));
      fragment.appendChild(div)
    }
    container.appendChild(fragment)
  }
}

var throttle = (function (callback, delay) {
  var timer;
  return function (e) {
    if(!timer) {
      callback(e)
      timer = setTimeout(function () {
        timer = null;
      }, delay)
    }
  }
})(lazyLoad, 1000)

container.addEventListener('mousewheel', throttle, false)