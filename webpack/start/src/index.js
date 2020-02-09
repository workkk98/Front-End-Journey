// const _  = require('lodash')
import Elem from './print'
import './style.css'
import date from 'assets/date.js'
// import star from './star.jpg'
// import data from './data.xml'

function component(today) {
  const div = new Elem('div')
  div.addClass('hello');

  // 把图像放入到div中
  // let image = new Image(400,300)
  // image.src = star
  // element.appendChild(image)

  div.getElem.innerHTML = `click me. Today is ${today}`
  div.getElem.onclick = Elem.printMe


  return div.getElem;
}
document.body.appendChild(component(date.date));

// if (module.hot) {
//   // 因为热更新刷新页面，所以这段话在浏览器控制台马上消失
//   module.hot.accept('./print.js', function (params) {
//     console.log('Accepting the updated printMe module!');
//     printMe()
//   })
// }