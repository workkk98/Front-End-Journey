const _  = require('lodash')
import print from './print'
// import './style.css'
// import star from './star.jpg'
// import data from './data.xml'

function component() {
  let element = document.createElement('div');


  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello'); //css api

  // 把图像放入到div中
  // let image = new Image(400,300)
  // image.src = star
  // element.appendChild(image)

  // xml
  // console.log(data)

  element.innerHTML = "click me"
  element.onclick = function (params) {
    print()
  }


  return element;
}

document.body.appendChild(component());

if (module.hot) {
  // 因为热更新刷新页面，所以这段话在浏览器控制台马上消失
  module.hot.accept('./print.js', function (params) {
    console.log('Accepting the updated printMe module!');
    printMe()
  })
}