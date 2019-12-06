const _  = require('lodash')
import './style.css'
import star from './star.jpg'

function component() {
  let element = document.createElement('div');


  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello'); //css api

  // 把图像放入到div中
  let image = new Image(400,300)
  image.src = star

  element.appendChild(image)

  return element;
}

document.body.appendChild(component());