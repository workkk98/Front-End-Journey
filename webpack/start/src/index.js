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